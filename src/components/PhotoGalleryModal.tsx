import React, { useState } from 'react';

interface PhotoGalleryModalProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoGalleryModal: React.FC<PhotoGalleryModalProps> = ({
  images,
  isOpen,
  onClose
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full bg-[#111c2d] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between p-4 bg-black/40 text-white z-10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb77d] text-[20px]">photo_library</span>
            <span className="text-xs font-bold tracking-wider uppercase font-['Epilogue']">
              Gastronomic Photo Archive ({currentIndex + 1} of {images.length})
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Main Image View */}
        <div className="relative aspect-[16/10] w-full bg-black flex items-center justify-center">
          <img
            alt="Gastronomy detail"
            className="w-full h-full object-contain"
            src={currentImage}
            referrerPolicy="no-referrer"
          />

          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-transform hover:scale-110"
              >
                <span className="material-symbols-outlined text-[22px]">chevron_left</span>
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-transform hover:scale-110"
              >
                <span className="material-symbols-outlined text-[22px]">chevron_right</span>
              </button>
            </>
          )}
        </div>

        {/* Thumbnail selector */}
        {images.length > 1 && (
          <div className="p-3 bg-black/40 flex items-center justify-center gap-2 overflow-x-auto">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                  currentIndex === idx ? 'border-[#8d4b00] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img alt="Thumbnail" src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
