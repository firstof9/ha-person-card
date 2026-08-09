import { LitElement, html, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { cardStyles } from './styles';
import {
  HomeAssistant,
  PersonCardConfig,
  LovelaceCard,
  AssociatedEntityConfig,
  HassEntity,
} from './types';
import { autoDiscoverEntity } from './helpers';
import './ha-person-card-editor';

const DEFAULT_FRAME_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 530"><defs><mask id="cutout"><rect width="450" height="530" fill="white"/><circle cx="225" cy="235" r="160" fill="black"/><circle cx="54" cy="52" r="42" fill="black"/><circle cx="396" cy="52" r="42" fill="black"/><circle cx="54" cy="385" r="42" fill="black"/><circle cx="396" cy="385" r="42" fill="black"/></mask></defs><rect width="450" height="450" fill="%233a414d" mask="url(%23cutout)"/><rect y="450" width="450" height="80" fill="%232d333c"/><circle cx="225" cy="235" r="160" fill="none" stroke="%23252a32" stroke-width="4"/><circle cx="54" cy="52" r="42" fill="none" stroke="%23252a32" stroke-width="3"/><circle cx="396" cy="52" r="42" fill="none" stroke="%23252a32" stroke-width="3"/><circle cx="54" cy="385" r="42" fill="none" stroke="%23252a32" stroke-width="3"/><circle cx="396" cy="385" r="42" fill="none" stroke="%23252a32" stroke-width="3"/><line x1="0" y1="450" x2="450" y2="450" stroke="%23252a32" stroke-width="2"/></svg>`;

@customElement('ha-person-card')
export class HaPersonCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: PersonCardConfig;

  public static get commandHelp(): string {
    return 'HA Person Card';
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('ha-person-card-editor');
  }

  public static getStubConfig(
    _hass: HomeAssistant,
    entities: string[]
  ): PersonCardConfig {
    const personEntity = entities.find((e) => e.startsWith('person.')) || '';
    return {
      type: 'custom:ha-person-card',
      entity: personEntity,
      name: '',
      home_image: '',
      not_home_image: '',
      overlay_image: '',
      entities: [],
    };
  }

  public setConfig(config: PersonCardConfig): void {
    if (!config.entity) {
      throw new Error('Please define a person entity (e.g. entity: person.chris)');
    }
    this._config = { ...config };
  }

  public getCardSize(): number {
    return 4;
  }

  public getGridOptions(): {
    rows?: number;
    columns?: number;
    min_rows?: number;
    max_rows?: number;
    min_columns?: number;
    max_columns?: number;
  } {
    return {
      rows: 4,
      columns: 6,
      min_rows: 3,
      min_columns: 3,
    };
  }

  static get styles() {
    return cardStyles;
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config || !this._config.entity) {
      return html``;
    }

    const personEntity = this.hass.states[this._config.entity];

    if (!personEntity) {
      return html`
        <ha-card>
          <div class="warning-text">
            Entity not found: ${this._config.entity}
          </div>
        </ha-card>
      `;
    }

    const stateStr = personEntity.state || 'unknown';
    const isHome = stateStr.toLowerCase() === 'home';
    const displayName =
      this._config.name ||
      personEntity.attributes.friendly_name ||
      this._config.entity;

    // Resolve Image URL
    const imageUrl = this._resolveImage(personEntity, stateStr, isHome);

    if (this._config.layout === 'card') {
      return this._renderStandardCard(personEntity, displayName, stateStr, isHome, imageUrl);
    }

    return this._renderFrameCard(personEntity, displayName, stateStr, isHome, imageUrl);
  }

  private _renderFrameCard(
    personEntity: HassEntity,
    displayName: string,
    stateStr: string,
    isHome: boolean,
    imageUrl: string
  ): TemplateResult {
    const overlayUrl = this._config?.overlay_image || DEFAULT_FRAME_SVG;
    const entities = this._getEffectiveEntities(personEntity);
    const isGrayscale = !isHome && this._config?.grayscale_not_home !== false;

    return html`
      <ha-card>
        <div class="frame-container">
          <!-- Layer 1: Avatar Image Behind Frame -->
          <div
            class="avatar-background ${isGrayscale ? 'grayscale' : ''}"
            style="background-image: url('${imageUrl}');"
          ></div>

          <!-- Layer 2: Overlay Frame Image -->
          <img class="frame-overlay-img" src="${overlayUrl}" alt="Frame Overlay" />

          <!-- Layer 3: Interactive Slots -->
          <!-- Slot 0: Top-Left (State Icon) -->
          <div
            class="slot top-left"
            @click=${() => entities[0] && this._handleMoreInfo(entities[0])}
          >
            ${this._renderSlotContent(entities[0], 'icon')}
          </div>

          <!-- Slot 1: Top-Right (State Icon) -->
          <div
            class="slot top-right"
            @click=${() => entities[1] && this._handleMoreInfo(entities[1])}
          >
            ${this._renderSlotContent(entities[1], 'icon')}
          </div>

          <!-- Slot 2: Bottom-Left (State Label) -->
          <div
            class="slot bottom-left"
            @click=${() => entities[2] && this._handleMoreInfo(entities[2])}
          >
            ${this._renderSlotContent(entities[2], 'label')}
          </div>

          <!-- Slot 3: Bottom-Right (State Label) -->
          <div
            class="slot bottom-right"
            @click=${() => entities[3] && this._handleMoreInfo(entities[3])}
          >
            ${this._renderSlotContent(entities[3], 'label')}
          </div>

          <!-- Bottom Center: Zone Location -->
          <div
            class="slot bottom-center"
            @click=${() => this._handleMoreInfo(personEntity.entity_id)}
          >
            <span class="frame-person-state">${stateStr.replace('_', ' ')}</span>
          </div>
        </div>
      </ha-card>
    `;
  }

  private _getEffectiveEntities(personEntity: HassEntity): string[] {
    const configured = (this._config?.entities || []).map((e) =>
      typeof e === 'string' ? e : e?.entity || ''
    );

    const result: string[] = [];
    for (let i = 0; i < 4; i++) {
      if (configured[i]) {
        result.push(configured[i]);
      } else {
        const discovered = autoDiscoverEntity(this.hass, personEntity.entity_id, i);
        result.push(discovered);
      }
    }
    return result;
  }

  private _renderSlotContent(
    entityId: string,
    preferredType: 'icon' | 'label'
  ): TemplateResult {
    if (!entityId || !this.hass) return html``;
    const stateObj = this.hass.states[entityId];
    if (!stateObj)
      return html`<ha-icon icon="mdi:alert-circle-outline"></ha-icon>`;

    if (preferredType === 'icon') {
      const icon = this._getDefaultIcon(stateObj, entityId);
      const style = this._getIconStyle(stateObj, entityId);
      return html`<ha-icon .icon=${icon} style=${style}></ha-icon>`;
    } else {
      const unit = stateObj.attributes.unit_of_measurement || '';
      return html`<span class="slot-label">${stateObj.state}${unit ? ' ' + unit : ''}</span>`;
    }
  }

  private _renderStandardCard(
    personEntity: HassEntity,
    displayName: string,
    stateStr: string,
    isHome: boolean,
    imageUrl: string
  ): TemplateResult {
    const associatedEntities = this._getEffectiveEntities(personEntity).filter(Boolean);
    const isGrayscale = !isHome && this._config?.grayscale_not_home !== false;

    return html`
      <ha-card>
        <div class="card-container">
          <div
            class="hero-section ${isGrayscale ? 'grayscale' : ''}"
            style="background-image: url('${imageUrl}');"
          >
            <div class="hero-overlay"></div>
            <div class="person-info">
              <div class="person-details">
                <h2 class="person-name">${displayName}</h2>
                <div class="person-state-badge">
                  <span
                    class="state-dot ${isHome
        ? 'home'
        : stateStr === 'not_home'
          ? 'not_home'
          : 'custom-zone'}"
                  ></span>
                  <span>${stateStr.replace('_', ' ')}</span>
                </div>
              </div>
            </div>
          </div>

          ${associatedEntities.length > 0
        ? html`
                <div class="entities-grid">
                  ${associatedEntities.map((ent) => this._renderEntityTile(ent))}
                </div>
              `
        : html``}
        </div>
      </ha-card>
    `;
  }

  private _resolveImage(
    personEntity: HassEntity,
    stateStr: string,
    isHome: boolean
  ): string {
    // 1. Check state-specific overrides
    if (isHome && this._config?.home_image) {
      return this._config.home_image;
    }
    if (!isHome && this._config?.not_home_image) {
      return this._config.not_home_image;
    }

    // 2. Check state_image mapping object if provided
    if (this._config?.state_image) {
      if (this._config.state_image[stateStr]) {
        return this._config.state_image[stateStr];
      }
      if (!isHome && this._config.state_image['not_home']) {
        return this._config.state_image['not_home'];
      }
    }

    // 3. Check general avatar image override (image or avatar_image)
    if (this._config?.image) {
      return this._config.image;
    }
    if (this._config?.avatar_image) {
      return this._config.avatar_image;
    }

    // 4. Default to Home Assistant person entity picture attribute
    if (personEntity.attributes.entity_picture) {
      return personEntity.attributes.entity_picture;
    }

    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="100%" height="100%" fill="%232c3e50"/><text x="50%" y="50%" fill="%23ecf0f1" font-size="20" text-anchor="middle" dominant-baseline="middle">${encodeURIComponent(
      stateStr
    )}</text></svg>`;
  }

  private _renderEntityTile(
    entityConfig: string | AssociatedEntityConfig
  ): TemplateResult {
    if (!this.hass) {
      return html``;
    }

    const entityId =
      typeof entityConfig === 'string' ? entityConfig : entityConfig.entity;
    const itemConfig =
      typeof entityConfig === 'object' ? entityConfig : { entity: entityId };

    const entityState = this.hass.states[entityId];

    if (!entityState) {
      return html`
        <div class="entity-tile">
          <ha-icon class="entity-icon" icon="mdi:alert-circle-outline"></ha-icon>
          <div class="entity-details">
            <span class="entity-name">${entityId}</span>
            <span class="entity-state">Unavailable</span>
          </div>
        </div>
      `;
    }

    const friendlyName =
      itemConfig.name ||
      entityState.attributes.friendly_name ||
      entityId.split('.')[1];

    const icon = itemConfig.icon || this._getDefaultIcon(entityState, entityId);
    const iconStyle = this._getIconStyle(entityState, entityId);
    const unit = entityState.attributes.unit_of_measurement || '';
    const stateDisplay = `${entityState.state}${unit ? ' ' + unit : ''}`;

    return html`
      <div
        class="entity-tile"
        @click=${() => this._handleMoreInfo(entityId)}
      >
        <ha-icon class="entity-icon" .icon=${icon} style=${iconStyle}></ha-icon>
        <div class="entity-details">
          <span class="entity-name">${friendlyName}</span>
          <span class="entity-state">${stateDisplay}</span>
        </div>
      </div>
    `;
  }

  private _getDefaultIcon(entityState: HassEntity, entityId: string): string {
    if (entityState.attributes.icon) {
      return entityState.attributes.icon;
    }

    const id = entityId.toLowerCase();

    if (id.includes('battery') || entityState.attributes.device_class === 'battery') {
      const level = Number(entityState.state);
      const isCharging =
        entityState.state === 'charging' ||
        Boolean(entityState.attributes?.battery_charging) ||
        Boolean(entityState.attributes?.is_charging);

      if (isCharging) {
        if (!isNaN(level)) {
          if (level >= 90) return 'mdi:battery-charging-100';
          if (level >= 70) return 'mdi:battery-charging-70';
          if (level >= 50) return 'mdi:battery-charging-50';
          if (level >= 30) return 'mdi:battery-charging-30';
          return 'mdi:battery-charging-10';
        }
        return 'mdi:battery-charging';
      }

      if (!isNaN(level)) {
        if (level >= 90) return 'mdi:battery';
        if (level >= 70) return 'mdi:battery-70';
        if (level >= 50) return 'mdi:battery-50';
        if (level >= 30) return 'mdi:battery-30';
        return 'mdi:battery-10';
      }
      return 'mdi:battery';
    }

    if (id.includes('wifi') || id.includes('wi_fi')) {
      return 'mdi:wifi';
    }

    if (id.includes('drive') || id.includes('waze') || id.includes('travel')) {
      return 'mdi:car';
    }

    if (id.includes('dist') || id.includes('distance')) {
      return 'mdi:map-marker-distance';
    }

    return 'mdi:eye';
  }

  private _getIconStyle(entityState: HassEntity, entityId: string): string {
    const id = entityId.toLowerCase();
    const isBattery =
      id.includes('battery') || entityState.attributes?.device_class === 'battery';

    if (isBattery) {
      const level = Number(entityState.state);
      const isCharging =
        entityState.state === 'charging' ||
        Boolean(entityState.attributes?.battery_charging) ||
        Boolean(entityState.attributes?.is_charging);

      if (isCharging) {
        return `color: var(--state-sensor-battery-charging-color, var(--state-sensor-battery-high-color, var(--success-color, #4caf50)));`;
      }

      if (!isNaN(level)) {
        if (level < 30) {
          return `color: var(--state-sensor-battery-low-color, var(--state-battery-low-color, var(--error-color, #f44336)));`;
        }
        if (level < 70) {
          return `color: var(--state-sensor-battery-medium-color, var(--state-battery-medium-color, var(--warning-color, #ff9800)));`;
        }
        return `color: var(--state-sensor-battery-high-color, var(--state-battery-high-color, var(--success-color, #4caf50)));`;
      }
    }

    return '';
  }

  private _handleMoreInfo(entityId: string): void {
    const event = new CustomEvent('hass-more-info', {
      detail: { entityId },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}

// Register custom card in Home Assistant card picker
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'ha-person-card',
  name: 'HA Person Card',
  description:
    'A modern person card with home/not_home state images and associated entities',
  preview: true,
});

const CARD_VERSION = 'VERSION';
const displayVersion = CARD_VERSION === 'VERSION' ? 'DEV' : CARD_VERSION;

console.info(
  `%c  HA-PERSON-CARD  \n%c  Version ${displayVersion}  `,
  'color: #010e81ff; font-weight: bold; background: #2d333c; padding:3px 0px;',
  'color: white; font-weight: bold; background: dimgrey; padding:3px 0px;'
);
