import React from 'react';
import { Restaurant } from '../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onSelect: (restaurant: Restaurant) => void;
  onReserve: (restaurant: Restaurant) => void;
  isSaved: boolean;
  onToggleSave: (restaurantId: string) => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onSelect,
  onReserve,
  isSaved,
  onToggleSave
}) => {
  return (
    <article className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 border border-[#dee8ff] group">
      {/* Visual Slot */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#e7eeff]">
        <img
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          src={restaurant.heroImage}
          referrerPolicy="no-referrer"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start pointer-events-none">
          <div className="flex gap-1.5 items-center flex-wrap">
            {restaurant.badges[0] && (
              <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-xs border border-white/20">
                <span className="material-symbols-outlined text-[#ffb77d] text-[13px] filled">stars</span>
                {restaurant.badges[0]}
              </span>
            )}
            <span className="px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md text-[#111c2d] text-[10px] font-bold shadow-xs border border-white/40">
              {restaurant.expenditureTier} · ₹{restaurant.avgPrice} avg
            </span>
          </div>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(restaurant.id);
            }}
            className="pointer-events-auto w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#554336] hover:text-[#8d4b00] shadow-sm transition-transform hover:scale-110 cursor-pointer"
            title={isSaved ? 'Remove from saved' : 'Save eatery'}
          >
            <span className={`material-symbols-outlined text-[17px] ${isSaved ? 'text-[#8d4b00] filled' : ''}`}>
              {isSaved ? 'bookmark' : 'bookmark_border'}
            </span>
          </button>
        </div>

        {/* Bottom Right Availability Badge */}
        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-[#8d4b00] text-white text-[10px] font-bold tracking-wide shadow-sm">
          {restaurant.availabilityBadge}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-2">
          {/* Kicker & Verified Badge */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold text-[#8d4b00] tracking-wider uppercase truncate">
              {restaurant.neighborhood} · {restaurant.cuisine}
            </span>
            <div className="flex items-center gap-1 text-[#006a60] text-[11px] font-bold shrink-0 bg-[#8cf5e4]/30 px-2 py-0.5 rounded-md">
              <span className="material-symbols-outlined text-[13px] filled">verified</span>
              <span>100% Bill-Matched</span>
            </div>
          </div>

          {/* Restaurant Title */}
          <h3
            onClick={() => onSelect(restaurant)}
            className="font-['Epilogue'] text-xl font-bold text-[#111c2d] hover:text-[#8d4b00] transition-colors cursor-pointer leading-snug"
          >
            {restaurant.name}
          </h3>

          {/* Rating Summary */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center text-[#8d4b00]">
              <span className="font-['Epilogue'] text-base font-bold mr-1">{restaurant.rating.toFixed(2)}</span>
              <span className="material-symbols-outlined text-[15px] filled">star</span>
            </div>
            <span className="text-xs text-[#554336]">
              ({restaurant.reviewCount.toLocaleString()} verified Bhubaneswar diners)
            </span>
          </div>

          {/* 3-Column Granular Attributes Breakdown */}
          <div className="grid grid-cols-3 gap-2 py-2 bg-[#f0f3ff] px-3 rounded-xl border border-[#dee8ff]">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase font-bold tracking-wider text-[#887364]">
                {restaurant.metrics.label1}
              </span>
              <span className="font-['Epilogue'] text-xs font-bold text-[#111c2d]">
                {restaurant.metrics.score1.toFixed(1)} / 5.0
              </span>
            </div>
            <div className="flex flex-col border-l border-[#dee8ff] pl-2">
              <span className="text-[9px] uppercase font-bold tracking-wider text-[#887364]">
                {restaurant.metrics.label2}
              </span>
              <span className="font-['Epilogue'] text-xs font-bold text-[#111c2d]">
                {restaurant.metrics.score2.toFixed(1)} / 5.0
              </span>
            </div>
            <div className="flex flex-col border-l border-[#dee8ff] pl-2">
              <span className="text-[9px] uppercase font-bold tracking-wider text-[#887364]">
                {restaurant.metrics.label3}
              </span>
              <span className="font-['Epilogue'] text-xs font-bold text-[#111c2d]">
                {restaurant.metrics.score3.toFixed(1)} / 5.0
              </span>
            </div>
          </div>

          {/* Verified Diner Review Snippet */}
          <div className="flex items-start gap-2.5 pt-1">
            <img
              alt={restaurant.featuredReviewQuote.authorName}
              className="w-7 h-7 rounded-full object-cover shrink-0 ring-1 ring-[#dee8ff]"
              src={restaurant.featuredReviewQuote.authorAvatar}
            />
            <p className="text-xs text-[#554336] italic line-clamp-2 leading-relaxed">
              &ldquo;{restaurant.featuredReviewQuote.quote}&rdquo;
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#dee8ff]">
          <button
            onClick={() => onReserve(restaurant)}
            className="flex-1 bg-[#8d4b00] hover:bg-[#b15f00] text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-colors text-center shadow-xs cursor-pointer"
          >
            Taste Thali / Reserve
          </button>
          <button
            onClick={() => onSelect(restaurant)}
            className="bg-[#f0f3ff] hover:bg-[#dee8ff] text-[#111c2d] text-xs font-bold py-2.5 px-4 rounded-xl transition-colors border border-[#dee8ff] cursor-pointer"
          >
            Explore Details
          </button>
        </div>
      </div>
    </article>
  );
};
