import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Problem } from './components/Problem'
import { Solution } from './components/Solution'
import { HowItWorks } from './components/HowItWorks'
import { Features } from './components/Features'
import { Innovation } from './components/Innovation'
import { Technology } from './components/Technology'
import { Impact } from './components/Impact'
import { Research } from './components/Research'
import Team from './components/Team'
import { FinalCTA } from './components/FinalCTA'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <Features />
        <Innovation />
        <Technology />
        <Impact />
        <Research />
        <Team />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}