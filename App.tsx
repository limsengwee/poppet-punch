import React, { useState, useCallback, useRef, MouseEvent } from 'react';
import type { Tool, FaceBounds } from './types';
import { AppState } from './types';
import { TOOLS, INITIAL_COINS, HIT_REWARD } from './constants';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { UploadView } from './components/UploadView';
import { GameView } from './components/GameView';
import { CameraView } from './components/CameraView';
import { detectFace } from './services/geminiService';

export default function App() {
  const [appState, setAppState] = useState<AppState>(AppState.UPLOADING);
  const [coins, setCoins] = useState(INITIAL_COINS);
  const [hitCount, setHitCount] = useState(0);
  const [selectedTool, setSelectedTool] = useState<Tool>(TOOLS[0]);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string | null>(null);
  const [originalImageSrc, setOriginalImageSrc] = useState<string | null>(null);
  const [strength, setStrength] = useState(50);
  const [faceBounds, setFaceBounds] = useState<FaceBounds | null>(null);


  const fileInputRef = useRef<HTMLInputElement>(null);

  const detectAndSetImage = async (imageDataUrl: string, mimeType: string) => {
    setAppState(AppState.DETECTING);
    const base64Data = imageDataUrl.split(',')[1];
    const bounds = await detectFace(base64Data, mimeType);

    if (bounds) {
      setImageSrc(imageDataUrl);
      setOriginalImageSrc(imageDataUrl); 
      setImageMimeType(mimeType);
      setFaceBounds(bounds);
      setAppState(AppState.PLAYING);
    } else {
      alert("No face detected in the image. Please upload a different photo.");
      setAppState(AppState.UPLOADING);
    }
  };

  const processImage = (dataUrl: string, mimeType: string) => {
    const img = new Image();
    img.onload = () => {
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
            if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
            }
        } else {
            if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
            }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, width, height);
        const resizedDataUrl = canvas.toDataURL(mimeType);
        
        detectAndSetImage(resizedDataUrl, mimeType);
    };
    img.src = dataUrl;
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      processImage(result, file.type);
    };
    reader.readAsDataURL(file);
  };

  const handleImageCapture = (dataUrl: string) => {
    processImage(dataUrl, 'image/jpeg');
  }

  const handleRestart = useCallback(() => {
    setAppState(AppState.UPLOADING);
    setImageSrc(null);
    setOriginalImageSrc(null);
    setFaceBounds(null);
    setHitCount(0);
  }, []);

  const handleToolSelect = useCallback((tool: Tool) => {
    setSelectedTool(tool);
  }, []);

  const handleStrengthChange = (newStrength: number) => {
    setStrength(newStrength);
  };

  const handleResetEffects = () => {
    setImageSrc(originalImageSrc);
  };

  const handlePunch = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (selectedTool.id !== 'palm') {
      alert("Only the 'Palm' tool has a non-AI effect. Please select the 'Palm' tool to slap the face.");
      return;
    }
    if (!imageSrc || !imageMimeType) return;

    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    
    // Account for border width. getBoundingClientRect() includes the border,
    // but the subsequent offset calculations are based on clientWidth, which does not.
    // This ensures click coordinates are relative to the content area.
    const borderWidth = (target.offsetWidth - target.clientWidth) / 2;

    const clickX = event.clientX - rect.left - borderWidth;
    const clickY = event.clientY - rect.top - borderWidth;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const { naturalWidth, naturalHeight } = img;
      const { clientWidth, clientHeight } = target;

      const scale = Math.min(clientWidth / naturalWidth, clientHeight / naturalHeight);
      const displayedWidth = naturalWidth * scale;
      const displayedHeight = naturalHeight * scale;
      const offsetX = (clientWidth - displayedWidth) / 2;
      const offsetY = (clientHeight - displayedHeight) / 2;
      
      // Prevent clicks on the black bars if the image is not the same aspect ratio as the container
      if (clickX < offsetX || clickX > offsetX + displayedWidth || clickY < offsetY || clickY > offsetY + displayedHeight) {
        return;
      }

      const imgX = (clickX - offsetX) / scale;
      const imgY = (clickY - offsetY) / scale;

      // Restrict slap area to the detected face bounds
      if (!faceBounds || imgX < faceBounds.x || imgX > faceBounds.x + faceBounds.width || imgY < faceBounds.y || imgY > faceBounds.y + faceBounds.height) {
        return;
      }

      const canvas = document.createElement('canvas');
      canvas.width = naturalWidth;
      canvas.height = naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      ctx.drawImage(img, 0, 0);

      // Create a more natural, diffuse effect that blends with the skin.
      const baseRadius = Math.min(naturalWidth, naturalHeight) * 0.1; // Larger base for a more diffuse area
      const radius = baseRadius * (0.7 + (strength / 100) * 0.8);
      // Recalibrated opacity to be more visible at lower strength values.
      const opacity = 0.15 + (strength / 100) * 0.25;

      const gradient = ctx.createRadialGradient(imgX, imgY, 0, imgX, imgY, radius);
      const slapColor = `rgba(220, 40, 40, ${opacity})`;
      const transparentColor = 'rgba(220, 40, 40, 0)';

      gradient.addColorStop(0, slapColor);
      gradient.addColorStop(0.4, slapColor); // Larger solid center for a less "perfect circle" look
      gradient.addColorStop(1, transparentColor); // Fade to transparent

      // 'overlay' provides a more natural blend with skin tones than 'hard-light'.
      ctx.globalCompositeOperation = 'overlay';
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(imgX, imgY, radius, 0, 2 * Math.PI);
      ctx.fill();
      
      ctx.globalCompositeOperation = 'source-over'; // Reset for subsequent draws

      const newDataUrl = canvas.toDataURL(imageMimeType);
      setImageSrc(newDataUrl);
      setHitCount(prev => prev + 1);
      setCoins(prev => prev + HIT_REWARD);
    };
    img.src = imageSrc;
  }, [imageSrc, imageMimeType, selectedTool, strength, faceBounds]);
  
  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const renderMainContent = () => {
    switch(appState) {
      case AppState.UPLOADING:
      case AppState.DETECTING:
        return (
          <UploadView 
            onUploadClick={triggerFileUpload} 
            onCameraClick={() => setAppState(AppState.CAPTURING)} 
            isDetecting={appState === AppState.DETECTING}
          />
        );
      case AppState.CAPTURING:
        return <CameraView onCapture={handleImageCapture} onBack={() => setAppState(AppState.UPLOADING)} />;
      case AppState.PLAYING:
      case AppState.LOADING:
        return (
          <GameView 
            imageSrc={imageSrc} 
            onPunch={handlePunch}
            isLoading={appState === AppState.LOADING}
            tool={selectedTool}
          />
        );
      default:
        return null;
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1b4b] via-[#111827] to-black text-white font-sans">
      <Header coins={coins} />
      <main className="flex flex-col md:flex-row p-4 md:p-8 gap-8">
        <div className="flex-grow flex items-center justify-center rounded-lg">
          {renderMainContent()}
        </div>
        <Sidebar 
          hitCount={hitCount}
          coins={coins}
          selectedTool={selectedTool}
          onToolSelect={handleToolSelect}
          onRestart={handleRestart}
          strength={strength}
          onStrengthChange={handleStrengthChange}
          onResetEffects={handleResetEffects}
        />
      </main>
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleImageUpload(e.target.files[0]);
          }
        }}
      />
    </div>
  );
}