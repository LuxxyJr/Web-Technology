import React, { useState } from 'react';
import { Restaurant, ReviewItem } from '../types';

interface RestaurantDetailViewProps {
  restaurant: Restaurant;
  onBack: () => void;
  onOpenWriteReview: (restaurant: Restaurant) => void;
  onOpenReservation: (restaurant: Restaurant) => void;
  onToggleHelpful: (restaurantId: string, reviewId: string) => void;
  isSaved: boolean;
  onToggleSave: (restaurantId: string) => void;
  onOpenGallery: (images: string[]) => void;
}

export const RestaurantDetailView: React.FC<RestaurantDetailViewProps> = ({
  restaurant,
  onBack,
  onOpenWriteReview,
  onOpenReservation,
  onToggleHelpful,
  isSaved,
  onToggleSave,
  onOpenGallery
}) => {
  const [reviewSort, setReviewSort] = useState<string>('most-helpful');
  const [filterPerception, setFilterPerception] = useState<string>('all');
  const [filterStar, setFilterStar] = useState<string>('all');
  const [savedReviews, setSavedReviews] = useState<string[]>([]);

  // Local reservation widget state for sticky sidebar
  const [selectedFormatIndex, setSelectedFormatIndex] = useState<number>(0);
  const [sidebarPartySize, setSidebarPartySize] = useState<number>(2);
  const [sidebarTime, setSidebarTime] = useState<string>('8:00 PM');

  const selectedFormat = restaurant.tastingFormats[selectedFormatIndex] || restaurant.tastingFormats[0];

  // Calculated check for sidebar (in INR ₹)
  const menuTotal = selectedFormat.price * sidebarPartySize;
  const beverageEstimated = 150 * sidebarPartySize;
  const gst = Math.round((menuTotal + beverageEstimated) * 0.05);
  const transparentTotal = menuTotal + beverageEstimated + gst;

  // Filter reviews
  const filteredReviews = restaurant.reviews.filter(rev => {
    if (filterStar !== 'all') {
      const starNum = parseInt(filterStar);
      if (rev.rating !== starNum) return false;
    }
    if (filterPerception !== 'all' && rev.pricePerception !== filterPerception) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    if (reviewSort === 'most-helpful') return b.helpfulCount - a.helpfulCount;
    if (reviewSort === 'highest-rated') return b.rating - a.rating;
    return 0;
  });

  const handleToggleSaveReview = (reviewId: string) => {
    setSavedReviews(prev =>
      prev.includes(reviewId) ? prev.filter(id => id !== reviewId) : [...prev, reviewId]
    );
  };

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Top Architectural Header */}
      <section className="w-full bg-white px-4 sm:px-6 lg:px-12 pt-6 pb-8 border-b border-[#dee8ff]">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
          {/* Breadcrumb Bar & Critic Verification Stamp */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-[#554336]">
              <button
                onClick={onBack}
                className="hover:text-[#8d4b00] flex items-center gap-1 font-bold text-[#8d4b00] underline cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                Bhubaneswar Gastronomy Index
              </button>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span>Odisha Metropolitan</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-[#111c2d] font-bold">{restaurant.neighborhood}</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-[#ffdcc3] px-3 py-1 rounded-lg text-[#2f1500] font-bold shadow-xs">
                <span className="material-symbols-outlined text-[15px] filled text-[#8d4b00]">verified</span>
                <span>{restaurant.awardBadge || 'Verified Gastronomy Pick 2025'}</span>
              </div>
              <button
                onClick={() => onToggleSave(restaurant.id)}
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#f0f3ff] font-bold text-[#111c2d] hover:bg-[#dee8ff] transition-colors cursor-pointer"
              >
                <span className={`material-symbols-outlined text-[16px] ${isSaved ? 'text-[#8d4b00] filled' : ''}`}>
                  {isSaved ? 'bookmark' : 'bookmark_border'}
                </span>
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>

          {/* Identity Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8 flex flex-col gap-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#8cf5e4] text-[#00201c] text-[10px] font-bold px-2.5 py-1 uppercase rounded-md">
                  {restaurant.cuisine}
                </span>
                <span className="bg-[#e7eeff] text-[#554336] text-[10px] font-bold px-2.5 py-1 uppercase rounded-md">
                  Heritage Bell-Metal Kansa
                </span>
                <span className="bg-[#8d4b00] text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                  Authentic Odia
                </span>
              </div>

              <h1 className="font-['Epilogue'] text-3xl sm:text-4xl font-bold text-[#111c2d] tracking-tight">
                {restaurant.name}
              </h1>

              <p className="text-sm text-[#554336] max-w-3xl leading-relaxed">
                {restaurant.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-[#111c2d]">
                <div className="flex items-center gap-1 text-[#8d4b00]">
                  <span className="material-symbols-outlined text-[18px] filled">star</span>
                  <span className="font-['Epilogue'] text-base font-bold">{restaurant.rating.toFixed(2)}</span>
                  <span className="text-[#887364] font-normal">/ 5.0</span>
                </div>
                <span className="text-[#dbc2b0]">•</span>
                <span className="text-[#554336] font-medium">
                  {restaurant.reviewCount.toLocaleString()} Verified Guest Reviews
                </span>
                <span className="text-[#dbc2b0]">•</span>
                <div className="flex items-center gap-1 bg-[#dee8ff] px-2.5 py-0.5 rounded-md text-[#111c2d] font-bold">
                  <span className="text-[#8d4b00]">{restaurant.expenditureTier}</span>
                  <span className="text-[#554336] font-normal">(Avg ₹{restaurant.avgPrice} per guest)</span>
                </div>
              </div>
            </div>

            {/* Micro-Stats Card */}
            <div className="lg:col-span-4 flex flex-col gap-2 bg-[#f0f3ff] p-4 rounded-xl border border-[#dee8ff] text-xs">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#887364]">Culinary Lead</span>
                  <p className="font-['Epilogue'] text-sm font-bold text-[#111c2d]">
                    {restaurant.leadSommelier?.name || 'Master Odia Chef'}
                  </p>
                </div>
                <span className="bg-white text-[#8d4b00] p-1.5 rounded-lg shadow-xs">
                  <span className="material-symbols-outlined text-[18px]">restaurant</span>
                </span>
              </div>
              <div className="pt-1 border-t border-[#dee8ff]">
                <span className="text-[10px] uppercase font-bold text-[#887364]">Hospitality Ethos</span>
                <p className="font-bold text-[#111c2d]">
                  {restaurant.leadSommelier?.hospitalityTier || 'Traditional Odia Atithi Seva'}
                </p>
              </div>
            </div>
          </div>

          {/* Gallery Banner */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2 h-auto md:h-80">
            <div
              onClick={() => onOpenGallery(restaurant.galleryImages)}
              className="md:col-span-8 h-60 md:h-full relative overflow-hidden rounded-2xl group cursor-pointer"
            >
              <img
                alt={restaurant.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                src={restaurant.galleryImages[0] || restaurant.heroImage}
              />
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-[#111c2d] text-xs font-bold flex items-center gap-1 shadow-xs">
                <span className="material-symbols-outlined text-[14px]">photo_camera</span>
                <span>Traditional Dining Room &amp; Hearths</span>
              </div>
            </div>

            <div className="md:col-span-4 h-48 md:h-full relative flex flex-col gap-3">
              <div
                onClick={() => onOpenGallery(restaurant.galleryImages)}
                className="h-1/2 w-full relative overflow-hidden rounded-2xl group cursor-pointer"
              >
                <img
                  alt="Specialty dish"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  src={restaurant.galleryImages[1] || restaurant.heroImage}
                />
              </div>

              <button
                onClick={() => onOpenGallery(restaurant.galleryImages)}
                className="h-1/2 w-full rounded-2xl bg-[#dee8ff] hover:bg-[#e7eeff] transition-colors flex flex-col justify-center items-center text-center p-3 cursor-pointer border border-[#dee8ff]"
              >
                <span className="material-symbols-outlined text-[#8d4b00] text-[24px]">grid_view</span>
                <span className="font-['Epilogue'] text-xs font-bold text-[#111c2d] mt-1">Photo Archive</span>
                <span className="text-[10px] text-[#554336]">Thalis, Kitchens, Sweets</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Body Grid */}
      <div className="w-full px-4 sm:px-6 lg:px-12 py-8">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* PRIMARY COLUMN: Ratings & Filtered Reviews */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Granular Audit */}
            <section className="bg-white p-6 rounded-2xl shadow-xs border border-[#dee8ff] space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-2 border-b border-[#dee8ff]">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#8d4b00]">Authentic Audit</span>
                  <h2 className="font-['Epilogue'] text-xl font-bold text-[#111c2d]">
                    Verified Odishan Culinary Benchmarks
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#006a60] font-bold bg-[#8cf5e4]/30 px-3 py-1 rounded-lg">
                  <span className="material-symbols-outlined text-[15px] filled">verified_user</span>
                  <span>100% Bill-Matched Diners</span>
                </div>
              </div>

              {/* Benchmarks Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#f0f3ff] p-5 rounded-2xl border border-[#dee8ff]">
                <div className="space-y-3">
                  <div className="flex items-baseline gap-2">
                    <span className="font-['Epilogue'] text-3xl font-bold text-[#111c2d]">{restaurant.rating.toFixed(2)}</span>
                    <span className="text-sm text-[#887364]">/ 5.0 Composite</span>
                  </div>
                  <p className="text-xs text-[#554336]">
                    Calculated from {restaurant.reviewCount.toLocaleString()} verified Bhubaneswar diner visits.
                  </p>

                  <div className="space-y-1.5 pt-1 text-xs">
                    {[
                      { star: '5 ★', pct: restaurant.ratingDistribution.star5 },
                      { star: '4 ★', pct: restaurant.ratingDistribution.star4 },
                      { star: '3 ★', pct: restaurant.ratingDistribution.star3 }
                    ].map(row => (
                      <div key={row.star} className="flex items-center gap-2">
                        <span className="w-6 font-bold text-[#111c2d]">{row.star}</span>
                        <div className="flex-1 h-2 bg-[#dee8ff] rounded-full overflow-hidden">
                          <div className="h-full bg-[#8d4b00]" style={{ width: `${row.pct}%` }} />
                        </div>
                        <span className="w-8 text-right font-mono text-[#887364]">{row.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5 text-xs">
                  {[
                    { name: 'Odia Purity & Flavour', score: restaurant.benchmarks.food },
                    { name: 'Seva & Hospitality', score: restaurant.benchmarks.service },
                    { name: 'Traditional Ambience', score: restaurant.benchmarks.atmosphere },
                    { name: 'Price to Value Ratio', score: restaurant.benchmarks.value }
                  ].map(b => (
                    <div key={b.name} className="space-y-1">
                      <div className="flex justify-between font-bold text-[#111c2d]">
                        <span>{b.name}</span>
                        <span>{b.score} / 5.0</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#dee8ff] rounded-full overflow-hidden">
                        <div className="h-full bg-[#006a60]" style={{ width: `${b.score * 20}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Customer Reviews Section */}
            <section className="bg-white p-6 rounded-2xl shadow-xs border border-[#dee8ff] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#dee8ff]">
                <div>
                  <h3 className="font-['Epilogue'] text-lg font-bold text-[#111c2d]">Diner Reviews</h3>
                  <p className="text-xs text-[#554336]">{filteredReviews.length} authenticated food reviews</p>
                </div>

                <button
                  onClick={() => onOpenWriteReview(restaurant)}
                  className="bg-[#8d4b00] hover:bg-[#b15f00] text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">rate_review</span>
                  <span>Write a Review</span>
                </button>
              </div>

              {/* Review cards */}
              <div className="space-y-5">
                {filteredReviews.map((rev) => (
                  <article
                    key={rev.id}
                    className="p-5 rounded-2xl bg-[#f0f3ff]/60 border border-[#dee8ff] space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#8d4b00] text-white text-xs font-bold flex items-center justify-center">
                          {rev.reviewerName.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-['Epilogue'] font-bold text-sm text-[#111c2d]">
                              {rev.reviewerName}
                            </span>
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#8cf5e4]/60 text-[#005048] uppercase">
                              {rev.reviewerBadge}
                            </span>
                          </div>
                          <span className="text-[11px] text-[#554336]">{rev.reviewerTitle}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-0.5 text-[#8d4b00]">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span
                            key={s}
                            className={`material-symbols-outlined text-[16px] ${
                              s <= rev.rating ? 'filled text-[#8d4b00]' : 'text-[#dbc2b0]'
                            }`}
                          >
                            star
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 text-[11px]">
                      <span className="bg-white px-2 py-0.5 rounded-md text-[#554336] border border-[#dee8ff]">
                        Occasion: {rev.occasion}
                      </span>
                      <span className="bg-[#ffdcc3] text-[#2f1500] px-2 py-0.5 rounded-md font-bold">
                        {rev.pricePerception}
                      </span>
                    </div>

                    <p className="text-xs text-[#111c2d] leading-relaxed">
                      &ldquo;{rev.content}&rdquo;
                    </p>

                    {rev.billBreakdown && (
                      <div className="bg-white p-3 rounded-xl border border-[#dee8ff] text-xs space-y-1">
                        <div className="flex justify-between font-bold text-[#8d4b00] pb-1 border-b border-[#dee8ff]">
                          <span>Verified Meal Breakdown:</span>
                          <span className="font-mono">₹{rev.billBreakdown.subtotal}</span>
                        </div>
                        <div className="text-[11px] text-[#554336]">
                          {rev.billBreakdown.items.map(i => `${i.name} (₹${i.price})`).join(' • ')}
                        </div>
                      </div>
                    )}

                    <div className="pt-2 flex items-center justify-between text-xs border-t border-[#dee8ff]">
                      <button
                        onClick={() => onToggleHelpful(restaurant.id, rev.id)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                          rev.userVotedHelpful ? 'bg-[#8d4b00] text-white' : 'bg-white text-[#554336] border border-[#dee8ff]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[14px]">thumb_up</span>
                        <span>Helpful ({rev.helpfulCount})</span>
                      </button>

                      <span className="text-[10px] text-[#887364]">
                        {rev.verifiedMethod}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: Table Booking Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-6 sticky top-22">
            <div className="bg-white p-6 rounded-2xl shadow-xs border border-[#dee8ff] space-y-4">
              <div className="flex items-center justify-between pb-1 border-b border-[#dee8ff]">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#8d4b00]">
                  Table &amp; Thali Allocation
                </span>
                <span className="text-[10px] font-bold text-[#006a60] bg-[#8cf5e4]/40 px-2 py-0.5 rounded">
                  Instant Table
                </span>
              </div>

              <h3 className="font-['Epilogue'] text-base font-bold text-[#111c2d]">
                Reserve Your Experience
              </h3>

              {/* Format selection */}
              <div className="space-y-1.5 text-xs">
                {restaurant.tastingFormats.map((tf, index) => (
                  <label
                    key={tf.id}
                    onClick={() => setSelectedFormatIndex(index)}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                      selectedFormatIndex === index
                        ? 'border-[#8d4b00] bg-[#f0f3ff]'
                        : 'border-[#dee8ff] hover:bg-[#f0f3ff]/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="sidebar-experience"
                        checked={selectedFormatIndex === index}
                        onChange={() => setSelectedFormatIndex(index)}
                        className="accent-[#8d4b00]"
                      />
                      <div>
                        <div className="font-bold text-[#111c2d]">{tf.name}</div>
                        <div className="text-[10px] text-[#554336]">{tf.description}</div>
                      </div>
                    </div>
                    <span className="font-['Epilogue'] font-bold text-[#8d4b00] shrink-0">
                      ₹{tf.price}
                    </span>
                  </label>
                ))}
              </div>

              {/* Party size and time */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#887364] block mb-1">
                    Guests
                  </label>
                  <select
                    value={sidebarPartySize}
                    onChange={(e) => setSidebarPartySize(Number(e.target.value))}
                    className="w-full bg-[#f0f3ff] border border-[#dee8ff] rounded-lg px-2.5 py-1.5 font-bold text-[#111c2d] focus:outline-none"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={4}>4 Guests</option>
                    <option value={6}>6 Guests</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#887364] block mb-1">
                    Time
                  </label>
                  <select
                    value={sidebarTime}
                    onChange={(e) => setSidebarTime(e.target.value)}
                    className="w-full bg-[#f0f3ff] border border-[#dee8ff] rounded-lg px-2.5 py-1.5 font-bold text-[#111c2d] focus:outline-none"
                  >
                    <option>1:00 PM (Lunch)</option>
                    <option>7:30 PM (Dinner)</option>
                    <option>8:00 PM (Prime)</option>
                    <option>9:00 PM (Late)</option>
                  </select>
                </div>
              </div>

              {/* Estimated Check */}
              <div className="bg-[#f0f3ff] p-3.5 rounded-xl border border-[#dee8ff] space-y-1 text-xs">
                <div className="flex justify-between text-[#554336]">
                  <span>{sidebarPartySize}x {selectedFormat.name}</span>
                  <span className="font-mono text-[#111c2d] font-bold">₹{menuTotal}</span>
                </div>
                <div className="flex justify-between text-[#554336]">
                  <span>Beverages &amp; GST (5%)</span>
                  <span className="font-mono text-[#111c2d]">₹{beverageEstimated + gst}</span>
                </div>
                <div className="border-t border-[#dee8ff] pt-1 flex justify-between font-bold text-sm">
                  <span>Payable Total:</span>
                  <span className="font-mono text-[#8d4b00]">₹{transparentTotal}</span>
                </div>
              </div>

              {/* Instant CTA Button */}
              <button
                onClick={() => onOpenReservation(restaurant)}
                className="w-full bg-[#8d4b00] hover:bg-[#b15f00] text-white font-bold text-xs py-3 rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Instant Table Confirmation</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            {/* Location & Address */}
            <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#dee8ff] space-y-2 text-xs">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#887364]">
                Location in Bhubaneswar
              </span>
              <p className="font-['Epilogue'] font-bold text-[#111c2d]">{restaurant.address}</p>
              <p className="text-[#554336] leading-relaxed">{restaurant.arrivalInfo}</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
