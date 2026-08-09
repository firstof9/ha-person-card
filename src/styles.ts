import { css } from 'lit';

export const cardStyles = css`
  :host {
    display: block;
    --hpc-border-radius: 16px;
    --hpc-spacing: 16px;
  }

  ha-card {
    container-type: inline-size;
    position: relative;
    overflow: hidden;
    border-radius: var(--hpc-border-radius);
    background: var(--ha-card-background, var(--card-background-color, #fff));
    box-shadow: var(--ha-card-box-shadow, 0px 4px 20px rgba(0, 0, 0, 0.08));
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    height: 100%;
    box-sizing: border-box;
  }

  .card-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  /* Header / Image section */
  .hero-section {
    position: relative;
    width: 100%;
    height: 180px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: background-image 0.4s ease-in-out;
    display: flex;
    align-items: flex-end;
  }

  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.15) 0%,
      rgba(0, 0, 0, 0.65) 100%
    );
  }

  .person-info {
    position: relative;
    z-index: 2;
    padding: var(--hpc-spacing);
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
  }

  .person-details {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .person-name {
    font-size: 1.25rem;
    font-weight: 700;
    color: #ffffff;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    margin: 0;
    line-height: 1.2;
  }

  .person-state-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: capitalize;
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    color: #ffffff;
    width: fit-content;
  }

  .state-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #8e8e93;
  }

  .state-dot.home {
    background-color: #34c759;
    box-shadow: 0 0 8px #34c759;
  }

  .state-dot.not_home {
    background-color: #ff9500;
    box-shadow: 0 0 8px #ff9500;
  }

  .state-dot.custom-zone {
    background-color: #007aff;
    box-shadow: 0 0 8px #007aff;
  }

  /* Entities Section */
  .entities-grid {
    padding: var(--hpc-spacing);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 12px;
    background: var(--ha-card-background, var(--card-background-color, #fff));
  }

  .entity-tile {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 12px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.03));
    transition: transform 0.2s ease, background-color 0.2s ease;
    cursor: pointer;
  }

  .entity-tile:hover {
    transform: translateY(-2px);
    background: var(--divider-color, rgba(0, 0, 0, 0.06));
  }

  .entity-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--primary-color, #03a9f4);
    color: #ffffff;
    --mdc-icon-size: 18px;
    flex-shrink: 0;
  }

  .entity-details {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .entity-name {
    font-size: 0.75rem;
    color: var(--secondary-text-color, #727272);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .entity-state {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--primary-text-color, #212121);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .warning-text {
    padding: 16px;
    color: var(--error-color, #db4437);
    font-weight: 500;
  }

  /* Picture Frame Overlay Layout */
  .frame-container {
    position: relative;
    width: 100%;
    padding-top: 117.77%; /* 530 / 450 aspect ratio */
    overflow: hidden;
    background-color: var(--ha-card-background, var(--card-background-color, #2d333c));
  }

  .hero-section.grayscale {
    filter: grayscale(100%);
  }

  .avatar-background {
    position: absolute;
    top: 44.3%;
    left: 50%;
    width: 71.1%;
    height: 60.38%;
    transform: translate(-50%, -50%);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 50%;
    z-index: 1;
    transition: background-image 0.4s ease-in-out, filter 0.4s ease-in-out;
  }

  .avatar-background.grayscale {
    filter: grayscale(100%) opacity(0.85);
  }

  .frame-overlay-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    z-index: 2;
    pointer-events: none;
  }

  /* Overlay Slots */
  .slot {
    position: absolute;
    z-index: 3;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #ffffff;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
    user-select: none;
  }

  .slot.top-left {
    top: 9.8%;
    left: 12%;
    width: 18%;
    height: 15.8%;
  }

  .slot.top-right {
    top: 9.8%;
    left: 88%;
    width: 18%;
    height: 15.8%;
  }

  .slot.bottom-left {
    top: 72.6%;
    left: 12%;
    width: 18%;
    height: 15.8%;
    text-align: center;
  }

  .slot.bottom-right {
    top: 72.6%;
    left: 88%;
    width: 18%;
    height: 15.8%;
    text-align: center;
  }

  .slot.bottom-center {
    top: 91.5%;
    left: 50%;
    width: 90%;
    height: 13%;
    flex-direction: column;
    gap: 2px;
  }

  .slot ha-icon {
    --mdc-icon-size: clamp(22px, 9cqw, 44px);
    color: #ffffff;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6));
  }

  .slot-label {
    font-size: clamp(0.75rem, 4.2cqw, 1.3rem);
    font-weight: 700;
    color: #ffffff;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
  }

  .frame-person-name {
    font-size: clamp(0.85rem, 4.5cqw, 1.3rem);
    font-weight: 700;
    color: #ffffff;
    line-height: 1.1;
  }

  .frame-person-state {
    font-size: clamp(1rem, 5.5cqw, 1.6rem);
    font-weight: 700;
    color: #ffffff;
    text-transform: capitalize;
    letter-spacing: 0.5px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
  }
`;
