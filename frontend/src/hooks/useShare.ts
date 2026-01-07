'use client';

import { useState, useCallback } from 'react';

interface ShareData {
  title: string;
  text: string;
  url?: string;
}

export function useShare() {
  const [copied, setCopied] = useState(false);

  const share = useCallback(async (data: ShareData) => {
    const url = data.url || window.location.href;

    // Try native share first (mobile)
    if (navigator.share && navigator.canShare?.({ ...data, url })) {
      try {
        await navigator.share({ ...data, url });
        return true;
      } catch (error) {
        // User cancelled or error - fall through to clipboard
        if ((error as Error).name === 'AbortError') {
          return false;
        }
      }
    }

    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return false;
    }
  }, []);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return false;
    }
  }, []);

  return {
    share,
    copyToClipboard,
    copied,
  };
}

