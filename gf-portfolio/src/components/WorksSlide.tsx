import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ChevronLeft,
  Play,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { works } from '../data/portfolio'
import { TopographicBackground } from './TopographicBackground'

type WorksSlideProps = {
  active?: boolean
  mobile?: boolean
  onBack?: () => void
  onComplete?: () => void
  desktopSelectedWork?: number
}

export function WorksSlide({
  active = true,
  mobile = false,
  onBack,
  onComplete,
  desktopSelectedWork = 0,
}: WorksSlideProps) {
  if (mobile) {
    return (
      <MobileVideoFeed
        active={active}
        onBack={onBack}
        onComplete={onComplete}
      />
    )
  }

  return (
    <DesktopVideoShowcase
      active={active}
      selectedWork={desktopSelectedWork}
    />
  )
}

function MobileVideoFeed({
  active,
  onBack,
  onComplete,
}: {
  active: boolean
  onBack?: () => void
  onComplete?: () => void
}) {
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const hideUiTimerRef = useRef<number | null>(null)
  const touchStartYRef = useRef<number | null>(null)
  const activeVideoRef = useRef(0)
  const [failedVideos, setFailedVideos] = useState<Record<number, boolean>>({})
  const [muted, setMuted] = useState(true)
  const [uiVisible, setUiVisible] = useState(true)

  const scheduleUiHide = useCallback(() => {
    if (muted) {
      setUiVisible(true)
      return
    }

    if (hideUiTimerRef.current !== null) {
      window.clearTimeout(hideUiTimerRef.current)
    }

    hideUiTimerRef.current = window.setTimeout(() => {
      setUiVisible(false)
    }, 1800)
  }, [muted])

  const revealUi = useCallback(() => {
    setUiVisible(true)
    scheduleUiHide()
  }, [scheduleUiHide])

  const toggleSound = () => {
    setMuted((current) => {
      const nextMuted = !current

      setUiVisible(true)
      if (hideUiTimerRef.current !== null) {
        window.clearTimeout(hideUiTimerRef.current)
      }

      if (!nextMuted) {
        hideUiTimerRef.current = window.setTimeout(() => {
          setUiVisible(false)
        }, 1800)
      }

      return nextMuted
    })
  }

  useEffect(() => {
    if (!active) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement

          if (entry.isIntersecting) {
            activeVideoRef.current = Number(video.dataset.index ?? 0)
            void video.play()
            setUiVisible(true)
            scheduleUiHide()
            return
          }

          video.pause()
          video.currentTime = 0
        })
      },
      { threshold: 0.72 },
    )

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video)
    })

    return () => observer.disconnect()
  }, [active, scheduleUiHide])

  useEffect(() => {
    return () => {
      if (hideUiTimerRef.current !== null) {
        window.clearTimeout(hideUiTimerRef.current)
      }
    }
  }, [])

  return (
    <section
      className="relative h-[100svh] w-full shrink-0 snap-y snap-mandatory overflow-y-auto overscroll-contain bg-black text-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      onWheel={(event) => {
        if (activeVideoRef.current === 0 && event.deltaY < -18) {
          event.preventDefault()
          event.stopPropagation()
          onBack?.()
          return
        }

        if (activeVideoRef.current === works.length - 1 && event.deltaY > 18) {
          event.preventDefault()
          event.stopPropagation()
          onComplete?.()
        }
      }}
      onPointerDown={revealUi}
      onTouchEnd={(event) => {
        const startY = touchStartYRef.current
        const endY = event.changedTouches[0]?.clientY
        touchStartYRef.current = null

        if (
          startY !== null &&
          endY !== undefined &&
          activeVideoRef.current === 0 &&
          startY - endY < -56
        ) {
          event.stopPropagation()
          onBack?.()
          return
        }

        if (
          startY !== null &&
          endY !== undefined &&
          activeVideoRef.current === works.length - 1 &&
          startY - endY > 56
        ) {
          event.stopPropagation()
          onComplete?.()
        }
      }}
      onTouchStart={(event) => {
        touchStartYRef.current = event.touches[0]?.clientY ?? null
      }}
    >
      {onBack && (
        <button
          aria-label="Back to portfolio"
          className={`fixed left-4 top-[calc(16px+env(safe-area-inset-top))] z-50 grid size-11 place-items-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur transition duration-500 active:scale-95 ${
            uiVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          onClick={onBack}
          type="button"
        >
          <ChevronLeft size={24} aria-hidden="true" />
        </button>
      )}

      {works.map((item, index) => (
        <article
          className="relative flex h-[100svh] snap-start snap-always items-end overflow-hidden bg-zinc-950"
          key={item.title}
        >
          {!failedVideos[index] && (
            <video
              aria-label={item.title}
              className="absolute inset-0 h-full w-full object-cover"
              loop
              muted={muted}
              onError={() =>
                setFailedVideos((current) => ({ ...current, [index]: true }))
              }
              playsInline
              preload={index === 0 ? 'auto' : 'metadata'}
              data-index={index}
              ref={(node) => {
                videoRefs.current[index] = node
              }}
              src={item.source}
            />
          )}

          {failedVideos[index] && (
            <div className="absolute inset-0">
              <VideoFallback index={index} title={item.title} />
            </div>
          )}

          <div
            className={`pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.22)_0%,transparent_46%,rgba(0,0,0,0.86)_100%)] transition-opacity duration-700 ${
              uiVisible ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <div
            className={`relative z-10 mb-[calc(7svh+env(safe-area-inset-bottom))] flex max-h-[30svh] w-full flex-col justify-end overflow-hidden px-5 transition duration-700 ${
              uiVisible
                ? 'translate-y-0 opacity-100'
                : 'pointer-events-none translate-y-4 opacity-0'
            }`}
          >
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[#ff6418]">
              {String(index + 1).padStart(2, '0')} /{' '}
              {String(works.length).padStart(2, '0')}
            </p>
            <h2 className="mt-2 max-w-[82vw] text-[clamp(1.65rem,8.8vw,2.8rem)] font-black uppercase leading-[0.84] tracking-[-0.045em] text-white">
              {item.title}
            </h2>
            <p className="mt-3 max-w-[82vw] text-sm leading-5 text-zinc-100">
              {item.description}
            </p>
            <div className="mt-3 flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white">
              <span className="rounded-full border border-white/20 bg-white/12 px-2.5 py-1.5 backdrop-blur">
                {item.format}
              </span>
              <span className="rounded-full border border-white/20 bg-white/12 px-2.5 py-1.5 backdrop-blur">
                {item.metric}
              </span>
              <button
                aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
                className={`pointer-events-auto grid size-8 place-items-center rounded-full border border-white/20 bg-white/12 text-white backdrop-blur transition active:scale-95 ${
                  muted ? 'animate-sound-pulse' : ''
                }`}
                onClick={toggleSound}
                type="button"
              >
                {muted ? (
                  <VolumeX size={15} aria-hidden="true" />
                ) : (
                  <Volume2 size={15} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}

function DesktopVideoShowcase({
  active,
  selectedWork,
}: {
  active: boolean
  selectedWork: number
}) {
  const [failedVideos, setFailedVideos] = useState<Record<number, boolean>>({})
  const currentWork = works[selectedWork]

  return (
    <section className="relative flex h-screen w-screen shrink-0 items-center overflow-hidden bg-[#171717] px-16 py-10 text-zinc-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(255,255,255,0.08),transparent_25rem),radial-gradient(circle_at_14%_82%,rgba(232,101,24,0.14),transparent_26rem),linear-gradient(180deg,#242424_0%,#151515_58%,#0e0e0e_100%)]" />
      <TopographicBackground className="topographic-field--dark" />
      <SocialBackgroundMarks />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)_minmax(280px,390px)] items-center gap-14">
        <div
          className={`text-row-fade ${
            active ? 'animate-text-row' : 'opacity-0'
          }`}
        >
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.34em] text-[#ff6418]">
            Lucrări
          </p>
          <h2 className="max-w-3xl text-[clamp(4rem,8vw,8rem)] font-black uppercase leading-[0.82] tracking-[-0.06em] text-[#ff6418]">
            Video Showcase
          </h2>

          <div className="mt-10 max-w-2xl border-y border-white/10 py-7">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#ff6418]/80">
              {String(selectedWork + 1).padStart(2, '0')} /{' '}
              {String(works.length).padStart(2, '0')}
            </p>
            <h3 className="mt-4 text-5xl font-black uppercase leading-none tracking-[-0.05em] text-white">
              {currentWork.title}
            </h3>
            <p className="mt-5 text-lg leading-8 text-zinc-300">
              {currentWork.description}
            </p>
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-300">
              <span className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-2">
                {currentWork.format}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-2">
                {currentWork.metric}
              </span>
          </div>
        </div>

        <div
          className={`text-row-fade relative aspect-[9/16] w-full overflow-hidden rounded-[22px] border border-white/15 bg-zinc-950 shadow-[0_30px_90px_rgba(0,0,0,0.44)] ${
            active ? 'animate-text-row' : 'opacity-0'
          }`}
          style={{ animationDelay: '120ms' }}
        >
          {!failedVideos[selectedWork] && (
            <video
              aria-label={currentWork.title}
              autoPlay
              className="h-full w-full object-cover"
              controls
              key={currentWork.source}
              loop
              muted
              onError={() =>
                setFailedVideos((current) => ({
                  ...current,
                  [selectedWork]: true,
                }))
              }
              playsInline
              src={currentWork.source}
            />
          )}

          {failedVideos[selectedWork] && (
            <VideoFallback index={selectedWork} title={currentWork.title} />
          )}
        </div>
      </div>
    </section>
  )
}

function VideoFallback({ index, title }: { index: number; title: string }) {
  return (
    <div className="grid h-full w-full place-items-center bg-[linear-gradient(160deg,#2a2a2a_0%,#111_52%,#381907_100%)] px-8 text-center">
      <div>
        <div className="mx-auto grid size-16 place-items-center rounded-full border border-white/15 bg-white/10 text-[#ff6418]">
          <Play size={28} fill="currentColor" aria-hidden="true" />
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-[#ff6418]/80">
          Video {String(index + 1).padStart(2, '0')}
        </p>
        <p className="mt-3 text-2xl font-black uppercase leading-none tracking-[-0.045em] text-white">
          {title}
        </p>
      </div>
    </div>
  )
}

function SocialBackgroundMarks() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] text-white/5">
      <svg
        aria-hidden="true"
        className="absolute left-[7vw] top-[15vh] h-[26vh] w-[26vh] rotate-[-8deg] overflow-visible lg:h-[32vh] lg:w-[32vh]"
        viewBox="0 0 64 82"
        fill="currentColor"
      >
        <path d="M38.6 20.3h7.2V9.1c-1.2-.2-5.5-.5-10.4-.5-10.3 0-17.3 6.3-17.3 17.8v10H6.8v12.5h11.3v31h13.8v-31h10.8l1.7-12.5H31.9v-8.7c0-3.6 1-7.4 6.7-7.4Z" />
      </svg>

      <svg
        aria-hidden="true"
        className="absolute bottom-[18vh] right-[10vw] h-[24vh] w-[24vh] rotate-[10deg] overflow-visible lg:h-[30vh] lg:w-[30vh]"
        viewBox="0 0 64 68"
        fill="currentColor"
      >
        <path d="M42.7 7.8c1.2 8 5.7 13 13.4 13.5v11.5c-4.5.4-8.4-1-13-3.8v16.8c0 21.3-23.2 28-32.6 12.7-6.1-9.9-2.4-27.2 17.3-27.9v12.1c-1.5.2-3.2.6-4.7 1.2-4.5 1.5-7.1 4.5-6.4 9.8 1.3 10.1 19.9 13.1 18.4-6.7V7.8h7.6Z" />
      </svg>
    </div>
  )
}
