
export enum View {
  FUNNEL = 'funnel',
  OFFER = 'offer',
  SCRIPTS = 'scripts',
  PROFILE = 'profile',
  LOGIN = 'login'
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface FunnelData {
  tofu: number;
  mofu: number;
  bofu: number;
  priorityText: string;
  prioritySubtext: string;
  lastUpdated: string;
}

export interface OfferItem {
  id: string;
  name: string;
  description: string;
  value: number;
}

export interface OfferData {
  promise: string;
  stack: OfferItem[];
  price: number;
  lastUpdated: string;
}

export interface ScriptVariation {
  id: string;
  angle: string;
  title: string;
  hook: string;
  value: string;
  cta: string;
}

export interface ScriptData {
  baseIdea: string;
  variations: ScriptVariation[];
  lastUpdated: string;
}
