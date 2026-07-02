import { create } from "zustand";
import {
  PropertyForList,
  PropertySearchParams,
  PropertyOperationType,
  SortOption,
} from "@/types/easybroker";
import { PROPERTIES } from "@/data/properties";

interface PropertyState {
  properties: PropertyForList[];
  filteredProperties: PropertyForList[];
  searchParams: PropertySearchParams;
  isLoading: boolean;
  setSearchParams: (params: Partial<PropertySearchParams>) => void;
  resetFilters: () => void;
  fetchProperties: () => Promise<void>;
  filterByOperation: (operation: PropertyOperationType) => PropertyForList[];
  sortProperties: (
    properties: PropertyForList[],
    sort: SortOption,
    operation: PropertyOperationType
  ) => PropertyForList[];
}

const DEFAULT_PARAMS: PropertySearchParams = {
  operation_type: "sale",
  sort: "newest",
};

function getPriceForOperation(
  property: PropertyForList,
  operation: PropertyOperationType
): number {
  const op = property.operations.find((o) => o.type === operation);
  return op?.amount ?? 0;
}

export const usePropertyStore = create<PropertyState>((set, get) => ({
  properties: PROPERTIES,
  filteredProperties: PROPERTIES.filter((p) =>
    p.operations.some((op) => op.type === "sale")
  ),
  searchParams: DEFAULT_PARAMS,
  isLoading: false,

  setSearchParams: (params) => {
    set((state) => {
      const newParams = { ...state.searchParams, ...params };
      const operation = newParams.operation_type ?? "sale";

      let filtered = state.properties.filter((property) => {
        if (!property.operations.some((op) => op.type === operation)) {
          return false;
        }

        const price = getPriceForOperation(property, operation);

        if (newParams.property_types && newParams.property_types.length > 0) {
          if (!newParams.property_types.includes(property.property_type)) {
            return false;
          }
        }

        if (newParams.location) {
          const q = newParams.location.toLowerCase();
          const matches =
            property.location.toLowerCase().includes(q) ||
            property.neighborhood?.toLowerCase().includes(q) ||
            property.municipality?.toLowerCase().includes(q) ||
            property.state?.toLowerCase().includes(q);
          if (!matches) return false;
        }

        if (newParams.state && property.state !== newParams.state) {
          return false;
        }

        if (
          newParams.municipality &&
          property.municipality !== newParams.municipality
        ) {
          return false;
        }

        if (newParams.min_bedrooms !== undefined) {
          if ((property.bedrooms ?? 0) < newParams.min_bedrooms) return false;
        }
        if (newParams.max_bedrooms !== undefined) {
          if ((property.bedrooms ?? 0) > newParams.max_bedrooms) return false;
        }

        if (newParams.min_bathrooms !== undefined) {
          if ((property.bathrooms ?? 0) < newParams.min_bathrooms) return false;
        }
        if (newParams.max_bathrooms !== undefined) {
          if ((property.bathrooms ?? 0) > newParams.max_bathrooms) return false;
        }

        if (newParams.min_price !== undefined && price < newParams.min_price) {
          return false;
        }
        if (newParams.max_price !== undefined && price > newParams.max_price) {
          return false;
        }

        if (
          newParams.min_construction !== undefined &&
          (property.construction_size ?? 0) < newParams.min_construction
        ) {
          return false;
        }

        if (
          newParams.min_lot !== undefined &&
          (property.lot_size ?? 0) < newParams.min_lot
        ) {
          return false;
        }

        return true;
      });

      filtered = get().sortProperties(filtered, newParams.sort ?? "newest", operation);

      return { searchParams: newParams, filteredProperties: filtered };
    });
  },

  resetFilters: () => {
    set({ searchParams: DEFAULT_PARAMS });
    get().setSearchParams({});
  },

  fetchProperties: async () => {
    set({ isLoading: true });
    setTimeout(() => {
      set({ isLoading: false });
    }, 300);
  },

  filterByOperation: (operation) => {
    return get().properties.filter((p) =>
      p.operations.some((op) => op.type === operation)
    );
  },

  sortProperties: (properties, sort, operation) => {
    const sorted = [...properties];
    if (sort === "price_asc") {
      sorted.sort(
        (a, b) =>
          getPriceForOperation(a, operation) -
          getPriceForOperation(b, operation)
      );
    } else if (sort === "price_desc") {
      sorted.sort(
        (a, b) =>
          getPriceForOperation(b, operation) -
          getPriceForOperation(a, operation)
      );
    } else {
      sorted.sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    }
    return sorted;
  },
}));
