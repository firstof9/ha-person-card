# HA Person Card (`ha-person-card`)

A modern, responsive custom Lovelace person card for Home Assistant. Designed to replace legacy `picture-elements` cards with dynamic state avatars, frame overlays, auto-discovered device sensors (battery, Wi-Fi, drive time, distance), and Home Assistant Section & Grid dashboard resizing support.

![HA Person Card](https://raw.githubusercontent.com/firstof9/ha-person-card/main/images/preview.png)

## Features

- 🖼️ **Overlay Frame Architecture**: Fits avatar pictures neatly inside the central cutout of a frame overlay, replacing complex and fragile `picture-elements` CSS percentage positioning.
- ⚡ **Auto-Discovery**: Automatically detects associated companion app sensors (battery level, Wi-Fi signal strength, drive time, and distance to home) using the person entity's `device_trackers` and `source` attributes.
- 👤 **Automatic Avatar Fallback**: Defaults to the person entity's Home Assistant profile picture out-of-the-box, with optional overrides for `image`, `home_image`, and `not_home_image`.
- 🖤 **Grayscale Away Mode**: Automatically applies a smooth grayscale filter to the avatar when the person's state is `not_home` / away (can be toggled in settings).
- 🔋 **HA Battery State Coloring & Charging Icons**: Icons dynamically reflect battery state colors (Green >=70%/charging, Orange 30-69%, Red <30%) and switch to charging icons (`mdi:battery-charging-*`) when plugged in.
- 📍 **Enlarged Zone Location**: Displays the active zone/location (e.g. `Home`, `Work`, `Away`) in prominent bold typography on the bottom status bar.
- 📐 **Dashboard Grid Resizing**: Implements Home Assistant's native Section & Grid Dashboard `getGridOptions()` API with container query (`cqw`) responsive scaling.
- 🛠️ **Visual Dashboard Card Editor**: Fully integrated visual card editor featuring positional slot entity pickers, auto-detection prefilled hints, and Material Design floating label controls.

---

## Installation

### Method 1: HACS (Recommended)

1. Open **HACS** in your Home Assistant instance.
2. Click **Frontend** -> **Custom repositories** (top right menu).
3. Add repository URL: `https://github.com/firstof9/ha-person-card` with Category **Plugin**.
4. Click **Install**.

### Method 2: Manual Installation

1. Download `ha-person-card.js` from the latest [Release](https://github.com/firstof9/ha-person-card/releases).
2. Copy `ha-person-card.js` to your Home Assistant `<config>/www/` directory (e.g. `/config/www/ha-person-card.js`).
3. Add the resource to your Dashboard:
   - Go to **Settings** -> **Dashboards** -> **Three dots menu (top right)** -> **Resources**.
   - Add `/local/ha-person-card.js` as a **JavaScript Module**.

---

## Configuration Examples

### Minimal Configuration (Auto-Discovered Sensors & Profile Picture)

```yaml
type: custom:ha-person-card
entity: person.chris
```

### Full Configuration (Custom Overlay, State Images, and Slots)

```yaml
type: custom:ha-person-card
entity: person.chris
image: /local/chris_avatar.png
home_image: /local/chris_home.png
not_home_image: /local/chris_away.png
overlay_image: /local/chris_frame.png
grayscale_not_home: true
entities:
  - entity: sensor.chrisphone_battery_level
  - entity: sensor.chrisphone_wi_fi_signal_strength
  - entity: sensor.chris_drive_home_waze
  - entity: sensor.chris_dist_home
```

---

## Configuration Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `type` | `string` | **Required** | `custom:ha-person-card` |
| `entity` | `string` | **Required** | The `person.*` entity ID. |
| `image` | `string` | Optional | Custom base avatar image URL (defaults to `person.attributes.entity_picture`). |
| `home_image` | `string` | Optional | Custom avatar image URL when person is at `home`. |
| `not_home_image` | `string` | Optional | Custom avatar image URL when person is `not_home` / away. |
| `overlay_image` | `string` | Optional | Custom frame overlay image URL (leave blank for built-in frame). |
| `grayscale_not_home` | `boolean` | `true` | Apply grayscale filter to avatar when person is away. |
| `entities` | `list` | `[]` (Auto-discovered) | Array of up to 4 entity IDs for Top-Left, Top-Right, Bottom-Left, and Bottom-Right slots. |
| `layout` | `string` | `'frame'` | Layout mode (`'frame'` for frame overlay or `'card'` for tile grid view). |

---

## Building & Testing from Source

```bash
# Install dependencies
npm install

# Build production bundle
npm run build

# Watch mode for local development
npm run watch

# Run Vitest unit tests
npm test

# Run tests in watch mode
npm run test:watch
```

## License

MIT License
