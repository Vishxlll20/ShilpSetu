import { Code2, Cpu, Palette, Rocket, Landmark } from 'lucide-react'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

const ROLES = [
  { icon: Rocket, title: 'Product & Vision', members: 'Vishal' },
  { icon: Code2, title: 'Mobile & Full-Stack', members: 'Engineering crew' },
  { icon: Cpu, title: 'AI / ML Pipeline', members: 'Models & integration' },
  { icon: Palette, title: 'Design & Research', members: 'UX + market study' },
]

function Team() {
  return (
    <section id="team" className="section-pad relative overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent" />
      <div className="pattern-mandala absolute -right-16 top-16 h-64 w-64 opacity-40" />

      <div className="container-shilp relative">
        <SectionHeading
          badge="The Team"
          title={
            <>
              Built by Builders, <span className="text-saffron">Rooted in Bharat.</span>
            </>
          }
          description="A Smart India Hackathon team fusing engineering, AI, design and policy thinking — with a single obsession: the Indian artisan."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ROLES.map((role, i) => (
            <Reveal key={role.title} delay={i * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-navy/8 bg-cream/40 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-saffron/25 hover:bg-white hover:shadow-card">
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-saffron/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-cream transition-transform duration-300 group-hover:scale-105">
                  <role.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-base font-bold text-navy">{role.title}</h3>
                <p className="mt-1.5 text-sm text-navy/75">{role.members}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Header Bhavan nod */}
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col items-center gap-2 text-center">
            <Landmark className="h-5 w-5 text-indian-green" />
            <p className="max-w-xl text-sm leading-relaxed text-navy/75">
              Built for the Smart India Hackathon — with the Ministry of Social Justice &amp; Empowerment’s
              vision for a more inclusive digital economy.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Team