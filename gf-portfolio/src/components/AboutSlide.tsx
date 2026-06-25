import { profileLines } from '../data/portfolio'
import { TopographicBackground } from './TopographicBackground'

type AboutSlideProps = {
  active?: boolean
  mobile?: boolean
}

export function AboutSlide({
  active = true,
  mobile = false,
}: AboutSlideProps) {
  if (mobile) {
    return (
      <section className="wave-panel relative min-h-screen overflow-hidden px-6 py-10 text-zinc-950">
        <TopographicBackground />
        <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center">
          <div className="relative z-10 w-full">
            <p className="mb-8 text-sm font-semibold uppercase tracking-[0.34em] text-[#d95f16]">
              Despre mine
            </p>

            <div className="space-y-3 text-[clamp(1.15rem,4.4vw,2rem)] font-semibold leading-[1.22] tracking-[-0.035em] text-zinc-950">
              {profileLines.map((line) => (
                <p
                  className="text-row-visible"
                  key={line}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="wave-panel relative flex h-screen w-screen shrink-0 items-center overflow-hidden px-6 py-10 text-zinc-950 sm:px-12 lg:px-20">
      <TopographicBackground />
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <p className="mb-8 text-sm font-semibold uppercase tracking-[0.34em] text-[#d95f16]">
          Despre mine
        </p>

        <div className="space-y-3 text-[clamp(1.15rem,2.4vw,2.78rem)] font-semibold leading-[1.12] tracking-[-0.04em] text-zinc-950">
          {profileLines.map((line, index) => (
            <p
              className={`text-row-fade ${
                active ? 'animate-text-row' : 'text-row-visible'
              }`}
              key={line}
              style={{ animationDelay: `${index * 180}ms` }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>

    </section>
  )
}
