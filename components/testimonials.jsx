import Image from "next/image"

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Web Developer",
      content:
        "Skill Trade has completely transformed how I learn new skills. The token system makes it fair for everyone involved.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Blockchain Engineer",
      content:
        "As someone who both teaches and learns on this platform, I can say it's revolutionized peer-to-peer knowledge sharing.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "UX Designer",
      content:
        "The AI matching system found me the perfect teacher for my specific needs. I've learned more in weeks than I did in months elsewhere.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <section className="w-full py-16 md:py-24 relative overflow-hidden">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 cyber-grid z-0 opacity-30"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/3 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-purple-600/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-blue-600/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl gradient-text-blue-pink">
              What Our Users Say
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-400 md:text-lg">
              Hear from people who have experienced the power of peer-to-peer skill exchange.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="cyber-card cyber-card-hover">
                <div className="cyber-card-content p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden cyber-avatar">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{testimonial.name}</h3>
                      <p className="text-sm text-blue-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-300">{testimonial.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

