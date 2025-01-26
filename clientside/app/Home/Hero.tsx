import React from 'react'
import Link from 'next/link'
import { CheckCircle, Globe, BookOpen } from 'lucide-react'

function Hero() {
  const impactStats = [
    { icon: <Globe className="w-12 h-12 text-white" />, value: "10K+", label: "Communities Impacted" },
    { icon: <BookOpen className="w-12 h-12 text-white" />, value: "500+", label: "Schools Supported" },
    { icon: <CheckCircle className="w-12 h-12 text-white" />, value: "95%", label: "Program Success Rate" }
  ]

  return (
    <div className="relative">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/api/placeholder/1920/1080')",
          backgroundColor: '#155e75', // Dark green base
          backgroundBlendMode: 'multiply',
          opacity: 0.7
        }}
      ></div>

      <section className="relative container mx-auto px-6 py-16 text-white grid md:grid-cols-2 gap-8 items-center">
        {/* Text Content */}
        <div className="space-y-6 z-10">
          <h1 className="text-4xl font-bold">Transforming Lives Through Integrated Solutions</h1>
          <p className="text-lg opacity-90">
            Empowering communities through sustainable health, climate resilience, and educational innovations.
          </p>
          
          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Link 
              href="/donate" 
              className="bg-yellow-500 text-green-900 font-semibold py-3 px-6 rounded-lg hover:bg-yellow-400 transition"
            >
              Donate Now
            </Link>
            <Link 
              href="/impact" 
              className="border-2 border-white text-white py-3 px-6 rounded-lg hover:bg-white hover:text-green-900 transition"
            >
              Our Impact
            </Link>
          </div>

          {/* Impact Statistics */}
          <div className="flex space-x-4 mt-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center bg-white/20 p-4 rounded-lg">
                {stat.icon}
                <div className="font-bold text-2xl">{stat.value}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Impact Representation */}
        <div className="hidden md:flex justify-center items-center">
          <div className="w-[450px] h-[450px] bg-white/10 rounded-full flex justify-center items-center">
            <div className="w-[350px] h-[350px] bg-white/20 rounded-full flex justify-center items-center">
              <div className="w-[250px] h-[250px] bg-white/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero