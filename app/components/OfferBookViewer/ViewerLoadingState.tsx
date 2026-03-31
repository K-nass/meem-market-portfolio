'use client';

import styles from './offer-book-viewer.module.css';

interface ViewerLoadingStateProps {
  progress?: number;
}

export default function ViewerLoadingState({ progress }: ViewerLoadingStateProps) {
  const normalizedProgress = typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : 0;
  const hasProgress = typeof progress === 'number' && progress > 0;

  return (
    <div className={styles.loadingState}>
      <div className={styles.loadingBookShell}>
        <div className={styles.loadingPage} />
        <div className={styles.loadingPage} />
      </div>
      <p className={styles.loadingTitle}>Preparing offer book...</p>
      <p className={styles.loadingSubtitle}>
        {hasProgress ? `Rendering pages (${Math.round(normalizedProgress)}%)` : 'Loading PDF and building pages'}
      </p>
      <div className={styles.progressTrack} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={normalizedProgress}>
        <div className={styles.progressFill} style={{ width: `${normalizedProgress}%` }} />
      </div>
    </div>
  );
}

