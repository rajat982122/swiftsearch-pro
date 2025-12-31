import { memo } from 'react';
import type { SearchResult as SearchResultType } from '@/types/search';
import { SearchIcon } from './SearchIcon';

interface SearchResultProps {
  result: SearchResultType;
  isActive: boolean;
  onClick: () => void;
  onHover: () => void;
}

export const SearchResultItem = memo(function SearchResultItem({
  result,
  isActive,
  onClick,
  onHover,
}: SearchResultProps) {
  const isCalc = result.type === 'calc';

  return (
    <div
      className={`spotlight-result ${isActive ? 'active' : ''} slide-up`}
      onClick={onClick}
      onMouseEnter={onHover}
      role="option"
      aria-selected={isActive}
      style={{ animationDelay: '0.02s' }}
    >
      <SearchIcon type={result.type} />
      <div className="flex-1 min-w-0">
        {isCalc ? (
          <span className="calc-result">{result.title}</span>
        ) : (
          <p className="text-foreground font-medium truncate">{result.title}</p>
        )}
        {result.subtitle && (
          <p className="text-muted-foreground text-sm truncate">
            {result.subtitle}
          </p>
        )}
      </div>
      {result.path && !isCalc && (
        <span className="text-xs text-muted-foreground/60 hidden sm:block">
          {result.path}
        </span>
      )}
      {isActive && (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <kbd className="px-1.5 py-0.5 bg-secondary rounded text-[10px] font-medium">
            ↵
          </kbd>
        </div>
      )}
    </div>
  );
});
