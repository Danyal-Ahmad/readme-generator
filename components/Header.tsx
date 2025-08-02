'use client'

import { motion } from 'framer-motion'
import { FileText, Github, Star } from 'lucide-react'

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">README Generator</h1>
              <p className="text-xs text-gray-500">AI-Powered Documentation</p>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#features"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Features
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#templates"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Templates
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#pricing"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Pricing
            </motion.a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/your-username/readme-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <Github className="h-5 w-5" />
              <span className="hidden sm:inline">GitHub</span>
            </motion.a>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-yellow-200 transition-colors duration-200"
            >
              <Star className="h-4 w-4" />
              <span>Star</span>
            </motion.button>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}
