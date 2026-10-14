import React from 'react';
import { ExpenditureTier, FilterState, Restaurant } from '../types';
import { BHUBANESWAR_NEIGHBORHOODS, CUISINE_TYPES, SENTIMENT_TAGS_LIST } from '../data/restaurants';

interface SegmentationSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  restaurants: Restaurant[];
  onReset: () => void;
}

export const SegmentationSidebar: React.FC<SegmentationSidebarProps> = ({
  filters,
  setFilters,
  restaurants,
  onReset
}) => {
  const handleTierToggle = (tier: ExpenditureTier) => {
    setFilters(prev => {
      const exists = prev.tiers.includes(tier);
      const newTiers = exists ? prev.tiers.filter(t => t !== tier) : [...prev.tiers, tier];
      return {
        ...prev,
        tiers: newTiers.length > 0 ? newTiers : [tier]
      };
    });
  };

  const handleTagToggle = (tag: string) => {
    setFilters(prev => {
      const exists = prev.sentimentTags.includes(tag);
      return {
        ...prev,
        sentimentTags: exists
          ? prev.sentimentTags.filter(t => t !== tag)
          : [...prev.sentimentTags, tag]
      };
    });
  };

  const getNeighborhoodCount = (nh: string) => {
    if (nh === 'All Neighbourhoods') return restaurants.length;
    return restaurants.filter(r => r.neighborhood.toLowerCase().includes(nh.toLowerCase())).length;
  };

  const getCuisineCount = (cu: string) => {
    if (cu === 'All Cuisines') return restaurants.length;
    return restaurants.filter(r => r.cuisine.toLowerCase().includes(cu.toLowerCase()) || cu.toLowerCase().includes(r.cuisine.toLowerCase())).length;
  };

  return (
    <aside className="w-full flex flex-col gap-5 bg-white p-5 rounded-2xl border border-[#dee8ff] shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#dee8ff]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#8d4b00] text-[18px]">tune</span>
          <span className="font-['Epilogue'] text-base font-bold text-[#111c2d]">
            Filter &amp; Explore
          </span>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-bold text-[#8d4b00] hover:underline cursor-pointer"
        >
          Reset All
        </button>
      </div>

      {/* 1. NEIGHBOURHOOD FILTER */}
      <div className="space-y-2">
        <label className="text-[11px] uppercase font-bold tracking-wider text-[#887364] flex items-center justify-between">
          <span>Bhubaneswar Neighbourhood</span>
          <span className="text-[#8d4b00] text-[10px]">Select Area</span>
        </label>
        <div className="space-y-1">
          {BHUBANESWAR_NEIGHBORHOODS.map(nh => {
            const isSelected = filters.neighborhood === nh;
            const count = getNeighborhoodCount(nh);
            return (
              <button
                key={nh}
                type="button"
                onClick={() => setFilters(prev => ({ ...prev, neighborhood: nh }))}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer text-left ${
                  isSelected
                    ? 'bg-[#8d4b00] text-white font-bold shadow-xs'
                    : 'text-[#111c2d] hover:bg-[#f0f3ff]'
                }`}
              >
                <span>{nh}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                  isSelected ? 'bg-white/20 text-white' : 'text-[#887364]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. CUISINE TYPE FILTER */}
      <div className="space-y-2 pt-3 border-t border-[#dee8ff]">
        <label className="text-[11px] uppercase font-bold tracking-wider text-[#887364] block">
          Odia Culinary Tradition
        </label>
        <div className="space-y-1">
          {CUISINE_TYPES.map(cuisine => {
            const isSelected = filters.cuisine === cuisine;
            const count = getCuisineCount(cuisine);
            return (
              <button
                key={cuisine}
                type="button"
                onClick={() => setFilters(prev => ({ ...prev, cuisine: isSelected ? 'All Cuisines' : cuisine }))}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer text-left ${
                  isSelected
                    ? 'bg-[#8d4b00] text-white font-bold shadow-xs'
                    : 'text-[#111c2d] hover:bg-[#f0f3ff]'
                }`}
              >
                <span className="truncate">{cuisine}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold shrink-0 ${
                  isSelected ? 'bg-white/20 text-white' : 'text-[#887364]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. EXPENDITURE TIER (INR ₹) */}
      <div className="space-y-2 pt-3 border-t border-[#dee8ff]">
        <div className="flex items-center justify-between">
          <label className="text-[11px] uppercase font-bold tracking-wider text-[#887364]">
            Expenditure Tier (INR)
          </label>
          <span className="text-[10px] text-[#006a60] font-bold">Per Person</span>
        </div>

        <div className="grid grid-cols-4 gap-1.5">
          {(['₹', '₹₹', '₹₹₹', '₹₹₹₹'] as ExpenditureTier[]).map(tier => {
            const isSelected = filters.tiers.includes(tier);
            const label = tier === '₹' ? '<₹250' : tier === '₹₹' ? '₹250-600' : tier === '₹₹₹' ? '₹600-1200' : '₹1200+';
            return (
              <button
                key={tier}
                type="button"
                onClick={() => handleTierToggle(tier)}
                className={`flex flex-col items-center py-2 px-1 rounded-xl transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#8d4b00] text-white shadow-xs font-bold'
                    : 'bg-[#f0f3ff] text-[#111c2d] hover:bg-[#dee8ff]'
                }`}
              >
                <span className="text-xs font-bold leading-none">{tier}</span>
                <span className={`text-[9px] mt-1 ${isSelected ? 'text-white/90' : 'text-[#554336]'}`}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. VERIFIED BILL-MATCH TOGGLE */}
      <div className="pt-3 border-t border-[#dee8ff]">
        <div className="flex items-center justify-between p-3 bg-[#8cf5e4]/20 rounded-xl border border-[#8cf5e4]/50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006a60] text-[18px] filled">verified</span>
            <div>
              <div className="text-xs font-bold text-[#111c2d]">Verified Diners Only</div>
              <div className="text-[10px] text-[#554336]">Backed by genuine receipts</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setFilters(prev => ({ ...prev, verifiedOnly: !prev.verifiedOnly }))}
            className={`w-10 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${
              filters.verifiedOnly ? 'bg-[#006a60]' : 'bg-[#d8e3fb]'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                filters.verifiedOnly ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* 5. ODIA SENTIMENT TAGS */}
      <div className="space-y-2 pt-3 border-t border-[#dee8ff]">
        <label className="text-[11px] uppercase font-bold tracking-wider text-[#887364] block">
          Epicurean Sentiment Highlights
        </label>
        <div className="flex flex-wrap gap-1.5">
          {SENTIMENT_TAGS_LIST.map(tag => {
            const isSelected = filters.sentimentTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagToggle(tag)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#263143] text-white font-bold'
                    : 'bg-[#f0f3ff] text-[#554336] hover:bg-[#dee8ff]'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
