export interface ReadmeTemplate {
  id: string
  name: string
  description: string
  preview: string
  features: string[]
  icon: string
}

export interface ProjectDetails {
  projectName: string
  description: string
  techStack: string
  features: string
  installation: string
  usage: string
  template: string
  customPrompt?: string
}

export interface GeneratedReadme {
  readme: string
  template: string
  timestamp: string
}

export interface ApiResponse {
  readme?: string
  template?: string
  timestamp?: string
  error?: string
}

export interface FeatureItem {
  icon: string
  title: string
  description: string
  benefits: string[]
}

export interface TemplateCategory {
  name: string
  templates: ReadmeTemplate[]
}

export interface GenerationStats {
  totalGenerated: number
  averageGenerationTime: number
  popularTemplates: string[]
  userSatisfaction: number
}

export interface FormErrors {
  projectName?: string
  description?: string
  techStack?: string
  customPrompt?: string
  general?: string
}

export interface LoadingState {
  isGenerating: boolean
  progress: number
  message: string
}

export interface PreviewMode {
  mode: 'preview' | 'code'
  isFullscreen: boolean
}

export interface DownloadOptions {
  filename: string
  format: 'md' | 'txt'
  includeTimestamp: boolean
}

export interface UserPreferences {
  defaultTemplate: string
  autoPreview: boolean
  darkMode: boolean
  fontSize: 'small' | 'medium' | 'large'
}

export interface RateLimitInfo {
  remaining: number
  resetTime: Date
  limit: number
}
