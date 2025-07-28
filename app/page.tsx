'use client'

import React from 'react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Ultra Dark Background */}
      <div className="fixed inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/20 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(120,119,198,0.1),transparent_50%)]"></div>
      </div>

      {/* Animated Grid Pattern */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Floating Neon Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
              boxShadow: '0 0 10px rgba(34, 211, 238, 0.5)'
            }}
          />
        ))}
      </div>

      {/* Navigation - Apple-style glass */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-2xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              AV+V
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 hover:scale-105">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 hover:scale-105">Pricing</a>
              <a href="#about" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 hover:scale-105">About</a>
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/30 border border-cyan-500/20">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Apple-style dramatic */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          {/* Premium badge */}
          <div className="mb-8">
            <div className="inline-block p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-500/30 mb-6 backdrop-blur-xl">
              <span className="text-cyan-400 text-sm font-medium tracking-wider">✨ PREMIUM DARK EXPERIENCE</span>
            </div>
          </div>
          
          {/* Main heading with dramatic typography */}
          <h1 className="text-7xl md:text-9xl font-black text-white mb-8 leading-none">
            The Future of
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              Venue Management
            </span>
          </h1>
          
          {/* Subtitle with enhanced styling */}
          <p className="text-2xl md:text-3xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
            Experience the most advanced venue management platform with <span className="text-cyan-400 font-medium">Apple-inspired dark aesthetics</span>. 
            Seamlessly manage bookings, clients, and operations with unparalleled elegance.
          </p>
          
          {/* Enhanced CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <button className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-5 rounded-full text-xl font-semibold hover:scale-110 transition-all duration-500 flex items-center gap-3 hover:shadow-2xl hover:shadow-cyan-500/40 border border-cyan-500/20">
              <span className="text-2xl group-hover:scale-110 transition-transform">▶</span>
              Watch Demo
            </button>
            <button className="text-gray-300 hover:text-cyan-400 transition-all duration-300 flex items-center gap-3 text-xl border border-gray-700 hover:border-cyan-500 px-10 py-5 rounded-full hover:scale-105 backdrop-blur-xl">
              Learn More
              <span className="text-cyan-400 text-2xl">→</span>
            </button>
          </div>
        </div>
        
        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="w-10 h-10 text-cyan-400 animate-bounce text-2xl">↓</div>
        </div>
      </section>

      {/* Features Section - Apple-style cards */}
      <section id="features" className="py-32 bg-black/80 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-7xl font-black text-white mb-8">
              Powerful Features,
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Dark Elegance
              </span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto font-light">
              Every feature is crafted with attention to detail, ensuring both functionality and aesthetic excellence in dark mode.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                title: 'Smart Booking',
                description: 'Intelligent scheduling with real-time availability and conflict detection.',
                gradient: 'from-cyan-500 to-blue-600',
                icon: '📅',
                glow: 'shadow-cyan-500/20'
              },
              {
                title: 'Client Management',
                description: 'Comprehensive client profiles with payment tracking and communication history.',
                gradient: 'from-purple-500 to-pink-600',
                icon: '👥',
                glow: 'shadow-purple-500/20'
              },
              {
                title: 'Analytics Dashboard',
                description: 'Real-time insights and performance metrics to optimize your operations.',
                gradient: 'from-green-500 to-emerald-600',
                icon: '📊',
                glow: 'shadow-green-500/20'
              },
              {
                title: 'Operations Hub',
                description: 'Complete inventory management, maintenance tracking, and vendor coordination.',
                gradient: 'from-orange-500 to-red-600',
                icon: '⚙️',
                glow: 'shadow-orange-500/20'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-gray-900/40 backdrop-blur-2xl border border-gray-800/50 rounded-3xl p-10 hover:scale-110 transition-all duration-500 cursor-pointer hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-2xl ${feature.glow}`}>
                  <div className="text-white text-3xl">{feature.icon}</div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-cyan-400 transition-colors">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced */}
      <section className="py-32 bg-black/60 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { number: '500+', label: 'Venues Managed', icon: '🌐' },
              { number: '10K+', label: 'Events Hosted', icon: '🎉' },
              { number: '99.9%', label: 'Uptime', icon: '🛡️' },
              { number: '24/7', label: 'Support', icon: '🆘' }
            ].map((stat, index) => (
              <div key={index} className="text-center group hover:scale-110 transition-transform duration-500">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-2xl shadow-cyan-500/30">
                  <div className="text-white text-2xl">{stat.icon}</div>
                </div>
                <div className="text-5xl md:text-6xl font-black text-white mb-4 group-hover:text-cyan-400 transition-colors">{stat.number}</div>
                <div className="text-gray-300 group-hover:text-gray-200 transition-colors text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section - Apple-style */}
      <section className="py-32 bg-gray-900/20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-7xl font-black text-white mb-8">
              Experience the
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Dark Magic
              </span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto font-light">
              See how our platform transforms venue management with intuitive design and powerful functionality in dark mode.
            </p>
          </div>
          
          <div className="relative">
            <div className="bg-gray-900/40 backdrop-blur-2xl border border-gray-800/50 p-12 rounded-3xl max-w-5xl mx-auto hover:border-cyan-500/50 transition-all duration-500 hover:scale-105">
              <div className="aspect-video bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-3xl flex items-center justify-center border border-gray-700/50">
                <div className="text-center">
                  <div className="text-8xl mb-6">🎬</div>
                  <p className="text-gray-300 text-2xl mb-2">Interactive Demo Coming Soon</p>
                  <p className="text-gray-500 text-lg">Experience the full dark mode interface</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Dramatic */}
      <section className="py-32 bg-gradient-to-r from-gray-900 via-black to-gray-900 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,119,198,0.15),transparent_70%)]"></div>
        <div className="relative max-w-5xl mx-auto text-center px-6">
          <h2 className="text-6xl md:text-7xl font-black text-white mb-12">
            Ready to Transform
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Your Venue?
            </span>
          </h2>
          <p className="text-2xl text-gray-300 mb-16 font-light">
            Join thousands of venues already using our platform to streamline their operations in the most elegant dark interface.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <button className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-12 py-6 rounded-full text-2xl font-semibold hover:scale-110 transition-all duration-500 flex items-center gap-3 hover:shadow-2xl hover:shadow-cyan-500/40 border border-cyan-500/20">
              ⚡
              Start Free Trial
            </button>
            <button className="text-gray-300 hover:text-cyan-400 transition-all duration-300 flex items-center gap-3 text-2xl border border-gray-700 hover:border-cyan-500 px-12 py-6 rounded-full hover:scale-105 backdrop-blur-xl">
              Schedule Demo
              <span className="text-cyan-400 text-2xl">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer - Apple-style */}
      <footer className="bg-black py-16 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6 md:mb-0">
              AV+V
            </div>
            <div className="flex items-center space-x-8 text-gray-400">
              <a href="#" className="hover:text-cyan-400 transition-all duration-300 hover:scale-105">Privacy</a>
              <a href="#" className="hover:text-cyan-400 transition-all duration-300 hover:scale-105">Terms</a>
              <a href="#" className="hover:text-cyan-400 transition-all duration-300 hover:scale-105">Contact</a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800/50 text-center text-gray-500">
            <p className="text-lg">&copy; 2024 AV+V. All rights reserved. Crafted with ❤️ for venue excellence in dark mode.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 