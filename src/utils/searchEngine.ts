import type { AppSettings } from '@/types/search';

export function getSearchUrl(query: string, settings: AppSettings): string {
  const encodedQuery = encodeURIComponent(query);
  
  switch (settings.searchEngine) {
    case 'google':
      return `https://www.google.com/search?q=${encodedQuery}`;
    case 'duckduckgo':
      return `https://duckduckgo.com/?q=${encodedQuery}`;
    case 'bing':
      return `https://www.bing.com/search?q=${encodedQuery}`;
    case 'yahoo':
      return `https://search.yahoo.com/search?p=${encodedQuery}`;
    default:
      return `https://www.google.com/search?q=${encodedQuery}`;
  }
}

export function openInBrowser(url: string): void {
  window.open(url, '_blank', 'noopener,noreferrer');
}
