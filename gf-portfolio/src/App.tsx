import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { AboutSlide } from './components/AboutSlide'
import { CoverSlide } from './components/CoverSlide'
import { EducationOverlay } from './components/EducationOverlay'
import { WorksSlide } from './components/WorksSlide'

function App() {
  const [activeSlide, setActiveSlide] = useState<0 | 1>(0)
  const [desktopDetailSlide, setDesktopDetailSlide] = useState<0 | 1>(0)
  const [mobileSlide, setMobileSlide] = useState<0 | 1 | 2>(0)
  const [educationOpen, setEducationOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const wheelDeltaRef = useRef(0)
  const touchStartYRef = useRef<number | null>(null)
  const lastGestureAtRef = useRef(0)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 1023px)')

    const updateMode = () => {
      setIsMobile(media.matches)
    }

    updateMode()
    media.addEventListener('change', updateMode)
    return () => media.removeEventListener('change', updateMode)
  }, [])

  useEffect(() => {
    if (!isMobile) return

    const handleWheel = (event: WheelEvent) => {
      if (mobileSlide === 2) return

      event.preventDefault()
      wheelDeltaRef.current += event.deltaY

      const now = Date.now()
      if (now - lastGestureAtRef.current < 650) return

      if (wheelDeltaRef.current > 90) {
        lastGestureAtRef.current = now
        wheelDeltaRef.current = 0

        if (mobileSlide === 0) {
          setMobileSlide(1)
          setEducationOpen(false)
          return
        }

        if (educationOpen) {
          setMobileSlide(2)
          setEducationOpen(false)
          return
        }

        if (!educationOpen) {
          setEducationOpen(true)
        }
      }

      if (wheelDeltaRef.current < -90) {
        lastGestureAtRef.current = now
        wheelDeltaRef.current = 0

        if (educationOpen) {
          setEducationOpen(false)
          return
        }

        if (mobileSlide === 1) {
          setMobileSlide(0)
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [educationOpen, isMobile, mobileSlide])

  useEffect(() => {
    if (!isMobile) return

    const handleTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null
    }

    const handleTouchEnd = (event: TouchEvent) => {
      if (mobileSlide === 2) return

      const startY = touchStartYRef.current
      const endY = event.changedTouches[0]?.clientY
      touchStartYRef.current = null

      if (startY === null || endY === undefined) return

      const deltaY = startY - endY
      const now = Date.now()
      if (Math.abs(deltaY) < 64 || now - lastGestureAtRef.current < 650) return

      lastGestureAtRef.current = now

      if (deltaY > 0) {
        if (mobileSlide === 0) {
          setMobileSlide(1)
          setEducationOpen(false)
          return
        }

        if (educationOpen) {
          setMobileSlide(2)
          setEducationOpen(false)
          return
        }

        if (!educationOpen) {
          setEducationOpen(true)
        }

        return
      }

      if (educationOpen) {
        setEducationOpen(false)
        return
      }

      if (mobileSlide === 1) {
        setMobileSlide(0)
      }
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [educationOpen, isMobile, mobileSlide])

  const desktopTransform = useMemo(
    () => `translateX(-${activeSlide * 100}vw)`,
    [activeSlide],
  )

  const mobileTransform = useMemo(
    () => `translateY(-${mobileSlide * 100}svh)`,
    [mobileSlide],
  )

  const desktopDetailTransform = useMemo(
    () => `translateY(-${desktopDetailSlide * 100}vh)`,
    [desktopDetailSlide],
  )

  const goToNext = () => {
    if (activeSlide === 0) {
      setActiveSlide(1)
      setDesktopDetailSlide(0)
      setEducationOpen(false)
      return
    }

    setEducationOpen(true)
  }

  const goToWorks = () => {
    setEducationOpen(false)
    setDesktopDetailSlide(1)
    setMobileSlide(2)
  }

  const goBackToMobileDetails = () => {
    setMobileSlide(1)
    setEducationOpen(false)
  }

  const goBackOnDesktop = () => {
    if (desktopDetailSlide === 1) {
      setDesktopDetailSlide(0)
      setEducationOpen(false)
      return
    }

    setActiveSlide(0)
    setEducationOpen(false)
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#171717] text-zinc-100">
      <div className="h-[100svh] overflow-hidden lg:hidden">
        <div
          className="h-[300svh] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{ transform: mobileTransform }}
        >
          <CoverSlide mobile />
          <div className="relative h-[100svh] overflow-hidden">
            <AboutSlide
              active={mobileSlide === 1}
              mobile
            />
            <EducationOverlay
              mobile
              open={educationOpen}
              onWorks={goToWorks}
            />
          </div>
          <WorksSlide
            active={mobileSlide === 2}
            mobile
            onBack={goBackToMobileDetails}
          />
        </div>
      </div>

      <div className="hidden lg:block">
        <div
          className="flex h-screen w-[200vw] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{ transform: desktopTransform }}
        >
          <CoverSlide />
          <div className="relative h-screen w-screen shrink-0 overflow-hidden">
            <div
              className="h-[200vh] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
              style={{ transform: desktopDetailTransform }}
            >
              <div className="relative h-screen w-screen overflow-hidden">
                <AboutSlide
                  active={activeSlide === 1 && desktopDetailSlide === 0}
                />
                <EducationOverlay
                  open={educationOpen}
                  onWorks={goToWorks}
                />
              </div>
              <WorksSlide active={desktopDetailSlide === 1} />
            </div>
          </div>
        </div>

        {activeSlide === 1 && !educationOpen && (
          <button
            aria-label="Back"
            className="fixed left-5 top-1/2 z-50 grid size-14 -translate-y-1/2 place-items-center rounded-full border border-zinc-950/10 bg-white/70 text-zinc-950 shadow-2xl shadow-zinc-900/10 backdrop-blur transition hover:scale-105 hover:bg-white/90"
            onClick={goBackOnDesktop}
            type="button"
          >
            <ArrowLeft size={24} aria-hidden="true" />
          </button>
        )}

        {!educationOpen && desktopDetailSlide === 0 && (
          <button
            aria-label="Continue"
            className={`fixed right-5 top-1/2 z-50 grid size-14 -translate-y-1/2 place-items-center rounded-full border shadow-2xl backdrop-blur transition hover:scale-105 ${
              activeSlide === 0
                ? 'border-white/20 bg-white/10 text-white shadow-black/30 hover:bg-white/20'
                : 'border-zinc-950/10 bg-white/70 text-zinc-950 shadow-zinc-900/10 hover:bg-white/90'
            }`}
            onClick={goToNext}
            type="button"
          >
            <ArrowRight size={24} aria-hidden="true" />
          </button>
        )}
      </div>
    </main>
  )
}

export default App
