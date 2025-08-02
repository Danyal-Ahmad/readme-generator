import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { templates } from '@/lib/templates'
import { ReadmeTemplate } from '@/types'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      projectName, 
      description, 
      techStack, 
      features, 
      installation, 
      usage, 
      template = 'modern',
      customPrompt 
    } = body

    // Input validation
    if (!projectName && !customPrompt) {
      return NextResponse.json(
        { error: 'Project name or custom prompt is required' },
        { status: 400 }
      )
    }

    // Get the selected template
    const selectedTemplate = templates.find(t => t.id === template) || templates[0]
    
    // Build the prompt based on input type
    let prompt = ''
    
    if (customPrompt) {
      prompt = `Generate a professional README.md file based on this description: ${customPrompt}
      
Use the ${selectedTemplate.name} style with these characteristics:
${selectedTemplate.description}

The README should be in markdown format and include appropriate sections based on the project description.`
    } else {
      prompt = `Generate a professional README.md file for a project with the following details:

Project Name: ${projectName}
Description: ${description || 'No description provided'}
Tech Stack: ${techStack || 'Not specified'}
Key Features: ${features || 'Not specified'}
Installation Instructions: ${installation || 'Standard installation'}
Usage Information: ${usage || 'Standard usage'}

Use the ${selectedTemplate.name} template style with these characteristics:
${selectedTemplate.description}

Please create a comprehensive README.md file in markdown format that includes:
1. Project title and description
2. Table of contents (if appropriate)
3. Features section
4. Technology stack
5. Installation instructions
6. Usage examples
7. Contributing guidelines
8. License information
9. Contact/author information

Make it professional, well-structured, and engaging. Use appropriate markdown formatting including headers, lists, code blocks, and badges where relevant.`
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a professional technical writer specializing in creating high-quality README.md files for GitHub repositories. Generate clean, well-structured markdown that follows best practices for documentation. Always return valid markdown format.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 2500,
      temperature: 0.7,
    })

    const generatedReadme = completion.choices[0]?.message?.content

    if (!generatedReadme) {
      return NextResponse.json(
        { error: 'Failed to generate README content' },
        { status: 500 }
      )
    }

    // Clean up the response (remove any code block markers if present)
    const cleanReadme = generatedReadme
      .replace(/^```markdown\n?/i, '')
      .replace(/^```md\n?/i, '')
      .replace(/^```\n?/, '')
      .replace(/\n?```$/i, '')
      .trim()

    return NextResponse.json({
      readme: cleanReadme,
      template: selectedTemplate.name,
      timestamp: new Date().toISOString(),
    })

  } catch (error) {
    console.error('Error generating README:', error)
    
    if (error instanceof Error) {
      // Handle specific OpenAI errors
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'OpenAI API configuration error' },
          { status: 500 }
        )
      }
      
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        )
      }
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred while generating the README' },
      { status: 500 }
    )
  }
}

// Handle CORS for development
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
