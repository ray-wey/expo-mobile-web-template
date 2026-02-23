export const colors = {
  background: '#0F0F0F',
  surface: '#1A1A2E',
  surfaceLight: '#222244',
  primary: '#7C3AED',
  primaryLight: '#A78BFA',
  accent: '#22D3EE',
  text: '#F1F5F9',
  textSecondary: '#94A3B8',
  border: '#2D2D4A',
  white: '#FFFFFF',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 6,
  md: 12,
  lg: 20,
  full: 999,
} as const;

export const font = {
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 28,
    xxl: 36,
  },
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
} as const;
