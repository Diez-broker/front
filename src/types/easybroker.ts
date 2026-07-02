export type PropertyOperationType = "sale" | "rental" | "temporary_rental";

export interface PropertyOperation {
  type: PropertyOperationType;
  amount: number;
  formatted_amount: string;
  currency: string;
  unit?: "total" | "square_meter" | "hectare";
  period?: "monthly" | "weekly" | "daily";
}

export interface PropertyForList {
  public_id: string;
  title: string;
  slug: string;
  title_image_full: string;
  title_image_thumb: string;
  bedrooms?: number;
  bathrooms?: number;
  parking_spaces?: number;
  location: string;
  neighborhood?: string;
  municipality?: string;
  state?: string;
  property_type: string;
  updated_at: string;
  agent?: string;
  show_prices?: boolean;
  share_commission?: boolean;
  operations: PropertyOperation[];
  construction_size?: number;
  lot_size?: number;
  description?: string;
  featured?: boolean;
}

export interface PropertyListResponse {
  pagination: {
    limit: number;
    page: number;
    total: number;
    next_page: string | null;
  };
  content: PropertyForList[];
}

export type SortOption = "newest" | "price_asc" | "price_desc";

export interface PropertySearchParams {
  operation_type?: PropertyOperationType;
  min_price?: number;
  max_price?: number;
  min_bedrooms?: number;
  max_bedrooms?: number;
  min_bathrooms?: number;
  max_bathrooms?: number;
  property_types?: string[];
  location?: string;
  state?: string;
  municipality?: string;
  min_construction?: number;
  min_lot?: number;
  sort?: SortOption;
}
