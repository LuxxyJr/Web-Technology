export type ExpenditureTier = '₹' | '₹₹' | '₹₹₹' | '₹₹₹₹';

export interface BillItem {
  name: string;
  price: number;
}

export interface ReviewItem {
  id: string;
  reviewerName: string;
  reviewerTitle: string;
  reviewerAvatar?: string;
  reviewerBadge: 'Top Critic' | 'Verified Local Guide' | 'Verified Diner' | 'Master Sommelier';
  rating: number;
  date: string;
  occasion: string;
  seating: string;
  pricePerception: 'Worth Every Penny' | 'Fair Value for Mastery' | 'Pricey for Portions' | 'Steal of the Year';
  content: string;
  billBreakdown?: {
    items: BillItem[];
    subtotal: number;
    hospitalityIncluded: boolean;
    costPerPerson: number;
  };
  photos?: string[];
  helpfulCount: number;
  userVotedHelpful?: boolean;
  verifiedMethod: string;
}

export interface TastingFormat {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface BenchmarkScores {
  food: number;
  service: number;
  atmosphere: number;
  wine: number;
  value: number;
}

export interface RatingDistribution {
  star5: number;
  star4: number;
  star3: number;
  star2: number;
  star1: number;
}

export interface Restaurant {
  id: string;
  name: string;
  tagline: string;
  description: string;
  neighborhood: string;
  address: string;
  arrivalInfo: string;
  cuisine: string;
  expenditureTier: ExpenditureTier;
  avgPrice: number;
  rating: number;
  reviewCount: number;
  heroImage: string;
  galleryImages: string[];
  badges: string[];
  awardBadge?: string;
  availabilityBadge: string;
  leadSommelier?: {
    name: string;
    title: string;
    corkageFee: string;
    hospitalityTier: string;
  };
  metrics: {
    label1: string;
    score1: number;
    label2: string;
    score2: number;
    label3: string;
    score3: number;
  };
  benchmarks: BenchmarkScores;
  ratingDistribution: RatingDistribution;
  sentimentTags: string[];
  occasions: string[];
  featuredReviewQuote: {
    quote: string;
    authorName: string;
    authorAvatar: string;
  };
  tastingFormats: TastingFormat[];
  reviews: ReviewItem[];
  lat: number;
  lng: number;
}

export interface FilterState {
  searchQuery: string;
  neighborhood: string;
  cuisine: string;
  tiers: ExpenditureTier[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  verifiedOnly: boolean;
  reviewVolume: string[];
  sentimentTags: string[];
  occasion: string;
  sortBy: 'highest-rated' | 'price-low' | 'price-high' | 'most-reviewed' | 'trending';
}
