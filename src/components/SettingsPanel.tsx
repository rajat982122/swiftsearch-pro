import { X, Check } from 'lucide-react';
import type { AppSettings } from '@/types/search';

interface SettingsPanelProps {
  settings: AppSettings;
  onSettingsChange: (settings: AppSettings) => void;
  onClose: () => void;
}

export function SettingsPanel({
  settings,
  onSettingsChange,
  onClose,
}: SettingsPanelProps) {
  const browsers = [
    { value: 'default', label: 'System Default' },
    { value: 'chrome', label: 'Google Chrome' },
    { value: 'firefox', label: 'Firefox' },
    { value: 'edge', label: 'Microsoft Edge' },
    { value: 'safari', label: 'Safari' },
  ] as const;

  const searchEngines = [
    { value: 'google', label: 'Google' },
    { value: 'duckduckgo', label: 'DuckDuckGo' },
    { value: 'bing', label: 'Bing' },
    { value: 'yahoo', label: 'Yahoo' },
  ] as const;

  return (
    <div className="fixed inset-0 flex items-start justify-center pt-[10vh] z-50 fade-in">
      <div 
        className="absolute inset-0 bg-background/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="spotlight-window scale-in relative z-10 max-w-md w-full">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
          <h2 className="text-lg font-semibold">Settings</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Default Browser */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground">
              Default Browser
            </label>
            <div className="grid grid-cols-1 gap-2">
              {browsers.map((browser) => (
                <button
                  key={browser.value}
                  onClick={() =>
                    onSettingsChange({ ...settings, defaultBrowser: browser.value })
                  }
                  className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-all ${
                    settings.defaultBrowser === browser.value
                      ? 'border-primary bg-primary/10 text-foreground'
                      : 'border-border/50 hover:border-border hover:bg-secondary/50'
                  }`}
                >
                  <span>{browser.label}</span>
                  {settings.defaultBrowser === browser.value && (
                    <Check className="w-4 h-4 text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Search Engine */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground">
              Search Engine
            </label>
            <div className="grid grid-cols-2 gap-2">
              {searchEngines.map((engine) => (
                <button
                  key={engine.value}
                  onClick={() =>
                    onSettingsChange({ ...settings, searchEngine: engine.value })
                  }
                  className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-all ${
                    settings.searchEngine === engine.value
                      ? 'border-primary bg-primary/10 text-foreground'
                      : 'border-border/50 hover:border-border hover:bg-secondary/50'
                  }`}
                >
                  <span>{engine.label}</span>
                  {settings.searchEngine === engine.value && (
                    <Check className="w-4 h-4 text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Max Results */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground">
              Max Results: {settings.maxResults}
            </label>
            <input
              type="range"
              min="4"
              max="15"
              value={settings.maxResults}
              onChange={(e) =>
                onSettingsChange({
                  ...settings,
                  maxResults: parseInt(e.target.value),
                })
              }
              className="w-full accent-primary"
            />
          </div>
        </div>

        <div className="px-5 py-4 border-t border-border/50 bg-secondary/30">
          <p className="text-xs text-muted-foreground text-center">
            Press <kbd className="px-1.5 py-0.5 bg-secondary rounded text-[10px] font-medium mx-1">Right Ctrl</kbd> 
            to open Spotlight anytime
          </p>
        </div>
      </div>
    </div>
  );
}
