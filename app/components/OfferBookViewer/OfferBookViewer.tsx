'use client';

import dynamic from 'next/dynamic';
import {
  ArrowLeftToLine,
  ArrowRightToLine,
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize,
  Minimize,
  Minus,
  Plus,
  Printer,
  RefreshCw,
  RotateCcw,
  Undo2,
} from 'lucide-react';
import {
  FormEvent,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRouter } from '@/i18n/navigation';
import ThumbnailSidebar from './ThumbnailSidebar';
import ViewerLoadingState from './ViewerLoadingState';
import styles from './offer-book-viewer.module.css';

const HTMLFlipBook = dynamic(() => import('react-pageflip').then((module) => module.default), { ssr: false });

interface OfferBookViewerProps {
  pdfUrl?: string | null;
  offerBookCode: string;
  date?: string;
  initialImages?: string[];
  downloadByIdUrl?: string;
  downloadByDateUrl?: string;
  backHref?: string;
}

interface PdfToImagesState {
  pages: string[];
  loading: boolean;
  error: string | null;
  progress: number;
}

interface PageFlipApi {
  flipPrev: () => void;
  flipNext: () => void;
  turnToPage: (page: number) => void;
}

interface FlipBookRefObject {
  pageFlip: () => PageFlipApi;
}

interface FlipPageProps {
  src: string;
  pageNumber: number;
}

