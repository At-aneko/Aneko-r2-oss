import { FolderOpen } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="glass-subtle rounded-2xl py-20 text-center">
      <div className="w-20 h-20 rounded-2xl bg-black/[0.03] border border-black/5 flex items-center justify-center mb-5 mx-auto">
        <FolderOpen size={32} className="text-[#aeaeb2]" />
      </div>
      <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">此文件夹为空</h3>
      <p className="text-sm text-[#aeaeb2] max-w-xs mx-auto">
        上传文件或创建文件夹来开始使用
      </p>
    </div>
  );
}