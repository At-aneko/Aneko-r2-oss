import { useState, useEffect, useCallback } from 'react';
import type { R2ObjectInfo } from '../types';
import { fetchFiles } from '../utils/api';
import { useAppStore } from '../store/appStore';

export function useFiles() {
  const [files, setFiles] = useState<R2ObjectInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const prefix = useAppStore((s) => s.prefix);
  const refreshKey = useAppStore((s) => s.refreshKey);

  const loadFiles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchFiles(prefix);
      setFiles(data.files);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load files');
      setFiles([]);
    } finally {
      setLoading(false);
    }
  }, [prefix, refreshKey]);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  return { files, loading, error, reload: loadFiles };
}