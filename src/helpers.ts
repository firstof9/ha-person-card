import { HomeAssistant } from './types';

export function autoDiscoverEntity(
  hass: HomeAssistant | undefined,
  personEntityId: string | undefined,
  slotIndex: number
): string {
  if (!hass || !personEntityId) return '';
  const personEntity = hass.states[personEntityId];
  if (!personEntity) return '';

  const personName = personEntity.entity_id.replace('person.', '').toLowerCase();
  const source = (personEntity.attributes.source || '').replace('device_tracker.', '').toLowerCase();
  const trackers = (personEntity.attributes.device_trackers || []).map((t: string) =>
    t.replace('device_tracker.', '').toLowerCase()
  );

  const keywords = Array.from(new Set([personName, source, ...trackers].filter(Boolean)));
  const allEntities = Object.keys(hass.states);

  // Slot 0: Top-Left (Battery)
  if (slotIndex === 0) {
    const match = allEntities.find((id) => {
      const stateObj = hass.states[id];
      const isBattery =
        id.includes('battery') || stateObj?.attributes?.device_class === 'battery';
      return isBattery && keywords.some((kw) => id.toLowerCase().includes(kw));
    });
    return match || '';
  }

  // Slot 1: Top-Right (Wi-Fi signal strength)
  if (slotIndex === 1) {
    // 1. First priority: wi_fi_signal_strength / wifi_signal_strength
    const signalMatch = allEntities.find((id) => {
      const lower = id.toLowerCase();
      const isWifiSignal =
        lower.includes('wi_fi_signal_strength') ||
        lower.includes('wifi_signal_strength') ||
        lower.includes('wifi_signal') ||
        lower.includes('signal_strength');
      return isWifiSignal && keywords.some((kw) => lower.includes(kw));
    });
    if (signalMatch) return signalMatch;

    // 2. Secondary fallback: any wifi or ssid entity
    const fallbackMatch = allEntities.find((id) => {
      const lower = id.toLowerCase();
      const isWifi = lower.includes('wifi') || lower.includes('wi_fi') || lower.includes('ssid');
      return isWifi && keywords.some((kw) => lower.includes(kw));
    });
    return fallbackMatch || '';
  }

  // Slot 2: Bottom-Left (Drive Time / Waze)
  if (slotIndex === 2) {
    const match = allEntities.find((id) => {
      const isDrive =
        id.includes('drive') ||
        id.includes('waze') ||
        id.includes('travel') ||
        id.includes('duration') ||
        id.includes('eta');
      return isDrive && keywords.some((kw) => id.toLowerCase().includes(kw));
    });
    return match || '';
  }

  // Slot 3: Bottom-Right (Distance)
  if (slotIndex === 3) {
    const match = allEntities.find((id) => {
      const isDist = id.includes('dist') || id.includes('distance');
      return isDist && keywords.some((kw) => id.toLowerCase().includes(kw));
    });
    return match || '';
  }

  return '';
}
