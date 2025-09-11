
import React from 'react';
import type { GeneratedImage } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Icon } from './ui/Icon';

interface MainContentProps {
  generatedImages: GeneratedImage[];
  isLoading: boolean;
  error: string | null;
  onAddToPosterBoard: (image: GeneratedImage) => void;
}

const WelcomeScreen: React.FC = () => (
    <div className="text-center flex flex-col items-center justify-center h-full text-slate-500">
        <div className="p-6 bg-slate-200 dark:bg-brand-secondary rounded-full mb-6">
            <Icon name="image" className="w-16 h-16 text-brand-accent" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Welcome to Influencer Studio</h2>
        <p className="max-w-md">Turn your product photos into professional ad campaigns. Use the panel on the left to get started.</p>
    </div>
);


export const MainContent: React.FC<MainContentProps> = ({ generatedImages, isLoading, error, onAddToPosterBoard }) => {
  const handleDownload = (imageUrl: string, id: string) => {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `influencer-studio-${id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };
    
  const renderContent = () => {
    if (isLoading) return null; // Loading state is handled by a global overlay in App.tsx

    if (error) {
      return (
        <div className="text-center m-auto text-red-500 bg-red-100 dark:bg-red-900/20 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Generation Failed</h3>
          <p>{error}</p>
        </div>
      );
    }

    if (generatedImages.length === 0) {
      return <WelcomeScreen />;
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
        {generatedImages.map((image) => (
          <Card key={image.id}>
            <img src={image.imageUrl} alt="Generated influencer" className="w-full object-cover rounded-t-lg aspect-[9/16]" />
            <div className="p-4">
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">{image.caption}</p>
              <p className="text-xs text-brand-muted font-mono">{image.hashtags}</p>
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex space-x-2">
                <Button onClick={() => onAddToPosterBoard(image)} variant="secondary" fullWidth>
                    <Icon name="bookmark" className="mr-2"/>
                    Save to Board
                </Button>
                <Button onClick={() => handleDownload(image.imageUrl, image.id)} variant="secondary" fullWidth>
                    <Icon name="download" className="mr-2"/>
                    Download
                </Button>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-grow">
          {renderContent()}
      </div>
    </div>
  );
};
