/**
 * Configuration for Independent Demo Deployments
 * Live production Vercel endpoints
 */
export const DEMO_URLS = {
  cafe: import.meta.env.VITE_CAFE_DEMO_URL || 'https://ember-and-bean-specialty-roastery.vercel.app/',
  salon: import.meta.env.VITE_SALON_DEMO_URL || 'https://atelier-v-boutiquehairlounge.vercel.app/',
  gym: import.meta.env.VITE_GYM_DEMO_URL || 'https://pulse-athletics-and-conditioningclu.vercel.app/',
} as const;