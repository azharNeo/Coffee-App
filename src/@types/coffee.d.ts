export interface Coffee {
  id: string;
  name: string;
  description: string;
  roasted: string;
  imagelink_square: ImageSourcePropType | undefined;
  imagelink_portrait: ImageSourcePropType | undefined;
  ingredients: string;
  special_ingredient: string;
  prices: Price[];
  average_rating: number;
  ratings_count: string;
  favourite: boolean;
  type: string;
  index: number;
}

export interface Price {
  size: string;
  price: string;
  currency: string;
}
