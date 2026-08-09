import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, PersonCardConfig } from './types';
import { autoDiscoverEntity } from './helpers';

const SLOT_LABELS = [
  'Top-Left Entity (Icon - e.g. Battery)',
  'Top-Right Entity (Icon - e.g. Wi-Fi)',
  'Bottom-Left Entity (Label - e.g. Drive Time)',
  'Bottom-Right Entity (Label - e.g. Distance)',
];

@customElement('ha-person-card-editor')
export class HaPersonCardEditor extends LitElement implements LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: PersonCardConfig;

  public setConfig(config: PersonCardConfig): void {
    this._config = config;
  }

  static get styles() {
    return css`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 18px;
        padding: 8px 0;
      }

      ha-entity-picker {
        width: 100%;
        display: block;
      }

      .ha-toggle-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4px 0;
      }

      .toggle-label {
        font-size: 0.95rem;
        color: var(--primary-text-color, #212121);
      }

      .ha-textfield-container {
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      .ha-textfield-box {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        border: 1px solid var(--mdc-text-field-idle-line-color, var(--divider-color, rgba(0, 0, 0, 0.38)));
        border-radius: 4px;
        background: var(--mdc-text-field-fill-color, transparent);
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
        box-sizing: border-box;
      }

      .ha-textfield-box:focus-within {
        border-color: var(--primary-color, #03a9f4);
        border-width: 2px;
      }

      .ha-textfield-label {
        position: absolute;
        top: -9px;
        left: 10px;
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--primary-color, var(--secondary-text-color, #727272));
        background: var(--card-background-color, var(--ha-card-background, #fff));
        padding: 0 4px;
        line-height: 1;
        pointer-events: none;
      }

      .ha-textfield-input {
        width: 100%;
        height: 48px;
        padding: 12px;
        border: none;
        background: transparent;
        color: var(--primary-text-color, #212121);
        font-size: 1rem;
        font-family: inherit;
        outline: none;
        box-sizing: border-box;
      }

      .ha-textfield-input::placeholder {
        color: var(--secondary-text-color, rgba(0, 0, 0, 0.38));
        opacity: 0.6;
      }

      .ha-textfield-helper {
        font-size: 0.75rem;
        color: var(--secondary-text-color, #727272);
        padding: 4px 12px 0 12px;
      }

      .entities-section {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-top: 8px;
        padding-top: 16px;
        border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      }

      .section-header {
        font-weight: 600;
        font-size: 0.95rem;
        color: var(--primary-text-color, #212121);
      }
    `;
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    const personEntities = Object.keys(this.hass.states).filter((entityId) =>
      entityId.startsWith('person.')
    );

    const selectedPersonObj = this._config.entity
      ? this.hass.states[this._config.entity]
      : undefined;
    const defaultAvatar = selectedPersonObj?.attributes?.entity_picture || '';

    const avatarValue = this._config.image || this._config.avatar_image || '';

    return html`
      <div class="card-config">
        <!-- Person Entity Picker -->
        <ha-entity-picker
          label="Person Entity"
          .hass=${this.hass}
          .value=${this._config.entity || ''}
          .includeDomains=${['person']}
          .includeEntities=${personEntities}
          allow-custom-entity
          @value-changed=${(e: CustomEvent) =>
            this._updateConfigValue('entity', e.detail.value)}
        ></ha-entity-picker>

        <!-- Section Header for Images -->
        <div class="section-header">Images & Framing</div>

        <!-- Avatar Image URL -->
        ${this._renderTextField(
          'Avatar Image URL (Optional)',
          'image',
          avatarValue,
          defaultAvatar || 'e.g. /local/chris_avatar.png',
          !avatarValue && defaultAvatar ? 'Defaults to Home Assistant person profile picture' : ''
        )}

        <!-- Home Image URL -->
        ${this._renderTextField(
          'Home Image URL (Optional)',
          'home_image',
          this._config.home_image || '',
          avatarValue || defaultAvatar || 'e.g. /local/chris_home.png',
          'Overrides avatar image when person state is home'
        )}

        <!-- Away / Not Home Image URL -->
        ${this._renderTextField(
          'Away / Not Home Image URL (Optional)',
          'not_home_image',
          this._config.not_home_image || '',
          avatarValue || defaultAvatar || 'e.g. /local/chris_away.png',
          'Overrides avatar image when person state is away / not_home'
        )}

        <!-- Overlay Frame Image URL -->
        ${this._renderTextField(
          'Overlay Frame Image URL (Optional)',
          'overlay_image',
          this._config.overlay_image || '',
          'e.g. /local/card_frame.png',
          'Leave blank to use built-in card frame'
        )}

        <!-- Grayscale Toggle -->
        <div class="ha-toggle-row">
          <span class="toggle-label">Grayscale avatar when away / not home</span>
          <ha-switch
            .checked=${this._config.grayscale_not_home !== false}
            @change=${(e: Event) =>
              this._updateConfigValue('grayscale_not_home', (e.target as HTMLInputElement).checked)}
          ></ha-switch>
        </div>

        <!-- Card Slot Entities -->
        <div class="entities-section">
          <div class="section-header">Card Slot Entities</div>
          ${SLOT_LABELS.map((label, index) => {
            const configuredValue = this._getEntityValue(index);
            const autoValue = autoDiscoverEntity(
              this.hass,
              this._config?.entity,
              index
            );
            const displayValue = configuredValue || autoValue || '';
            const helperText =
              !configuredValue && autoValue
                ? `Auto-detected from ${this._config?.entity || 'person'}`
                : '';

            return html`
              <ha-entity-picker
                .label=${label}
                .hass=${this.hass}
                .value=${displayValue}
                .placeholder=${autoValue}
                .helper=${helperText}
                .index=${index}
                allow-custom-entity
                @value-changed=${this._entitySlotChanged}
              ></ha-entity-picker>
            `;
          })}
        </div>
      </div>
    `;
  }

  private _renderTextField(
    label: string,
    key: keyof PersonCardConfig,
    value: string,
    placeholder: string = '',
    helper: string = ''
  ): TemplateResult {
    return html`
      <div class="ha-textfield-container">
        <div class="ha-textfield-box">
          <label class="ha-textfield-label">${label}</label>
          <input
            type="text"
            class="ha-textfield-input"
            .value=${value || ''}
            placeholder=${placeholder}
            @input=${(e: InputEvent) =>
              this._updateConfigValue(key, (e.target as HTMLInputElement).value)}
          />
        </div>
        ${helper ? html`<span class="ha-textfield-helper">${helper}</span>` : html``}
      </div>
    `;
  }

  private _getEntityValue(index: number): string {
    if (!this._config?.entities || !Array.isArray(this._config.entities)) {
      return '';
    }
    const item = this._config.entities[index];
    if (!item) return '';
    return typeof item === 'string' ? item : item.entity || '';
  }

  private _updateConfigValue(key: keyof PersonCardConfig, value: any): void {
    if (!this._config) return;
    if (this._config[key] === value) return;

    const newConfig = {
      ...this._config,
      [key]: value,
    };

    this._emitConfigChanged(newConfig);
  }

  private _entitySlotChanged(ev: CustomEvent): void {
    if (!this._config) {
      return;
    }

    const target = ev.target as any;
    const index = target.index;
    const value = ev.detail.value;

    const currentEntities = Array.isArray(this._config.entities)
      ? [...this._config.entities]
      : [];

    while (currentEntities.length < 4) {
      currentEntities.push('');
    }

    if (index !== undefined && index >= 0 && index < 4) {
      currentEntities[index] = value || '';
    }

    // Filter out trailing empty items
    let lastNonEmptyIndex = currentEntities.length - 1;
    while (lastNonEmptyIndex >= 0 && !currentEntities[lastNonEmptyIndex]) {
      lastNonEmptyIndex--;
    }

    const cleanedEntities = currentEntities.slice(0, lastNonEmptyIndex + 1);

    const newConfig = {
      ...this._config,
      entities: cleanedEntities,
    };

    this._emitConfigChanged(newConfig);
  }

  private _emitConfigChanged(newConfig: PersonCardConfig): void {
    const event = new CustomEvent('config-changed', {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}
