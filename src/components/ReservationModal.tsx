import React, { useState } from 'react';
import { Restaurant, TastingFormat } from '../types';

interface ReservationModalProps {
  restaurant: Restaurant;
  isOpen: boolean;
  onClose: () => void;
  initialFormat?: TastingFormat;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  restaurant,
  isOpen,
  onClose,
  initialFormat
}) => {
  const [selectedFormat, setSelectedFormat] = useState<TastingFormat>(
    initialFormat || restaurant.tastingFormats[0]
  );
  const [partySize, setPartySize] = useState<number>(2);
  const [date, setDate] = useState<string>('Tonight');
  const [timeSlot, setTimeSlot] = useState<string>('8:00 PM');
  const [guestName, setGuestName] = useState<string>('Sanchit Singh');
  const [guestPhone, setGuestPhone] = useState<string>('+91 98765 43210');
  const [specialNotes, setSpecialNotes] = useState<string>('Prefer traditional Kansa bell-metal thali seating.');
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  if (!isOpen) return null;

  // Indian Dining Economics calculation
  const menuTotal = selectedFormat.price * partySize;
  const beverageEstimated = 150 * partySize;
  const gst = Math.round((menuTotal + beverageEstimated) * 0.05); // 5% GST in India
  const grandTotal = menuTotal + beverageEstimated + gst;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `BBSR-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedBookingId(code);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#dee8ff] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#f0f3ff] px-6 py-4 border-b border-[#dee8ff] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#8d4b00]">table_restaurant</span>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8d4b00]">
                Direct Table &amp; Thali Allocation
              </span>
              <h3 className="font-['Epilogue'] text-base font-bold text-[#111c2d]">
                {restaurant.name}
              </h3>
            </div>
          </div>
          <button
            onClick={() => { setConfirmedBookingId(null); onClose(); }}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#554336] hover:text-[#111c2d] hover:bg-[#e7eeff] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {confirmedBookingId ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#8cf5e4]/40 text-[#006a60] flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[32px] filled">check_circle</span>
            </div>
            <h4 className="font-['Epilogue'] text-xl font-bold text-[#111c2d]">
              Table &amp; Thali Reserved!
            </h4>
            <p className="text-xs text-[#554336] max-w-sm mx-auto">
              Your table for <strong className="text-[#111c2d]">{partySize} guests</strong> on{' '}
              <strong className="text-[#111c2d]">{date} at {timeSlot}</strong> has been secured at{' '}
              {restaurant.name}, Bhubaneswar.
            </p>

            <div className="p-4 bg-[#f0f3ff] rounded-xl border border-[#dee8ff] max-w-sm mx-auto text-left space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#887364]">Reservation Code:</span>
                <span className="font-mono font-bold text-[#8d4b00]">{confirmedBookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#887364]">Format:</span>
                <span className="font-bold text-[#111c2d]">{selectedFormat.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#887364]">Estimated Total:</span>
                <span className="font-mono font-bold text-[#111c2d]">₹{grandTotal} (Incl. GST)</span>
              </div>
            </div>

            <p className="text-[11px] text-[#006a60] font-medium flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-[14px]">call</span>
              SMS confirmation sent to {guestPhone}. Walk-in hold for 20 mins.
            </p>

            <button
              onClick={() => { setConfirmedBookingId(null); onClose(); }}
              className="w-full bg-[#8d4b00] hover:bg-[#b15f00] text-white font-bold text-xs py-2.5 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleConfirm} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto no-scrollbar text-xs">
            {/* Format selection */}
            <div>
              <label className="block text-[11px] font-bold text-[#111c2d] uppercase tracking-wider mb-1.5">
                Select Meal / Thali Experience
              </label>
              <div className="space-y-1.5">
                {restaurant.tastingFormats.map((tf) => (
                  <label
                    key={tf.id}
                    onClick={() => setSelectedFormat(tf)}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedFormat.id === tf.id
                        ? 'border-[#8d4b00] bg-[#f0f3ff]'
                        : 'border-[#dee8ff] hover:bg-[#f0f3ff]/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="tasting-format"
                        checked={selectedFormat.id === tf.id}
                        onChange={() => setSelectedFormat(tf)}
                        className="accent-[#8d4b00]"
                      />
                      <div>
                        <div className="font-bold text-[#111c2d]">{tf.name}</div>
                        <div className="text-[10px] text-[#554336]">{tf.description}</div>
                      </div>
                    </div>
                    <span className="font-['Epilogue'] font-bold text-[#8d4b00] shrink-0 text-sm">
                      ₹{tf.price}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Party Size & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#887364] mb-1">
                  Guests
                </label>
                <select
                  value={partySize}
                  onChange={(e) => setPartySize(Number(e.target.value))}
                  className="w-full bg-[#f0f3ff] border border-[#dee8ff] rounded-lg px-3 py-2 text-xs font-bold text-[#111c2d] focus:outline-none"
                >
                  <option value={1}>1 Guest (Solo)</option>
                  <option value={2}>2 Guests</option>
                  <option value={4}>4 Guests (Family Table)</option>
                  <option value={6}>6 Guests (Royal Feast Table)</option>
                  <option value={8}>8+ Guests</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#887364] mb-1">
                  Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-[#f0f3ff] border border-[#dee8ff] rounded-lg px-3 py-2 text-xs font-bold text-[#111c2d] focus:outline-none"
                >
                  <option>12:30 PM (Lunch)</option>
                  <option>1:15 PM (Peak Lunch)</option>
                  <option>2:00 PM (Late Lunch)</option>
                  <option>7:30 PM (Dinner)</option>
                  <option>8:00 PM (Prime Dinner)</option>
                  <option>8:45 PM (Dinner)</option>
                  <option>9:30 PM (Late Dinner)</option>
                </select>
              </div>
            </div>

            {/* Estimated Cost Breakdown */}
            <div className="bg-[#f0f3ff] p-3.5 rounded-xl border border-[#dee8ff] space-y-1">
              <span className="font-bold text-[#111c2d] uppercase tracking-wider text-[10px] block pb-1 border-b border-[#dee8ff]">
                Transparent Check Summary ({partySize} Guests)
              </span>
              <div className="flex justify-between text-[#554336] pt-1">
                <span>{partySize}x {selectedFormat.name}</span>
                <span className="font-mono text-[#111c2d] font-bold">₹{menuTotal}</span>
              </div>
              <div className="flex justify-between text-[#554336]">
                <span>Beverages &amp; Bel/Kokum Sherbet</span>
                <span className="font-mono text-[#111c2d]">₹{beverageEstimated}</span>
              </div>
              <div className="flex justify-between text-[#554336]">
                <span>GST (5% Restaurant Rate)</span>
                <span className="font-mono text-[#111c2d]">₹{gst}</span>
              </div>
              <div className="border-t border-[#dee8ff] pt-1.5 flex items-baseline justify-between font-bold text-sm">
                <span className="text-[#111c2d]">Estimated Payable:</span>
                <span className="font-mono text-[#8d4b00] text-base">₹{grandTotal}</span>
              </div>
            </div>

            {/* Guest Name & Phone */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-[#111c2d] mb-1">Your Name</label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  required
                  className="w-full bg-[#f0f3ff] border border-[#dee8ff] rounded-lg px-3 py-1.5 text-xs text-[#111c2d] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[#111c2d] mb-1">Mobile (for SMS update)</label>
                <input
                  type="tel"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  required
                  className="w-full bg-[#f0f3ff] border border-[#dee8ff] rounded-lg px-3 py-1.5 text-xs text-[#111c2d] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#111c2d] mb-1">Special Preferences</label>
              <input
                type="text"
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                className="w-full bg-[#f0f3ff] border border-[#dee8ff] rounded-lg px-3 py-1.5 text-xs text-[#111c2d] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#8d4b00] hover:bg-[#b15f00] text-white font-bold py-2.5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-2"
            >
              <span>Confirm Table &amp; Thali</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
