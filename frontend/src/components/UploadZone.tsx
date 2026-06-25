import { Upload, X } from 'lucide-react';
import { useState, useRef, useCallback } from 'react';
import { useAppStore } from '../store/appStore';
import { uploadFiles } from '../utils/api';

interface UploadZoneProps {
  onClose: () => void;
}

export function UploadZone({ onClose }: UploadZoneProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const prefix = useAppStore((s) => s.prefix);
  const accessCode = useAppStore((s) => s.accessCode);
  const turnstileToken = useAppStore((s) => s.turnstileToken);
  const setUploading = useAppStore((s) => s.setUploading);
  const setUploadProgress = useAppStore((s) => s.setUploadProgress);
  const uploading = useAppStore((s) => s.uploading);
  const uploadProgress = useAppStore((s) => s.uploadProgress);
  const triggerRefresh = useAppStore((s) => s.triggerRefresh);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    setSelectedFiles((prev) => [...prev, ...Array.from(files)]);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleUpload = async () => {
    if (selectedFiles.length === 0 || uploading) return;
    setUploading(true);
    setUploadProgress(0);
    try {
      await uploadFiles(selectedFiles, prefix, accessCode, turnstileToken, setUploadProgress);
      triggerRefresh();
      onClose();
      setSelectedFiles([]);
    } catch (e) {
      alert(e instanceof Error ? e.message : '上传失败');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="w-full max-w-lg mx-4 glass-strong rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/5">
          <h3 className="text-base font-semibold text-[#1d1d1f]">上传文件</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#aeaeb2] hover:text-[#1d1d1f] hover:bg-black/5 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 ${
              dragging
                ? 'border-[#1d1d1f] bg-black/[0.03]'
                : 'border-black/10 hover:border-black/20 hover:bg-black/[0.02]'
            }`}
          >
            <Upload size={40} className="mx-auto text-[#aeaeb2] mb-3" />
            <p className="text-[#86868b] text-sm">拖拽文件到此处，或点击选择文件</p>
            <input
              ref={inputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>

          {selectedFiles.length > 0 && (
            <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
              {selectedFiles.map((file, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-black/[0.02] border border-black/5">
                  <span className="text-sm text-[#1d1d1f] truncate">{file.name}</span>
                  <span className="text-xs text-[#aeaeb2] ml-2 shrink-0">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                  <button
                    onClick={() => removeFile(i)}
                    className="ml-2 p-1 text-[#aeaeb2] hover:text-[#ff3b30] transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {uploading && (
            <div className="mt-4">
              <div className="h-2 rounded-full bg-black/5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#1d1d1f] transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs text-[#aeaeb2] mt-2 text-center">{uploadProgress}%</p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 px-6 py-5 border-t border-black/5">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm text-[#86868b] hover:text-[#1d1d1f] hover:bg-black/5 transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleUpload}
            disabled={selectedFiles.length === 0 || uploading}
            className="px-6 py-2.5 rounded-xl text-sm font-medium bg-[#1d1d1f] text-white hover:bg-black disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            {uploading ? '上传中...' : `上传 (${selectedFiles.length})`}
          </button>
        </div>
      </div>
    </div>
  );
}