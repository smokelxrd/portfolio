import type { IconType } from 'react-icons'
import { ChevronsDown } from 'lucide-react'
import {
  SiCanva,
  SiGmail,
  SiGoogleads,
  SiGoogleanalytics,
  SiGoogledocs,
  SiGoogledrive,
  SiGooglemeet,
  SiGooglesheets,
  SiGoogleslides,
  SiMeta,
  SiPixlr,
} from 'react-icons/si'
import { toolRows } from '../data/portfolio'
import { TopographicBackground } from './TopographicBackground'

type ToolsSlideProps = {
  active?: boolean
  mobile?: boolean
  onContact?: () => void
}

const toolIcons: Record<string, { Icon: IconType; color: string }> = {
  Analytics: { Icon: SiGoogleanalytics, color: '#E37400' },
  Canva: { Icon: SiCanva, color: '#00C4CC' },
  Docs: { Icon: SiGoogledocs, color: '#4285F4' },
  Drive: { Icon: SiGoogledrive, color: '#4285F4' },
  Gmail: { Icon: SiGmail, color: '#EA4335' },
  'Google Ads': { Icon: SiGoogleads, color: '#4285F4' },
  Meet: { Icon: SiGooglemeet, color: '#00897B' },
  'Meta Ads': { Icon: SiMeta, color: '#0866FF' },
  Pixlr: { Icon: SiPixlr, color: '#3EBBDF' },
  Sheets: { Icon: SiGooglesheets, color: '#0F9D58' },
  Slides: { Icon: SiGoogleslides, color: '#F4B400' },
}

export function ToolsSlide({
  active = true,
  mobile = false,
  onContact,
}: ToolsSlideProps) {
  return (
    <section className="relative flex h-[100svh] w-full shrink-0 items-center overflow-hidden bg-[#171717] py-8 text-zinc-100 lg:h-screen lg:w-screen">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.07),transparent_24rem),radial-gradient(circle_at_80%_76%,rgba(232,101,24,0.15),transparent_28rem),linear-gradient(180deg,#242424_0%,#151515_58%,#0e0e0e_100%)]" />
      <TopographicBackground className="topographic-field--dark" />

      <div className="relative z-10 w-full">
        <div
          className={`text-row-fade mx-auto mb-7 w-full max-w-6xl px-5 sm:mb-10 sm:px-10 lg:px-20 ${
            active ? 'animate-text-row' : 'opacity-0'
          }`}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-[#ff6418] sm:text-sm">
            Instrumente
          </p>
          <h2 className="max-w-4xl text-[clamp(2.7rem,8vw,8rem)] font-black uppercase leading-[0.82] tracking-[-0.055em] text-[#ff6418]">
            Skillset Tools
          </h2>
        </div>

        <div className="w-screen space-y-5 sm:space-y-6 lg:space-y-8">
          {toolRows.map((row, index) => (
            <div
              className={`text-row-fade overflow-hidden border-y border-white/10 py-4 sm:py-5 ${
                active ? 'animate-text-row' : 'opacity-0'
              }`}
              key={row.category}
              style={{ animationDelay: `${140 + index * 140}ms` }}
            >
              <p className="mx-auto mb-3 w-full max-w-6xl px-5 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-zinc-400 sm:px-10 sm:text-xs lg:px-20">
                {row.category}
              </p>
              <div className="relative">
                <div
                  className={`flex w-max ${
                    row.direction === 'left'
                      ? 'animate-tools-marquee-left'
                      : 'animate-tools-marquee-right'
                  }`}
                >
                  {[0, 1].map((group) => (
                    <div
                      aria-hidden={group === 1}
                      className="flex shrink-0 gap-3 pr-3 sm:gap-4 sm:pr-4"
                      key={`${row.category}-${group}`}
                    >
                      {[...row.tools, ...row.tools, ...row.tools].map((tool, toolIndex) => (
                        <LogoTile
                          key={`${row.category}-${group}-${tool}-${toolIndex}`}
                          label={tool}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {mobile && (
        <button
          className={`education-next-prompt absolute bottom-[calc(18px+env(safe-area-inset-bottom))] left-1/2 z-20 flex -translate-x-1/2 flex-col items-center text-white ${
            active ? 'animate-education-prompt' : ''
          }`}
          onClick={onContact}
          type="button"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.22em]">
            Contacte
          </p>
          <ChevronsDown
            className="mt-2 animate-arrow-pulse"
            size={28}
            aria-hidden="true"
          />
        </button>
      )}
    </section>
  )
}

function LogoTile({ label }: { label: string }) {
  const icon = toolIcons[label]

  return (
    <div className="flex h-13 min-w-[128px] items-center justify-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.055] px-4 text-center shadow-[0_18px_70px_rgba(0,0,0,0.22)] backdrop-blur sm:h-20 sm:min-w-[210px] sm:gap-3 sm:px-5 lg:h-24 lg:min-w-[250px]">
      {icon && (
        <icon.Icon
          aria-hidden="true"
          className="size-6 shrink-0 sm:size-9 lg:size-10"
          color={icon.color}
        />
      )}
      <span className="text-xs font-black uppercase tracking-[-0.015em] text-zinc-100 sm:text-lg lg:text-xl">
        {label}
      </span>
    </div>
  )
}
