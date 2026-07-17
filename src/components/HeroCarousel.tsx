import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { HERO_EASE, HERO_GRAIN_OVERLAY, HERO_IMAGES, HERO_TRANSITION, type HeroRole } from '../constants/hero'

function getRole(imageIndex: number, activeIndex: number): HeroRole {
  const center = activeIndex
  const left = (activeIndex + 3) % HERO_IMAGES.length
  const right = (activeIndex + 1) % HERO_IMAGES.length

  if (imageIndex === center) return 'center'
  if (imageIndex === left) return 'left'
  if (imageIndex === right) return 'right'
  return 'back'
}

function getRoleStyles(role: HeroRole, isMobile: boolean): CSSProperties {
  const base: CSSProperties = {
    position: 'absolute',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    aspectRatio: '0.6 / 1',
    transform: 'translateX(-50%) scale(1)',
    transition: HERO_TRANSITION,
    willChange: 'transform, filter, opacity',
    overflow: 'visible',
  }

  switch (role) {
    case 'center':
      return {
        ...base,
        transform: `translateX(-50%) scale(${isMobile ? 1.14 : 1.28})`,
        filter: 'none',
        opacity: 1,
        zIndex: 20,
        left: '50%',
        height: isMobile ? '64%' : '88%',
        bottom: isMobile ? '18%' : '14%',
      }
    case 'left':
      return {
        ...base,
        filter: 'blur(2px)',
        opacity: 0.85,
        zIndex: 10,
        left: isMobile ? '22%' : '28%',
        height: isMobile ? '20%' : '30%',
        bottom: isMobile ? '32%' : '24%',
      }
    case 'right':
      return {
        ...base,
        filter: 'blur(2px)',
        opacity: 0.85,
        zIndex: 10,
        left: isMobile ? '78%' : '72%',
        height: isMobile ? '20%' : '30%',
        bottom: isMobile ? '32%' : '24%',
      }
    case 'back':
      return {
        ...base,
        filter: 'blur(4px)',
        opacity: 1,
        zIndex: 5,
        left: '50%',
        height: isMobile ? '15%' : '22%',
        bottom: isMobile ? '34%' : '26%',
      }
  }
}

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const isAnimatingRef = useRef(false)
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 640,
  )

  useEffect(() => {
    HERO_IMAGES.forEach(({ src }) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const navigate = (direction: 'next' | 'prev') => {
    if (isAnimatingRef.current) return

    isAnimatingRef.current = true
    setIsAnimating(true)
    setActiveIndex((prev) =>
      direction === 'next' ? (prev + 1) % HERO_IMAGES.length : (prev + HERO_IMAGES.length - 1) % HERO_IMAGES.length,
    )

    window.setTimeout(() => {
      isAnimatingRef.current = false
      setIsAnimating(false)
    }, 650)
  }

  const activeImage = HERO_IMAGES[activeIndex]

  return (
    <section
      className="relative w-full overflow-hidden"
      aria-busy={isAnimating}
      style={{
        backgroundColor: activeImage.bg,
        transition: `background-color 650ms ${HERO_EASE}`,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div className="relative w-full" style={{ height: '100vh', overflow: 'hidden' }}>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            zIndex: 50,
            opacity: 0.4,
            backgroundImage: HERO_GRAIN_OVERLAY,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
          }}
        />

        <div
          className="pointer-events-none absolute inset-x-0 flex select-none items-center justify-center"
          style={{
            zIndex: 2,
            top: '18%',
            fontFamily: 'Anton, sans-serif',
            fontSize: 'clamp(90px, 28vw, 380px)',
            fontWeight: 900,
            color: 'white',
            opacity: 1,
            lineHeight: 1,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
          }}
        >
          RIO THÚI
        </div>

        <div
          className="absolute top-6 left-4 text-xs font-semibold uppercase sm:left-8"
          style={{
            zIndex: 60,
            color: 'white',
            opacity: 0.9,
            letterSpacing: '0.18em',
          }}
        >
          Rio
        </div>

        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {HERO_IMAGES.map((image, index) => {
            const role = getRole(index, activeIndex)
            return (
              <div key={image.src} style={getRoleStyles(role, isMobile)}>
                <img
                  src={image.src}
                  alt=""
                  draggable={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'bottom center',
                  }}
                />
              </div>
            )
          })}
        </div>

        <div
          className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24"
          style={{ zIndex: 60, maxWidth: 320 }}
        >
          <h2
            className="mb-2 text-base font-bold uppercase sm:mb-3 sm:text-[22px]"
            style={{
              color: 'white',
              opacity: 0.95,
              letterSpacing: '0.02em',
            }}
          >
            RIO
          </h2>
          <p
            className="mb-4 hidden text-xs sm:mb-5 sm:block sm:text-sm"
            style={{
              color: 'white',
              opacity: 0.85,
              lineHeight: 1.6,
            }}
          >
            Võ Đình Anh Quân.
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Previous figurine"
              onClick={() => navigate('prev')}
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white sm:h-16 sm:w-16"
              style={{
                backgroundColor: 'transparent',
                color: 'white',
                transition: 'transform 150ms, background-color 150ms',
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.transform = 'scale(1.08)'
                event.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)'
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.transform = 'scale(1)'
                event.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              <ArrowLeft size={26} strokeWidth={2.25} />
            </button>
            <button
              type="button"
              aria-label="Next figurine"
              onClick={() => navigate('next')}
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white sm:h-16 sm:w-16"
              style={{
                backgroundColor: 'transparent',
                color: 'white',
                transition: 'transform 150ms, background-color 150ms',
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.transform = 'scale(1.08)'
                event.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)'
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.transform = 'scale(1)'
                event.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              <ArrowRight size={26} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        <a
          href="https://www.instagram.com/iamrio.aq?igsh=MThsbWY0cTRhYzJv"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-6 right-4 flex items-center uppercase sm:bottom-20 sm:right-10"
          style={{
            zIndex: 60,
            fontFamily: 'Anton, sans-serif',
            fontSize: 'clamp(20px, 4vw, 56px)',
            fontWeight: 400,
            color: 'white',
            opacity: 0.95,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            textDecoration: 'none',
            transition: 'opacity 200ms',
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.opacity = '1'
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.opacity = '0.95'
          }}
        >
          RIO HERE!
          <ArrowRight className="ml-2 h-5 w-5 sm:h-8 sm:w-8" strokeWidth={2.25} />
        </a>
      </div>
    </section>
  )
}
