
import React from 'react';
import type { GeneratedImage } from '../types';
import { Icon } from './ui/Icon';

interface PosterBoardProps {
  images: GeneratedImage[];
  onRemove: (imageId: string) => void;
}

export const PosterBoard: React.FC<PosterBoardProps> = ({ images, onRemove }) => {
  return (
    <aside className="w-80 bg-white dark:bg-brand-secondary p-6 h-full shadow-lg flex flex-col">
      <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Poster Board</h2>
      {images.length === 0 ? (
        <div className="flex-grow flex items-center justify-center text-center text-slate-500">
          <p>Your favorite generations will appear here for comparison.</p>
        </div>
      ) : (
        <div className="flex-grow overflow-y-auto -mr-3 pr-3 space-y-4">
          {images.map(image => (
            <div key={image.id} className="relative group">
              <img src={image.imageUrl} alt="Saved generation" className="w-full rounded-lg object-cover" />
              <button 
                onClick={() => onRemove(image.id)}
                className="absolute top-2 right-2 p-1.5 bg-black bg-opacity-50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500">
                <Icon name="close" />
              </button>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
};
