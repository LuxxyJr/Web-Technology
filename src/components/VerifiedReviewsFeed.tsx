import React, { useState } from 'react';
import { Restaurant, ReviewItem } from '../types';

interface VerifiedReviewsFeedProps {
  restaurants: Restaurant[];
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onOpenWriteReview: (restaurant: Restaurant) => void;
  onToggleHelpful: (restaurantId: string, reviewId: string) => void;
}

export const VerifiedReviewsFeed: React.FC<VerifiedReviewsFeedProps> = ({
  restaurants,
  onSelectRestaurant,
  onOpenWriteReview,
  onToggleHelpful
}) => {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('All');
  const [targetRestaurantForReview, setTargetRestaurantForReview] = useState<Restaurant>(restaurants[0]);

  // Flatten all reviews with restaurant context
  const allReviewsWithContext: { restaurant: Restaurant; review: ReviewItem }[] = [];
  restaurants.forEach(rest => {
    rest.reviews.forEach(rev => {
      allReviewsWithContext.push({ restaurant: rest, review: rev });
    });
  });

  const filtered = allReviewsWithContext.filter(item => {
    if (selectedNeighborhood !== 'All' && !item.restaurant.neighborhood.toLowerCase().includes(selectedNeighborhood.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8 space-y-6">
      {/* Header & Write Review Action */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#dee8ff]">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-[#8d4b00] uppercase font-bold tracking-wider">
            <span>Bhubaneswar Diner Consensus</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span>100% Bill-Matched Reviews</span>
          </div>
          <h1 className="font-['Epilogue'] text-2xl sm:text-3xl font-bold text-[#111c2d]">
            Authenticated Bhubaneswar Dining Reviews
          </h1>
          <p className="text-xs text-[#554336] max-w-2xl leading-relaxed">
            Direct receipts, genuine community feedback, and sensory benchmarking from Bhubaneswar locals and food historians.
          </p>
        </div>

        {/* User Review Action */}
        <div className="flex items-center gap-2">
          <select
            value={targetRestaurantForReview.id}
            onChange={(e) => {
              const found = restaurants.find(r => r.id === e.target.value);
              if (found) setTargetRestaurantForReview(found);
            }}
            className="bg-[#f0f3ff] border border-[#dee8ff] rounded-xl px-3 py-2 text-xs text-[#111c2d] font-bold focus:outline-none"
          >
            {restaurants.map(r => (
              <option key={r.id} value={r.id}>
                {r.name} ({r.neighborhood})
              </option>
            ))}
          </select>

          <button
            onClick={() => onOpenWriteReview(targetRestaurantForReview)}
            className="bg-[#8d4b00] hover:bg-[#b15f00] text-white text-xs font-bold py-2 px-4 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[16px]">edit_note</span>
            <span>Write a Review</span>
          </button>
        </div>
      </div>

      {/* Filter Ribbon */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-3 rounded-2xl border border-[#dee8ff] shadow-xs text-xs">
        <span className="font-bold text-[#887364] uppercase text-[10px] mr-1">Filter Area:</span>
        {['All', 'Jaydev Vihar', 'Saheed Nagar', 'Patia & Infocity', 'Nayapalli', 'Bapuji Nagar', 'Cuttack Road & Rasulgarh'].map(nh => (
          <button
            key={nh}
            onClick={() => setSelectedNeighborhood(nh)}
            className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
              selectedNeighborhood === nh
                ? 'bg-[#8d4b00] text-white font-bold'
                : 'bg-[#f0f3ff] text-[#554336] hover:bg-[#dee8ff]'
            }`}
          >
            {nh}
          </button>
        ))}
      </div>

      {/* Feed list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(({ restaurant, review }) => (
          <article
            key={review.id}
            className="bg-white p-5 rounded-2xl border border-[#dee8ff] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between gap-4"
          >
            <div className="space-y-3">
              {/* Restaurant Header */}
              <div className="flex items-center justify-between pb-2 border-b border-[#dee8ff]">
                <button
                  onClick={() => onSelectRestaurant(restaurant)}
                  className="flex items-center gap-2 text-left group cursor-pointer"
                >
                  <img
                    alt={restaurant.name}
                    src={restaurant.heroImage}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-['Epilogue'] text-sm font-bold text-[#111c2d] group-hover:text-[#8d4b00] transition-colors">
                      {restaurant.name}
                    </h4>
                    <span className="text-[10px] text-[#887364]">
                      {restaurant.neighborhood} · {restaurant.cuisine}
                    </span>
                  </div>
                </button>

                <div className="flex items-center gap-0.5 text-[#8d4b00]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className={`material-symbols-outlined text-[15px] ${
                        s <= review.rating ? 'filled text-[#8d4b00]' : 'text-[#dbc2b0]'
                      }`}
                    >
                      star
                    </span>
                  ))}
                </div>
              </div>

              {/* Reviewer line */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#8d4b00] text-white text-xs flex items-center justify-center font-bold">
                  {review.reviewerName.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-[#111c2d]">{review.reviewerName}</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#8cf5e4]/50 text-[#005048] uppercase">
                      {review.reviewerBadge}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#887364]">{review.date} • {review.occasion}</span>
                </div>
              </div>

              {/* Text */}
              <p className="text-xs text-[#111c2d] leading-relaxed italic">
                &ldquo;{review.content}&rdquo;
              </p>

              {/* Bill snippet if available */}
              {review.billBreakdown && (
                <div className="bg-[#f0f3ff] p-2.5 rounded-xl border border-[#dee8ff] text-[11px] space-y-1">
                  <div className="flex justify-between font-bold text-[#8d4b00]">
                    <span>Itemized Bill:</span>
                    <span className="font-mono">₹{review.billBreakdown.subtotal}</span>
                  </div>
                  <div className="text-[10px] text-[#554336] truncate">
                    {review.billBreakdown.items.map(i => `${i.name} (₹${i.price})`).join(' • ')}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom actions */}
            <div className="pt-2 border-t border-[#dee8ff] flex items-center justify-between text-xs">
              <button
                onClick={() => onToggleHelpful(restaurant.id, review.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  review.userVotedHelpful ? 'bg-[#8d4b00] text-white' : 'bg-[#f0f3ff] text-[#554336] hover:bg-[#dee8ff]'
                }`}
              >
                <span className="material-symbols-outlined text-[13px]">thumb_up</span>
                <span>Helpful ({review.helpfulCount})</span>
              </button>

              <button
                onClick={() => onSelectRestaurant(restaurant)}
                className="text-[#8d4b00] hover:underline font-bold text-xs flex items-center gap-0.5 cursor-pointer"
              >
                <span>Full Audit</span>
                <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
