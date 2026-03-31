'use client';

import { useEffect, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import styles from './offer-book-viewer.module.css';

interface ThumbnailSidebarProps {
  pages: string[];
  activePage: number;
  isOpen: boolean;
  onToggle: () => void;
  onJumpToPage: (pageIndex: number) => void;
}

const THUMBNAIL_ROW_HEIGHT = 136;

export default function ThumbnailSidebar({
  pages,
  activePage,
  isOpen,
  onToggle,
  onJumpToPage,
}: ThumbnailSidebarProps) {
  const parentRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: pages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => THUMBNAIL_ROW_HEIGHT,
    overscan: 6,
  });

  useEffect(() => {
    if (!isOpen || pages.length === 0) {
      return;
    }
    virtualizer.scrollToIndex(activePage, { align: 'center' });
  }, [activePage, isOpen, pages.length, virtualizer]);

  return (
    <aside className={`${styles.thumbnailSidebar} ${isOpen ? styles.thumbnailSidebarOpen : styles.thumbnailSidebarClosed}`}>
      <button
        type="button"
        className={styles.sidebarToggle}
        onClick={onToggle}
        aria-label={isOpen ? 'Collapse thumbnails' : 'Expand thumbnails'}
        title={isOpen ? 'Collapse thumbnails' : 'Expand thumbnails'}
      >
        {isOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
      </button>

      {isOpen && (
        <div ref={parentRef} className={styles.thumbnailScrollArea}>
          <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
            {virtualizer.getVirtualItems().map((virtualItem) => {
              const pageIndex = virtualItem.index;
              const pageSrc = pages[pageIndex];
              const isActive = pageIndex === activePage;

              return (
                <div
                  key={virtualItem.key}
                  className={styles.thumbnailRow}
                  style={{
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  <button
                    type="button"
                    className={`${styles.thumbnailButton} ${isActive ? styles.thumbnailButtonActive : ''}`}
                    onClick={() => onJumpToPage(pageIndex)}
                    aria-label={`Go to page ${pageIndex + 1}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={pageSrc} alt={`Page ${pageIndex + 1}`} className={styles.thumbnailImage} loading="lazy" />
                    <span className={styles.thumbnailLabel}>{pageIndex + 1}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
}
