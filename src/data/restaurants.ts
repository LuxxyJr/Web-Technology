import { Restaurant } from '../types';

export const INITIAL_RESTAURANTS: Restaurant[] = [
  {
    id: 'kanika-mayfair',
    name: 'Kanika at Mayfair Lagoon',
    tagline: 'Royal Kalinga dining, bell-metal thalis & coastal Chilika seafood',
    description: 'An ethereal sanctuary of Odishan culinary royalty nestled within Mayfair Lagoon in Jaydev Vihar. Celebrated for centuries-old recipes from temple kitchens and coastal kingdoms, presented in traditional Kansa bell-metal silverware.',
    neighborhood: 'Jaydev Vihar',
    address: '8-B, Mayfair Lagoon, Jaydev Vihar, Bhubaneswar, Odisha 751013',
    arrivalInfo: 'Complimentary valet parking at Mayfair Lagoon grand portico. 15 minutes from Biju Patnaik International Airport.',
    cuisine: 'Royal Odia & Kalinga Feasts',
    expenditureTier: '₹₹₹₹',
    avgPrice: 1450,
    rating: 4.94,
    reviewCount: 1840,
    heroImage: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80'
    ],
    badges: ['ROYAL KALINGA THALI', '100% AUDITED', 'TOP 1% LUXURY DINING'],
    awardBadge: 'Odisha Tourism Culinary Crown & Verified Heritage Pick 2025',
    availabilityBadge: 'TONIGHT · 8:00 PM (TABLE AVAILABLE)',
    leadSommelier: {
      name: 'Chef Debashish Mohanty',
      title: 'Master Odishan Culinary Curator',
      corkageFee: '₹1,200 (Fine Wines)',
      hospitalityTier: 'Traditional Atithi Seva Included'
    },
    metrics: {
      label1: 'Thali Craft',
      score1: 5.0,
      label2: 'Service',
      score2: 4.9,
      label3: 'Ambience',
      score3: 4.9
    },
    benchmarks: {
      food: 5.0,
      service: 4.9,
      atmosphere: 4.9,
      wine: 4.8,
      value: 4.7
    },
    ratingDistribution: {
      star5: 91,
      star4: 7,
      star3: 2,
      star2: 0,
      star1: 0
    },
    sentimentTags: ['Authentic Odia Taste', 'Heritage Bell-Metal Kansa Thali', 'Cozy Traditional Ambience'],
    occasions: ['Royal Feast & Thali', 'Family Heritage Dining'],
    featuredReviewQuote: {
      quote: 'The Mahathali with Machha Besara and Kanika rice served on brass kansa plates is the crowning glory of Bhubaneswar.',
      authorName: 'Dr. Soumya Ranjan Patnaik',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    tastingFormats: [
      {
        id: 'tf-k1',
        name: 'Royal Kalinga Mahathali (Non-Veg)',
        description: 'Chilika Chingudi Malai curry, Mutton Kassa, Rohi Besara, Kanika Pulao, Badi Chura, and Chhena Poda.',
        price: 1450
      },
      {
        id: 'tf-k2',
        name: 'Ekamra Satvik Thali (Vegetarian)',
        description: 'Temple Dalma, Potala Rasa, Ouu Khatta, Dahi Baigana, Puri Khaja, and hot Chhena Jhili.',
        price: 1050
      }
    ],
    reviews: [
      {
        id: 'rev-k1',
        reviewerName: 'Priyabrata Das',
        reviewerTitle: 'Odisha Culture Chronicler & Food Columnist',
        reviewerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        reviewerBadge: 'Top Critic',
        rating: 5,
        date: 'October 10, 2024',
        occasion: 'Family Heritage Dining',
        seating: 'Lagoon Waterside Pavilion',
        pricePerception: 'Worth Every Penny',
        content: 'Kanika captures the soul of Odia hospitality like nowhere else. The mustard paste in the Machha Besara is stone-ground without bitterness, and the caramelized crust on the Chhena Poda is heavenly.',
        billBreakdown: {
          items: [
            { name: '2x Royal Kalinga Mahathali', price: 2900 },
            { name: '1x Kankada (Chilika Crab) Jholo Supplement', price: 650 },
            { name: '2x Fresh Kokum & Bel Sherbet', price: 300 }
          ],
          subtotal: 3850,
          hospitalityIncluded: true,
          costPerPerson: 1925
        },
        helpfulCount: 68,
        verifiedMethod: 'Verified dining bill match'
      }
    ],
    lat: 20.3012,
    lng: 85.8234
  },
  {
    id: 'dalma-saheed-nagar',
    name: 'Dalma Restaurant',
    tagline: 'The iconic hearth of authentic Odia comfort cuisine & mutton kassa',
    description: 'The indisputable landmark of Bhubaneswar’s authentic culinary scene in Saheed Nagar. Renowned across India for classic wood-simmered Dalma with ghee and roasted cumin, tender Mutton Kassa, and fresh river fish curries.',
    neighborhood: 'Saheed Nagar',
    address: '157, Madhusudan Nagar, Saheed Nagar, Bhubaneswar, Odisha 751007',
    arrivalInfo: 'Centrally located near Sparsh Hospital. Dedicated ground floor parking available.',
    cuisine: 'Traditional Odia Thali & Dalma',
    expenditureTier: '₹₹',
    avgPrice: 380,
    rating: 4.88,
    reviewCount: 3420,
    heroImage: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1200&q=80'
    ],
    badges: ['CULTURAL ICON', 'ODIA HERITAGE', 'VERIFIED DINERS'],
    awardBadge: 'National Geographical Heritage Gastronomy Choice',
    availabilityBadge: 'WALK-IN TABLES OPEN',
    leadSommelier: {
      name: 'Chef Biswanath Rout',
      title: 'Head Chef & Odia Recipe Keeper',
      corkageFee: 'N/A (Traditional Family Dining)',
      hospitalityTier: 'Honest Odia Service'
    },
    metrics: {
      label1: 'Dalma Purity',
      score1: 5.0,
      label2: 'Mutton Flavor',
      score2: 4.9,
      label3: 'Value for Money',
      score3: 4.9
    },
    benchmarks: {
      food: 4.9,
      service: 4.7,
      atmosphere: 4.6,
      wine: 4.2,
      value: 5.0
    },
    ratingDistribution: {
      star5: 88,
      star4: 10,
      star3: 2,
      star2: 0,
      star1: 0
    },
    sentimentTags: ['Authentic Odia Taste', 'Slow-Cooked Claypot', 'Heritage Bell-Metal Kansa Thali'],
    occasions: ['Family Heritage Dining', 'Royal Feast & Thali'],
    featuredReviewQuote: {
      quote: 'The Dalma with fragrant desi ghee and slow-braised Mutton Kassa here define childhood for every Odia.',
      authorName: 'Rashmi Rekha Das',
      authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
    },
    tastingFormats: [
      {
        id: 'tf-d1',
        name: 'Dalma Special Mutton Thali',
        description: 'Signature Dalma, slow-cooked Mutton Kassa, Potala Rasa, Ouu Khatta, Badi Chura, Rice, and Khira Sagara.',
        price: 450
      },
      {
        id: 'tf-d2',
        name: 'Traditional Odia Veg Thali',
        description: 'Steaming Arwa Anna, Dalma, Saga Bhaja, Janhi Posto, Baigana Bhaja, and Chhena Payas.',
        price: 260
      }
    ],
    reviews: [
      {
        id: 'rev-d1',
        reviewerName: 'Subhashree Nayak',
        reviewerTitle: 'Food Blogger & Bhubaneswar Local Guide (Level 8)',
        reviewerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        reviewerBadge: 'Verified Local Guide',
        rating: 5,
        date: 'October 18, 2024',
        occasion: 'Family Heritage Dining',
        seating: 'Main Hall Table 12',
        pricePerception: 'Steal of the Year',
        content: 'Whenever friends visit Bhubaneswar, Dalma is stop number one. The earthy aroma of the toasted cumin and ghee over the lentils with pumpkin and raw papaya is perfection. The Mutton Kassa was tender to the bone.',
        billBreakdown: {
          items: [
            { name: '2x Dalma Special Mutton Thali', price: 900 },
            { name: '1x Machha Chhena Tarkari', price: 280 },
            { name: '2x Chhena Poda Slices', price: 140 }
          ],
          subtotal: 1320,
          hospitalityIncluded: true,
          costPerPerson: 660
        },
        helpfulCount: 52,
        verifiedMethod: 'Verified dining receipt match'
      }
    ],
    lat: 20.2925,
    lng: 85.8456
  },
  {
    id: 'odisha-hotel-saheed',
    name: 'Odisha Hotel',
    tagline: 'Rural Odia feasts, Pakhala Bhata & fresh Chilika mud crabs',
    description: 'A deeply authentic tribute to rural Odisha’s culinary traditions. Dine on village-style earthen thalis with fermented Pakhala, smoked fish, and fiery Kankada (crab) curries made with ancestral spice blends.',
    neighborhood: 'Saheed Nagar',
    address: 'Near BMC Bhawani Mall, Saheed Nagar, Bhubaneswar, Odisha 751007',
    arrivalInfo: 'Opposite Bhawani Mall. Easy parking and auto-rickshaw access.',
    cuisine: 'Coastal Seafood & Chilika Catch',
    expenditureTier: '₹₹',
    avgPrice: 420,
    rating: 4.83,
    reviewCount: 2950,
    heroImage: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80'
    ],
    badges: ['PAKAHLÀ SPECIALIST', 'FRESH CHILIKA CRAB', 'VERIFIED'],
    awardBadge: 'Odisha State Heritage Gastronomy Award 2024',
    availabilityBadge: 'TABLES AVAILABLE TONIGHT',
    leadSommelier: {
      name: 'Santosh Jena',
      title: 'Traditional Beverage & Pakhala Sommelier',
      corkageFee: 'N/A',
      hospitalityTier: 'Warm Village Style'
    },
    metrics: {
      label1: 'Crab & Prawn',
      score1: 4.9,
      label2: 'Pakhala Craft',
      score2: 5.0,
      label3: 'Value',
      score3: 4.8
    },
    benchmarks: {
      food: 4.9,
      service: 4.7,
      atmosphere: 4.7,
      wine: 4.3,
      value: 4.9
    },
    ratingDistribution: {
      star5: 85,
      star4: 12,
      star3: 3,
      star2: 0,
      star1: 0
    },
    sentimentTags: ['Chilika Fresh Catch', 'Authentic Odia Taste', 'Heritage Bell-Metal Kansa Thali'],
    occasions: ['Seafood & Chilika Catch', 'Royal Feast & Thali'],
    featuredReviewQuote: {
      quote: 'Their Pakhala thali with burnt dry fish (Sukhua), Badi Chura, and Kankada Jholo is genuinely soul-stirring.',
      authorName: 'Ansuman Tripathy',
      authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'
    },
    tastingFormats: [
      {
        id: 'tf-oh1',
        name: 'The Grand Pakhala Seafood Platter',
        description: 'Chilled fermented rice with curd, roasted cumin, Chilika Prawn fry, Badi Chura, Saga Bhaja, and Machha Chuda.',
        price: 490
      },
      {
        id: 'tf-oh2',
        name: 'Desi Kankada (Mud Crab) Meal',
        description: 'Whole fresh Chilika mud crab cooked in mustard and garlic gravy with steaming Basmati rice.',
        price: 520
      }
    ],
    reviews: [
      {
        id: 'rev-oh1',
        reviewerName: 'Alok Mishra',
        reviewerTitle: 'Software Architect & Weekend Gastronome, Infocity',
        reviewerAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
        reviewerBadge: 'Verified Diner',
        rating: 5,
        date: 'October 22, 2024',
        occasion: 'Seafood & Chilika Catch',
        seating: 'Traditional Bamboo Alcove',
        pricePerception: 'Fair Value for Mastery',
        content: 'Hands down the freshest crab in Bhubaneswar. The curry has that smoky mustard pungency that brings tears of joy. Incredible value for fresh seafood.',
        helpfulCount: 44,
        verifiedMethod: 'Verified UPI payment match'
      }
    ],
    lat: 20.2911,
    lng: 85.8423
  },
  {
    id: 'michaels-kitchen-patia',
    name: "Michael's Kitchen",
    tagline: 'Modern coastal Odia atelier, bamboo mutton & foraged wild mushrooms',
    description: 'Bhubaneswar’s leading progressive dining atelier on Infocity Road, Patia. Master Chef Michael creates culinary magic by combining ancient foraged Odia botanicals, wild mushrooms (Chhatu Besara), and bamboo-smoked meats.',
    neighborhood: 'Patia & Infocity',
    address: 'Infocity Road, Near Silicon Institute, Patia, Bhubaneswar, Odisha 751024',
    arrivalInfo: 'Ample parking in Infocity IT corridor. 5 minutes from KIIT University campus.',
    cuisine: 'Coastal Seafood & Chilika Catch',
    expenditureTier: '₹₹₹',
    avgPrice: 750,
    rating: 4.87,
    reviewCount: 1620,
    heroImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80'
    ],
    badges: ['CHEF ATELIER', 'BAMBOO MUTTON', 'VERIFIED DINERS'],
    awardBadge: 'Bhubaneswar Modern Gastronomy Pioneer 2025',
    availabilityBadge: 'TONIGHT · 8:30 PM (2 TABLES)',
    leadSommelier: {
      name: 'Chef Michael Rao',
      title: 'Patron Chef & Gastronomy Alchemist',
      corkageFee: '₹800',
      hospitalityTier: 'Boutique Culinary Table'
    },
    metrics: {
      label1: 'Smoked Mutton',
      score1: 4.9,
      label2: 'Chilika Seafood',
      score2: 4.9,
      label3: 'Aesthetics',
      score3: 4.8
    },
    benchmarks: {
      food: 4.9,
      service: 4.8,
      atmosphere: 4.8,
      wine: 4.7,
      value: 4.8
    },
    ratingDistribution: {
      star5: 87,
      star4: 11,
      star3: 2,
      star2: 0,
      star1: 0
    },
    sentimentTags: ['Slow-Cooked Claypot', 'Chilika Fresh Catch', 'Cozy Traditional Ambience'],
    occasions: ['Royal Feast & Thali', 'Seafood & Chilika Catch'],
    featuredReviewQuote: {
      quote: 'The bamboo smoked mutton and the roasted coconut crab claws are absolute revelations.',
      authorName: 'Rohan Senapati',
      authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    },
    tastingFormats: [
      {
        id: 'tf-mk1',
        name: 'The Coastal Atelier Tasting (6 Courses)',
        description: 'Chilika tiger prawns, bamboo slow-smoked mutton, foraged wild mushroom besara, and baked jaggery custard.',
        price: 850
      }
    ],
    reviews: [
      {
        id: 'rev-mk1',
        reviewerName: 'Deepak Sen',
        reviewerTitle: 'Tech Entrepreneur & Food Critic, KIIT Road',
        reviewerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
        reviewerBadge: 'Top Critic',
        rating: 5,
        date: 'October 14, 2024',
        occasion: 'Royal Feast & Thali',
        seating: 'Chef Counter Pavilion',
        pricePerception: 'Worth Every Penny',
        content: 'Chef Michael’s bamboo mutton is smoked to butter-like tenderness with genuine sal wood smoke. If you want modern gastronomic brilliance rooted in Odisha, this is the destination.',
        helpfulCount: 39,
        verifiedMethod: 'Verified reservation via TasteIndex'
      }
    ],
    lat: 20.3541,
    lng: 85.8193
  },
  {
    id: 'zaika-matka-mutton',
    name: 'Zaika Matka & Khurda Dhaba',
    tagline: 'Sealed earthenware handi mutton slow-cooked over sal-wood embers',
    description: 'The temple of rustic Odishan non-veg cooking on Cuttack Road. Earthen clay handis are packed with raw spices, mustard oil, and tender mutton, sealed with wheat dough, and simmered for 4 hours over burning coals.',
    neighborhood: 'Cuttack Road & Rasulgarh',
    address: 'Near Rasulgarh Square, Cuttack Road, Bhubaneswar, Odisha 751010',
    arrivalInfo: 'Located just off NH16 at Rasulgarh intersection. Free open lot parking.',
    cuisine: 'Slow-Cooked Matka & Claypot Mutton',
    expenditureTier: '₹₹',
    avgPrice: 360,
    rating: 4.81,
    reviewCount: 2780,
    heroImage: 'https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80'
    ],
    badges: ['SAL-WOOD MATKA', 'BEST VALUE AWARD', 'VERIFIED'],
    awardBadge: 'Bhubaneswar Highway Food Legend 2024',
    availabilityBadge: 'FRESH HANDI READY NOW',
    metrics: {
      label1: 'Mutton Tenderness',
      score1: 5.0,
      label2: 'Spice Balance',
      score2: 4.8,
      label3: 'Value Index',
      score3: 5.0
    },
    benchmarks: {
      food: 4.9,
      service: 4.6,
      atmosphere: 4.4,
      wine: 4.0,
      value: 5.0
    },
    ratingDistribution: {
      star5: 86,
      star4: 11,
      star3: 3,
      star2: 0,
      star1: 0
    },
    sentimentTags: ['Slow-Cooked Claypot', 'Authentic Odia Taste'],
    occasions: ['Late Night Dhaba', 'Family Heritage Dining'],
    featuredReviewQuote: {
      quote: 'Cracking open the dough seal of the clay matka releases an aroma of roasted spices you never forget.',
      authorName: 'Sanjay Behera',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    tastingFormats: [
      {
        id: 'tf-zm1',
        name: 'Whole Handi Matka Mutton (Serves 2)',
        description: '1kg claypot slow cooked mutton with whole garlic heads, served with 4 butter tandoori rotis.',
        price: 720
      }
    ],
    reviews: [
      {
        id: 'rev-zm1',
        reviewerName: 'Kabir Satpathy',
        reviewerTitle: 'Automotive Engineer & Night Food Enthusiast',
        reviewerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        reviewerBadge: 'Verified Diner',
        rating: 5,
        date: 'October 16, 2024',
        occasion: 'Late Night Dhaba',
        seating: 'Courtyard Wooden Table',
        pricePerception: 'Steal of the Year',
        content: 'The meat falls off the bone with zero resistance. The fat rendered with whole crushed garlic and whole cloves inside the unglazed pot creates a sauce of pure gold. Best handi mutton in the state.',
        helpfulCount: 57,
        verifiedMethod: 'Verified QR bill settlement'
      }
    ],
    lat: 20.2989,
    lng: 85.8612
  },
  {
    id: 'truptee-bapuji-nagar',
    name: 'Truptee Veg Restaurant',
    tagline: '40 years of pure vegetarian heritage, Odia Paneer Besara & hot Rasabali',
    description: 'The golden matriarch of vegetarian dining in Bhubaneswar since 1982. Famous for Satvik temple delicacies, rich Paneer Besara, Chana Masala, and legendary sweet shop offering warm Rasabali and Chhena Jhili.',
    neighborhood: 'Bapuji Nagar',
    address: '67, Bapuji Nagar, Near Master Canteen Square, Bhubaneswar, Odisha 751009',
    arrivalInfo: '2 minutes walk from Bhubaneswar Railway Station (Master Canteen side).',
    cuisine: 'Pure Vegetarian & Temple Satvik',
    expenditureTier: '₹',
    avgPrice: 180,
    rating: 4.74,
    reviewCount: 3890,
    heroImage: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80'
    ],
    badges: ['PURE VEGETARIAN', 'SINCE 1982', 'VERIFIED'],
    awardBadge: 'Odisha Pure Veg Heritage Icon',
    availabilityBadge: 'OPEN 7:30 AM – 10:30 PM',
    metrics: {
      label1: 'Satvik Flavors',
      score1: 4.9,
      label2: 'Sweet Freshness',
      score2: 5.0,
      label3: 'Value',
      score3: 5.0
    },
    benchmarks: {
      food: 4.8,
      service: 4.7,
      atmosphere: 4.6,
      wine: 4.0,
      value: 5.0
    },
    ratingDistribution: {
      star5: 82,
      star4: 15,
      star3: 3,
      star2: 0,
      star1: 0
    },
    sentimentTags: ['Authentic Odia Taste', 'Warm Salepur Sweets'],
    occasions: ['Authentic Morning Breakfast', 'Family Heritage Dining'],
    featuredReviewQuote: {
      quote: 'Morning Puri-Upma with Ghugni followed by their freshly made Rasabali is heaven on earth.',
      authorName: 'Girija Prasad',
      authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'
    },
    tastingFormats: [
      {
        id: 'tf-tr1',
        name: 'Deluxe Satvik Thali',
        description: 'Paneer Besara, Dalma, Aloo Potola Kassa, Sweet Chutney, Poori, Jeera Rice, and Rasabali.',
        price: 240
      }
    ],
    reviews: [
      {
        id: 'rev-tr1',
        reviewerName: 'Manaswini Mohapatra',
        reviewerTitle: 'Professor & Old Bhubaneswar Native',
        reviewerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        reviewerBadge: 'Verified Local Guide',
        rating: 5,
        date: 'October 25, 2024',
        occasion: 'Authentic Morning Breakfast',
        seating: 'Heritage Family Section',
        pricePerception: 'Steal of the Year',
        content: 'Truptee is an institution. We have been coming here for family lunches for three generations. The quality has remained consistently superior.',
        helpfulCount: 48,
        verifiedMethod: 'Verified counter receipt match'
      }
    ],
    lat: 20.2643,
    lng: 85.8398
  },
  {
    id: 'bikalananda-kar-nayapalli',
    name: "Bikalananda Kar's Rasagola & Cafe",
    tagline: 'The world-famous Salepur brown rasagola, chhena jhili & khira gaja',
    description: 'The golden legacy of Bikalananda Kar, who created the legendary Salepur Rasagola in 1954. Soft, warm, melt-in-mouth brown rasagolas soaked in light cardamom syrup, alongside fresh morning breakfast.',
    neighborhood: 'Nayapalli',
    address: 'Near ISKCON Temple, Nayapalli, Bhubaneswar, Odisha 751012',
    arrivalInfo: 'Adjacent to ISKCON temple on NH16 flyover service road.',
    cuisine: 'Heritage Odia Sweets & Chhena',
    expenditureTier: '₹',
    avgPrice: 120,
    rating: 4.86,
    reviewCount: 4210,
    heroImage: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80'
    ],
    badges: ['WORLD FAMOUS SALEPUR', 'GI TAG HERITAGE', 'VERIFIED'],
    awardBadge: 'World Chhena & Confectionery Legacy',
    availabilityBadge: 'HOT BATCH AVAILABLE',
    metrics: {
      label1: 'Chhena Softness',
      score1: 5.0,
      label2: 'Syrup Balance',
      score2: 4.9,
      label3: 'Heritage Taste',
      score3: 5.0
    },
    benchmarks: {
      food: 5.0,
      service: 4.7,
      atmosphere: 4.6,
      wine: 4.0,
      value: 5.0
    },
    ratingDistribution: {
      star5: 89,
      star4: 9,
      star3: 2,
      star2: 0,
      star1: 0
    },
    sentimentTags: ['Warm Salepur Sweets', 'Authentic Odia Taste'],
    occasions: ['Authentic Morning Breakfast', 'All Occasions'],
    featuredReviewQuote: {
      quote: 'Biting into a warm Bikalananda Kar rasagola is like tasting pure clouds of fresh chhena.',
      authorName: 'Jyoti Prakash',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    tastingFormats: [
      {
        id: 'tf-bk1',
        name: 'Heritage Odia Sweets Sampler (4 Types)',
        description: '2x Warm Salepur Rasagola, 1x Chhena Jhili, 1x Baked Rasagola, and 1x Khira Gaja.',
        price: 150
      }
    ],
    reviews: [
      {
        id: 'rev-bk1',
        reviewerName: 'Priyanka Panigrahi',
        reviewerTitle: 'Culinary Anthropologist & Food Historian',
        reviewerBadge: 'Top Critic',
        rating: 5,
        date: 'October 12, 2024',
        occasion: 'All Occasions',
        seating: 'Sweets Tasting Counter',
        pricePerception: 'Steal of the Year',
        content: 'Odisha rasagola has a texture unmatched by any sweet in India. The light amber syrup and the tender crumb of fresh cow milk chhena is unbeatable.',
        helpfulCount: 63,
        verifiedMethod: 'Verified in-store match'
      }
    ],
    lat: 20.2985,
    lng: 85.8176
  }
];

export const BHUBANESWAR_NEIGHBORHOODS = [
  'All Neighbourhoods',
  'Jaydev Vihar',
  'Saheed Nagar',
  'Patia & Infocity',
  'Nayapalli',
  'Bapuji Nagar',
  'Cuttack Road & Rasulgarh'
];

export const CUISINE_TYPES = [
  'All Cuisines',
  'Royal Odia & Kalinga Feasts',
  'Traditional Odia Thali & Dalma',
  'Coastal Seafood & Chilika Catch',
  'Slow-Cooked Matka & Claypot Mutton',
  'Pure Vegetarian & Temple Satvik',
  'Heritage Odia Sweets & Chhena'
];

export const OCCASIONS_LIST = [
  'All Occasions',
  'Royal Feast & Thali',
  'Family Heritage Dining',
  'Seafood & Chilika Catch',
  'Late Night Dhaba',
  'Authentic Morning Breakfast'
];

export const SENTIMENT_TAGS_LIST = [
  'Authentic Odia Taste',
  'Slow-Cooked Claypot',
  'Chilika Fresh Catch',
  'Heritage Bell-Metal Kansa Thali',
  'Warm Salepur Sweets',
  'Cozy Traditional Ambience'
];
