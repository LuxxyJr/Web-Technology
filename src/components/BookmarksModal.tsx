import React from 'react';
import { Restaurant } from '../types';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedRestaurants: Restaurant[];
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onRemoveBookmark: (restaurantId: string) => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  savedRestaurants,
  onSelectRestaurant,
  onRemoveBookmark
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#dee8ff]">
        <div className="bg-[#f0f3ff] px-6 py-4 border-b border-[#dee8ff] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#8d4b00] filled">bookmark</span>
            <div>
              <h3 className="font-['Epilogue'] text-base font-bold text-[#111c2d]">
                Saved Epicurean Index
              </h3>
              <p className="text-[11px] text-[#554336]">
                {savedRestaurants.length} local restaurants bookmarked for your itinerary
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#554336] hover:text-[#111c2d] hover:bg-[#e7eeff] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-3">
          {savedRestaurants.length === 0 ? (
            <div className="text-center py-8 space-y-2">
              <span className="material-symbols-outlined text-[#887364] text-[36px]">bookmark_border</span>
              <p className="text-xs font-bold text-[#111c2d]">No saved restaurants yet.</p>
              <p className="text-[11px] text-[#554336]">
                Click the bookmark icon on any card to save restaurants to your personal list.
              </p>
            </div>
          ) : (
            savedRestaurants.map((rest) => (
              <div
                key={rest.id}
                className="flex items-center justify-between gap-3 p-3 rounded-xl border border-[#dee8ff] hover:bg-[#f0f3ff]/50 transition-colors"
              >
                <div
                  onClick={() => { onSelectRestaurant(rest); onClose(); }}
                  className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                >
                  <img
                    alt={rest.name}
                    src={rest.heroImage}
                    className="w-14 h-14 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-['Epilogue'] text-xs font-bold text-[#111c2d] truncate hover:text-[#8d4b00]">
                      {rest.name}
                    </h4>
                    <p className="text-[11px] text-[#554336] truncate">
                      {rest.neighborhood} · {rest.cuisine}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-[#887364] font-medium pt-0.5">
                      <span>★ {rest.rating.toFixed(2)}</span>
                      <span>•</span>
                      <span>{rest.expenditureTier} (₹{rest.avgPrice} avg)</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveBookmark(rest.id)}
                  className="w-8 h-8 rounded-full text-[#a83223] hover:bg-[#ffdad4]/50 flex items-center justify-center transition-colors shrink-0"
                  title="Remove bookmark"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
