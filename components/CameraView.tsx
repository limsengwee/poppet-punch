
import React, { useRef, useEffect, useCallback, useState } from 'react';

interface CameraViewProps {
    onCapture: (dataUrl: string) => void;
    onBack: () => void;
}

export const CameraView: React.FC<CameraViewProps> = ({ onCapture, onBack }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mediaStream: MediaStream;
        const startCamera = async () => {
            try {
                mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
                setStream(mediaStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (err) {
                console.error("Error accessing camera: ", err);
                setError("Could not access the camera. Please check permissions and try again.");
            }
        };

        startCamera();

        return () => {
            if (mediaStream) {
                mediaStream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const handleCapture = useCallback(() => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                const dataUrl = canvas.toDataURL('image/jpeg');
                onCapture(dataUrl);
            }
        }
    }, [onCapture]);

    return (
        <div className="w-full max-w-2xl mx-auto p-4 bg-black/30 rounded-lg border border-red-700/50 flex flex-col items-center">
            {error ? (
                <div className="text-center text-red-400 p-8">
                    <p className="font-bold text-lg">Camera Error</p>
                    <p>{error}</p>
                </div>
            ) : (
                <video ref={videoRef} autoPlay playsInline muted className="rounded-md w-full aspect-video object-cover bg-gray-900"></video>
            )}
            <canvas ref={canvasRef} className="hidden"></canvas>
            <div className="flex items-center justify-center mt-4 space-x-4 w-full">
                <button 
                    onClick={onBack}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                >
                    Back
                </button>
                <button 
                    onClick={handleCapture}
                    disabled={!stream}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold p-4 rounded-full transition-colors disabled:bg-red-800 disabled:cursor-not-allowed"
                    aria-label="Capture photo"
                >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};
