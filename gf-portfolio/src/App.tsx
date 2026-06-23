import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import portrait from './assets/index.png'

function App() {
  const [activePanel, setActivePanel] = useState(0)

  const goToNextPanel = () => {
    setActivePanel((panel) => (panel === 0 ? 1 : 0))
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#171717] text-zinc-100">
      <div
        className="flex h-screen w-[200vw] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{ transform: `translateX(-${activePanel * 100}vw)` }}
      >
        <section className="relative h-screen w-screen shrink-0 overflow-hidden px-5 py-6 sm:px-10 lg:px-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_26%,rgba(255,255,255,0.08),transparent_24rem),linear-gradient(180deg,#242424_0%,#151515_62%,#0e0e0e_100%)]" />

          <div className="relative z-10 h-full lg:hidden">
            <header className="relative z-40 text-xs uppercase tracking-[0.35em] text-zinc-300">
              Aliona Matei
            </header>

            <h1 className="absolute left-1/2 top-[7vh] z-10 w-[118vw] -translate-x-1/2 text-center text-[clamp(3.8rem,16vw,5.8rem)] font-black uppercase leading-[0.98] tracking-[-0.06em] text-[#ff6418]">
              <span className="block">Marketing</span>
              <span className="block">Manager</span>
            </h1>

            <img
              alt="Aliona Matei"
              className="pointer-events-none absolute right-[-31vw] top-[-16vh] z-20 h-[119vh] w-auto max-w-none object-contain drop-shadow-[0_2.5rem_4rem_rgba(0,0,0,0.5)] min-[430px]:right-[-18vw] sm:right-[-6vw] sm:top-[-18vh] sm:h-[123vh]"
              src={portrait}
            />

            <div className="absolute bottom-[13vh] left-0 z-40 max-w-[92vw] text-xl leading-7 text-zinc-100">
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

            <p className="absolute bottom-[1vh] left-1/2 z-50 w-[96vw] -translate-x-1/2 whitespace-nowrap text-center text-[13.8vw] font-black uppercase leading-[0.75] tracking-[-0.01em] text-zinc-100">
              Portofoliu
            </p>
          </div>

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
                  <strong className="text-zinc-100">Telefon :</strong> +373
                  79596223
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

        <section className="flex h-screen w-screen shrink-0 items-center overflow-hidden bg-[#f1eee8] px-6 py-10 text-zinc-950 sm:px-12 lg:px-20">
          <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.32em] text-[#d95f16]">
                Profile
              </p>
              <h2 className="max-w-3xl text-[clamp(3rem,8vw,8.5rem)] font-black uppercase leading-[0.86] tracking-[-0.07em]">
                Strategy with presence.
              </h2>
            </div>

            <div className="max-w-xl space-y-8 text-lg leading-8 text-zinc-700">
              <p>
                A clean second screen for the next portfolio chapter: experience,
                services, selected campaigns, or case studies.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {['Brand', 'Content', 'Growth'].map((item) => (
                  <div
                    className="border-t border-zinc-950/20 pt-4 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-950"
                    key={item}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <button
        aria-label={activePanel === 0 ? 'Go to next page' : 'Return to cover page'}
        className="fixed right-5 top-1/2 z-50 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-white shadow-2xl shadow-black/30 backdrop-blur transition hover:scale-105 hover:bg-white/20 sm:right-8 sm:size-14"
        onClick={goToNextPanel}
        type="button"
      >
        {activePanel === 0 ? (
          <ArrowRight size={24} aria-hidden="true" />
        ) : (
          <ArrowLeft size={24} aria-hidden="true" />
        )}
      </button>
    </main>
  )
}

export default App
