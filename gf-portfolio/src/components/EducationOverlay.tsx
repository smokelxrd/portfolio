import { ArrowRight, ChevronsDown } from 'lucide-react'
import usmLogo from '../assets/USM.png'
import { educationItems } from '../data/portfolio'

type EducationOverlayProps = {
  open: boolean
  mobile?: boolean
  onWorks?: () => void
}

export function EducationOverlay({
  open,
  mobile = false,
  onWorks,
}: EducationOverlayProps) {
  if (mobile) {
    return (
      <section
        aria-hidden={!open}
        className={`absolute inset-0 z-40 flex items-center justify-center bg-zinc-950/18 px-[18px] text-zinc-950 backdrop-blur-md transition-opacity duration-500 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className={`flex w-full max-w-[390px] flex-col items-stretch gap-4 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            open ? 'translate-y-0' : 'translate-y-[80px]'
          }`}
        >
          {educationItems.map((item, index) => (
            <div className="contents" key={item.title}>
              {index > 0 && <TimelineArrow mobile />}
              <EducationCard item={item} mobile />
            </div>
          ))}

          <ContinuePrompt open={open} onWorks={onWorks} mobile />
        </div>
      </section>
    )
  }

  return (
    <section
      aria-hidden={!open}
      className={`absolute inset-0 z-40 flex items-center justify-center bg-zinc-950/18 px-0 text-zinc-950 backdrop-blur-md transition-opacity duration-500 ${
        open ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        className={`relative flex min-h-[58vh] w-full flex-col justify-center border-y border-zinc-900/10 bg-white/94 px-8 py-9 shadow-[0_24px_90px_rgba(0,0,0,0.18)] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          open ? 'translate-y-0' : 'translate-y-[115%]'
        }`}
      >
        <div className="mb-6 text-center">
          <p className="text-[clamp(1.45rem,2.55vw,2.55rem)] font-semibold uppercase tracking-[-0.04em] text-zinc-950">
            Educație
          </p>
          <div className="mx-auto mt-4 h-px w-20 bg-zinc-900/20" />
        </div>

        <div className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-4">
          <EducationCard item={educationItems[0]} />
          <TimelineArrow />
          <EducationCard item={educationItems[1]} />
        </div>

        <ContinuePrompt open={open} onWorks={onWorks} />
      </div>
    </section>
  )
}

function EducationCard({
  item,
  mobile = false,
}: {
  item: (typeof educationItems)[number]
  mobile?: boolean
}) {
  return (
    <article
      className={
        mobile
          ? 'flex min-h-[220px] flex-col items-center justify-center rounded-lg border border-zinc-900/8 bg-white/92 px-6 py-7 text-center shadow-[0_18px_70px_rgba(0,0,0,0.16)]'
          : 'flex min-h-[230px] flex-col items-center justify-center rounded-lg border border-zinc-900/8 bg-white/55 px-5 py-6 text-center shadow-[0_12px_60px_rgba(0,0,0,0.08)]'
      }
    >
      <div
        className={
          mobile
            ? 'mb-5 grid h-20 w-24 place-items-center'
            : 'mb-5 grid h-24 w-28 shrink-0 place-items-center'
        }
      >
        <img
          alt="USM Moldova"
          className="h-full w-full object-contain"
          src={usmLogo}
        />
      </div>
      <h3
        className={
          mobile
            ? 'text-2xl font-semibold tracking-[-0.04em] text-zinc-950'
            : 'text-[clamp(1.5rem,2.05vw,2.05rem)] font-semibold tracking-[-0.04em] text-zinc-950'
        }
      >
        {item.title}
      </h3>
      <p
        className={
          mobile
            ? 'mt-5 text-xs uppercase tracking-[0.28em] text-zinc-600'
            : 'mt-4 text-xs uppercase tracking-[0.22em] text-zinc-600'
        }
      >
        {item.subtitle}
      </p>
      <p className={mobile ? 'mt-3 text-sm text-zinc-700' : 'mt-2 text-sm text-zinc-700'}>
        {item.school}
      </p>
      <p className={mobile ? 'mt-3 text-xs text-zinc-500' : 'mt-2 text-xs text-zinc-500'}>
        {item.years}
      </p>
    </article>
  )
}

function TimelineArrow({ mobile = false }: { mobile?: boolean }) {
  if (mobile) {
    return (
      <div className="flex h-16 justify-center">
        <div className="relative h-full w-px bg-zinc-950/18">
          <span className="absolute bottom-0 left-1/2 size-3 -translate-x-1/2 rotate-45 border-b border-r border-zinc-950/40" />
        </div>
      </div>
    )
  }

  return (
    <div className="grid min-w-[92px] place-items-center">
      <div className="relative h-px w-full bg-zinc-950/18">
        <span className="absolute right-0 top-1/2 size-3 -translate-y-1/2 rotate-[-45deg] border-b border-r border-zinc-950/40" />
      </div>
    </div>
  )
}

function ContinuePrompt({
  open,
  onWorks,
  mobile = false,
}: {
  open: boolean
  mobile?: boolean
  onWorks?: () => void
}) {
  if (!mobile) {
    return (
      <button
        className={`group absolute right-8 top-1/2 flex -translate-y-1/2 items-center gap-4 text-zinc-950 transition duration-500 ${
          open
            ? 'opacity-100'
            : 'pointer-events-none translate-x-5 opacity-0'
        }`}
        onClick={onWorks}
        type="button"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.22em]">
          Vezi Lucrările
        </p>
        <span className="grid size-12 place-items-center rounded-full border border-zinc-950/10 bg-zinc-950/5 transition group-hover:bg-zinc-950/10">
          <ArrowRight
            className="animate-arrow-pulse-horizontal"
            size={24}
            aria-hidden="true"
          />
        </span>
      </button>
    )
  }

  return (
    <button
      className={`education-next-prompt mt-8 flex flex-col items-center text-zinc-950 ${
        open ? 'animate-education-prompt' : ''
      }`}
      onClick={onWorks}
      type="button"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.22em]">
        Vezi Lucrările
      </p>
      <ChevronsDown
        className="mt-2 animate-arrow-pulse"
        size={28}
        aria-hidden="true"
      />
    </button>
  )
}
