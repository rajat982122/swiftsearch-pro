import { useState, useRef, useEffect, useCallback } from 'react';
import type { SearchResult, AppSettings } from '@/types/search';
import { DEFAULT_SETTINGS } from '@/types/search';
import { useSearch } from '@/hooks/useSearch';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { getSearchUrl, openInBrowser } from '@/utils/searchEngine';
import { SearchInput } from './SearchInput';
import { SearchResults } from './SearchResults';
import { SettingsPanel } from './SettingsPanel';
import { Settings, Command } from 'lucide-react';
import { toast } from 'sonner';

interface SpotlightSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SpotlightSearch({ isOpen, onClose }: SpotlightSearchProps) {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('spotlight-settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });
  const [showSettings, setShowSettings] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { query, setQuery, results, clearSearch } = useSearch(settings);

  const handleSelect = useCallback(
    (result: SearchResult) => {
      if (result.action) {
        result.action();
      } else if (result.type === 'web') {
        const url = getSearchUrl(query, settings);
        openInBrowser(url);
      } else if (result.type === 'calc') {
        navigator.clipboard.writeText(result.title.replace(/,/g, ''));
        toast.success('Copied to clipboard!');
      } else {
        // Simulate opening app/file/folder
        toast.success(`Opening ${result.title}...`);
      }
      clearSearch();
      onClose();
    },
    [query, settings, clearSearch, onClose]
  );

  const { selectedIndex, setSelectedIndex, handleKeyDown } = useKeyboardNavigation(
    results,
    handleSelect,
    onClose
  );

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('spotlight-settings', JSON.stringify(settings));
  }, [settings]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      clearSearch();
      setShowSettings(false);
    }
  }, [isOpen, clearSearch]);

  if (!isOpen) return null;

  return (
    <div className="spotlight-container fade-in">
      <div 
        className="absolute inset-0"
        onClick={onClose}
      />
      
      <div className="spotlight-window scale-in relative z-10">
        <SearchInput
          ref={inputRef}
          value={query}
          onChange={setQuery}
          onClear={clearSearch}
          onKeyDown={handleKeyDown}
        />
        
        <SearchResults
          results={results}
          selectedIndex={selectedIndex}
          onSelect={handleSelect}
          onHover={setSelectedIndex}
        />

        {/* Empty state */}
        {query === '' && (
          <div className="px-5 py-8 text-center">
            <Command className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-sm">
              Type to search apps, files, folders
            </p>
            <p className="text-muted-foreground/60 text-xs mt-1">
              Or try a calculation like "2+2*3"
            </p>
          </div>
        )}

        {/* No results */}
        {query !== '' && results.length === 1 && results[0].type === 'web' && (
          <div className="px-5 py-6 text-center border-t border-border/30">
            <p className="text-muted-foreground text-sm">
              No local results found
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border/30 bg-secondary/20">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-secondary rounded text-[10px]">↑↓</kbd>
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-secondary rounded text-[10px]">↵</kbd>
              open
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-secondary rounded text-[10px]">esc</kbd>
              close
            </span>
          </div>
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showSettings && (
        <SettingsPanel
          settings={settings}
          onSettingsChange={setSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
