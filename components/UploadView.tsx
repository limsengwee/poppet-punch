import React from 'react';

interface UploadViewProps {
  onUploadClick: () => void;
  onCameraClick: () => void;
  isDetecting: boolean;
}

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>
);

const CameraIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.776 48.776 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
    </svg>
);

const LoadingSpinner = () => (
  <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-xl z-10">
    <svg className="animate-spin h-10 w-10 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <p className="mt-4 text-lg text-yellow-200">Detecting face...</p>
  </div>
);

export const UploadView: React.FC<UploadViewProps> = ({ onUploadClick, onCameraClick, isDetecting }) => {
  return (
    <div className="relative text-center p-8 bg-black/20 rounded-xl shadow-2xl backdrop-blur-sm border border-gray-700/50">
      {isDetecting && <LoadingSpinner />}
      <div style={{ visibility: isDetecting ? 'hidden' : 'visible' }}>
        <h2 className="text-4xl font-extrabold text-yellow-100 mb-2">上传你的小人</h2>
        <p className="text-gray-300 mb-8">上传照片或使用摄像头拍摄, 开始打小人吧!</p>
        <div className="space-y-4 max-w-sm mx-auto">
          <button
            onClick={onUploadClick}
            className="w-full flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105"
          >
            <UploadIcon />
            上传照片
          </button>
          <button
            onClick={onCameraClick}
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105"
          >
            <CameraIcon />
            使用摄像头
          </button>
        </div>
        <div className="mt-8 bg-green-900/50 border border-green-700 text-green-200 text-sm rounded-lg p-3 flex items-center justify-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>AI脸部识别已启用!</span>
          </div>
      </div>
    </div>
  );
};