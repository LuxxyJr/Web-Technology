import React, { useState } from 'react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  savedCount: number;
  onOpenBookmarks: () => void;
  onResetToHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  selectedCity,
  setSelectedCity,
  savedCount,
  onOpenBookmarks,
  onResetToHome
}) => {
  const [showCityMenu, setShowCityMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const cities = [
    'Bhubaneswar, Odisha',
    'Cuttack Heritage Belt',
    'Puri Jagannath Kshetra',
    'Chilika Coastal Lagoon'
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f9f9ff]/95 backdrop-blur-md border-b border-[#dee8ff]">
      <div className="h-18 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand & Desktop Navigation */}
        <div className="flex items-center gap-8 shrink-0">
          <button
            onClick={onResetToHome}
            className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
            title="TasteIndex Bhubaneswar - Curated Odia Gastronomy"
          >
            <div className="w-8 h-8 rounded-lg bg-[#8d4b00] text-white flex items-center justify-center font-['Epilogue'] font-bold text-lg shadow-xs group-hover:scale-105 transition-transform">
              T
            </div>
            <div>
              <span className="font-['Epilogue'] text-lg font-bold text-[#111c2d] tracking-tight block leading-none">
                TasteIndex
              </span>
              <span className="text-[10px] uppercase font-bold text-[#8d4b00] tracking-widest block mt-0.5">
                Bhubaneswar
              </span>
            </div>
          </button>

          <nav className="hidden xl:flex items-center gap-1 text-xs font-bold">
            <button
              onClick={() => { setActiveTab('discover'); onResetToHome(); }}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'discover'
                  ? 'bg-[#8d4b00] text-white shadow-xs'
                  : 'text-[#554336] hover:text-[#111c2d] hover:bg-[#dee8ff]/50'
              }`}
            >
              Curated Index
            </button>
            <button
              onClick={() => setActiveTab('top-rated')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'top-rated'
                  ? 'bg-[#8d4b00] text-white shadow-xs'
                  : 'text-[#554336] hover:text-[#111c2d] hover:bg-[#dee8ff]/50'
              }`}
            >
              Top Rated (4.8★+)
            </button>
            <button
              onClick={() => setActiveTab('verified-reviews')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'verified-reviews'
                  ? 'bg-[#8d4b00] text-white shadow-xs'
                  : 'text-[#554336] hover:text-[#111c2d] hover:bg-[#dee8ff]/50'
              }`}
            >
              Verified Reviews
            </button>
            <button
              onClick={() => setActiveTab('price-guides')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'price-guides'
                  ? 'bg-[#8d4b00] text-white shadow-xs'
                  : 'text-[#554336] hover:text-[#111c2d] hover:bg-[#dee8ff]/50'
              }`}
            >
              Dining Economics
            </button>
            <button
              onClick={() => setActiveTab('collections')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'collections'
                  ? 'bg-[#8d4b00] text-white shadow-xs'
                  : 'text-[#554336] hover:text-[#111c2d] hover:bg-[#dee8ff]/50'
              }`}
            >
              Heritage Collections
            </button>
          </nav>
        </div>

        {/* Minimalist Search Bar with City Selector */}
        <div className="flex-1 max-w-md hidden md:flex items-center bg-white border border-[#dee8ff] rounded-xl px-3 py-2 shadow-xs focus-within:border-[#8d4b00]">
          <span className="material-symbols-outlined text-[#887364] text-[18px] mr-2">search</span>
          <input
            className="bg-transparent w-full text-[#111c2d] placeholder:text-[#887364] text-xs focus:outline-none"
            placeholder="Search Dalma, Mutton Kassa, Chilika Crab, Chhena Poda..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-0.5 hover:text-[#a83223] text-[#887364] cursor-pointer"
              title="Clear search"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}

          <div className="h-4 w-[1px] bg-[#dee8ff] mx-2"></div>

          {/* City Selector */}
          <div className="relative">
            <button
              onClick={() => setShowCityMenu(!showCityMenu)}
              className="flex items-center gap-1 text-[#554336] shrink-0 cursor-pointer hover:text-[#111c2d] text-xs font-bold whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[#8d4b00] text-[16px]">location_on</span>
              <span className="max-w-[130px] truncate">{selectedCity.split(',')[0]}</span>
              <span className="material-symbols-outlined text-[#887364] text-[14px]">expand_more</span>
            </button>

            {showCityMenu && (
              <div className="absolute right-0 top-8 mt-2 w-52 bg-white border border-[#dee8ff] rounded-xl shadow-xl py-2 z-50">
                <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-[#887364]">
                  Odishan Gastronomy Region
                </div>
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setShowCityMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#f0f3ff] transition-colors flex items-center justify-between ${
                      selectedCity === city ? 'font-bold text-[#8d4b00] bg-[#f0f3ff]' : 'text-[#111c2d]'
                    }`}
                  >
                    <span>{city}</span>
                    {selectedCity === city && (
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Saved Bookmarks */}
          <button
            onClick={onOpenBookmarks}
            aria-label="Saved Bookmarks"
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-[#dee8ff] text-[#554336] hover:text-[#8d4b00] hover:border-[#8d4b00] transition-colors relative cursor-pointer"
            title="Saved Eateries"
          >
            <span className="material-symbols-outlined text-[18px]">bookmark</span>
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#8d4b00] text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                {savedCount}
              </span>
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-[#dee8ff] text-[#554336] hover:text-[#8d4b00] hover:border-[#8d4b00] transition-colors relative cursor-pointer"
              title="Daily Food Bulletins"
            >
              <span className="material-symbols-outlined text-[18px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#8d4b00]"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-11 w-72 bg-white border border-[#dee8ff] rounded-xl shadow-xl p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-[#dee8ff]">
                  <span className="font-['Epilogue'] text-xs font-bold text-[#111c2d]">Bhubaneswar Food Updates</span>
                  <span className="text-[9px] font-bold text-[#006a60] bg-[#8cf5e4]/40 px-1.5 py-0.5 rounded">Live</span>
                </div>
                <div className="space-y-2 pt-2 text-xs">
                  <div className="p-2 bg-[#f0f3ff] rounded-lg">
                    <p className="font-bold text-[#111c2d]">Fresh Chilika Crab Arrival</p>
                    <p className="text-[#554336] text-[11px]">Odisha Hotel received morning catch of live mud crabs.</p>
                  </div>
                  <div className="p-2 bg-[#f0f3ff] rounded-lg">
                    <p className="font-bold text-[#111c2d]">Hot Handi Mutton Ready</p>
                    <p className="text-[#554336] text-[11px]">Zaika clay pots opened at 12:30 PM &amp; 7:30 PM.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 cursor-pointer focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-[#8d4b00] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                SS
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-bold text-[#111c2d] leading-none">Sanchit Singh</span>
                <span className="text-[10px] text-[#8d4b00] font-bold uppercase tracking-wider mt-0.5">Bhubaneswar Diner</span>
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 top-11 w-52 bg-white border border-[#dee8ff] rounded-xl shadow-xl py-2 z-50 text-xs">
                <div className="px-3 py-1.5 border-b border-[#dee8ff]">
                  <p className="font-bold text-[#111c2d]">Sanchit Singh</p>
                  <p className="text-[10px] text-[#887364]">Verified Bhubaneswar Diner</p>
                </div>
                <button
                  onClick={() => { setActiveTab('verified-reviews'); setShowProfileMenu(false); }}
                  className="w-full text-left px-3 py-2 text-[#111c2d] hover:bg-[#f0f3ff] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">rate_review</span>
                  <span>Community Reviews</span>
                </button>
                <button
                  onClick={() => { onOpenBookmarks(); setShowProfileMenu(false); }}
                  className="w-full text-left px-3 py-2 text-[#111c2d] hover:bg-[#f0f3ff] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">bookmark</span>
                  <span>My Saved Eateries ({savedCount})</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <button
            onClick={() => setShowMobileNav(!showMobileNav)}
            className="xl:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-[#dee8ff] text-[#111c2d]"
          >
            <span className="material-symbols-outlined text-[20px]">{showMobileNav ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {showMobileNav && (
        <div className="xl:hidden border-t border-[#dee8ff] bg-white px-4 py-3 space-y-2">
          <input
            className="w-full bg-[#f0f3ff] border border-[#dee8ff] rounded-lg px-3 py-2 text-xs text-[#111c2d] focus:outline-none"
            placeholder="Search Dalma, Mutton, Seafood..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
            <button
              onClick={() => { setActiveTab('discover'); onResetToHome(); setShowMobileNav(false); }}
              className={`p-2 rounded-lg font-bold text-center ${activeTab === 'discover' ? 'bg-[#8d4b00] text-white' : 'bg-[#f0f3ff]'}`}
            >
              Curated Index
            </button>
            <button
              onClick={() => { setActiveTab('top-rated'); setShowMobileNav(false); }}
              className={`p-2 rounded-lg font-bold text-center ${activeTab === 'top-rated' ? 'bg-[#8d4b00] text-white' : 'bg-[#f0f3ff]'}`}
            >
              Top Rated
            </button>
            <button
              onClick={() => { setActiveTab('verified-reviews'); setShowMobileNav(false); }}
              className={`p-2 rounded-lg font-bold text-center ${activeTab === 'verified-reviews' ? 'bg-[#8d4b00] text-white' : 'bg-[#f0f3ff]'}`}
            >
              Verified Reviews
            </button>
            <button
              onClick={() => { setActiveTab('price-guides'); setShowMobileNav(false); }}
              className={`p-2 rounded-lg font-bold text-center ${activeTab === 'price-guides' ? 'bg-[#8d4b00] text-white' : 'bg-[#f0f3ff]'}`}
            >
              Pricing Guide
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
