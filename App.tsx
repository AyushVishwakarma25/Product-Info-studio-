
import React, { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';
import { PosterBoard } from './components/PosterBoard';
import type { GenerateImageParams, GeneratedImage } from './types';
import { generateInfluencerImage } from './services/geminiService';
import { Spinner } from './components/ui/Spinner';

const App: React.FC = () => {
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [posterBoard, setPosterBoard] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (params: GenerateImageParams) => {
    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);
    try {
      const results = await generateInfluencerImage(params);
      setGeneratedImages(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addToPosterBoard = useCallback((image: GeneratedImage) => {
    if (!posterBoard.some(item => item.id === image.id)) {
      setPosterBoard(prev => [...prev, image]);
    }
  }, [posterBoard]);

  const removeFromPosterBoard = useCallback((imageId: string) => {
    setPosterBoard(prev => prev.filter(item => item.id !== imageId));
  }, []);

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-brand-dark font-sans">
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50">
          <Spinner />
          <p className="text-white mt-4 text-lg">Generating your studio-quality photoshoot...</p>
          <p className="text-brand-muted mt-2 text-sm">This may take a moment. The AI is getting the lighting just right!</p>
        </div>
      )}
      <Sidebar onGenerate={handleGenerate} isLoading={isLoading} />
      <main className="flex-1 p-6 overflow-y-auto">
        <MainContent
          generatedImages={generatedImages}
          isLoading={isLoading}
          error={error}
          onAddToPosterBoard={addToPosterBoard}
        />
      </main>
      <PosterBoard images={posterBoard} onRemove={removeFromPosterBoard} />
    </div>
  );
};

export default App;
