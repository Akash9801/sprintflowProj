import LandingNavbar from '../components/landing/LandingNavbar'
import HeroSection from '../components/landing/HeroSection'
import FeaturesSection from '../components/landing/FeaturesSection'
import WorkflowSection from '../components/landing/WorkflowSection'
import StatsSection from '../components/landing/StatsSection'
import CTASection from '../components/landing/CTASection'
import Footer from '../components/landing/Footer'

export default function Landing() {
  return (
    <div className="bg-white min-h-screen">
      <LandingNavbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <WorkflowSection />
        <StatsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
