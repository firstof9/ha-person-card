import { describe, expect, it } from 'vitest';
import { autoDiscoverEntity } from './helpers';
import { HomeAssistant } from './types';

const createMockHass = (statesMap: Record<string, any> = {}): HomeAssistant => ({
  states: statesMap,
  callService: async () => {},
  language: 'en',
  themes: {},
  locale: {},
});

describe('autoDiscoverEntity', () => {
  it('returns empty string when hass or personEntityId is missing', () => {
    expect(autoDiscoverEntity(undefined, 'person.chris', 0)).toBe('');
    expect(autoDiscoverEntity(createMockHass(), undefined, 0)).toBe('');
    expect(autoDiscoverEntity(createMockHass(), '', 0)).toBe('');
  });

  it('returns empty string when person entity is not in hass.states', () => {
    const hass = createMockHass({
      'sensor.some_sensor': { state: '10' },
    });
    expect(autoDiscoverEntity(hass, 'person.chris', 0)).toBe('');
  });

  it('auto-discovers Slot 0 (Battery level sensor)', () => {
    const hass = createMockHass({
      'person.chris': {
        entity_id: 'person.chris',
        state: 'home',
        attributes: {
          source: 'device_tracker.chrisphone',
          device_trackers: ['device_tracker.chrisphone'],
        },
      },
      'sensor.chrisphone_battery_level': {
        entity_id: 'sensor.chrisphone_battery_level',
        state: '85',
        attributes: { device_class: 'battery', unit_of_measurement: '%' },
      },
    });

    expect(autoDiscoverEntity(hass, 'person.chris', 0)).toBe(
      'sensor.chrisphone_battery_level'
    );
  });

  it('auto-discovers Slot 1 (Wi-Fi signal strength sensor)', () => {
    const hass = createMockHass({
      'person.chris': {
        entity_id: 'person.chris',
        state: 'home',
        attributes: {
          source: 'device_tracker.chrisphone',
          device_trackers: ['device_tracker.chrisphone'],
        },
      },
      'sensor.chrisphone_wifi_state': {
        entity_id: 'sensor.chrisphone_wifi_state',
        state: 'HomeNetwork',
        attributes: {},
      },
      'sensor.chrisphone_wi_fi_signal_strength': {
        entity_id: 'sensor.chrisphone_wi_fi_signal_strength',
        state: '-62',
        attributes: { unit_of_measurement: 'dBm' },
      },
    });

    // Should prioritize wi_fi_signal_strength over general wifi state
    expect(autoDiscoverEntity(hass, 'person.chris', 1)).toBe(
      'sensor.chrisphone_wi_fi_signal_strength'
    );
  });

  it('auto-discovers Slot 2 (Drive Time / Waze sensor)', () => {
    const hass = createMockHass({
      'person.chris': {
        entity_id: 'person.chris',
        state: 'not_home',
        attributes: {
          source: 'device_tracker.chrisphone',
        },
      },
      'sensor.chris_drive_home_waze': {
        entity_id: 'sensor.chris_drive_home_waze',
        state: '18',
        attributes: { unit_of_measurement: 'min' },
      },
    });

    expect(autoDiscoverEntity(hass, 'person.chris', 2)).toBe(
      'sensor.chris_drive_home_waze'
    );
  });

  it('auto-discovers Slot 3 (Distance to home sensor)', () => {
    const hass = createMockHass({
      'person.chris': {
        entity_id: 'person.chris',
        state: 'not_home',
        attributes: {
          source: 'device_tracker.chrisphone',
        },
      },
      'sensor.chris_dist_home': {
        entity_id: 'sensor.chris_dist_home',
        state: '4.2',
        attributes: { unit_of_measurement: 'mi' },
      },
    });

    expect(autoDiscoverEntity(hass, 'person.chris', 3)).toBe(
      'sensor.chris_dist_home'
    );
  });

  it('returns empty string when no matching sensors exist for slot', () => {
    const hass = createMockHass({
      'person.chris': {
        entity_id: 'person.chris',
        state: 'home',
        attributes: {},
      },
      'sensor.kitchen_temperature': {
        entity_id: 'sensor.kitchen_temperature',
        state: '72',
      },
    });

    expect(autoDiscoverEntity(hass, 'person.chris', 0)).toBe('');
    expect(autoDiscoverEntity(hass, 'person.chris', 1)).toBe('');
    expect(autoDiscoverEntity(hass, 'person.chris', 2)).toBe('');
    expect(autoDiscoverEntity(hass, 'person.chris', 3)).toBe('');
  });
});
