import React, { useState } from 'react';
import { BillItem, Restaurant, ReviewItem } from '../types';

interface WriteReviewModalProps {
  restaurant: Restaurant;
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (restaurantId: string, review: ReviewItem) => void;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  restaurant,
  isOpen,
  onClose,
  onSubmitReview
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewerName, setReviewerName] = useState<string>('Sanchit Singh');
  const [reviewerTitle, setReviewerTitle] = useState<string>('Bhubaneswar Food Enthusiast');
  const [occasion, setOccasion] = useState<string>('Family Heritage Dining');
  const [seating, setSeating] = useState<string>('Traditional Kansa Thali Table');
  const [pricePerception, setPricePerception] = useState<ReviewItem['pricePerception']>('Worth Every Penny');
  const [content, setContent] = useState<string>('');

  // Itemized Bill breakdown in INR ₹
  const [hasReceipt, setHasReceipt] = useState<boolean>(true);
  const [billItems, setBillItems] = useState<BillItem[]>([
    { name: restaurant.tastingFormats[0]?.name || 'Special Heritage Thali', price: restaurant.avgPrice },
    { name: 'Chhena Poda / Sweet Platter', price: 120 }
  ]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  if (!isOpen) return null;

  const handleAddItem = () => {
    if (!newItemName || !newItemPrice) return;
    const priceNum = parseFloat(newItemPrice);
    if (isNaN(priceNum) || priceNum <= 0) return;
    setBillItems([...billItems, { name: newItemName, price: priceNum }]);
    setNewItemName('');
    setNewItemPrice('');
  };

  const handleRemoveItem = (index: number) => {
    setBillItems(billItems.filter((_, i) => i !== index));
  };

  const subtotal = billItems.reduce((acc, curr) => acc + curr.price, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newReview: ReviewItem = {
      id: `rev-${Date.now()}`,
      reviewerName: reviewerName.trim() || 'Verified Bhubaneswar Diner',
      reviewerTitle: reviewerTitle.trim() || 'Local Food Explorer',
      reviewerBadge: 'Verified Diner',
      rating,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      occasion,
      seating,
      pricePerception,
      content: content.trim(),
      helpfulCount: 1,
      verifiedMethod: 'Verified via TasteIndex UPI & Bill Match',
      billBreakdown: hasReceipt && billItems.length > 0 ? {
        items: billItems,
        subtotal,
        hospitalityIncluded: true,
        costPerPerson: subtotal > 0 ? Math.round(subtotal) : restaurant.avgPrice
      } : undefined
    };

    onSubmitReview(restaurant.id, newReview);
    onClose();
  };

  // Quick dish tags
  const popularDishes = ['Dalma', 'Mutton Kassa', 'Chingudi Malai', 'Chilika Crab', 'Badi Chura', 'Chhena Poda', 'Pakhala Bhata'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#dee8ff] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#f0f3ff] px-6 py-4 border-b border-[#dee8ff] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-[#8d4b00]">
              <span className="material-symbols-outlined text-[14px]">edit_note</span>
              Community Food Audit
            </div>
            <h3 className="font-['Epilogue'] text-base font-bold text-[#111c2d]">
              Review {restaurant.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#554336] hover:text-[#111c2d] hover:bg-[#e7eeff] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto no-scrollbar text-xs">
          {/* Star Rating Selection */}
          <div className="flex flex-col items-center gap-1 p-3.5 bg-[#f0f3ff] rounded-xl border border-[#dee8ff]">
            <span className="text-[11px] font-bold text-[#111c2d] uppercase tracking-wider">
              Your Overall Rating
            </span>
            <div className="flex items-center gap-1 text-[#8d4b00]">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 cursor-pointer transition-transform hover:scale-125 focus:outline-none"
                >
                  <span
                    className={`material-symbols-outlined text-[28px] ${
                      (hoverRating || rating) >= star ? 'filled text-[#8d4b00]' : 'text-[#dbc2b0]'
                    }`}
                  >
                    star
                  </span>
                </button>
              ))}
            </div>
            <span className="text-xs font-bold text-[#8d4b00]">
              {rating === 5 ? '5.0 / 5.0 (Authentic Masterpiece)' :
               rating === 4 ? '4.0 / 5.0 (Very Good)' :
               rating === 3 ? '3.0 / 5.0 (Decent)' : 'Needs Improvement'}
            </span>
          </div>

          {/* Reviewer Details */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#111c2d] mb-1">Your Name</label>
              <input
                type="text"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                required
                className="w-full bg-[#f0f3ff] border border-[#dee8ff] rounded-lg px-3 py-2 text-[#111c2d] focus:outline-none focus:border-[#8d4b00]"
                placeholder="e.g. Sanchit Singh"
              />
            </div>
            <div>
              <label className="block font-bold text-[#111c2d] mb-1">Diner Role</label>
              <input
                type="text"
                value={reviewerTitle}
                onChange={(e) => setReviewerTitle(e.target.value)}
                className="w-full bg-[#f0f3ff] border border-[#dee8ff] rounded-lg px-3 py-2 text-[#111c2d] focus:outline-none focus:border-[#8d4b00]"
                placeholder="e.g. Bhubaneswar Food Explorer"
              />
            </div>
          </div>

          {/* Occasion & Value */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#111c2d] mb-1">Dining Occasion</label>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full bg-[#f0f3ff] border border-[#dee8ff] rounded-lg px-3 py-2 text-[#111c2d] focus:outline-none"
              >
                <option>Family Heritage Dining</option>
                <option>Royal Feast &amp; Thali</option>
                <option>Seafood &amp; Chilika Catch</option>
                <option>Late Night Dhaba</option>
                <option>Authentic Morning Breakfast</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-[#111c2d] mb-1">Value Perception</label>
              <select
                value={pricePerception}
                onChange={(e) => setPricePerception(e.target.value as ReviewItem['pricePerception'])}
                className="w-full bg-[#f0f3ff] border border-[#dee8ff] rounded-lg px-3 py-2 text-[#111c2d] focus:outline-none"
              >
                <option value="Worth Every Penny">Worth Every Penny</option>
                <option value="Fair Value for Mastery">Fair Value for Mastery</option>
                <option value="Pricey for Portions">Pricey for Portions</option>
                <option value="Steal of the Year">Steal of the Year</option>
              </select>
            </div>
          </div>

          {/* Quick Dishes Mention */}
          <div>
            <label className="block font-bold text-[#111c2d] mb-1">Dishes Tasted (Click to add to review)</label>
            <div className="flex flex-wrap gap-1.5">
              {popularDishes.map(d => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setContent(prev => prev ? `${prev}, ${d}` : `Tasted ${d}`)}
                  className="px-2 py-0.5 rounded-md bg-[#f0f3ff] hover:bg-[#dee8ff] text-[#554336] text-[11px] font-medium"
                >
                  + {d}
                </button>
              ))}
            </div>
          </div>

          {/* Review Narrative */}
          <div>
            <label className="block font-bold text-[#111c2d] mb-1">
              Your Detailed Gastronomic Feedback
            </label>
            <textarea
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full bg-[#f0f3ff] border border-[#dee8ff] rounded-lg p-3 text-[#111c2d] leading-relaxed focus:outline-none focus:border-[#8d4b00]"
              placeholder="Describe the spice balance, mustard pungency, meat softness, dessert freshness, and service..."
            />
          </div>

          {/* Itemized Bill Breakdown (in INR ₹) */}
          <div className="p-3.5 bg-[#f0f3ff] rounded-xl border border-[#dee8ff] space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-[#111c2d] flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasReceipt}
                  onChange={(e) => setHasReceipt(e.target.checked)}
                  className="accent-[#8d4b00] w-4 h-4 rounded"
                />
                <span className="material-symbols-outlined text-[#8d4b00] text-[15px]">receipt_long</span>
                Attach Bill Items (₹)
              </label>
              {hasReceipt && (
                <span className="font-mono font-bold text-[#8d4b00]">
                  Total: ₹{subtotal}
                </span>
              )}
            </div>

            {hasReceipt && (
              <div className="space-y-1.5 pt-1">
                {billItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-white px-2.5 py-1 rounded-md border border-[#dee8ff]">
                    <span className="text-[#111c2d]">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#554336]">₹{item.price}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        className="text-[#a83223]"
                      >
                        <span className="material-symbols-outlined text-[14px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))}

                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="Dish name"
                    className="flex-1 bg-white border border-[#dee8ff] rounded px-2.5 py-1 text-xs focus:outline-none"
                  />
                  <input
                    type="number"
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(e.target.value)}
                    placeholder="₹ Price"
                    className="w-20 bg-white border border-[#dee8ff] rounded px-2 py-1 text-xs focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="bg-[#263143] text-white px-3 py-1 rounded font-bold hover:bg-[#111c2d]"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#dee8ff]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-[#554336] hover:bg-[#f0f3ff] rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-[#8d4b00] hover:bg-[#b15f00] text-white rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">verified</span>
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
