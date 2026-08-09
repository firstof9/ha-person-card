import { describe, expect, it } from 'vitest';
import { HaPersonCard } from './ha-person-card';
import { PersonCardConfig } from './types';

describe('HaPersonCard', () => {
  it('instantiates custom element cleanly', () => {
    const card = new HaPersonCard();
    expect(card).toBeDefined();
    expect(card instanceof HTMLElement).toBe(true);
  });

  it('setConfig validates required entity property', () => {
    const card = new HaPersonCard();
    expect(() => card.setConfig({} as PersonCardConfig)).toThrow(
      'Please define a person entity (e.g. entity: person.chris)'
    );

    expect(() =>
      card.setConfig({
        type: 'custom:ha-person-card',
        entity: 'person.chris',
      })
    ).not.toThrow();
  });

  it('getStubConfig generates default card configuration', () => {
    const stubConfig = HaPersonCard.getStubConfig({} as any, [
      'person.chris',
      'light.living_room',
    ]);

    expect(stubConfig).toEqual({
      type: 'custom:ha-person-card',
      entity: 'person.chris',
      name: '',
      home_image: '',
      not_home_image: '',
      overlay_image: '',
      entities: [],
    });
  });

  it('getCardSize returns 4', () => {
    const card = new HaPersonCard();
    expect(card.getCardSize()).toBe(4);
  });

  it('getGridOptions returns Home Assistant section/grid dashboard options', () => {
    const card = new HaPersonCard();
    const gridOptions = card.getGridOptions();

    expect(gridOptions).toEqual({
      rows: 4,
      columns: 6,
      min_rows: 3,
      min_columns: 3,
    });
  });

  it('getConfigElement returns editor element tag', () => {
    const editorEl = HaPersonCard.getConfigElement();
    expect(editorEl).toBeDefined();
    expect(editorEl.tagName.toLowerCase()).toBe('ha-person-card-editor');
  });
});
