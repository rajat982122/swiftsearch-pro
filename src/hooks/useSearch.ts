import { useState, useMemo, useCallback } from 'react';
import type { SearchResult, AppSettings } from '@/types/search';
import { allMockData } from '@/data/mockData';
import { isCalculation, evaluateExpression } from '@/utils/calculator';
import { getSearchUrl } from '@/utils/searchEngine';
import { DEFAULT_SETTINGS } from '@/types/search';

export function useSearch(settings: AppSettings = DEFAULT_SETTINGS) {
  const [query, setQuery] = useState('');

  const results = useMemo((): SearchResult[] => {
    if (!query.trim()) {
      return [];
    }

    const results: SearchResult[] = [];
    const lowerQuery = query.toLowerCase().trim();

    // Check for calculation
    if (isCalculation(query)) {
      const calcResult = evaluateExpression(query);
      if (calcResult) {
        results.push({
          id: 'calc-result',
          type: 'calc',
          title: calcResult,
          subtitle: `= ${query}`,
        });
      }
    }

    // Search through mock data
    const matchedItems = allMockData.filter(item =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.subtitle?.toLowerCase().includes(lowerQuery) ||
      item.path?.toLowerCase().includes(lowerQuery)
    );

    // Sort by relevance (exact match first, then starts with, then contains)
    matchedItems.sort((a, b) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();
      
      const aExact = aTitle === lowerQuery;
      const bExact = bTitle === lowerQuery;
      if (aExact !== bExact) return aExact ? -1 : 1;
      
      const aStarts = aTitle.startsWith(lowerQuery);
      const bStarts = bTitle.startsWith(lowerQuery);
      if (aStarts !== bStarts) return aStarts ? -1 : 1;
      
      return aTitle.localeCompare(bTitle);
    });

    results.push(...matchedItems.slice(0, settings.maxResults));

    // Add web search option if query is not empty
    if (query.trim().length > 0) {
      results.push({
        id: 'web-search',
        type: 'web',
        title: `Search "${query}" on ${settings.searchEngine}`,
        subtitle: 'Web Search',
        action: () => {
          const url = getSearchUrl(query, settings);
          window.open(url, '_blank');
        },
      });
    }

    return results;
  }, [query, settings]);

  const clearSearch = useCallback(() => {
    setQuery('');
  }, []);

  return {
    query,
    setQuery,
    results,
    clearSearch,
  };
}
