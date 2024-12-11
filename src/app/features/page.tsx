'use client'

import { Button } from '@/components/ui/button'
import {
  Calendar,
  BarChart2,
  MessageSquare,
  Share2,
  Target,
  Users,
  Zap,
  Bot,
} from 'lucide-react'

const features = [
  {
    name: 'Smart Scheduling',
    description:
      'Schedule your posts at the perfect time with our AI-powered scheduling system that analyzes your audience\'s activity patterns.',
    icon: Calendar,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    name: 'Advanced Analytics',
    description:
      'Get deep insights into your social media performance with comprehensive analytics and custom reports.',
    icon: BarChart2,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    name: 'Content Management',
    description:
      'Manage all your social media content in one place with our intuitive content calendar and asset library.',
    icon: MessageSquare,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    name: 'Team Collaboration',
    description:
      'Work seamlessly with your team with roles, permissions, and approval workflows.',
    icon: Users,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
  },
  {
    name: 'AI Content Generation',
    description:
      'Generate engaging social media content with our AI-powered content suggestions and writing assistance.',
    icon: Bot,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  },
  {
    name: 'Cross-Platform Posting',
    description:
      'Post to multiple social media platforms simultaneously while maintaining platform-specific formatting.',
    icon: Share2,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
  },
  {
    name: 'Performance Optimization',
    description:
      'Optimize your social media strategy with A/B testing and performance recommendations.',
    icon: Target,
    color: 'text-pink-600',
    bgColor: 'bg-pink-100',
  },
  {
    name: 'Instant Publishing',
    description:
      'Publish your content instantly across all platforms with just one click.',
    icon: Zap,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
]

export default function FeaturesPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-base font-semibold leading-7 text-blue-600">
            Features
          </h1>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Everything you need to manage your social media
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Powerful tools to help you grow your social media presence and engage
            with your audience effectively.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div
                    className={`rounded-lg p-2 ${feature.bgColor} ${feature.color}`}
                  >
                    <feature.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Join thousands of social media managers who are already using Social Hub
            to grow their presence.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button href="/auth/signup" size="lg">
              Start free trial
            </Button>
            <Button href="/pricing" variant="outline" size="lg">
              View pricing
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
