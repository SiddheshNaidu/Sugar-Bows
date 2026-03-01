/**
 * Sugar & Bows — Design Tokens (JS)
 * Crimson Royale Palette — mirrors CSS custom properties.
 * Icons are referenced by name from the Icons component system.
 */

export const colors = {
  // Crimson Royale primary scale
  primary: '#8B1E1E',
  primaryLight: '#C74D4D',
  primaryDark: '#511010',
  primary50: '#FCE9E9',
  primary100: '#F5D0D0',
  primary200: '#E8A3A3',
  primary300: '#D47676',
  primary400: '#C74D4D',
  primary500: '#8B1E1E',
  primary600: '#731919',
  primary700: '#5C1313',
  primary800: '#511010',
  primary900: '#3A0B0B',

  // Warm neutrals
  black: '#1A0F0F',
  charcoal: '#2A1A1A',
  darkGray: '#3D2828',
  mediumGray: '#6B5050',
  gray: '#9A8585',
  lightGray: '#E0D5D5',
  offWhite: '#F7F2F2',
  cream: '#FBF7F7',
  white: '#FFFFFF',

  // Accents
  gold: '#C9A06E',
  goldLight: '#E8D5A9',
  sage: '#7D8B7D',
  blush: '#FCE9E9',
  lavender: '#D5C6CE',

  // Semantic
  success: '#4A7C4E',
  warning: '#C78B2A',
  error: '#C74D4D',
  info: '#4A6B8B',
}

export const fonts = {
  display: "'Cormorant Garamond', Georgia, serif",
  body: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
  mono: "'DM Mono', 'Courier New', monospace",
}

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
}

// Order statuses — icon names map to <Icon*> components in Icons.jsx
export const orderStatuses = {
  pending_payment: { label: 'Pending Payment', color: colors.warning, iconName: 'clock' },
  paid: { label: 'Paid', color: colors.success, iconName: 'check' },
  in_production: { label: 'In Production', color: colors.info, iconName: 'sparkles' },
  proof_sent: { label: 'Proof Sent', color: colors.primary, iconName: 'camera' },
  proof_approved: { label: 'Proof Approved', color: colors.success, iconName: 'shield' },
  dispatched: { label: 'Dispatched', color: colors.info, iconName: 'truck' },
  delivered: { label: 'Delivered', color: colors.success, iconName: 'bouquet' },
  cancelled: { label: 'Cancelled', color: colors.error, iconName: 'x' },
}

// Categories — icons rendered via Icons.jsx components in the UI layer
export const categories = [
  { slug: 'rose_arrangements', label: 'Rose Arrangements', iconName: 'bouquet', description: 'Handcrafted eternal rose boxes' },
  { slug: 'custom_frames', label: 'Custom Frames', iconName: 'frame', description: 'Personalised birthday frames' },
  { slug: 'gift_combos', label: 'Gift Combos', iconName: 'gift', description: 'Curated gift combinations' },
  { slug: 'add_ons', label: 'Add-Ons', iconName: 'sparkles', description: 'Extra touches of love' },
  { slug: 'subscriptions', label: 'Subscriptions', iconName: 'bouquet', description: 'Monthly flower deliveries' },
]

export const tiers = [
  { value: 'small', label: 'Petite', description: '6-12 stems' },
  { value: 'standard', label: 'Classic', description: '18-24 stems' },
  { value: 'luxury', label: 'Grand', description: '36-50 stems' },
]
