import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { AboutSlide } from './components/AboutSlide'
import { ContactSlide } from './components/ContactSlide'
import { CoverSlide } from './components/CoverSlide'
import { EducationOverlay } from './components/EducationOverlay'
import { ToolsSlide } from './components/ToolsSlide'
import { WorksSlide } from './components/WorksSlide'
import { works } from './data/portfolio'

function App() {
  const [activeSlide, setActiveSlide] = useState<0 | 1>(0)
  const [desktopDetailSlide, setDesktopDetailSlide] = useState<0 | 1 | 2 | 3>(0)
  const [mobileSlide, setMobileSlide] = useState<0 | 1 | 2 | 3 | 4>(0)
  const [desktopWorkIndex, setDesktopWorkIndex] = useState(0)
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

        if (mobileSlide >= 4) {
          return
        }

        if (mobileSlide === 3) {
          setMobileSlide(4)
          setEducationOpen(false)
          return
        }

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

        if (mobileSlide === 4) {
          setMobileSlide(3)
          setEducationOpen(false)
          return
        }

        if (mobileSlide === 3) {
          setMobileSlide(2)
          setEducationOpen(false)
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
        if (mobileSlide >= 4) {
          return
        }

        if (mobileSlide === 3) {
          setMobileSlide(4)
          setEducationOpen(false)
          return
        }

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

      if (mobileSlide === 4) {
        setMobileSlide(3)
        setEducationOpen(false)
        return
      }

      if (mobileSlide === 3) {
        setMobileSlide(2)
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
    () => `translateX(-${desktopDetailSlide * 100}vw)`,
    [desktopDetailSlide],
  )

  const goToNext = () => {
    if (activeSlide === 0) {
      setActiveSlide(1)
      setDesktopDetailSlide(0)
      setEducationOpen(false)
      return
    }

    if (desktopDetailSlide === 1) {
      if (desktopWorkIndex < works.length - 1) {
        setDesktopWorkIndex((current) => current + 1)
        return
      }

      goToTools()
      return
    }

    if (desktopDetailSlide === 2) {
      goToContacts()
      return
    }

    setEducationOpen(true)
  }

  const goToWorks = () => {
    setEducationOpen(false)
    setDesktopDetailSlide(1)
    setMobileSlide(2)
    setDesktopWorkIndex(0)
  }

  const goToTools = () => {
    lastGestureAtRef.current = Date.now()
    wheelDeltaRef.current = 0
    setEducationOpen(false)
    setDesktopDetailSlide(2)
    setMobileSlide(3)
  }

  const goToContacts = () => {
    lastGestureAtRef.current = Date.now()
    wheelDeltaRef.current = 0
    setEducationOpen(false)
    setDesktopDetailSlide(3)
    setMobileSlide(4)
  }

  const goBackToMobileDetails = () => {
    lastGestureAtRef.current = Date.now()
    wheelDeltaRef.current = 0
    setMobileSlide(1)
    setEducationOpen(false)
  }

  const goBackOnDesktop = () => {
    if (desktopDetailSlide > 0) {
      if (desktopDetailSlide === 1 && desktopWorkIndex > 0) {
        setDesktopWorkIndex((current) => current - 1)
        setEducationOpen(false)
        return
      }

      setDesktopDetailSlide((current) => {
        if (current === 3) return 2
        if (current === 2) return 1
        return 0
      })
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
          className="h-[500svh] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
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
            onComplete={goToTools}
          />
          <ToolsSlide
            active={mobileSlide === 3}
            mobile
            onContact={goToContacts}
          />
          <ContactSlide active={mobileSlide === 4} />
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
              className="flex h-screen w-[400vw] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
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
              <WorksSlide
                active={desktopDetailSlide === 1}
                desktopSelectedWork={desktopWorkIndex}
              />
              <ToolsSlide active={desktopDetailSlide === 2} />
              <ContactSlide active={desktopDetailSlide === 3} />
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

        {activeSlide === 0 && (
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-y-0 right-0 z-40 w-[18vw] animate-hero-edge-pulse bg-gradient-to-l from-[#ff6418]/20 via-[#ff6418]/8 to-transparent"
          />
        )}

        {!educationOpen &&
          (activeSlide === 0 ||
            desktopDetailSlide === 0 ||
            desktopDetailSlide === 1 ||
            desktopDetailSlide === 2) && (
          <button
            aria-label="Continue"
            className={`fixed right-5 top-1/2 z-50 grid size-14 -translate-y-1/2 place-items-center rounded-full border shadow-2xl backdrop-blur transition hover:scale-105 ${
              activeSlide === 0
                ? 'border-white/20 bg-white/10 text-white shadow-black/30 hover:bg-white/20'
                : 'border-zinc-950/10 bg-white/70 text-zinc-950 shadow-zinc-900/10 hover:bg-white/90'
            } ${desktopDetailSlide === 1 ? 'animate-sound-pulse' : ''}`}
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
