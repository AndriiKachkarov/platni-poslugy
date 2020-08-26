export interface Category {
  id: number;
  title: string;
  extended: boolean;
}

export interface Subcategory {
  id: number;
  category: Category;
  title: string;
  extended: boolean;
}



export interface SubSubcategory {
  id: number;
  subcategory: Subcategory;
  title: string;
  extended: boolean;
}

export interface Service {
  id: number;
  title: string;
  category: Category;
  subcategory?: Subcategory;
  subSubcategory?: SubSubcategory;
  price: number;
  mainPrice?: number;
}

export interface ServicePack {
  id: number;
  title?: string;
  servicesIDs: number[];
}

