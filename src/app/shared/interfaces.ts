import {Service} from '../data/interfaces';

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

// export interface Invoice {
//   services: Service[];
//   date: Date;
//   invoiceNumber: number;
// }

export interface SampleType {
  amount: string;
  count: string;
  unit: string;
  name: string;
}

// export interface Monitoring {
//
// }
export interface Invoice {
  // services: Service[];
  sampleTypes?: SampleType[];
  idx?: number;
  dateOfCreation?: Date; // invoice creating date
  date?: Date;
  client: number | string;
  serviceIds?: ServiceIds;
  monitoringServiceIds?: number[];
  certificationArea?: number;
  additionalSum?: number;
}

export interface ServiceIds {
  services: number[];
  servicePacks: any;
}

export interface Client {
  name: string;
  EDRPOU?: number;
  id?: number;
  address?: string;
  additions?: string;
}
