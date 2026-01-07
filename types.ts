
export interface ProductDetail {
  id: string;
  name: string;
  position: [number, number, number];
  description_fallback: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  color: string;
  features: string[];
  specs: Record<string, string>;
  modelType: 'console' | 'controller' | 'headset' | 'monitor';
  details: ProductDetail[];
}

export enum HardwareType {
  PS5_PRO = 'ps5-pro',
  PS5_SLIM = 'ps5-slim',
  DUALSENSE_EDGE = 'dualsense-edge',
  PULSE_ELITE = 'pulse-elite',
  INZONE_M10S = 'inzone-m10s'
}
