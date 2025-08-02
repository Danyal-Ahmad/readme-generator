'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, FileText, Zap, Users } from 'lucide-react'

interface HeroProps {
  onGetStarted: () => void
}

export default function Hero({ onGetStarted }: HeroProps) {
  const stats = [
    { icon: FileText, label: 'READMEs Generated', value: '10,000+' },
    { icon: Users, label: 'Happy Developers', value: '2,500+' },
    { icon: Zap, label: 'Average Generation Time', value: '< 30s' },
  ]

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8"
          >
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Documentation Generator</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            Create Professional{' '}
            <span className="text-gradient">README.md</span>
            <br />
            Files in Seconds
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Generate stunning, professional README.md files for your GitHub repositories using AI. 
            Choose from multiple templates, get instant previews, and download in seconds.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2"
            >
              <span>Generate README Now</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary text-lg px-8 py-4"
            >
              View Examples
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05 }}
                className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50"
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <stat.icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Demo Preview */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="ml-4 text-sm text-gray-600 font-mono">README.md</div>
            </div>
          </div>
          <div className="p-6 font-mono text-sm">
            <div className="text-blue-600"># 🚀 Awesome Project</div>
            <div className="text-gray-600 mt-2">[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)</div>
            <div className="text-gray-600">[![Stars](https://img.shields.io/github/stars/user/repo.svg)](https://github.com/user/repo/stargazers)</div>
            <div className="mt-4 text-gray-800">> A professional README.md file generated with AI in seconds.</div>
            <div className="mt-4 text-blue-600">## ✨ Features</div>
            <div className="text-gray-800 mt-2">- 🎯 AI-powered generation</div>
            <div className="text-gray-800">- 📋 Multiple templates</div>
            <div className="text-gray-800">- ⚡ Lightning fast</div>
            <div className="mt-4 text-blue-600">## 🚀 Quick Start</div>
            <div className="mt-2 bg-gray-100 rounded p-3">
              <div className="text-green-600">npm install awesome-project</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
