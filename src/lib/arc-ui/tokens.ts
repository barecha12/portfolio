// src/lib/arc-ui/tokens.ts
export const tokens = {
  color: {
    background: {
      default: '#0b1220',
      panel: '#0f1724',
      inverted: '#ffffff'
    },
    text: {
      primary: '#e6eef8',
      muted: '#9fb0c8',
      accent: '#0ea5e9',
      accent2: '#22d3ee'
    },
    border: '#1f2937'
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 40
  },
  radius: {
    small: 6,
    normal: 10,
    pill: 9999
  },
  size: {
    avatar: 72,
    cardImage: 220
  },
  font: {
    body: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
    mono: '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace'
  }
} as const;

export type Tokens = typeof tokens;
export default tokens;
