import { 
  AppWindow, 
  File, 
  Folder, 
  Calculator, 
  Globe, 
  Settings 
} from 'lucide-react';
import type { SearchResultType } from '@/types/search';

interface SearchIconProps {
  type: SearchResultType;
}

export function SearchIcon({ type }: SearchIconProps) {
  const iconClass = "w-5 h-5 text-white";

  const icons: Record<SearchResultType, JSX.Element> = {
    app: <AppWindow className={iconClass} />,
    file: <File className={iconClass} />,
    folder: <Folder className={iconClass} />,
    calc: <Calculator className={iconClass} />,
    web: <Globe className={iconClass} />,
    settings: <Settings className={iconClass} />,
  };

  return (
    <div className={`spotlight-icon ${type}`}>
      {icons[type]}
    </div>
  );
}
