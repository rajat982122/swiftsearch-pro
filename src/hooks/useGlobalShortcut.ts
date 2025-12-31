import { useEffect, useCallback } from 'react';

export function useGlobalShortcut(
  key: string,
  callback: () => void,
  options: { ctrl?: boolean; alt?: boolean; shift?: boolean } = {}
) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const keyMatch = event.key === key || event.code === key;
      const ctrlMatch = options.ctrl ? event.ctrlKey : true;
      const altMatch = options.alt ? event.altKey : true;
      const shiftMatch = options.shift ? event.shiftKey : true;

      // Check for right Ctrl specifically
      if (key === 'ControlRight' && event.code === 'ControlRight') {
        callback();
        return;
      }

      if (keyMatch && ctrlMatch && altMatch && shiftMatch) {
        event.preventDefault();
        callback();
      }
    },
    [key, callback, options.ctrl, options.alt, options.shift]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
