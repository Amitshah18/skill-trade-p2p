import Hero from "@/components/hero"
import SkillSearch from "@/components/skill-search"
import HowItWorks from "@/components/how-it-works"
import FeaturedSkills from "@/components/featured-skills"
import Testimonials from "@/components/testimonials"
import AboutSection from "@/components/about-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <SkillSearch />
      <HowItWorks />
      <FeaturedSkills />
      <AboutSection />
      <Testimonials />
    </main>
  )
}

