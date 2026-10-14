import React from 'react';
import { Restaurant } from '../types';

interface CollectionsViewProps {
  restaurants: Restaurant[];
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

export const CollectionsView: React.FC<CollectionsViewProps> = ({
  restaurants,
  onSelectRestaurant
}) => {
  const collections = [
    {
      id: 'royal-kalinga',
      title: 'Royal Kalinga Mahathalis & Lagoon Ateliers',
      subtitle: 'Lavish multi-course bell-metal thalis, Machha Besara, and caramelized Chhena Poda in Jaydev Vihar.',
      count: 'Mayfair & Fine Dining',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80',
      badge: 'ROYAL HERITAGE',
      restaurantId: 'kanika-mayfair'
    },
    {
      id: 'iconic-dalma',
      title: 'Iconic Dalma & Odia Comfort Hearths',
      subtitle: 'Slow-simmered lentils with raw papaya, coconut, toasted cumin, and tender mutton kassa.',
      count: 'Saheed Nagar Landmark',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
      badge: 'CULTURAL ICON',
      restaurantId: 'dalma-saheed-nagar'
    },
    {
      id: 'chilika-catch',
      title: 'Chilika Lagoon Mud Crabs & Jumbo Tiger Prawns',
      subtitle: 'Fresh daily catch from the Chilika lagoon cooked in village-style mustard gravies with fermented Pakhala.',
      count: 'Fresh Coastal Seafood',
      image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80',
      badge: 'COASTAL SPECIALTY',
      restaurantId: 'odisha-hotel-saheed'
    },
    {
      id: 'matka-mutton',
      title: 'Sal-Wood Ember Matka Handi Mutton',
      subtitle: 'Clay pots sealed with wheat dough, slow-cooked for 4 hours with whole garlic bulbs and mustard oil.',
      count: 'Cuttack Road Legends',
      image: 'https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=800&q=80',
      badge: 'SLOW-COOKED CLAYPOT',
      restaurantId: 'zaika-matka-mutton'
    },
    {
      id: 'salepur-rasagola',
      title: 'Century-Old Salepur Rasagola & Chhena Delicacies',
      subtitle: 'The golden legacy of Bikalananda Kar since 1954: tender, amber-syrup rasagolas and chhena jhili.',
      count: 'GI Tagged Legacy',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
      badge: 'WORLD FAMOUS SWEETS',
      restaurantId: 'bikalananda-kar-nayapalli'
    },
    {
      id: 'satvik-pure-veg',
      title: 'Pure Vegetarian Institutions & Master Canteen Breakfast',
      subtitle: '40 years of pure vegetarian heritage, Satvik temple paneer besara, and morning Puri-Upma with Ghugni.',
      count: 'Pure Veg Legacy',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
      badge: 'VEGETARIAN ICON',
      restaurantId: 'truptee-bapuji-nagar'
    }
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8 space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-xs text-[#8d4b00] uppercase font-bold tracking-wider">
          <span>Odishan Epicurean Portfolios</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span>Bhubaneswar</span>
        </div>
        <h1 className="font-['Epilogue'] text-2xl sm:text-3xl font-bold text-[#111c2d]">
          Curated Bhubaneswar Collections
        </h1>
        <p className="text-xs text-[#554336] max-w-2xl leading-relaxed">
          Thematic culinary journeys through the temples, lagoon shores, and rustic hearths of Odisha&apos;s temple city.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((col) => {
          const featured = restaurants.find(r => r.id === col.restaurantId) || restaurants[0];
          return (
            <div
              key={col.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#dee8ff] shadow-xs hover:shadow-md transition-shadow flex flex-col group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#e7eeff]">
                <img
                  alt={col.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  src={col.image}
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-white text-[10px] font-bold">
                  {col.badge}
                </div>
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[#111c2d] text-[10px] font-bold">
                  {col.count}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between gap-3">
                <div className="space-y-1.5">
                  <h3 className="font-['Epilogue'] text-base font-bold text-[#111c2d] leading-snug">
                    {col.title}
                  </h3>
                  <p className="text-xs text-[#554336] leading-relaxed">
                    {col.subtitle}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#dee8ff] flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#8d4b00]">
                    Spotlight: {featured.name.split(' ')[0]}
                  </span>
                  <button
                    onClick={() => onSelectRestaurant(featured)}
                    className="bg-[#f0f3ff] hover:bg-[#dee8ff] text-[#111c2d] text-xs font-bold py-1.5 px-3 rounded-lg transition-colors cursor-pointer"
                  >
                    View Establishment
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
