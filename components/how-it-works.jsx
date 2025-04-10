import { Search, Users, Award, Coins } from "lucide-react"

export default function HowItWorks() {
  return (
    <section className="w-full py-16 md:py-24 relative overflow-hidden">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 cyber-grid z-0 opacity-30"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/3 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-600/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-pink-600/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl gradient-text-blue-pink">
              How It Works
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-400 md:text-lg">
              Our platform makes skill exchange simple, transparent, and rewarding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            {[
              {
                icon: Search,
                title: "Search Skills",
                desc: "Find the skills you want to learn using our search tool.",
              },
              {
                icon: Users,
                title: "Get Matched",
                desc: "Our AI matches you with the perfect teacher for your needs.",
              },
              {
                icon: Award,
                title: "Learn & Teach",
                desc: "Exchange knowledge in a peer-to-peer learning environment.",
              },
              {
                icon: Coins,
                title: "Earn Tokens",
                desc: "Teachers receive tokens as compensation for their expertise.",
              },
            ].map((step, index) => (
              <div key={index} className="cyber-card group cyber-card-hover">
                <div className="cyber-card-content p-6 flex flex-col items-center space-y-3">
                  <div className="p-4 bg-gradient-to-br from-blue-600/20 to-pink-600/20 rounded-full border border-blue-500/30 group-hover:glow-blue transition-all duration-300">
                    <step.icon className="h-6 w-6 text-blue-400 group-hover:text-blue-300" />
                  </div>
                  <h3 className="text-xl font-medium text-white group-hover:neon-text-blue transition-all duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-400 text-center group-hover:text-gray-300 transition-colors">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

