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


export interface Invoice {
  sampleTypes?: SampleType[];
  idx?: number;
  dateOfCreation?: Date; // invoice creating date
  date?: Date;
  client: number | string;
  amount: number;
  paidAmount?: number;
  serviceIds?: ServiceIds;
  monitoringServiceIds?: any;
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

export interface MonitoringServices {
  3: number;
  2: number;
  24: number;
  26: number;
  27: number;
  28: number;
  19: number;
  11: number;
  15: number;
  34: number;
  52: number;
  55: number;
  81: number;
  82: number;
  118: number;
  112: number;
  453: number;
  454: number;
  455: number;
  456: number;
  432: number;
  457: number;
  458: number;
  459: number;
}
