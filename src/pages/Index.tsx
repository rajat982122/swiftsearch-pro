import { useState } from 'react';
import { SpotlightSearch } from '@/components/SpotlightSearch';
import { useGlobalShortcut } from '@/hooks/useGlobalShortcut';
import { Command, Settings, Zap, Search, Calculator, Globe } from 'lucide-react';

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Listen for Right Ctrl key
  useGlobalShortcut('ControlRight', () => setIsOpen(true));
  
  // Also allow Ctrl+Space as alternative
  useGlobalShortcut('Space', () => setIsOpen(true), { ctrl: true });

  const features = [
    { icon: Search, title: 'Instant Search', desc: 'Find apps, files & folders instantly' },
    { icon: Calculator, title: 'Quick Calculate', desc: 'Type math expressions for instant results' },
    { icon: Globe, title: 'Web Search', desc: 'Search the web with your preferred engine' },
    { icon: Zap, title: 'Lightning Fast', desc: 'Optimized for speed and efficiency' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20">
            <Command className="w-10 h-10 text-primary-foreground" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Spotlight
            <span className="text-primary"> Search</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            A beautiful, fast search experience for Windows. 
            Find anything instantly.
          </p>
        </div>

        {/* Call to action */}
        <div className="space-y-4">
          <button
            onClick={() => setIsOpen(true)}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
          >
            <Search className="w-5 h-5" />
            Open Spotlight
          </button>
          
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              Press
              <kbd className="px-2 py-1 bg-secondary rounded-lg font-mono text-xs">
                Right Ctrl
              </kbd>
            </span>
            <span className="text-border">or</span>
            <span className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-secondary rounded-lg font-mono text-xs">
                Ctrl
              </kbd>
              +
              <kbd className="px-2 py-1 bg-secondary rounded-lg font-mono text-xs">
                Space
              </kbd>
            </span>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="p-4 rounded-xl bg-card border border-border/50 hover:border-border hover:bg-secondary/30 transition-all group"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <feature.icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-medium text-sm mb-1">{feature.title}</h3>
              <p className="text-xs text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Installation note */}
        <div className="pt-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm text-muted-foreground">
            <Settings className="w-4 h-4" />
            <span>Web Demo — Install as PWA for full experience</span>
          </div>
          <p className="text-xs text-muted-foreground/60">
            For native Windows features like startup launch and global shortcuts,<br />
            wrap this app with Electron or Tauri.
          </p>
        </div>
      </div>

      {/* Spotlight Modal */}
      <SpotlightSearch isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default Index;
