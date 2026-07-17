import riodo from '../../pic/riodo.webp'
import rioxanhla from '../../pic/rioxanhla.webp'
import rio4 from '../../pic/rio4.webp'
import rio5 from '../../pic/rio5.webp'

export const HERO_IMAGES = [
  {
    src: riodo,
    bg: '#f57575',
    panel: '#f38d8d',
  },
  {
    src: rioxanhla,
    bg: '#6BBF7A',
    panel: '#85CC92',
  },
  {
    src: rio4,
    bg: '#E882B4',
    panel: '#ED9DC4',
  },
  {
    src: rio5,
    bg: '#6EB5FF',
    panel: '#8DC4FF',
  },
] as const

export const HERO_EASE = 'cubic-bezier(0.4, 0, 0.2, 1)'
export const HERO_TRANSITION = `transform 650ms ${HERO_EASE}, filter 650ms ${HERO_EASE}, opacity 650ms ${HERO_EASE}, left 650ms ${HERO_EASE}`
export const HERO_GRAIN_OVERLAY = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.08'/></svg>",
)}")`

export type HeroRole = 'center' | 'left' | 'right' | 'back'
