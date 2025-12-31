import { Download, CheckCircle2, Command } from 'lucide-react';
import { useInstallPrompt } from '@/hooks/useInstallPrompt';

export function InstallBanner() {
  const { isInstallable, isInstalled, install } = useInstallPrompt();

  if (isInstalled) {
    return (
      <div className="install-banner installed">
        <CheckCircle2 className="w-4 h-4 text-category-file" />
        <span>App installed! Use <kbd>Right Ctrl</kbd> or <kbd>Ctrl+Space</kbd> to search</span>
      </div>
    );
  }

  if (isInstallable) {
    return (
      <button onClick={install} className="install-banner installable">
        <Download className="w-4 h-4" />
        <span>Install Spotlight for quick access</span>
      </button>
    );
  }

  return (
    <div className="install-banner">
      <Command className="w-4 h-4 text-primary" />
      <span>
        Install: <span className="text-muted-foreground">Browser menu → "Install app" or "Add to Home Screen"</span>
      </span>
    </div>
  );
}
