import React from 'react';
import { Restaurant } from '../types';

interface PriceGuidesViewProps {
  restaurants: Restaurant[];
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

export const PriceGuidesView: React.FC<PriceGuidesViewProps> = ({
  restaurants,
  onSelectRestaurant
}) => {
  const neighborhoodData = [
    { name: 'Jaydev Vihar', tier: '₹₹₹₹', avgCheck: '₹1,200 - ₹1,800', highlight: 'Royal Kalinga thalis, coastal lobster, luxury lagoon dining.' },
    { name: 'Patia & Infocity', tier: '₹₹₹', avgCheck: '₹650 - ₹950', highlight: 'Progressive coastal ateliers, bamboo-smoked mutton, IT corridor gastronomy.' },
    { name: 'Saheed Nagar', tier: '₹₹', avgCheck: '₹350 - ₹500', highlight: 'Iconic Dalma thalis, fresh Chilika crabs, authentic Odia comfort feasts.' },
    { name: 'Cuttack Road & Rasulgarh', tier: '₹₹', avgCheck: '₹300 - ₹450', highlight: 'Sealed earthenware matka handi mutton over sal-wood coals.' },
    { name: 'Nayapalli', tier: '₹', avgCheck: '₹100 - ₹200', highlight: 'Century-old Salepur rasagolas, chhena jhili, warm evening sweets.' },
    { name: 'Bapuji Nagar', tier: '₹', avgCheck: '₹150 - ₹250', highlight: 'Historic pure vegetarian institutions, Satvik Paneer Besara, hot Rasabali.' }
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-xs text-[#8d4b00] uppercase font-bold tracking-wider">
          <span>Odishan Gastronomy Intelligence</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span>Bhubaneswar Metropolitan</span>
        </div>
        <h1 className="font-['Epilogue'] text-2xl sm:text-3xl font-bold text-[#111c2d]">
          Bhubaneswar Dining Economics &amp; Pricing Guides
        </h1>
        <p className="text-xs text-[#554336] max-w-2xl leading-relaxed">
          Transparent price indexing across Bhubaneswar’s micro-culinary districts — from humble Salepur rasagola counters to royal Kalinga feasts.
        </p>
      </div>

      {/* Explanatory Cards on Bhubaneswar Dining */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#dee8ff] shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-[#ffdcc3] text-[#8d4b00] flex items-center justify-center font-bold text-sm">
            ₹
          </div>
          <h3 className="font-['Epilogue'] text-sm font-bold text-[#111c2d]">Authentic Bell-Metal Thali Index</h3>
          <p className="text-xs text-[#554336] leading-relaxed">
            Traditional Kansa thali meals range from ₹250 for pure vegetarian Dalma sets to ₹1,450 for multi-course royal feasts including Chilika crab and mutton.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#dee8ff] shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-[#8cf5e4]/40 text-[#006a60] flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">set_meal</span>
          </div>
          <h3 className="font-['Epilogue'] text-sm font-bold text-[#111c2d]">Chilika Lagoon Catch Pricing</h3>
          <p className="text-xs text-[#554336] leading-relaxed">
            Fresh tiger prawns and live mud crabs arrive daily from Chilika Lake lagoon, sold by weight or in curated thali sets with zero cold-storage freezing.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#dee8ff] shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-[#dee8ff] text-[#111c2d] flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">bakery_dining</span>
          </div>
          <h3 className="font-['Epilogue'] text-sm font-bold text-[#111c2d]">GI Tagged Chhena Heritage</h3>
          <p className="text-xs text-[#554336] leading-relaxed">
            Odisha’s famous brown Salepur rasagolas and chhena podas are freshly baked multiple times daily, averaging ₹30–₹50 per piece for world-class quality.
          </p>
        </div>
      </div>

      {/* Neighborhood Price Benchmark Table */}
      <div className="bg-white rounded-2xl border border-[#dee8ff] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#dee8ff]">
          <h2 className="font-['Epilogue'] text-base font-bold text-[#111c2d]">
            Bhubaneswar Neighbourhood Price Matrix
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#f0f3ff] text-[#111c2d] font-bold uppercase tracking-wider text-[10px] border-b border-[#dee8ff]">
                <th className="py-3 px-5">Neighbourhood</th>
                <th className="py-3 px-4">Tier</th>
                <th className="py-3 px-4">Est. Check (per person)</th>
                <th className="py-3 px-5">Signature Culinary Experience</th>
                <th className="py-3 px-4 text-right">Eateries</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dee8ff]">
              {neighborhoodData.map((row) => {
                const matched = restaurants.filter(
                  r => r.neighborhood.toLowerCase().includes(row.name.toLowerCase())
                );
                return (
                  <tr key={row.name} className="hover:bg-[#f0f3ff]/40 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-[#111c2d]">
                      {row.name}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#8d4b00]">
                      {row.tier}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#111c2d]">
                      {row.avgCheck}
                    </td>
                    <td className="py-3.5 px-5 text-[#554336]">
                      {row.highlight}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {matched.length > 0 ? (
                        <button
                          onClick={() => onSelectRestaurant(matched[0])}
                          className="text-[#8d4b00] hover:underline font-bold text-xs cursor-pointer"
                        >
                          View {matched[0].name.split(' ')[0]}
                        </button>
                      ) : (
                        <span className="text-[#887364]">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
