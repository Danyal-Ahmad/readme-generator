'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Wand2, Eye, Code, Download, Copy, RefreshCw } from 'lucide-react'
import { toast } from 'react-hot-toast'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { templates } from '@/lib/templates'
import { copyToClipboard, downloadAsFile, generateFilename, validateProjectName, validateCustomPrompt } from '@/lib/utils'
import { ProjectDetails, GeneratedReadme, FormErrors } from '@/types'

interface ReadmeGeneratorProps {
  onBack: () => void
}

export default function ReadmeGenerator({ onBack }: ReadmeGeneratorProps) {
  const [inputMode, setInputMode] = useState<'form' | 'prompt'>('form')
  const [isGenerating, setIsGenerating] = useState(false)
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview')
  const [generatedReadme, setGeneratedReadme] = useState<GeneratedReadme | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})
  
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>({
    projectName: '',
    description: '',
    techStack: '',
    features: '',
    installation: '',
    usage: '',
    template: 'modern',
    customPrompt: ''
  })

  const handleInputChange = (field: keyof ProjectDetails, value: string) => {
    setProjectDetails(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (inputMode === 'form') {
      const nameError = validateProjectName(projectDetails.projectName)
      if (nameError) newErrors.projectName = nameError
    } else {
      const promptError = validateCustomPrompt(projectDetails.customPrompt || '')
      if (promptError) newErrors.customPrompt = promptError
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleGenerate = async () => {
    if (!validateForm()) return

    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectDetails),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate README')
      }

      setGeneratedReadme(data)
      toast.success('README generated successfully!')
    } catch (error) {
      console.error('Generation error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to generate README')
      setErrors({ general: 'Failed to generate README. Please try again.' })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = async () => {
    if (!generatedReadme) return
    
    const success = await copyToClipboard(generatedReadme.readme)
    if (success) {
      toast.success('README copied to clipboard!')
    } else {
      toast.error('Failed to copy to clipboard')
    }
  }

  const handleDownload = () => {
    if (!generatedReadme) return
    
    const filename = generateFilename(
      projectDetails.projectName || 'readme',
      projectDetails.template
    )
    downloadAsFile(generatedReadme.readme, filename)
    toast.success('README downloaded successfully!')
  }

  const handleRegenerate = () => {
    setGeneratedReadme(null)
    handleGenerate()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </motion.button>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-2xl font-bold text-gray-900">README Generator</h1>
          </div>

          {/* Mode Toggle */}
          <div className="flex items-center space-x-2 bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setInputMode('form')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                inputMode === 'form'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Form Input
            </button>
            <button
              onClick={() => setInputMode('prompt')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                inputMode === 'prompt'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Custom Prompt
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {inputMode === 'form' ? 'Project Details' : 'Custom Prompt'}
              </h2>

              <AnimatePresence mode="wait">
                {inputMode === 'form' ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    {/* Project Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Name *
                      </label>
                      <input
                        type="text"
                        value={projectDetails.projectName}
                        onChange={(e) => handleInputChange('projectName', e.target.value)}
                        placeholder="My Awesome Project"
                        className={`input-field ${errors.projectName ? 'border-red-500' : ''}`}
                      />
                      {errors.projectName && (
                        <p className="text-red-500 text-sm mt-1">{errors.projectName}</p>
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={projectDetails.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="A brief description of what your project does..."
                        rows={3}
                        className="textarea-field"
                      />
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Technology Stack
                      </label>
                      <input
                        type="text"
                        value={projectDetails.techStack}
                        onChange={(e) => handleInputChange('techStack', e.target.value)}
                        placeholder="React, Node.js, TypeScript, PostgreSQL"
                        className="input-field"
                      />
                    </div>

                    {/* Features */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Key Features
                      </label>
                      <textarea
                        value={projectDetails.features}
                        onChange={(e) => handleInputChange('features', e.target.value)}
                        placeholder="List your main features, one per line..."
                        rows={3}
                        className="textarea-field"
                      />
                    </div>

                    {/* Installation */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Installation Instructions
                      </label>
                      <textarea
                        value={projectDetails.installation}
                        onChange={(e) => handleInputChange('installation', e.target.value)}
                        placeholder="npm install, docker setup, etc..."
                        rows={2}
                        className="textarea-field"
                      />
                    </div>

                    {/* Usage */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Usage Examples
                      </label>
                      <textarea
                        value={projectDetails.usage}
                        onChange={(e) => handleInputChange('usage', e.target.value)}
                        placeholder="How to use your project..."
                        rows={2}
                        className="textarea-field"
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="prompt"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Describe Your Project *
                      </label>
                      <textarea
                        value={projectDetails.customPrompt}
                        onChange={(e) => handleInputChange('customPrompt', e.target.value)}
                        placeholder="Describe your project in detail. Include what it does, technologies used, key features, and any specific requirements for the README..."
                        rows={8}
                        className={`textarea-field ${errors.customPrompt ? 'border-red-500' : ''}`}
                      />
                      {errors.customPrompt && (
                        <p className="text-red-500 text-sm mt-1">{errors.customPrompt}</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Template Selection */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Choose Template
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {templates.slice(0, 4).map((template) => (
                    <div
                      key={template.id}
                      onClick={() => handleInputChange('template', template.id)}
                      className={`template-card ${
                        projectDetails.template === template.id ? 'selected' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg">{template.icon}</span>
                        <span className="font-medium text-sm">{template.name}</span>
                      </div>
                      <p className="text-xs text-gray-600">{template.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full btn-primary mt-6 flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Generating<span className="loading-dots"></span></span>
                  </>
                ) : (
                  <>
                    <Wand2 className="h-5 w-5" />
                    <span>Generate README</span>
                  </>
                )}
              </motion.button>

              {errors.general && (
                <p className="text-red-500 text-sm mt-2 text-center">{errors.general}</p>
              )}
            </div>
          </motion.div>

          {/* Preview Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="card h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Preview</h2>
                
                {generatedReadme && (
                  <div className="flex items-center space-x-2">
                    {/* View Mode Toggle */}
                    <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => setViewMode('preview')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                          viewMode === 'preview'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('code')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                          viewMode === 'code'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <Code className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <button
                      onClick={handleRegenerate}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Regenerate"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleCopy}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Copy to clipboard"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleDownload}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Download file"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="h-96 overflow-auto border border-gray-200 rounded-lg">
                {generatedReadme ? (
                  <AnimatePresence mode="wait">
                    {viewMode === 'preview' ? (
                      <motion.div
                        key="preview"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-6 prose prose-sm max-w-none"
                      >
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            code({ node, inline, className, children, ...props }) {
                              const match = /language-(\w+)/.exec(className || '')
                              return !inline && match ? (
                                <SyntaxHighlighter
                                  style={oneDark}
                                  language={match[1]}
                                  PreTag="div"
                                  {...props}
                                >
                                  {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                              ) : (
                                <code className={className} {...props}>
                                  {children}
                                </code>
                              )
                            }
                          }}
                        >
                          {generatedReadme.readme}
                        </ReactMarkdown>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="code"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-0"
                      >
                        <SyntaxHighlighter
                          language="markdown"
                          style={oneDark}
                          customStyle={{
                            margin: 0,
                            borderRadius: 0,
                            height: '100%',
                            minHeight: '384px'
                          }}
                        >
                          {generatedReadme.readme}
                        </SyntaxHighlighter>
                      </motion.div>
                    )}
                  </AnimatePresence>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Your generated README will appear here</p>
                      <p className="text-sm mt-1">Fill in the details and click "Generate README"</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
