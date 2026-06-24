import { ChevronsDown } from 'lucide-react'
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
          {educationItems.map((item) => (
            <article
              className="flex min-h-[220px] flex-col items-center justify-center rounded-lg border border-zinc-900/8 bg-white/92 px-6 py-7 text-center shadow-[0_18px_70px_rgba(0,0,0,0.16)]"
              key={item.title}
            >
              <div className="mb-5 grid size-20 place-items-center rounded-full bg-zinc-900/8 p-3">
                <img
                  alt="USM Moldova"
                  className="h-full w-full object-contain"
                  src={usmLogo}
                />
              </div>
              <h3 className="text-2xl font-semibold tracking-[-0.04em] text-zinc-950">
                {item.title}
              </h3>
              <p className="mt-5 text-xs uppercase tracking-[0.28em] text-zinc-600">
                {item.subtitle}
              </p>
              <p className="mt-3 text-sm text-zinc-700">{item.school}</p>
              <p className="mt-3 text-xs text-zinc-500">{item.years}</p>
            </article>
          ))}

          <ContinuePrompt open={open} onWorks={onWorks} />
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
        className={`flex min-h-[58vh] w-full flex-col justify-center border-y border-zinc-900/10 bg-white/94 px-8 py-9 shadow-[0_24px_90px_rgba(0,0,0,0.18)] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          open ? 'translate-y-0' : 'translate-y-[115%]'
        }`}
      >
        <div className="mb-6 text-center">
          <p className="text-[clamp(1.45rem,2.55vw,2.55rem)] font-semibold uppercase tracking-[-0.04em] text-zinc-950">
            Educatie
          </p>
          <div className="mx-auto mt-4 h-px w-20 bg-zinc-900/20" />
        </div>

        <div className="mx-auto grid w-full max-w-6xl gap-4 md:grid-cols-2">
          {educationItems.map((item) => (
            <article
              className="flex min-h-[230px] flex-col items-center justify-center rounded-lg border border-zinc-900/8 bg-white/55 px-5 py-6 text-center shadow-[0_12px_60px_rgba(0,0,0,0.08)]"
              key={item.title}
            >
              <div className="mb-5 grid size-24 shrink-0 place-items-center rounded-full bg-zinc-900/8 p-3.5">
                <img
                  alt="USM Moldova"
                  className="h-full w-full object-contain"
                  src={usmLogo}
                />
              </div>
              <h3 className="text-[clamp(1.5rem,2.05vw,2.05rem)] font-semibold tracking-[-0.04em] text-zinc-950">
                {item.title}
              </h3>
              <p className="mt-4 text-xs uppercase tracking-[0.22em] text-zinc-600">
                {item.subtitle}
              </p>
              <p className="mt-2 text-sm text-zinc-700">{item.school}</p>
              <p className="mt-2 text-xs text-zinc-500">{item.years}</p>
            </article>
          ))}
        </div>

        <ContinuePrompt open={open} onWorks={onWorks} />
      </div>
    </section>
  )
}

function ContinuePrompt({
  open,
  onWorks,
}: {
  open: boolean
  onWorks?: () => void
}) {
  return (
    <button
      className={`education-next-prompt mt-8 flex flex-col items-center text-zinc-950 ${
        open ? 'animate-education-prompt' : ''
      }`}
      onClick={onWorks}
      type="button"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.22em]">
        Vezi Lucrarile
      </p>
      <ChevronsDown
        className="mt-2 animate-arrow-pulse"
        size={28}
        aria-hidden="true"
      />
    </button>
  )
}
