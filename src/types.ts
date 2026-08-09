export interface AssociatedEntityConfig {
  entity: string;
  name?: string;
  icon?: string;
  secondary_info?: string;
}

export interface PersonCardConfig {
  type: string;
  entity: string;
  name?: string;
  image?: string;
  avatar_image?: string;
  home_image?: string;
  not_home_image?: string;
  overlay_image?: string;
  grayscale_not_home?: boolean;
  state_image?: Record<string, string>;
  entities?: (string | AssociatedEntityConfig)[];
  show_state?: boolean;
  layout?: 'frame' | 'card';
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: {
    friendly_name?: string;
    entity_picture?: string;
    icon?: string;
    unit_of_measurement?: string;
    device_class?: string;
    battery_level?: number;
    [key: string]: any;
  };
  last_changed: string;
  last_updated: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  callService: (domain: string, service: string, serviceData?: object) => Promise<void>;
  language: string;
  themes: any;
  locale: any;
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: PersonCardConfig): void;
  getCardSize?(): number;
}

export interface CustomCardEntry {
  type: string;
  name: string;
  description: string;
  preview?: boolean;
  documentationURL?: string;
}

declare global {
  interface Window {
    customCards?: CustomCardEntry[];
  }
}
