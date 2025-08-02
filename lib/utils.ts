import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function generateFilename(projectName: string, template: string): string {
  const sanitizedName = projectName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  
  const timestamp = new Date().toISOString().split('T')[0]
  return `${sanitizedName}-readme-${template}-${timestamp}.md`
}

export function validateProjectName(name: string): string | null {
  if (!name.trim()) {
    return 'Project name is required'
  }
  if (name.length < 2) {
    return 'Project name must be at least 2 characters long'
  }
  if (name.length > 100) {
    return 'Project name must be less than 100 characters'
  }
  return null
}

export function validateDescription(description: string): string | null {
  if (description && description.length > 500) {
    return 'Description must be less than 500 characters'
  }
  return null
}

export function validateCustomPrompt(prompt: string): string | null {
  if (!prompt.trim()) {
    return 'Custom prompt is required'
  }
  if (prompt.length < 10) {
    return 'Custom prompt must be at least 10 characters long'
  }
  if (prompt.length > 1000) {
    return 'Custom prompt must be less than 1000 characters'
  }
  return null
}

export function extractTechStackArray(techStack: string): string[] {
  return techStack
    .split(',')
    .map(tech => tech.trim())
    .filter(tech => tech.length > 0)
}

export function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

export function copyToClipboard(text: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text)
        .then(() => resolve(true))
        .catch(() => resolve(false))
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      try {
        const successful = document.execCommand('copy')
        document.body.removeChild(textArea)
        resolve(successful)
      } catch (err) {
        document.body.removeChild(textArea)
        resolve(false)
      }
    }
  })
}

export function downloadAsFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.style.display = 'none'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  // Clean up the URL object
  setTimeout(() => URL.revokeObjectURL(url), 100)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export function parseMarkdownHeaders(content: string): Array<{ level: number; text: string; id: string }> {
  const headerRegex = /^(#{1,6})\s+(.+)$/gm
  const headers: Array<{ level: number; text: string; id: string }> = []
  let match

  while ((match = headerRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')

    headers.push({ level, text, id })
  }

  return headers
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
}

export function calculateComplexity(projectDetails: any): 'simple' | 'moderate' | 'complex' {
  let score = 0
  
  if (projectDetails.techStack && projectDetails.techStack.length > 50) score += 1
  if (projectDetails.features && projectDetails.features.length > 100) score += 1
  if (projectDetails.installation && projectDetails.installation.length > 100) score += 1
  if (projectDetails.usage && projectDetails.usage.length > 100) score += 1
  if (projectDetails.description && projectDetails.description.length > 100) score += 1
  
  if (score <= 1) return 'simple'
  if (score <= 3) return 'moderate'
  return 'complex'
}
