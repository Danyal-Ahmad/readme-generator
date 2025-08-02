import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'README Generator - Professional README.md Files with AI',
  description: 'Generate professional, customizable README.md files for your GitHub repositories using AI. Choose from multiple templates, get instant previews, and download or copy your README in seconds.',
  keywords: 'README generator, GitHub, AI, documentation, markdown, template, repository',
  authors: [{ name: 'README Generator Team' }],
  openGraph: {
    title: 'README Generator - Professional README.md Files with AI',
    description: 'Generate professional, customizable README.md files for your GitHub repositories using AI.',
    url: 'https://readme-generator-ai.vercel.app',
    siteName: 'README Generator',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'README Generator - AI-Powered Documentation Tool',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'README Generator - Professional README.md Files with AI',
    description: 'Generate professional, customizable README.md files for your GitHub repositories using AI.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                style: {
                  background: '#10b981',
                },
              },
              error: {
                duration: 5000,
                style: {
                  background: '#ef4444',
                },
              },
            }}
          />
        </div>
      </body>
    </html>
  )
}
