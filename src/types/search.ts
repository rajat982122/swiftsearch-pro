export type SearchResultType = 'app' | 'file' | 'folder' | 'calc' | 'web' | 'settings';

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle?: string;
  icon?: string;
  path?: string;
  action?: () => void;
}

export interface AppSettings {
  defaultBrowser: 'chrome' | 'firefox' | 'edge' | 'safari' | 'default';
  searchEngine: 'google' | 'duckduckgo' | 'bing' | 'yahoo';
  showRecentFiles: boolean;
  maxResults: number;
}

export const DEFAULT_SETTINGS: AppSettings = {
  defaultBrowser: 'default',
  searchEngine: 'google',
  showRecentFiles: true,
  maxResults: 8,
};
