/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { FilterState, Restaurant, ReviewItem } from './types';
import { INITIAL_RESTAURANTS, OCCASIONS_LIST } from './data/restaurants';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SegmentationSidebar } from './components/SegmentationSidebar';
import { RestaurantCard } from './components/RestaurantCard';
import { RestaurantDetailView } from './components/RestaurantDetailView';
import { WriteReviewModal } from './components/WriteReviewModal';
import { ReservationModal } from './components/ReservationModal';
import { PhotoGalleryModal } from './components/PhotoGalleryModal';
import { CartographicMapView } from './components/CartographicMapView';
import { BookmarksModal } from './components/BookmarksModal';
import { PriceGuidesView } from './components/PriceGuidesView';
import { CollectionsView } from './components/CollectionsView';
import { VerifiedReviewsFeed } from './components/VerifiedReviewsFeed';

export default function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(INITIAL_RESTAURANTS);
  const [activeTab, setActiveTab] = useState<string>('discover');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  // Modals state
  const [reviewModalRestaurant, setReviewModalRestaurant] = useState<Restaurant | null>(null);
  const [reservationModalRestaurant, setReservationModalRestaurant] = useState<Restaurant | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[] | null>(null);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [savedRestaurantIds, setSavedRestaurantIds] = useState<string[]>(['kanika-mayfair', 'dalma-saheed-nagar']);
  const [selectedCity, setSelectedCity] = useState<string>('Bhubaneswar, Odisha');
  const [isSplitMapView, setIsSplitMapView] = useState<boolean>(false);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 6;

  // Filter state for Bhubaneswar
  const initialFilters: FilterState = {
    searchQuery: '',
    neighborhood: 'All Neighbourhoods',
    cuisine: 'All Cuisines',
    tiers: ['₹', '₹₹', '₹₹₹', '₹₹₹₹'],
    minPrice: 100,
    maxPrice: 1600,
    minRating: 0,
    verifiedOnly: false,
    reviewVolume: [],
    sentimentTags: [],
    occasion: 'All Occasions',
    sortBy: 'highest-rated'
  };

  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const handleResetFilters = () => {
    setFilters(initialFilters);
    setCurrentPage(1);
  };

  // Toggle saved bookmark
  const handleToggleSave = (restaurantId: string) => {
    setSavedRestaurantIds(prev =>
      prev.includes(restaurantId)
        ? prev.filter(id => id !== restaurantId)
        : [...prev, restaurantId]
    );
  };

  // Submit User Review handler
  const handleAddReview = (restaurantId: string, newReview: ReviewItem) => {
    setRestaurants(prev =>
      prev.map(rest => {
        if (rest.id !== restaurantId) return rest;
        const updatedReviews = [newReview, ...rest.reviews];
        const newRating =
          (rest.rating * rest.reviewCount + newReview.rating) / (rest.reviewCount + 1);
        return {
          ...rest,
          rating: Number(newRating.toFixed(2)),
          reviewCount: rest.reviewCount + 1,
          reviews: updatedReviews
        };
      })
    );

    if (selectedRestaurant?.id === restaurantId) {
      setSelectedRestaurant(prev => {
        if (!prev) return null;
        const updatedReviews = [newReview, ...prev.reviews];
        const newRating =
          (prev.rating * prev.reviewCount + newReview.rating) / (prev.reviewCount + 1);
        return {
          ...prev,
          rating: Number(newRating.toFixed(2)),
          reviewCount: prev.reviewCount + 1,
          reviews: updatedReviews
        };
      });
    }
  };

  // Helpful vote handler
  const handleToggleHelpful = (restaurantId: string, reviewId: string) => {
    setRestaurants(prev =>
      prev.map(rest => {
        if (rest.id !== restaurantId) return rest;
        return {
          ...rest,
          reviews: rest.reviews.map(rev => {
            if (rev.id !== reviewId) return rev;
            const userVoted = !rev.userVotedHelpful;
            return {
              ...rev,
              helpfulCount: userVoted ? rev.helpfulCount + 1 : rev.helpfulCount - 1,
              userVotedHelpful: userVoted
            };
          })
        };
      })
    );

    setSelectedRestaurant(prev => {
      if (!prev || prev.id !== restaurantId) return prev;
      return {
        ...prev,
        reviews: prev.reviews.map(rev => {
          if (rev.id !== reviewId) return rev;
          const userVoted = !rev.userVotedHelpful;
          return {
            ...rev,
            helpfulCount: userVoted ? rev.helpfulCount + 1 : rev.helpfulCount - 1,
            userVotedHelpful: userVoted
          };
        })
      };
    });
  };

  // Filter and sort restaurant dataset
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(rest => {
      // Search query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = rest.name.toLowerCase().includes(q);
        const matchesCuisine = rest.cuisine.toLowerCase().includes(q);
        const matchesNeighborhood = rest.neighborhood.toLowerCase().includes(q);
        const matchesTags = rest.sentimentTags.some(t => t.toLowerCase().includes(q));
        const matchesDesc = rest.description.toLowerCase().includes(q);
        if (!matchesName && !matchesCuisine && !matchesNeighborhood && !matchesTags && !matchesDesc) {
          return false;
        }
      }

      // Neighbourhood filter
      if (filters.neighborhood !== 'All Neighbourhoods') {
        if (!rest.neighborhood.toLowerCase().includes(filters.neighborhood.toLowerCase())) {
          return false;
        }
      }

      // Cuisine filter
      if (filters.cuisine !== 'All Cuisines') {
        if (
          !rest.cuisine.toLowerCase().includes(filters.cuisine.toLowerCase()) &&
          !filters.cuisine.toLowerCase().includes(rest.cuisine.toLowerCase())
        ) {
          return false;
        }
      }

      // Expenditure Tier
      if (filters.tiers.length > 0 && !filters.tiers.includes(rest.expenditureTier)) {
        return false;
      }

      // Rating
      if (filters.minRating > 0 && rest.rating < filters.minRating) {
        return false;
      }

      // Occasion filter
      if (filters.occasion !== 'All Occasions') {
        const hasOccasion = rest.occasions.some(
          o => o.toLowerCase().includes(filters.occasion.toLowerCase()) ||
               filters.occasion.toLowerCase().includes(o.toLowerCase())
        );
        if (!hasOccasion) return false;
      }

      // Sentiment tags
      if (filters.sentimentTags.length > 0) {
        const hasTag = filters.sentimentTags.some(t => rest.sentimentTags.includes(t));
        if (!hasTag) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'highest-rated') return b.rating - a.rating;
      if (filters.sortBy === 'price-low') return a.avgPrice - b.avgPrice;
      if (filters.sortBy === 'price-high') return b.avgPrice - a.avgPrice;
      if (filters.sortBy === 'most-reviewed') return b.reviewCount - a.reviewCount;
      if (filters.sortBy === 'trending') return b.benchmarks.value - a.benchmarks.value;
      return 0;
    });
  }, [restaurants, filters]);

  // Paginated results
  const totalPages = Math.ceil(filteredRestaurants.length / pageSize) || 1;
  const paginatedRestaurants = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRestaurants.slice(start, start + pageSize);
  }, [filteredRestaurants, currentPage]);

  const savedRestaurants = restaurants.filter(r => savedRestaurantIds.includes(r.id));

  // Quick Craving shortcuts for interactive delight
  const quickCravings = [
    { label: '👑 Royal Kalinga Thali', filter: () => setFilters(prev => ({ ...prev, cuisine: 'Royal Odia & Kalinga Feasts' })) },
    { label: '🍲 Dalma & Mutton Kassa', filter: () => setFilters(prev => ({ ...prev, cuisine: 'Traditional Odia Thali & Dalma' })) },
    { label: '🦀 Fresh Chilika Crabs', filter: () => setFilters(prev => ({ ...prev, cuisine: 'Coastal Seafood & Chilika Catch' })) },
    { label: '🏺 Matka Handi Mutton', filter: () => setFilters(prev => ({ ...prev, cuisine: 'Slow-Cooked Matka & Claypot Mutton' })) },
    { label: '🍯 Hot Salepur Rasagola', filter: () => setFilters(prev => ({ ...prev, cuisine: 'Heritage Odia Sweets & Chhena' })) }
  ];

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#111c2d] flex flex-col font-['DM_Sans']">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedRestaurant(null);
        }}
        searchQuery={filters.searchQuery}
        setSearchQuery={(query) => setFilters(prev => ({ ...prev, searchQuery: query }))}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        savedCount={savedRestaurantIds.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onResetToHome={() => {
          setSelectedRestaurant(null);
          setActiveTab('discover');
        }}
      />

      {/* Main Content Area */}
      <main className="w-full pt-18 flex-1">
        {selectedRestaurant ? (
          /* Screen 2: Detailed Establishment View */
          <RestaurantDetailView
            restaurant={selectedRestaurant}
            onBack={() => setSelectedRestaurant(null)}
            onOpenWriteReview={(rest) => setReviewModalRestaurant(rest)}
            onOpenReservation={(rest) => setReservationModalRestaurant(rest)}
            onToggleHelpful={handleToggleHelpful}
            isSaved={savedRestaurantIds.includes(selectedRestaurant.id)}
            onToggleSave={handleToggleSave}
            onOpenGallery={(imgs) => setGalleryImages(imgs)}
          />
        ) : activeTab === 'price-guides' ? (
          <PriceGuidesView
            restaurants={restaurants}
            onSelectRestaurant={(r) => setSelectedRestaurant(r)}
          />
        ) : activeTab === 'collections' ? (
          <CollectionsView
            restaurants={restaurants}
            onSelectRestaurant={(r) => setSelectedRestaurant(r)}
          />
        ) : activeTab === 'verified-reviews' ? (
          <VerifiedReviewsFeed
            restaurants={restaurants}
            onSelectRestaurant={(r) => setSelectedRestaurant(r)}
            onOpenWriteReview={(r) => setReviewModalRestaurant(r)}
            onToggleHelpful={handleToggleHelpful}
          />
        ) : activeTab === 'top-rated' ? (
          /* Top Rated View */
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#8d4b00] uppercase tracking-wider">
                Excellence Consensus
              </span>
              <h1 className="font-['Epilogue'] text-2xl sm:text-3xl font-bold text-[#111c2d]">
                Top Rated Bhubaneswar Eateries (4.8★+)
              </h1>
              <p className="text-xs text-[#554336]">
                Iconic local dining establishments backed by thousands of authenticated receipts.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants
                .filter(r => r.rating >= 4.8)
                .map(rest => (
                  <RestaurantCard
                    key={rest.id}
                    restaurant={rest}
                    onSelect={(r) => setSelectedRestaurant(r)}
                    onReserve={(r) => setReservationModalRestaurant(r)}
                    isSaved={savedRestaurantIds.includes(rest.id)}
                    onToggleSave={handleToggleSave}
                  />
                ))}
            </div>
          </div>
        ) : (
          /* Screen 1: Curated Gastronomy Index */
          <div className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-6 pb-12">
            {/* Context Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-[#dee8ff]">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#554336] text-[11px] uppercase tracking-wider font-bold">
                  <span>Odisha</span>
                  <span className="material-symbols-outlined text-[13px]">chevron_right</span>
                  <span>Temple City</span>
                  <span className="material-symbols-outlined text-[13px]">chevron_right</span>
                  <span className="text-[#8d4b00] font-bold">Bhubaneswar</span>
                </div>

                <div className="flex items-baseline gap-3 flex-wrap">
                  <h1 className="font-['Epilogue'] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111c2d] tracking-tight">
                    Bhubaneswar Gastronomy Index
                  </h1>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#e7eeff] text-xs font-bold text-[#8d4b00]">
                    Authentic Local Eateries
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#554336] max-w-2xl leading-relaxed">
                  Curated Odishan culinary icons — slow-simmered Dalma, royal Kalinga thalis, fresh Chilika lake catch, and Salepur rasagola heritage.
                </p>
              </div>

              {/* Occasion Switcher */}
              <div className="flex items-center p-1 bg-[#e7eeff] rounded-xl self-start md:self-auto overflow-x-auto max-w-full">
                {OCCASIONS_LIST.map((occ) => (
                  <button
                    key={occ}
                    onClick={() => {
                      setFilters(prev => ({ ...prev, occasion: occ }));
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      filters.occasion === occ
                        ? 'bg-white text-[#111c2d] shadow-xs'
                        : 'text-[#554336] hover:text-[#111c2d]'
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Interactive Craving Discovery Bar */}
            <div className="py-3 flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-[#dee8ff]/60">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#887364] shrink-0">
                Quick Craving:
              </span>
              {quickCravings.map((qc, idx) => (
                <button
                  key={idx}
                  onClick={qc.filter}
                  className="px-3 py-1 rounded-full bg-white hover:bg-[#f0f3ff] text-xs font-medium text-[#111c2d] border border-[#dee8ff] hover:border-[#8d4b00] shrink-0 transition-colors shadow-2xs cursor-pointer"
                >
                  {qc.label}
                </button>
              ))}
            </div>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden pt-3 flex items-center justify-between">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="bg-white border border-[#dee8ff] text-[#111c2d] px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">tune</span>
                <span>Filters</span>
                {(filters.neighborhood !== 'All Neighbourhoods' || filters.cuisine !== 'All Cuisines') && (
                  <span className="w-2 h-2 rounded-full bg-[#8d4b00]"></span>
                )}
              </button>

              <button
                onClick={() => setIsSplitMapView(!isSplitMapView)}
                className="bg-[#f0f3ff] text-[#8d4b00] px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {isSplitMapView ? 'grid_view' : 'map'}
                </span>
                <span>{isSplitMapView ? 'Grid' : 'City Map'}</span>
              </button>
            </div>

            {/* Main Dual Panel Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-5">
              {/* Sidebar */}
              <div className={`lg:col-span-4 xl:col-span-3 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
                <SegmentationSidebar
                  filters={filters}
                  setFilters={setFilters}
                  restaurants={restaurants}
                  onReset={handleResetFilters}
                />
              </div>

              {/* Results Matrix */}
              <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-5">
                {/* Status & Sorting Strip */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl shadow-xs border border-[#dee8ff]">
                  <div className="flex items-center gap-2">
                    <span className="font-['Epilogue'] text-base font-bold text-[#111c2d]">
                      {filteredRestaurants.length} Bhubaneswar Eateries
                    </span>
                    <span className="h-3 w-[1px] bg-[#dee8ff]"></span>
                    <span className="text-[11px] text-[#554336]">
                      100% Local Odishan Venues
                    </span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end text-xs">
                    <div className="flex items-center gap-1 bg-[#f0f3ff] px-2.5 py-1.5 rounded-xl border border-[#dee8ff]">
                      <span className="text-[10px] font-bold text-[#887364] uppercase">Sort:</span>
                      <select
                        value={filters.sortBy}
                        onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as FilterState['sortBy'] }))}
                        className="bg-transparent font-bold text-[#111c2d] focus:outline-none cursor-pointer"
                      >
                        <option value="highest-rated">Highest Rated</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="most-reviewed">Most Reviewed</option>
                      </select>
                    </div>

                    <div className="hidden sm:flex items-center bg-[#f0f3ff] p-0.5 rounded-xl border border-[#dee8ff]">
                      <button
                        onClick={() => setIsSplitMapView(false)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          !isSplitMapView ? 'bg-white text-[#8d4b00] shadow-xs' : 'text-[#554336]'
                        }`}
                        title="Card Grid"
                      >
                        <span className="material-symbols-outlined text-[16px]">grid_view</span>
                      </button>
                      <button
                        onClick={() => setIsSplitMapView(true)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isSplitMapView ? 'bg-white text-[#8d4b00] shadow-xs' : 'text-[#554336]'
                        }`}
                        title="Bhubaneswar Map"
                      >
                        <span className="material-symbols-outlined text-[16px]">map</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Active constraint badges */}
                {(filters.neighborhood !== 'All Neighbourhoods' || filters.cuisine !== 'All Cuisines') && (
                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <span className="text-[10px] uppercase font-bold text-[#887364]">Active:</span>
                    {filters.neighborhood !== 'All Neighbourhoods' && (
                      <span className="inline-flex items-center gap-1 bg-[#dee8ff] px-2.5 py-0.5 rounded-lg font-bold text-[#111c2d]">
                        Area: {filters.neighborhood}
                        <button onClick={() => setFilters(prev => ({ ...prev, neighborhood: 'All Neighbourhoods' }))} className="hover:text-[#a83223]">×</button>
                      </span>
                    )}
                    {filters.cuisine !== 'All Cuisines' && (
                      <span className="inline-flex items-center gap-1 bg-[#dee8ff] px-2.5 py-0.5 rounded-lg font-bold text-[#111c2d]">
                        Cuisine: {filters.cuisine}
                        <button onClick={() => setFilters(prev => ({ ...prev, cuisine: 'All Cuisines' }))} className="hover:text-[#a83223]">×</button>
                      </span>
                    )}
                    <button onClick={handleResetFilters} className="text-[#8d4b00] font-bold underline ml-1 cursor-pointer">
                      Clear All
                    </button>
                  </div>
                )}

                {/* VIEW SWITCH: Split Map OR Restaurant Grid */}
                {isSplitMapView ? (
                  <div className="space-y-6">
                    <CartographicMapView
                      restaurants={filteredRestaurants}
                      onSelectRestaurant={(r) => setSelectedRestaurant(r)}
                      onReserveRestaurant={(r) => setReservationModalRestaurant(r)}
                      isSplitView={true}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {paginatedRestaurants.map((restaurant) => (
                        <RestaurantCard
                          key={restaurant.id}
                          restaurant={restaurant}
                          onSelect={(r) => setSelectedRestaurant(r)}
                          onReserve={(r) => setReservationModalRestaurant(r)}
                          isSaved={savedRestaurantIds.includes(restaurant.id)}
                          onToggleSave={handleToggleSave}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    {filteredRestaurants.length === 0 ? (
                      <div className="bg-white rounded-2xl p-10 text-center border border-[#dee8ff] space-y-2">
                        <span className="material-symbols-outlined text-[#887364] text-[36px]">restaurant</span>
                        <h3 className="font-['Epilogue'] text-lg font-bold text-[#111c2d]">
                          No eateries found in this selection
                        </h3>
                        <p className="text-xs text-[#554336]">
                          Try selecting &apos;All Neighbourhoods&apos; to view all Bhubaneswar dining spots.
                        </p>
                        <button
                          onClick={handleResetFilters}
                          className="mt-2 bg-[#8d4b00] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#b15f00] cursor-pointer"
                        >
                          Reset Filters
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {paginatedRestaurants.map((restaurant) => (
                          <RestaurantCard
                            key={restaurant.id}
                            restaurant={restaurant}
                            onSelect={(r) => setSelectedRestaurant(r)}
                            onReserve={(r) => setReservationModalRestaurant(r)}
                            isSaved={savedRestaurantIds.includes(restaurant.id)}
                            onToggleSave={handleToggleSave}
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* Minimalist Pagination */}
                {filteredRestaurants.length > pageSize && (
                  <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-[#dee8ff] text-xs">
                    <span className="text-[#554336]">
                      Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filteredRestaurants.length)} of {filteredRestaurants.length}
                    </span>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }).map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentPage(idx + 1)}
                          className={`w-7 h-7 rounded-lg font-bold transition-colors cursor-pointer ${
                            currentPage === idx + 1
                              ? 'bg-[#8d4b00] text-white shadow-xs'
                              : 'bg-[#f0f3ff] text-[#111c2d] hover:bg-[#dee8ff]'
                          }`}
                        >
                          {idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Global Review Modal */}
      {reviewModalRestaurant && (
        <WriteReviewModal
          restaurant={reviewModalRestaurant}
          isOpen={!!reviewModalRestaurant}
          onClose={() => setReviewModalRestaurant(null)}
          onSubmitReview={handleAddReview}
        />
      )}

      {/* Global Table Allocation Modal */}
      {reservationModalRestaurant && (
        <ReservationModal
          restaurant={reservationModalRestaurant}
          isOpen={!!reservationModalRestaurant}
          onClose={() => setReservationModalRestaurant(null)}
        />
      )}

      {/* Photo Gallery Modal */}
      {galleryImages && (
        <PhotoGalleryModal
          images={galleryImages}
          isOpen={!!galleryImages}
          onClose={() => setGalleryImages(null)}
        />
      )}

      {/* Saved Bookmarks Modal */}
      <BookmarksModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        savedRestaurants={savedRestaurants}
        onSelectRestaurant={(r) => {
          setSelectedRestaurant(r);
          setIsBookmarksOpen(false);
        }}
        onRemoveBookmark={handleToggleSave}
      />

      {/* Footer */}
      <Footer
        onSelectGuide={(guide) => {
          if (guide.includes('Thali') || guide.includes('Mahathali')) {
            setFilters(prev => ({ ...prev, cuisine: 'Royal Odia & Kalinga Feasts' }));
          } else if (guide.includes('Crab') || guide.includes('Chilika')) {
            setFilters(prev => ({ ...prev, cuisine: 'Coastal Seafood & Chilika Catch' }));
          } else if (guide.includes('Mutton')) {
            setFilters(prev => ({ ...prev, cuisine: 'Slow-Cooked Matka & Claypot Mutton' }));
          } else if (guide.includes('Rasagola')) {
            setFilters(prev => ({ ...prev, cuisine: 'Heritage Odia Sweets & Chhena' }));
          }
          setSelectedRestaurant(null);
          setActiveTab('discover');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
