import { ChevronRight, Home } from 'lucide-react';
import { useAppStore } from '../store/appStore';

export function Breadcrumb() {
  const prefix = useAppStore((s) => s.prefix);
  const setPrefix = useAppStore((s) => s.setPrefix);
  const triggerRefresh = useAppStore((s) => s.triggerRefresh);

  const parts = prefix ? prefix.split('/').filter(Boolean) : [];

  const navigateTo = (index: number) => {
    if (index < 0) {
      setPrefix('');
    } else {
      const newPath = parts.slice(0, index + 1).join('/') + '/';
      setPrefix(newPath);
    }
    triggerRefresh();
  };

  return (
    <nav className="flex items-center gap-1.5 text-sm overflow-x-auto scrollbar-thin">
      <button
        onClick={() => navigateTo(-1)}
        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[#86868b] hover:text-[#1d1d1f] hover:bg-black/5 transition-all shrink-0"
      >
        <Home size={14} />
        <span className="hidden sm:inline">根目录</span>
      </button>

      {parts.map((part, i) => (
        <span key={i} className="flex items-center gap-1 shrink-0">
          <ChevronRight size={14} className="text-[#aeaeb2]" />
          <button
            onClick={() => navigateTo(i)}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              i === parts.length - 1
                ? 'text-[#1d1d1f] font-semibold bg-black/5'
                : 'text-[#86868b] hover:text-[#1d1d1f] hover:bg-black/5'
            }`}
          >
            {part}
          </button>
        </span>
      ))}
    </nav>
  );
}