import React, { useState } from 'react';

interface FooterProps {
  onSelectGuide?: (guide: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectGuide }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  return (
    <footer className="w-full bg-white border-t border-[#dee8ff] pt-10 pb-10 mt-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-8 border-b border-[#dee8ff]">
          {/* Brand + Newsletter */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#8d4b00] text-white flex items-center justify-center font-['Epilogue'] font-bold text-sm shadow-xs">
                T
              </div>
              <span className="font-['Epilogue'] text-lg font-bold text-[#111c2d] tracking-tight">
                TasteIndex Bhubaneswar
              </span>
            </div>

            <p className="text-xs text-[#554336] max-w-sm leading-relaxed">
              The definitive culinary compass for authentic Odia thalis, coastal Chilika seafood, clay pot handi mutton, and century-old sweet makers across Bhubaneswar, Odisha.
            </p>

            {/* Newsletter Form */}
            <div className="flex flex-col gap-1.5 mt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#111c2d]">
                Bhubaneswar Food Gazette
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs font-bold text-[#006a60] bg-[#8cf5e4]/30 px-3 py-1.5 rounded-lg max-w-sm">
                  <span className="material-symbols-outlined text-[15px]">check_circle</span>
                  <span>Subscription confirmed. Namaskar!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    className="flex-1 bg-[#f0f3ff] text-[#111c2d] placeholder:text-[#887364] px-3 py-1.5 rounded-xl text-xs focus:outline-none border border-[#dee8ff] focus:border-[#8d4b00]"
                    placeholder="Enter your correspondence email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-[#8d4b00] hover:bg-[#b15f00] text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Odia Food Guides */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#111c2d]">
              Culinary Guides
            </span>
            <div className="flex flex-col gap-1.5 text-xs text-[#554336]">
              {['Royal Kalinga Mahathali Guide', 'The Chilika Crab & Prawn Trail', 'Matka Handi Mutton Trail', 'The Salepur Rasagola Archive', 'Temple Satvik Abadha'].map(item => (
                <button
                  key={item}
                  onClick={() => onSelectGuide && onSelectGuide(item)}
                  className="text-left hover:text-[#8d4b00] transition-colors cursor-pointer"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Key Districts */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#111c2d]">
              City Districts
            </span>
            <div className="flex flex-col gap-1.5 text-xs text-[#554336]">
              <span className="font-bold text-[#8d4b00]">Jaydev Vihar &amp; Nayapalli</span>
              <span>Saheed Nagar Central</span>
              <span>Patia &amp; Infocity Hub</span>
              <span>Cuttack Road Dhaba Corridor</span>
              <span>Old Town Ekamra Kshetra</span>
            </div>
          </div>

          {/* Standards */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#111c2d]">
              Auditing Standards
            </span>
            <div className="flex flex-col gap-1.5 text-xs text-[#554336]">
              <span>100% Bill-Matched Verification</span>
              <span>Zero Sponsored Paid Reviews</span>
              <span>Authentic Odia Ingredient Verification</span>
              <span>Hygiene &amp; Kitchen Audit</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#554336]">
          <span>© 2026 TasteIndex Bhubaneswar. Crafted with love for Odisha cuisine.</span>
          <div className="flex items-center gap-5 flex-wrap">
            <span className="hover:text-[#111c2d] cursor-pointer">Privacy Protocol</span>
            <span className="hover:text-[#111c2d] cursor-pointer">Diner Terms</span>
            <span className="hover:text-[#111c2d] cursor-pointer">Editorial Independence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
