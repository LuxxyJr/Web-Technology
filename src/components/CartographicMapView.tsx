import React, { useState } from 'react';
import { Restaurant } from '../types';

interface CartographicMapViewProps {
  restaurants: Restaurant[];
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onReserveRestaurant: (restaurant: Restaurant) => void;
  onClose?: () => void;
  isSplitView?: boolean;
}

export const CartographicMapView: React.FC<CartographicMapViewProps> = ({
  restaurants,
  onSelectRestaurant,
  onReserveRestaurant,
  onClose,
  isSplitView = false
}) => {
  const [activePin, setActivePin] = useState<Restaurant | null>(restaurants[0] || null);

  // Bhubaneswar coordinate boundary
  // Lat: 20.25 to 20.37, Lng: 85.80 to 85.88
  const getCoordinatesPct = (lat: number, lng: number) => {
    const minLat = 20.25;
    const maxLat = 20.37;
    const minLng = 85.80;
    const maxLng = 85.88;

    const y = 100 - ((lat - minLat) / (maxLat - minLat)) * 100;
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    return {
      top: `${Math.min(Math.max(y, 12), 88)}%`,
      left: `${Math.min(Math.max(x, 10), 90)}%`
    };
  };

  return (
    <div className={`relative bg-[#f0f3ff] rounded-2xl overflow-hidden border border-[#dee8ff] ${isSplitView ? 'h-[520px]' : 'h-[560px]'}`}>
      {/* Map visual background with Bhubaneswar city outline styling */}
      <div className="absolute inset-0 bg-[#e7eeff]/60">
        <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8d4b00" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Major Bhubaneswar arterials indication */}
        <div className="absolute top-1/4 left-0 right-0 h-1 bg-[#8d4b00]/15 transform -rotate-6"></div>
        <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-[#8d4b00]/15 transform rotate-12"></div>
      </div>

      {/* Floating Header */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
        <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-md border border-[#dee8ff] pointer-events-auto flex items-center gap-2">
          <span className="material-symbols-outlined text-[#8d4b00] text-[18px]">explore</span>
          <div>
            <span className="font-['Epilogue'] text-xs font-bold text-[#111c2d] block leading-none">
              Bhubaneswar Cartographic Gastronomy Map
            </span>
            <span className="text-[10px] text-[#554336]">
              {restaurants.length} Authentic Odishan Eateries Plotted
            </span>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white shadow-md text-[#111c2d] hover:bg-[#dee8ff] transition-colors flex items-center justify-center pointer-events-auto cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        )}
      </div>

      {/* Interactive Map Pins */}
      <div className="absolute inset-0 z-10">
        {restaurants.map((rest) => {
          const coords = getCoordinatesPct(rest.lat, rest.lng);
          const isSelected = activePin?.id === rest.id;

          return (
            <div
              key={rest.id}
              style={{ top: coords.top, left: coords.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-125 z-20"
              onClick={() => setActivePin(rest)}
            >
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-lg transition-all ${
                  isSelected
                    ? 'bg-[#8d4b00] text-white scale-110 ring-4 ring-[#ffdcc3]'
                    : 'bg-white text-[#111c2d] border border-[#dee8ff] hover:bg-[#f0f3ff]'
                }`}
              >
                <span className={`material-symbols-outlined text-[14px] ${isSelected ? 'text-white' : 'text-[#8d4b00]'}`}>
                  restaurant
                </span>
                <span className="text-xs font-bold whitespace-nowrap">
                  {rest.name.split(' ')[0]}
                </span>
                <span className="text-[10px] font-mono opacity-80 font-bold">
                  {rest.expenditureTier}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Restaurant Floating Sheet */}
      {activePin && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:w-96 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#dee8ff] z-30 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex gap-3">
            <img
              alt={activePin.name}
              src={activePin.heroImage}
              className="w-18 h-18 rounded-xl object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] font-bold text-[#8d4b00] uppercase truncate">
                  {activePin.neighborhood}
                </span>
                <span className="text-xs font-bold text-[#111c2d] flex items-center">
                  ★ {activePin.rating.toFixed(2)}
                </span>
              </div>
              <h4 className="font-['Epilogue'] text-sm font-bold text-[#111c2d] truncate">
                {activePin.name}
              </h4>
              <p className="text-[11px] text-[#554336] truncate">
                {activePin.cuisine} · {activePin.expenditureTier} (₹{activePin.avgPrice} avg)
              </p>
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => onSelectRestaurant(activePin)}
                  className="flex-1 bg-[#8d4b00] hover:bg-[#b15f00] text-white text-[11px] font-bold py-1.5 px-3 rounded-lg transition-colors text-center cursor-pointer"
                >
                  Explore Audit
                </button>
                <button
                  onClick={() => onReserveRestaurant(activePin)}
                  className="bg-[#f0f3ff] hover:bg-[#dee8ff] text-[#111c2d] text-[11px] font-bold py-1.5 px-3 rounded-lg transition-colors border border-[#dee8ff] cursor-pointer"
                >
                  Reserve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
