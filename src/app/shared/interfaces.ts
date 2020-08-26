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

export interface User {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface FbAuthResponse {
   idToken: string;
   expiresIn: string;
   refreshToken: string;
}

export interface SampleType {
  amount: string;
  count: string;
  unit: string;
  name: string;
}

export interface Invoice {
  services: Service[];
  sampleTypes?: SampleType[];
  idx?: number;
  dateOfCreation?: Date; // invoice creating date
  date?: Date;
  client: number | string;
  serviceIds?: any;
  certificationArea: number;
}

export interface Client {
  name: string;
  EDRPOU?: number;
  id?: number;
  address?: string;
  additions?: string;
}
