import React from 'react';
import type { Tool } from '../types';

interface GameViewProps {
  imageSrc: string | null;
  onPunch: (event: React.MouseEvent<HTMLDivElement>) => void;
  isLoading: boolean;
  tool: Tool;
}

const LoadingSpinner = () => (
  <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-lg z-20">
    <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <p className="mt-4 text-lg text-yellow-200">Applying AI magic...</p>
  </div>
);


export const GameView: React.FC<GameViewProps> = ({ imageSrc, onPunch, isLoading, tool }) => {
    
  const getCursorStyle = () => {
      switch(tool.id) {
          case 'palm': return 'cursor-grab';
          case 'mallet': return 'cursor-crosshair';
          default: return 'cursor-pointer';
      }
  }

  return (
    <div className="relative w-full flex items-center justify-center">
      {isLoading && <LoadingSpinner />}
      {imageSrc && (
        <div 
            className={`relative rounded-xl overflow-hidden shadow-2xl border-4 border-gray-700/50 w-full aspect-square ${getCursorStyle()}`}
            onClick={!isLoading ? onPunch : undefined}
            >
            <img 
                src={imageSrc} 
                alt="Poppet" 
                className="w-full h-full object-contain bg-black"
            />
        </div>
      )}
    </div>
  );
};