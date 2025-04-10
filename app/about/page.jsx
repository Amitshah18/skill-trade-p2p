"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Shield, Zap, Users, ChevronRight, Code, Wallet, Lock } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  // Team members data
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Former software engineer with a passion for education and blockchain technology.",
      image: "/placeholder.svg?height=200&width=200",
      initials: "SJ",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "Blockchain expert with 10+ years of experience in decentralized applications.",
      image: "/placeholder.svg?height=200&width=200",
      initials: "MC",
    },
    {
      name: "Emma Wilson",
      role: "Head of Product",
      bio: "UX/UI specialist focused on creating intuitive learning experiences.",
      image: "/placeholder.svg?height=200&width=200",
      initials: "EW",
    },
    {
      name: "David Kim",
      role: "Lead Developer",
      bio: "Full-stack developer specializing in React and Solidity smart contracts.",
      image: "/placeholder.svg?height=200&width=200",
      initials: "DK",
    },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-24 md:py-32 relative overflow-hidden">
        {/* Cyberpunk grid background */}
        <div className="absolute inset-0 cyber-grid z-0 opacity-30"></div>

        {/* Abstract background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl"></div>
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl neon-text-blue mb-6">
              Revolutionizing Skill Exchange with <span className="neon-text-pink">Web3</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              SkillTrade is a decentralized platform that connects learners with teachers in a secure, transparent
              ecosystem powered by blockchain technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="cyber-button-enhanced rounded-md group" asChild>
                <Link href="/explore">
                  Explore Platform{" "}
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="cyber-button rounded-md border-white/30 backdrop-blur-sm hover:bg-white/10 text-white"
                asChild
              >
                <Link href="/signup">Join Community</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="w-full py-16 bg-gray-900/30 relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid z-0 opacity-20"></div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl gradient-text-blue-pink mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-300">
              We're on a mission to democratize education by creating a peer-to-peer learning ecosystem where knowledge
              is valued, teachers are fairly compensated, and students can access quality education regardless of
              geographical barriers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="cyber-card">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600/20 to-pink-600/20 border border-blue-500/30 flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">Connect</h3>
                <p className="text-gray-400">
                  Connect learners with teachers from around the world, breaking down geographical barriers and creating
                  a global community of knowledge sharing.
                </p>
              </CardContent>
            </Card>

            <Card className="cyber-card">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600/20 to-pink-600/20 border border-blue-500/30 flex items-center justify-center mb-4">
                  <Zap className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">Empower</h3>
                <p className="text-gray-400">
                  Empower individuals to monetize their skills and knowledge, creating new opportunities for income and
                  professional growth.
                </p>
              </CardContent>
            </Card>

            <Card className="cyber-card">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600/20 to-pink-600/20 border border-blue-500/30 flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">Secure</h3>
                <p className="text-gray-400">
                  Provide a secure and transparent platform using blockchain technology to ensure fair compensation and
                  protect user data.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="w-full py-16 relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid z-0 opacity-30"></div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl gradient-text-blue-pink mb-6">
                Powered by Web3 Technology
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                SkillTrade leverages the power of blockchain technology to create a decentralized, transparent, and
                secure platform for skill exchange.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-blue-600/20 to-pink-600/20 border border-blue-500/30">
                    <Code className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-medium text-white">Smart Contracts</h3>
                    <p className="text-gray-400">
                      Automated agreements between teachers and students ensure transparent and fair transactions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-blue-600/20 to-pink-600/20 border border-blue-500/30">
                    <Wallet className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-medium text-white">Token Economy</h3>
                    <p className="text-gray-400">
                      Our native token (SKT) facilitates seamless transactions and rewards within the ecosystem.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-blue-600/20 to-pink-600/20 border border-blue-500/30">
                    <Lock className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-medium text-white">Decentralized Identity</h3>
                    <p className="text-gray-400">
                      Users maintain control of their data and reputation across the platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-lg blur-xl opacity-30"></div>
              <div className="relative glossy-card border border-white/10 p-6 rounded-xl shadow-2xl">
                <div className="space-y-6">
                  <div className="cyber-stat p-4 glossy-card-dark">
                    <h4 className="text-sm text-gray-400 mb-1">Transactions Processed</h4>
                    <p className="cyber-stat-value">250,000+</p>
                  </div>

                  <div className="cyber-stat p-4 glossy-card-dark">
                    <h4 className="text-sm text-gray-400 mb-1">Total Value Locked</h4>
                    <p className="cyber-stat-value">$1.2M+</p>
                  </div>

                  <div className="cyber-stat p-4 glossy-card-dark">
                    <h4 className="text-sm text-gray-400 mb-1">Smart Contracts</h4>
                    <p className="cyber-stat-value">15,000+</p>
                  </div>

                  <div className="cyber-stat p-4 glossy-card-dark">
                    <h4 className="text-sm text-gray-400 mb-1">Network Security</h4>
                    <p className="cyber-stat-value">99.99%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-16 bg-gray-900/30 relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid z-0 opacity-20"></div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl gradient-text-blue-pink mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-300">
              We're a passionate team of educators, developers, and blockchain enthusiasts dedicated to revolutionizing
              how skills are taught and learned.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="cyber-card">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 border-2 border-blue-500/30 cyber-avatar mb-4">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-pink-600 text-white text-xl">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-medium text-white mb-1">{member.name}</h3>
                  <p className="text-sm text-blue-400 mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid z-0 opacity-30"></div>

        {/* Abstract background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/3 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-600/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-pink-600/10 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl gradient-text-blue-pink mb-6">
              Join the SkillTrade Revolution
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              Whether you want to learn new skills or share your expertise, SkillTrade provides the platform you need to
              connect, learn, and earn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="cyber-button-enhanced rounded-md" asChild>
                <Link href="/signup">Create Account</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="cyber-button rounded-md border-white/30 backdrop-blur-sm hover:bg-white/10 text-white"
                asChild
              >
                <Link href="/explore">Explore Skills</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
