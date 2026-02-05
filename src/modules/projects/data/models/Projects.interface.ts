export interface User {
  name: string;
  lastName: string;
}

export interface Position {
  _id: string;
  lat: number;
  lng: number;
}

export interface ClientData {
  title: string;
  _id: string;
}

export interface PartnerClient {
  _id: string;
  maxUsers: number;
  maxAdmins: number;
  maxStorage: number;
}

export interface ProjectPlanData {
  plan: 'small' | 'big' | string;
}

export interface Incident {
  _id: string;
  status: 'active' | 'close' | string;
  item: 'incidents' | 'RFI' | string;
  description: string;
  owner: string;
  tag: 'inside' | 'abroad' | string;
  coordinates: {
    lat: number;
    lng: number;
  };
  limitDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  _id: string;
  title: string;
  projectPlan: { _id: string };
  status: 'active' | 'suspended' | 'close' | string;
  img: string;
  lastVisit: string;
  position: Position;
  users: User[];
  clientData: ClientData;
  city: string;
  lastUpdated: string;
  partnerClients: PartnerClient[];
  companyId: string;
  address: string;
  projectClientAdmin: string[];
  projectPlanData: ProjectPlanData;
  createdAt: string;
  incidents: Incident[];
}
