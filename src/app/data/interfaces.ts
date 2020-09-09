export interface Category {
  id: number;
  title: string;
  extended: boolean;
}

export interface Subcategory {
  id: number;
  categoryId: number;
  title: string;
  extended: boolean;
}



export interface SubSubcategory {
  id: number;
  subcategoryId: number;
  title: string;
  extended: boolean;
}

export interface Service {
  id: number;
  title: string;
  categoryId: number;
  subcategoryId?: number;
  subSubcategoryId?: number;
  prices: any;
}

export interface ServicePack {
  id: number;
  title?: string;
  serviceIds: number[];
}

