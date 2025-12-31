import { useState, useRef, useEffect, useCallback } from 'react';
import type { SearchResult, AppSettings } from '@/types/search';
import { DEFAULT_SETTINGS } from '@/types/search';
import { useSearch } from '@/hooks/useSearch';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { getSearchUrl, openInBrowser } from '@/utils/searchEngine';
import { SearchInput } from './SearchInput';
import { SearchResults } from './SearchResults';
import { SettingsPanel } from './SettingsPanel';
import { Settings } from 'lucide-react';
import { toast } from 'sonner';

export function SpotlightSearch() {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('spotlight-settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });
  const [showSettings, setShowSettings] = useState(false);
  const [isFocused, setIsFocused] = useState(true);
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
        toast.success(`Opening ${result.title}...`);
      }
      clearSearch();
    },
    [query, settings, clearSearch]
  );

  const handleClose = useCallback(() => {
    clearSearch();
    setIsFocused(false);
  }, [clearSearch]);

  const { selectedIndex, setSelectedIndex, handleKeyDown } = useKeyboardNavigation(
    results,
    handleSelect,
    handleClose
  );

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('spotlight-settings', JSON.stringify(settings));
  }, [settings]);

  // Focus on mount and when clicking back
  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  // Global shortcut to refocus
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if (e.code === 'ControlRight' || (e.ctrlKey && e.code === 'Space')) {
        e.preventDefault();
        setIsFocused(true);
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, []);

  return (
    <>
      <div className="spotlight-floating scale-in">
        <div className="spotlight-bar">
          <SearchInput
            ref={inputRef}
            value={query}
            onChange={setQuery}
            onClear={clearSearch}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
          />
          
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 mr-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
        
        {(results.length > 0 || query) && (
          <div className="spotlight-results">
            <SearchResults
              results={results}
              selectedIndex={selectedIndex}
              onSelect={handleSelect}
              onHover={setSelectedIndex}
            />
            
            {query !== '' && results.length === 1 && results[0].type === 'web' && (
              <div className="px-4 py-3 text-center border-t border-border/30">
                <p className="text-muted-foreground text-xs">No local results</p>
              </div>
            )}
          </div>
        )}

        {/* Shortcut hint */}
        <div className="flex items-center justify-center gap-4 py-2 text-[10px] text-muted-foreground/50">
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>esc clear</span>
        </div>
      </div>

      {showSettings && (
        <SettingsPanel
          settings={settings}
          onSettingsChange={setSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </>
  );
}
