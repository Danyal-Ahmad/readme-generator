import { ReadmeTemplate } from '@/types'

export const templates: ReadmeTemplate[] = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean, contemporary design with badges, sections, and professional formatting. Perfect for serious projects and portfolios.',
    icon: '🚀',
    features: [
      'Professional header with badges',
      'Table of contents',
      'Feature highlights',
      'Technology stack with icons',
      'Installation & usage guides',
      'Contributing guidelines',
      'License section'
    ],
    preview: `# 🚀 Project Name

[![GitHub license](https://img.shields.io/github/license/username/repo)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/username/repo)](https://github.com/username/repo/stargazers)

> A modern, professional README template with clean design and comprehensive sections.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## ✨ Features
- Feature 1
- Feature 2
- Feature 3`
  },
  {
    id: 'minimalist',
    name: 'Minimalist Clean',
    description: 'Simple, focused design that emphasizes content over decoration. Great for documentation-heavy projects.',
    icon: '📋',
    features: [
      'Clean, distraction-free layout',
      'Focus on essential information',
      'Simple navigation',
      'Readable typography',
      'Minimal use of emojis',
      'Straightforward sections'
    ],
    preview: `# Project Name

A brief description of what this project does and who it's for.

## Installation

\`\`\`bash
npm install project-name
\`\`\`

## Usage

\`\`\`javascript
const project = require('project-name');
project.run();
\`\`\`

## License

MIT`
  },
  {
    id: 'badge-heavy',
    name: 'Badge Showcase',
    description: 'Feature-rich template with extensive badges, shields, and visual indicators. Perfect for open-source projects.',
    icon: '🏆',
    features: [
      'Comprehensive badge collection',
      'Build status indicators',
      'Version tracking',
      'Download statistics',
      'Social proof elements',
      'Dependency status',
      'Quality metrics'
    ],
    preview: `# Project Name

[![Build Status](https://travis-ci.org/user/repo.svg?branch=master)](https://travis-ci.org/user/repo)
[![Coverage Status](https://coveralls.io/repos/github/user/repo/badge.svg?branch=master)](https://coveralls.io/github/user/repo?branch=master)
[![npm version](https://badge.fury.io/js/package.svg)](https://badge.fury.io/js/package)
[![Downloads](https://img.shields.io/npm/dm/package.svg)](https://www.npmjs.com/package/package)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Quick Start
Get up and running in minutes with comprehensive guides and examples.`
  },
  {
    id: 'creative',
    name: 'Creative & Visual',
    description: 'Eye-catching design with emojis, visual elements, and engaging presentation. Great for creative projects and portfolios.',
    icon: '🎨',
    features: [
      'Rich emoji usage',
      'Visual section dividers',
      'Creative formatting',
      'Engaging presentation',
      'Image placeholders',
      'Interactive elements',
      'Colorful design'
    ],
    preview: `<div align="center">

# 🎨 Amazing Project Name ✨

*Where creativity meets functionality*

[![Made with ❤️](https://img.shields.io/badge/Made%20with-❤️-red.svg)](#)
[![Powered by ☕](https://img.shields.io/badge/Powered%20by-☕-brown.svg)](#)

---

## 🌟 What Makes This Special?

🚀 **Fast** • 🎯 **Accurate** • 💎 **Beautiful** • 🔒 **Secure**

</div>`
  },
  {
    id: 'developer-focused',
    name: 'Developer Focused',
    description: 'Technical template with code examples, API documentation, and developer resources. Ideal for libraries and frameworks.',
    icon: '👨‍💻',
    features: [
      'Comprehensive API documentation',
      'Code examples and snippets',
      'Technical specifications',
      'Development setup guides',
      'Testing instructions',
      'Contribution workflows',
      'Architecture diagrams'
    ],
    preview: `# Project Name

## Quick Start

\`\`\`bash
# Installation
npm install project-name

# Usage
import { ProjectName } from 'project-name';
const instance = new ProjectName();
\`\`\`

## API Reference

### \`initialize(options)\`
Initializes the project with given options.

**Parameters:**
- \`options\` (Object): Configuration options

**Returns:** Promise<Instance>

## Development

\`\`\`bash
# Clone and setup
git clone https://github.com/user/repo.git
cd repo
npm install
npm run dev
\`\`\`

## Testing

\`\`\`bash
npm test
npm run test:coverage
\`\`\``
  },
  {
    id: 'startup',
    name: 'Startup & Business',
    description: 'Business-oriented template with market focus, roadmap, and professional presentation. Perfect for commercial projects.',
    icon: '💼',
    features: [
      'Business value proposition',
      'Market positioning',
      'Product roadmap',
      'Team information',
      'Investor relations',
      'Commercial licensing',
      'Support channels'
    ],
    preview: `# 💼 Product Name
*Revolutionizing the industry with innovative solutions*

## 🎯 Value Proposition
Our solution addresses critical market needs by providing...

## 📊 Market Opportunity
- Total Addressable Market: $X billion
- Growing at X% annually
- Key pain points: Problem 1, Problem 2

## 🗺️ Roadmap
- **Q1 2024**: Feature A, Feature B
- **Q2 2024**: Integration C, Enhancement D
- **Q3 2024**: Platform E, Analytics F

## 👥 Team
Founded by experienced professionals from leading companies.`
  }
]

export const getTemplateById = (id: string): ReadmeTemplate | undefined => {
  return templates.find(template => template.id === id)
}

export const getTemplatesByCategory = () => {
  return {
    'Popular': templates.slice(0, 3),
    'Specialized': templates.slice(3)
  }
}

export const getRandomTemplate = (): ReadmeTemplate => {
  return templates[Math.floor(Math.random() * templates.length)]
}
