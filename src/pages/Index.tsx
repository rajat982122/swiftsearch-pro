import { SpotlightSearch } from '@/components/SpotlightSearch';
import { InstallBanner } from '@/components/InstallBanner';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-[12vh] px-4">
      {/* Main search - always visible */}
      <SpotlightSearch />
      
      {/* Install hint at bottom */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
        <InstallBanner />
      </div>
    </div>
  );
};

export default Index;
