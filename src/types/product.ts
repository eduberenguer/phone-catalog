export type Product = {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
};

export type ColorOption = {
  name: string;
  hexCode: string;
  imageUrl: string;
};

export type StorageOption = {
  capacity: string;
  price: number;
};

export type Specs = {
  screen?: string;
  resolution?: string;
  processor?: string;
  mainCamera?: string;
  selfieCamera?: string;
  battery?: string;
  os?: string;
  screenRefreshRate?: string;
  storage?: string;
};

export interface ProductDetail extends Product {
  description: string;
  rating: number;
  specs: Specs;
  storageOptions: StorageOption[];
  colorOptions: ColorOption[];
  similarProducts: Product[];
}
