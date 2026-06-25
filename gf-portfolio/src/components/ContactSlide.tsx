import { Mail, MapPin, Phone } from 'lucide-react'
import { contactLinks } from '../data/portfolio'
import { TopographicBackground } from './TopographicBackground'

const contactIcons = {
  Email: Mail,
  Oraș: MapPin,
  Telefon: Phone,
}

type ContactSlideProps = {
  active?: boolean
  mobile?: boolean
}

export function ContactSlide({
  active = true,
  mobile = false,
}: ContactSlideProps) {
  const revealClass = mobile
    ? 'text-row-visible'
    : `text-row-fade ${active ? 'animate-text-row' : 'text-row-visible'}`

  return (
    <section className="relative flex h-[100svh] w-full shrink-0 items-center overflow-hidden bg-white px-5 py-8 text-zinc-950 sm:px-10 lg:h-screen lg:w-screen lg:px-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(255,100,24,0.12),transparent_25rem),radial-gradient(circle_at_18%_78%,rgba(255,100,24,0.16),transparent_29rem),linear-gradient(180deg,#ffffff_0%,#f8f7f4_58%,#ffffff_100%)]" />
      <TopographicBackground className="topographic-field--orange" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(320px,0.72fr)] lg:items-center lg:gap-16">
        <div
          className={revealClass}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-[#ff6418] sm:text-sm">
            Contacte
          </p>
          <h2 className="max-w-4xl text-[clamp(2.55rem,7.3vw,8rem)] font-black uppercase leading-[1.08] tracking-[-0.02em] text-[#ff6418] sm:leading-[1.06] sm:tracking-[-0.025em] lg:leading-[1.08]">
            Hai să lucrăm
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-700 sm:text-xl sm:leading-9">
            Pentru colaborări, campanii social media sau proiecte de marketing,
            datele de contact sunt disponibile aici.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {contactLinks.map((item, index) => {
            const Icon = contactIcons[item.label as keyof typeof contactIcons]

            return (
              <a
                className={`${revealClass} group flex items-center gap-4 rounded-lg border border-zinc-950/10 bg-white/72 p-4 shadow-[0_18px_70px_rgba(23,23,23,0.12)] backdrop-blur transition hover:border-[#ff6418]/50 hover:bg-white sm:p-5`}
                href={item.href}
                key={item.label}
                rel="noreferrer"
                style={{ animationDelay: `${160 + index * 140}ms` }}
                target={item.href.startsWith('http') ? '_blank' : undefined}
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-[#ff6418]/20 bg-[#ff6418]/12 text-[#ff6418] transition group-hover:bg-[#ff6418]/18 sm:size-14">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                    {item.label}
                  </span>
                  <span className="mt-1 block break-words text-lg font-semibold tracking-[-0.025em] text-zinc-950 sm:text-2xl">
                    {item.value}
                  </span>
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
