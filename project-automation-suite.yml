# scripts/deploy.sh
#!/bin/bash

# README Generator SaaS Deployment Script
# This script handles deployment to various platforms

set -e

echo "🚀 Starting deployment process..."

# Check if environment variables are set
check_env_vars() {
    echo "📋 Checking environment variables..."
    
    if [ -z "$OPENAI_API_KEY" ]; then
        echo "❌ OPENAI_API_KEY is not set"
        exit 1
    fi
    
    echo "✅ Environment variables check passed"
}

# Build the application
build_app() {
    echo "🔨 Building application..."
    npm run build
    echo "✅ Build completed successfully"
}

# Deploy to Vercel
deploy_vercel() {
    echo "🌐 Deploying to Vercel..."
    
    # Install Vercel CLI if not present
    if ! command -v vercel &> /dev/null; then
        echo "📦 Installing Vercel CLI..."
        npm install -g vercel
    fi
    
    # Deploy
    vercel --prod --confirm
    echo "✅ Deployed to Vercel successfully"
}

# Deploy to Netlify
deploy_netlify() {
    echo "🌐 Deploying to Netlify..."
    
    # Install Netlify CLI if not present
    if ! command -v netlify &> /dev/null; then
        echo "📦 Installing Netlify CLI..."
        npm install -g netlify-cli
    fi
    
    # Build and deploy
    netlify deploy --prod --dir=.next
    echo "✅ Deployed to Netlify successfully"
}

# Deploy to Railway
deploy_railway() {
    echo "🚂 Deploying to Railway..."
    
    # Install Railway CLI if not present
    if ! command -v railway &> /dev/null; then
        echo "📦 Installing Railway CLI..."
        npm install -g @railway/cli
    fi
    
    # Deploy
    railway up
    echo "✅ Deployed to Railway successfully"
}

# Main deployment function
main() {
    echo "🎯 README Generator SaaS Deployment"
    echo "=================================="
    
    # Get deployment target from command line argument
    PLATFORM=${1:-vercel}
    
    echo "📍 Target platform: $PLATFORM"
    
    # Run checks and build
    check_env_vars
    build_app
    
    # Deploy based on platform
    case $PLATFORM in
        vercel)
            deploy_vercel
            ;;
        netlify)
            deploy_netlify
            ;;
        railway)
            deploy_railway
            ;;
        *)
            echo "❌ Unsupported platform: $PLATFORM"
            echo "Supported platforms: vercel, netlify, railway"
            exit 1
            ;;
    esac
    
    echo "🎉 Deployment completed successfully!"
}

# Run main function
main "$@"

---

# scripts/setup.sh
#!/bin/bash

# README Generator SaaS Setup Script
# This script sets up the development environment

set -e

echo "🚀 Setting up README Generator SaaS..."

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
        exit 1
    fi
    
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        echo "❌ Node.js version 18+ is required. Current version: $(node --version)"
        exit 1
    fi
    
    echo "✅ Node.js version check passed: $(node --version)"
}

# Install dependencies
install_deps() {
    echo "📦 Installing dependencies..."
    
    if [ -f "package-lock.json" ]; then
        npm ci
    else
        npm install
    fi
    
    echo "✅ Dependencies installed successfully"
}

# Setup environment variables
setup_env() {
    echo "⚙️ Setting up environment variables..."
    
    if [ ! -f ".env.local" ]; then
        cp .env.example .env.local
        echo "📄 Created .env.local from .env.example"
        echo "⚠️ Please update .env.local with your OpenAI API key"
    else
        echo "✅ .env.local already exists"
    fi
}

# Setup Git hooks (optional)
setup_git_hooks() {
    echo "🪝 Setting up Git hooks..."
    
    # Create pre-commit hook
    cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
echo "🔍 Running pre-commit checks..."

# Run linter
npm run lint
if [ $? -ne 0 ]; then
    echo "❌ Linting failed. Please fix the issues and try again."
    exit 1
fi

# Run type check
npm run type-check
if [ $? -ne 0 ]; then
    echo "❌ Type check failed. Please fix the issues and try again."
    exit 1
fi

echo "✅ Pre-commit checks passed"
EOF
    
    chmod +x .git/hooks/pre-commit
    echo "✅ Git hooks setup completed"
}

# Verify setup
verify_setup() {
    echo "🔍 Verifying setup..."
    
    # Check if build works
    npm run build
    if [ $? -eq 0 ]; then
        echo "✅ Build verification passed"
    else
        echo "❌ Build verification failed"
        exit 1
    fi
    
    # Clean up build
    rm -rf .next
}

# Main setup function
main() {
    echo "🎯 README Generator SaaS Setup"
    echo "=============================="
    
    check_node
    install_deps
    setup_env
    setup_git_hooks
    verify_setup
    
    echo ""
    echo "🎉 Setup completed successfully!"
    echo ""
    echo "Next steps:"
    echo "1. Update .env.local with your OpenAI API key"
    echo "2. Run 'npm run dev' to start the development server"
    echo "3. Open http://localhost:3000 in your browser"
    echo ""
    echo "Happy coding! 🚀"
}

# Run main function
main

---

# scripts/test.sh
#!/bin/bash

# README Generator SaaS Testing Script
# This script runs all tests and checks

set -e

echo "🧪 Running README Generator SaaS tests..."

# Run linting
run_lint() {
    echo "🔍 Running ESLint..."
    npm run lint
    echo "✅ Linting passed"
}

# Run type checking
run_typecheck() {
    echo "🔍 Running TypeScript type check..."
    npm run type-check
    echo "✅ Type checking passed"
}

# Run unit tests
run_tests() {
    echo "🧪 Running unit tests..."
    npm run test
    echo "✅ Unit tests passed"
}

# Run build test
run_build() {
    echo "🔨 Testing build..."
    npm run build
    echo "✅ Build test passed"
}

# Security audit
run_audit() {
    echo "🔒 Running security audit..."
    npm audit --audit-level=moderate
    echo "✅ Security audit passed"
}

# Performance test
run_performance() {
    echo "⚡ Running performance checks..."
    
    # Check bundle size
    if [ -d ".next" ]; then
        echo "📊 Bundle analysis:"
        npx next-bundle-analyzer
    fi
    
    echo "✅ Performance checks completed"
}

# Main test function
main() {
    echo "🎯 README Generator SaaS Test Suite"
    echo "==================================="
    
    # Get test type from command line argument
    TEST_TYPE=${1:-all}
    
    case $TEST_TYPE in
        lint)
            run_lint
            ;;
        typecheck)
            run_typecheck
            ;;
        test)
            run_tests
            ;;
        build)
            run_build
            ;;
        audit)
            run_audit
            ;;
        performance)
            run_performance
            ;;
        all)
            run_lint
            run_typecheck
            run_tests
            run_build
            run_audit
            ;;
        *)
            echo "❌ Unknown test type: $TEST_TYPE"
            echo "Available types: lint, typecheck, test, build, audit, performance, all"
            exit 1
            ;;
    esac
    
    echo ""
    echo "🎉 All tests completed successfully!"
}

# Run main function
main "$@"

---

# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]

---

# docker-compose.yml
version: '3.8'

services:
  readme-generator:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Optional: Add Redis for caching
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 30s
      timeout: 10s
      retries: 3
