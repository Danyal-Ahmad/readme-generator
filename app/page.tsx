'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ReadmeGenerator from '@/components/ReadmeGenerator'
import Features from '@/components/Features'
import Footer from '@/components/Footer'

export default function Home() {
  const [showGenerator, setShowGenerator] = useState(false)

  return (
    <main className="min-h-screen">
      <Header />
      
      {!showGenerator ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Hero onGetStarted={() => setShowGenerator(true)} />
          <Features />
          <Footer />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-20"
        >
          <ReadmeGenerator onBack={() => setShowGenerator(false)} />
        </motion.div>
      )}
    </main>
  )
}
