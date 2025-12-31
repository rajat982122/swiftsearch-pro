import type { SearchResult } from '@/types/search';
import { SearchResultItem } from './SearchResult';

interface SearchResultsProps {
  results: SearchResult[];
  selectedIndex: number;
  onSelect: (result: SearchResult) => void;
  onHover: (index: number) => void;
}

export function SearchResults({
  results,
  selectedIndex,
  onSelect,
  onHover,
}: SearchResultsProps) {
  if (results.length === 0) {
    return null;
  }

  return (
    <div 
      className="max-h-[400px] overflow-y-auto py-2"
      role="listbox"
    >
      {results.map((result, index) => (
        <SearchResultItem
          key={result.id}
          result={result}
          isActive={index === selectedIndex}
          onClick={() => onSelect(result)}
          onHover={() => onHover(index)}
        />
      ))}
    </div>
  );
}