const FlipPage = forwardRef<HTMLDivElement, FlipPageProps>(function FlipPage({ src, pageNumber }, ref) {
  return (
    <div ref={ref} className={styles.flipPage}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`Offer page ${pageNumber}`}
        loading={pageNumber <= 3 ? 'eager' : 'lazy'}
        className={styles.flipPageImage}
        draggable={false}
      />
    </div>
  );
});

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function usePdfToImages(pdfUrl: string | null | undefined, retryKey: number): PdfToImagesState {
  const [state, setState] = useState<PdfToImagesState>({
    pages: [],
    loading: Boolean(pdfUrl),
    error: null,
    progress: 0,
  });

  useEffect(() => {
    if (!pdfUrl) {
      setState({ pages: [], loading: false, error: null, progress: 0 });
      return;
    }

    let isCancelled = false;
    let taskToCleanup: { destroy?: () => Promise<void> | void } | null = null;

    const run = async () => {
      setState({ pages: [], loading: true, error: null, progress: 0 });

      try {
        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@5.5.207/build/pdf.worker.min.mjs';

        const proxiedUrl = `/api/offers-book/proxy?url=${encodeURIComponent(pdfUrl)}`;
        const loadingTask = pdfjsLib.getDocument({
          url: proxiedUrl,
          withCredentials: false,
        });

        taskToCleanup = loadingTask;
        const pdf = await loadingTask.promise;
        const totalPages = pdf.numPages;
        const renderedPages: string[] = [];

        for (let pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
          if (isCancelled) {
            return;
          }

          const page = await pdf.getPage(pageNumber);
          const viewport = page.getViewport({ scale: 2 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d', { alpha: false });

          if (!context) {
            throw new Error('Canvas context is not available');
          }

          canvas.width = viewport.width;
          canvas.height = viewport.height;
          context.imageSmoothingEnabled = true;
          context.imageSmoothingQuality = 'high';

          await page.render({
            canvas,
            canvasContext: context,
            viewport,
          }).promise;

          renderedPages.push(canvas.toDataURL('image/jpeg', 0.92));
          setState((prev) => ({
            ...prev,
            progress: (pageNumber / totalPages) * 100,
          }));
        }

        if (!isCancelled) {
          setState({
            pages: renderedPages,
            loading: false,
            error: null,
            progress: 100,
          });
        }
      } catch (error) {
        if (!isCancelled) {
          setState({
            pages: [],
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to load offer PDF',
            progress: 0,
          });
        }
      }
    };

    void run();

    return () => {
      isCancelled = true;
      const destroy = taskToCleanup?.destroy;
      if (typeof destroy === 'function') {
        void destroy.call(taskToCleanup);
      }
    };
  }, [pdfUrl, retryKey]);

  return state;
}

export default function OfferBookViewer({
  pdfUrl,
  offerBookCode,
  date,
  initialImages = [],
  downloadByIdUrl,
  downloadByDateUrl,
  backHref = '/offers',
}: OfferBookViewerProps) {
  const router = useRouter();
  const flipBookRef = useRef<FlipBookRefObject | null>(null);
  const viewerRootRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const [retryKey, setRetryKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageInput, setPageInput] = useState('1');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pageDimensions, setPageDimensions] = useState({ width: 460, height: 650 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isZooming, setIsZooming] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragState, setDragState] = useState<{
    pointerId: number;
    startX: number;
    startY: number;
    startPanX: number;
    startPanY: number;
  } | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const zoomTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { pages: pdfPages, loading, error, progress } = usePdfToImages(pdfUrl, retryKey);

  const pages = useMemo(() => {
    if (pdfPages.length > 0) {
      return pdfPages;
    }
    return initialImages;
  }, [initialImages, pdfPages]);

  const totalPages = pages.length;
  const hasPages = totalPages > 0;
  const isAtStart = currentPage <= 0;
  const isAtEnd = currentPage >= totalPages - 1;
  const isFirstSinglePage = hasPages && currentPage === 0;
  const isLastSinglePage = hasPages && currentPage === totalPages - 1 && totalPages % 2 === 0;
  const isSinglePageSpread = isFirstSinglePage || isLastSinglePage;

  const downloadUrl = downloadByIdUrl || (date ? downloadByDateUrl : undefined);
  const canDownload = Boolean(pdfUrl);
  const canFlipPages = hasPages && zoomLevel === 1 && !isZooming;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (zoomTimerRef.current) {
        clearTimeout(zoomTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (hasPages) {
      setPageInput(String(currentPage + 1));
    }
  }, [currentPage, hasPages]);

  useEffect(() => {
    if (!hasPages) {
      setCurrentPage(0);
      return;
    }

    if (currentPage > totalPages - 1) {
      setCurrentPage(totalPages - 1);
    }
  }, [currentPage, hasPages, totalPages]);

  const recalculateSize = useCallback(() => {
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth < 1024;
    const ratio = 1 / 1.4142;
    const viewportEl = viewportRef.current;

    // Prefer measuring the actual available viewport box to keep spacing accurate.
    const measuredWidth = viewportEl?.clientWidth;
    const measuredHeight = viewportEl?.clientHeight;

    const fallbackSidebarWidth = isSidebarOpen ? (isTablet ? 160 : 190) : 46;
    const fallbackWidth = window.innerWidth - fallbackSidebarWidth - (isMobile ? 24 : 40);
    const fallbackHeight = window.innerHeight - (isMobile ? 158 : 192);

    const availableWidth = Math.max(220, measuredWidth ?? fallbackWidth);
    const availableHeight = Math.max(220, measuredHeight ?? fallbackHeight);

    const widthBySpread = (availableWidth - (isMobile ? 8 : 16)) / 2;
    const widthByHeight = (availableHeight - (isMobile ? 8 : 16)) * ratio;
    const maxPageWidth = isMobile ? 340 : isTablet ? 500 : 620;
    const minPageWidth = isMobile ? 150 : 220;

    let pageWidth = Math.floor(Math.min(widthBySpread, widthByHeight, maxPageWidth));
    pageWidth = Math.max(minPageWidth, pageWidth);

    const pageHeight = Math.floor(pageWidth / ratio);
    setPageDimensions({ width: pageWidth, height: pageHeight });
  }, [isSidebarOpen]);

  useEffect(() => {
    recalculateSize();
    window.addEventListener('resize', recalculateSize);
    return () => {
      window.removeEventListener('resize', recalculateSize);
    };
  }, [recalculateSize]);

  useEffect(() => {
    const viewportEl = viewportRef.current;
    if (!viewportEl || typeof ResizeObserver === 'undefined') {
      return;
    }

    const observer = new ResizeObserver(() => {
      recalculateSize();
    });
    observer.observe(viewportEl);

    return () => {
      observer.disconnect();
    };
  }, [recalculateSize]);

  const getPanBounds = useCallback(
    (nextZoom: number) => {
      const viewportRect = viewportRef.current?.getBoundingClientRect();
      if (!viewportRect) {
        return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
      }

      const bookWidth = isSinglePageSpread ? pageDimensions.width : pageDimensions.width * 2;
      const bookHeight = pageDimensions.height;
      const scaledWidth = bookWidth * nextZoom;
      const scaledHeight = bookHeight * nextZoom;

      const maxOffsetX = Math.max(0, (scaledWidth - viewportRect.width) / 2);
      const maxOffsetY = Math.max(0, (scaledHeight - viewportRect.height) / 2);

      return {
        minX: -maxOffsetX,
        maxX: maxOffsetX,
        minY: -maxOffsetY,
        maxY: maxOffsetY,
      };
    },
    [isSinglePageSpread, pageDimensions.height, pageDimensions.width]
  );

  const clampPan = useCallback(
    (nextPan: { x: number; y: number }, nextZoom: number) => {
      if (nextZoom <= 1) {
        return { x: 0, y: 0 };
      }

      const bounds = getPanBounds(nextZoom);
      return {
        x: clamp(nextPan.x, bounds.minX, bounds.maxX),
        y: clamp(nextPan.y, bounds.minY, bounds.maxY),
      };
    },
    [getPanBounds]
  );

  const updateZoom = useCallback(
    (desiredZoom: number, focalPoint?: { clientX: number; clientY: number }) => {
      const nextZoom = clamp(desiredZoom, 1, 3);
      if (nextZoom === zoomLevel) {
        return;
      }

      setIsZooming(true);
      if (zoomTimerRef.current) {
        clearTimeout(zoomTimerRef.current);
      }

      if (nextZoom === 1) {
        setZoomLevel(1);
        setPan({ x: 0, y: 0 });
        zoomTimerRef.current = setTimeout(() => setIsZooming(false), 220);
        return;
      }

      const viewportRect = viewportRef.current?.getBoundingClientRect();
      if (!viewportRect) {
        setZoomLevel(nextZoom);
        return;
      }

      const focalX = focalPoint ? focalPoint.clientX - viewportRect.left : viewportRect.width / 2;
      const focalY = focalPoint ? focalPoint.clientY - viewportRect.top : viewportRect.height / 2;
      const centerX = viewportRect.width / 2;
      const centerY = viewportRect.height / 2;
      const ratio = nextZoom / zoomLevel;

      const nextPan = clampPan(
        {
          x: pan.x - (focalX - centerX) * (ratio - 1),
          y: pan.y - (focalY - centerY) * (ratio - 1),
        },
        nextZoom
      );

      setZoomLevel(nextZoom);
      setPan(nextPan);
      zoomTimerRef.current = setTimeout(() => setIsZooming(false), 220);
    },
    [clampPan, pan.x, pan.y, zoomLevel]
  );

  const getPageFlipApi = useCallback(() => flipBookRef.current?.pageFlip(), []);

  const jumpToPage = useCallback(
    (index: number) => {
      if (!hasPages || !canFlipPages) {
        return;
      }

      const target = clamp(index, 0, totalPages - 1);
      getPageFlipApi()?.turnToPage(target);
      setCurrentPage(target);
    },
    [canFlipPages, getPageFlipApi, hasPages, totalPages]
  );

  const goPreviousSpread = useCallback(() => {
    if (!canFlipPages || isAtStart) {
      return;
    }
    getPageFlipApi()?.flipPrev();
  }, [canFlipPages, getPageFlipApi, isAtStart]);

  const goNextSpread = useCallback(() => {
    if (!canFlipPages || isAtEnd) {
      return;
    }
    getPageFlipApi()?.flipNext();
  }, [canFlipPages, getPageFlipApi, isAtEnd]);

  const goToFirstPage = useCallback(() => jumpToPage(0), [jumpToPage]);
  const goToLastPage = useCallback(() => jumpToPage(totalPages - 1), [jumpToPage, totalPages]);

  const onSubmitPageInput = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!hasPages || !canFlipPages) {
        setPageInput(String(currentPage + 1));
        return;
      }
      const targetPage = Number.parseInt(pageInput, 10);
      if (Number.isNaN(targetPage)) {
        setPageInput(String(currentPage + 1));
        return;
      }
      jumpToPage(targetPage - 1);
    },
    [canFlipPages, currentPage, hasPages, jumpToPage, pageInput]
  );

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await viewerRootRef.current?.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Ignore failed fullscreen attempts.
    }
  }, []);

  const handleDownload = useCallback(async () => {
    setDownloadError(null);
    setIsDownloading(true);

    try {
      let response: Response;
      if (downloadUrl) {
        response = await fetch(downloadUrl, { method: 'GET', cache: 'no-store' });
      } else if (pdfUrl) {
        response = await fetch(`/api/offers-book/proxy?url=${encodeURIComponent(pdfUrl)}`, {
          method: 'GET',
          cache: 'no-store',
        });
      } else {
        throw new Error('No downloadable PDF found for this offer');
      }

      if (!response.ok) {
        throw new Error(`Download failed (${response.status})`);
      }

      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = objectUrl;
      const normalizedDate = date?.slice(0, 10);
      a.download = normalizedDate ? `${offerBookCode}-${normalizedDate}.pdf` : `${offerBookCode}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(objectUrl);
    } catch (downloadErrorValue) {
      setDownloadError(downloadErrorValue instanceof Error ? downloadErrorValue.message : 'Download failed');
    } finally {
      setIsDownloading(false);
    }
  }, [date, downloadUrl, offerBookCode, pdfUrl]);

  const handlePrint = useCallback(() => {
    if (!hasPages) {
      return;
    }

    const printWindow = window.open('', '_blank', 'noopener,noreferrer');
    if (!printWindow) {
      return;
    }

    const pagesMarkup = pages
      .map(
        (pageSrc, pageIndex) =>
          `<div class="print-page"><img src="${pageSrc}" alt="Page ${pageIndex + 1}" /></div>`
      )
      .join('');

    printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <title>${offerBookCode} - Print</title>
          <style>
            body { margin: 0; background: white; }
            .print-page { width: 100%; min-height: 100vh; page-break-after: always; display: flex; align-items: center; justify-content: center; padding: 24px; box-sizing: border-box; }
            .print-page img { max-width: 100%; max-height: calc(100vh - 48px); object-fit: contain; }
          </style>
        </head>
        <body>${pagesMarkup}</body>
      </html>
    `);
    printWindow.document.close();

    const runPrint = () => {
      printWindow.focus();
      printWindow.print();
    };

    setTimeout(runPrint, 400);
  }, [hasPages, offerBookCode, pages]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName)) {
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goPreviousSpread();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goNextSpread();
      } else if (event.key === 'Home') {
        event.preventDefault();
        goToFirstPage();
      } else if (event.key === 'End') {
        event.preventDefault();
        goToLastPage();
      } else if (event.key === '+' || event.key === '=') {
        event.preventDefault();
        updateZoom(zoomLevel + 0.2);
      } else if (event.key === '-') {
        event.preventDefault();
        updateZoom(zoomLevel - 0.2);
      } else if (event.key === '0') {
        event.preventDefault();
        updateZoom(1);
      } else if (event.key === 'Escape' && document.fullscreenElement) {
        event.preventDefault();
        void document.exitFullscreen();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [goNextSpread, goPreviousSpread, goToFirstPage, goToLastPage, updateZoom, zoomLevel]);

  const onDoubleClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (zoomLevel > 1) {
      updateZoom(1);
    } else {
      updateZoom(2, { clientX: event.clientX, clientY: event.clientY });
    }
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (zoomLevel <= 1) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    setDragState({
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startPanX: pan.x,
      startPanY: pan.y,
    });
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragState || zoomLevel <= 1 || dragState.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - dragState.startX;
    const deltaY = event.clientY - dragState.startY;

    const nextPan = clampPan(
      {
        x: dragState.startPanX + deltaX,
        y: dragState.startPanY + deltaY,
      },
      zoomLevel
    );

    setPan(nextPan);
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragState?.pointerId === event.pointerId) {
      setDragState(null);
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const visibleBookWidth = isSinglePageSpread ? pageDimensions.width : pageDimensions.width * 2;
  const flipBookOffsetX = isFirstSinglePage ? -pageDimensions.width : 0;

  const toolbarTitle = 'Offer Book';
  const loadingErrorText = 'Failed to load this offer PDF.';
  const retryText = 'Retry';
  const backText = 'Back to offers';

  return (
    <div ref={viewerRootRef} className={styles.viewerRoot} dir="ltr">
      <ThumbnailSidebar
        pages={pages}
        activePage={currentPage}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen((prev) => !prev)}
        onJumpToPage={jumpToPage}
      />

      <div className={styles.viewerMain}>
        <header className={styles.viewerHeader}>
          <button type="button" className={styles.headerButton} onClick={() => router.push(backHref)}>
            <Undo2 size={16} />
            {backText}
          </button>
          <p className={styles.viewerTitle}>
            {toolbarTitle}: <span>{offerBookCode}</span>
          </p>
        </header>

        <button
          type="button"
          className={`${styles.edgeButton} ${styles.edgeLeft}`}
          onClick={goPreviousSpread}
          disabled={isAtStart || !canFlipPages}
          aria-label="Previous spread"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          type="button"
          className={`${styles.edgeButton} ${styles.edgeRight}`}
          onClick={goNextSpread}
          disabled={isAtEnd || !canFlipPages}
          aria-label="Next spread"
        >
          <ChevronRight size={24} />
        </button>

        <div
          ref={viewportRef}
          className={`${styles.bookViewport} ${zoomLevel > 1 ? styles.pannableCursor : styles.normalCursor}`}
          onDoubleClick={onDoubleClick}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {loading && !hasPages ? (
            <ViewerLoadingState progress={progress} />
          ) : error && !hasPages ? (
            <div className={styles.errorState}>
              <p className={styles.errorTitle}>{loadingErrorText}</p>
              <p className={styles.errorSubtitle}>{error}</p>
              <button type="button" className={styles.retryButton} onClick={() => setRetryKey((prev) => prev + 1)}>
                <RefreshCw size={16} />
                {retryText}
              </button>
            </div>
          ) : !hasPages ? (
            <div className={styles.errorState}>
              <p className={styles.errorTitle}>No pages available</p>
              <p className={styles.errorSubtitle}>This offer does not include a book preview yet.</p>
            </div>
          ) : (
            <div
              className={styles.bookTransformLayer}
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomLevel})`,
              }}
            >
              <div
                className={styles.bookShell}
                style={{
                  width: `${visibleBookWidth}px`,
                  height: `${pageDimensions.height}px`,
                }}
              >
                {!isSinglePageSpread && <div className={styles.gutterShadow} />}
                <div
                  className={styles.flipBookTrack}
                  style={{
                    width: `${pageDimensions.width * 2}px`,
                    transform: `translateX(${flipBookOffsetX}px)`,
                  }}
                >
                  <HTMLFlipBook
                    ref={flipBookRef}
                    width={pageDimensions.width}
                    height={pageDimensions.height}
                    minWidth={140}
                    maxWidth={900}
                    minHeight={198}
                    maxHeight={1200}
                    style={{}}
                    size="fixed"
                    startZIndex={0}
                    swipeDistance={0}
                    showPageCorners={false}
                    maxShadowOpacity={0.5}
                    drawShadow
                    showCover
                    flippingTime={700}
                    usePortrait={false}
                    startPage={0}
                    autoSize
                    mobileScrollSupport
                    clickEventForward
                    disableFlipByClick
                    useMouseEvents={canFlipPages}
                    onFlip={(event: { data: number }) => setCurrentPage(event.data)}
                    className={styles.flipBook}
                  >
                    {pages.map((pageSrc, index) => (
                      <FlipPage key={`${pageSrc}-${index}`} src={pageSrc} pageNumber={index + 1} />
                    ))}
                  </HTMLFlipBook>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.toolbar} role="group" aria-label="Book controls">
          <button type="button" onClick={goToFirstPage} disabled={!canFlipPages || isAtStart} className={styles.toolbarButton} aria-label="First page">
            <ArrowLeftToLine size={16} />
          </button>
          <button type="button" onClick={goPreviousSpread} disabled={!canFlipPages || isAtStart} className={styles.toolbarButton} aria-label="Previous spread">
            <ChevronRight size={16} />
          </button>

          <form onSubmit={onSubmitPageInput} className={styles.pageInputForm}>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={pageInput}
              onChange={(event) => setPageInput(event.target.value.replace(/[^0-9]/g, ''))}
              onBlur={() => {
                if (!canFlipPages) {
                  setPageInput(String(currentPage + 1));
                  return;
                }
                if (!pageInput) {
                  setPageInput(String(currentPage + 1));
                  return;
                }
                const value = Number.parseInt(pageInput, 10);
                if (Number.isNaN(value)) {
                  setPageInput(String(currentPage + 1));
                  return;
                }
                jumpToPage(value - 1);
              }}
              className={styles.pageInput}
              aria-label="Page number"
              disabled={!canFlipPages}
            />
            <span className={styles.pageTotal}>/ {Math.max(totalPages, 1)}</span>
          </form>

          <button type="button" onClick={goNextSpread} disabled={!canFlipPages || isAtEnd} className={styles.toolbarButton} aria-label="Next spread">
            <ChevronLeft size={16} />
          </button>
          <button type="button" onClick={goToLastPage} disabled={!canFlipPages || isAtEnd} className={styles.toolbarButton} aria-label="Last page">
            <ArrowRightToLine size={16} />
          </button>

          <input
            type="range"
            min={1}
            max={Math.max(totalPages, 1)}
            value={Math.min(currentPage + 1, Math.max(totalPages, 1))}
            onChange={(event) => jumpToPage(Number(event.target.value) - 1)}
            className={styles.pageSlider}
            aria-label="Page slider"
            disabled={!canFlipPages}
          />

          <button type="button" onClick={() => updateZoom(zoomLevel - 0.2)} disabled={zoomLevel <= 1} className={styles.toolbarButton} aria-label="Zoom out">
            <Minus size={16} />
          </button>
          <span className={styles.zoomLabel}>{Math.round(zoomLevel * 100)}%</span>
          <button type="button" onClick={() => updateZoom(zoomLevel + 0.2)} disabled={zoomLevel >= 3} className={styles.toolbarButton} aria-label="Zoom in">
            <Plus size={16} />
          </button>
          <button type="button" onClick={() => updateZoom(1)} disabled={zoomLevel === 1} className={styles.toolbarButton} aria-label="Reset zoom">
            <RotateCcw size={16} />
          </button>

          <button type="button" onClick={toggleFullscreen} className={styles.toolbarButton} aria-label="Toggle fullscreen">
            {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
          </button>
          <button type="button" onClick={handleDownload} disabled={!canDownload || isDownloading} className={styles.toolbarButton} aria-label="Download PDF">
            <Download size={16} />
          </button>
          <button type="button" onClick={handlePrint} disabled={!hasPages} className={styles.toolbarButton} aria-label="Print offer">
            <Printer size={16} />
          </button>
        </div>

        {downloadError && <p className={styles.downloadError}>{downloadError}</p>}
      </div>
    </div>
  );
}
