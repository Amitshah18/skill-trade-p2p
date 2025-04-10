import { Shield, Globe, Zap, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutSection() {
  return (
    <section className="w-full py-16 md:py-24 relative overflow-hidden">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 cyber-grid z-0 opacity-30"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/3 -right-1/4 w-1/2 h-1/2 bg-gradient-to-bl from-purple-600/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-blue-600/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-8 text-center mb-12">
          <div className="space-y-3 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl gradient-text-blue-pink">
              About SkillTrade
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-400 md:text-lg">
              A revolutionary platform that connects learners with teachers in a decentralized ecosystem.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              {[
                {
                  icon: Shield,
                  title: "Secure Blockchain Technology",
                  description:
                    "Built on secure blockchain technology ensuring transparent and tamper-proof transactions.",
                },
                {
                  icon: Globe,
                  title: "Global Community",
                  description:
                    "Connect with teachers and learners from around the world, breaking geographical barriers.",
                },
                {
                  icon: Zap,
                  title: "AI-Powered Matching",
                  description:
                    "Our advanced AI algorithms match you with the perfect teacher based on your learning style.",
                },
                {
                  icon: Users,
                  title: "Peer-to-Peer Learning",
                  description: "Direct connections between teachers and students without intermediaries.",
                },
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-blue-600/20 to-pink-600/20 border border-blue-500/30">
                    <feature.icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-medium text-white">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button className="cyber-button-enhanced rounded-md mt-6" asChild>
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-lg blur-xl opacity-30"></div>
            <div className="relative glossy-card border border-white/10 p-6 rounded-xl shadow-2xl">
              <div className="space-y-6">
                <div className="cyber-stat p-4 glossy-card-dark">
                  <h4 className="text-sm text-gray-400 mb-1">Active Users</h4>
                  <p className="cyber-stat-value">10,000+</p>
                </div>

                <div className="cyber-stat p-4 glossy-card-dark">
                  <h4 className="text-sm text-gray-400 mb-1">Skills Taught</h4>
                  <p className="cyber-stat-value">500+</p>
                </div>

                <div className="cyber-stat p-4 glossy-card-dark">
                  <h4 className="text-sm text-gray-400 mb-1">Countries</h4>
                  <p className="cyber-stat-value">75+</p>
                </div>

                <div className="cyber-stat p-4 glossy-card-dark">
                  <h4 className="text-sm text-gray-400 mb-1">Satisfaction Rate</h4>
                  <p className="cyber-stat-value">98%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

