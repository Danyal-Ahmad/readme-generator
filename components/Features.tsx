'use client'

import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Layout, 
  Eye, 
  Download, 
  Zap, 
  Palette,
  Copy,
  Globe,
  Shield,
  RefreshCw
} from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Generation',
      description: 'Advanced AI creates professional README files tailored to your project needs.',
      benefits: ['Smart content generation', 'Context-aware suggestions', 'Professional formatting']
    },
    {
      icon: Layout,
      title: 'Multiple Templates',
      description: 'Choose from carefully designed templates for different project types and styles.',
      benefits: ['6+ professional templates', 'Modern & minimalist options', 'Industry-specific formats']
    },
    {
      icon: Eye,
      title: 'Live Preview',
      description: 'See your README rendered in real-time as you make changes and adjustments.',
      benefits: ['Instant markdown preview', 'Side-by-side editing', 'Real-time updates']
    },
    {
      icon: Download,
      title: 'Easy Export',
      description: 'Download your README as .md file or copy to clipboard with one click.',
      benefits: ['One-click download', 'Clipboard integration', 'Multiple export formats']
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate professional documentation in under 30 seconds.',
      benefits: ['Sub-30s generation', 'Optimized performance', 'No waiting times']
    },
    {
      icon: Palette,
      title: 'Customizable Styles',
      description: 'Personalize your README with badges, emojis, and formatting options.',
      benefits: ['Badge integration', 'Emoji support', 'Custom formatting']
    },
    {
      icon: Copy,
      title: 'Smart Duplication',
      description: 'Duplicate and modify existing READMEs for similar projects.',
      benefits: ['Template cloning', 'Batch generation', 'Version control']
    },
    {
      icon: Globe,
      title: 'Universal Compatibility',
      description: 'Works perfectly with GitHub, GitLab, Bitbucket, and all major platforms.',
      benefits: ['GitHub integration', 'Multi-platform support', 'Standard markdown']
    },
    {
      icon: Shield,
      title: 'Privacy Focused',
      description: 'Your project data is never stored or shared. Complete privacy guaranteed.',
      benefits: ['No data retention', 'Client-side processing', 'Secure generation']
    },
    {
      icon: RefreshCw,
      title: 'Iterative Improvement',
      description: 'Refine and regenerate your README until it meets your exact requirements.',
      benefits: ['Multiple iterations', 'Fine-tuning options', 'Version comparison']
    }
  ]

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for Perfect{' '}
            <span className="text-gradient">Documentation</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive suite of features ensures your README files are professional, 
            engaging, and perfectly formatted for any project.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="feature-card group"
            >
              {/* Icon */}
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <feature.icon className="h-6 w-6" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {feature.description}
              </p>

              {/* Benefits */}
              <ul className="space-y-2">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-500">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Create Amazing Documentation?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of developers who trust our AI to create professional 
              README files that make their projects shine.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Start Generating Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
