import portrait from '../assets/index.png'
import { ChevronsDown } from 'lucide-react'

type CoverSlideProps = {
  mobile?: boolean
}

export function CoverSlide({ mobile = false }: CoverSlideProps) {
  if (mobile) {
    return (
      <section className="relative h-[100svh] overflow-hidden bg-[#171717] p-[18px] text-zinc-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_26%,rgba(255,255,255,0.08),transparent_24rem),linear-gradient(180deg,#242424_0%,#151515_62%,#0e0e0e_100%)]" />

        <h1 className="absolute left-1/2 top-[7svh] z-10 w-[112vw] -translate-x-1/2 text-center text-[clamp(3.65rem,15.2vw,5.65rem)] font-black uppercase leading-[0.98] tracking-[-0.055em] text-[#ff6418]">
          <span className="block">Marketing</span>
          <span className="block">Manager</span>
        </h1>

        <img
          alt="Aliona Matei"
          className="pointer-events-none absolute right-[-33vw] top-[-15svh] z-20 h-[121svh] w-auto max-w-none object-contain drop-shadow-[0_2.5rem_4rem_rgba(0,0,0,0.5)] min-[430px]:right-[-20vw] sm:right-[-8vw] sm:top-[-17svh] sm:h-[124svh]"
          src={portrait}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[34svh] bg-gradient-to-t from-black/70 via-black/35 to-transparent" />

        <div className="absolute bottom-[calc(24svh+env(safe-area-inset-bottom))] left-[calc(50%-48vw+18px)] z-40 max-w-[calc(96vw-36px)] text-xl leading-7 text-zinc-100">
          <p className="mb-1 text-3xl font-black uppercase leading-none tracking-[-0.04em] text-[#ff6418]">
            Aliona Matei
          </p>
          <p>
            <strong>Telefon :</strong> +373 79596223
          </p>
          <p>
            <strong>Email :</strong> alionamatei05@gmail.com
          </p>
          <p>
            <strong>Oras :</strong> Chisinau
          </p>
        </div>

        <p className="absolute bottom-[calc(10svh+env(safe-area-inset-bottom))] left-1/2 z-50 w-[96vw] -translate-x-1/2 whitespace-nowrap text-center text-[13.3vw] font-black uppercase leading-[0.75] tracking-[-0.005em] text-zinc-100">
          Portofoliu
        </p>

        <div className="education-next-prompt animate-education-prompt absolute bottom-[calc(18px+env(safe-area-inset-bottom))] left-1/2 z-50 -translate-x-1/2 text-white">
          <ChevronsDown
            className="animate-arrow-pulse"
            size={30}
            aria-hidden="true"
          />
        </div>
      </section>
    )
  }

  return (
    <section className="relative h-screen w-screen shrink-0 overflow-hidden px-5 py-6 sm:px-10 lg:px-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_26%,rgba(255,255,255,0.08),transparent_24rem),linear-gradient(180deg,#242424_0%,#151515_62%,#0e0e0e_100%)]" />

      <div className="relative z-10 hidden h-full grid-rows-[auto_1fr_auto] lg:grid">
        <header className="flex items-start justify-between gap-6 text-xs uppercase tracking-[0.35em] text-zinc-400">
          <span>Aliona Matei</span>
          <span className="hidden sm:block">Marketing Portfolio</span>
        </header>

        <div className="relative flex items-center">
          <h1 className="relative z-30 max-w-none font-black uppercase leading-[0.82] tracking-[-0.06em] text-[#e86518] lg:z-10">
            <span className="block text-[clamp(3.4rem,12.5vw,12rem)]">
              Marketing
            </span>
            <span className="block text-[clamp(3.4rem,12.5vw,12rem)] lg:translate-x-[9vw]">
              Manager
            </span>
          </h1>

          <div className="pointer-events-none absolute right-[-24vw] top-[14vh] z-20 h-[86vh] w-[78vw] drop-shadow-[0_2.5rem_4rem_rgba(0,0,0,0.45)] sm:right-[-6vw] sm:top-[-8vh] sm:h-[108vh] sm:w-[58vw] lg:right-[17vw] lg:top-[-34vh] lg:h-[134vh] lg:w-[39vw] 2xl:right-[19vw] 2xl:w-[36vw]">
            <div className="h-full w-full overflow-hidden">
              <img
                alt="Aliona Matei"
                className="absolute left-1/2 top-0 h-[112vh] w-auto max-w-none -translate-x-1/2 object-contain sm:h-[150vh] lg:h-[203vh]"
                src={portrait}
              />
            </div>
          </div>

          <div className="absolute right-0 top-[56%] z-30 hidden max-w-xs text-lg leading-7 text-zinc-300 lg:block">
            <p>
              <strong className="text-zinc-100">Telefon :</strong> +373 79596223
            </p>
            <p>
              <strong className="text-zinc-100">Email :</strong>{' '}
              alionamatei05@gmail.com
            </p>
            <p>
              <strong className="text-zinc-100">Oras :</strong> Chisinau
            </p>
          </div>
        </div>

        <div className="relative z-30 pb-4">
          <p className="mb-1 text-[clamp(2.6rem,6.8vw,7.4rem)] font-black uppercase leading-none tracking-[-0.045em] text-[#8d3c10]">
            Aliona Matei
          </p>
          <p className="bg-gradient-to-b from-zinc-400 to-zinc-700 bg-clip-text text-[clamp(4.4rem,15vw,15rem)] font-black uppercase leading-[0.75] tracking-[-0.075em] text-transparent">
            Portofoliu
          </p>
        </div>
      </div>
    </section>
  )
}
