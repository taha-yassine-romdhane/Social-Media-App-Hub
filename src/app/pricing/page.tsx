'use client'

import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

const tiers = [
  {
    name: 'Starter',
    id: 'tier-starter',
    href: '/auth/signup',
    price: { monthly: '$15', annually: '$144' },
    description: 'Perfect for individuals and small businesses getting started.',
    features: [
      'Up to 5 social media accounts',
      'Basic analytics',
      'Content calendar',
      'Post scheduling',
      'Basic support',
    ],
  },
  {
    name: 'Professional',
    id: 'tier-professional',
    href: '/auth/signup',
    price: { monthly: '$30', annually: '$288' },
    description: 'Ideal for growing businesses and marketing teams.',
    features: [
      'Up to 15 social media accounts',
      'Advanced analytics',
      'Content calendar',
      'Post scheduling',
      'AI content suggestions',
      'Team collaboration',
      'Priority support',
      'Custom reports',
    ],
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '/auth/signup',
    price: { monthly: 'Custom', annually: 'Custom' },
    description: 'Dedicated solutions for large organizations.',
    features: [
      'Unlimited social media accounts',
      'Advanced analytics with custom metrics',
      'Content calendar with approval workflow',
      'Advanced post scheduling',
      'AI content generation',
      'Advanced team collaboration',
      '24/7 priority support',
      'Custom integration',
      'Dedicated account manager',
    ],
  },
]

export default function PricingPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-base font-semibold leading-7 text-blue-600">
            Pricing
          </h1>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Choose the right plan for&nbsp;you
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Whether you're a solo creator or a large organization, we have a plan
            that fits your needs.
          </p>
        </div>

        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 xl:gap-x-12">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className="rounded-3xl p-8 ring-1 ring-gray-200 xl:p-10 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between gap-x-4">
                <h2
                  id={tier.id}
                  className="text-lg font-semibold leading-8 text-gray-900"
                >
                  {tier.name}
                </h2>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">
                  {tier.price.monthly}
                </span>
                {tier.price.monthly !== 'Custom' && (
                  <span className="text-sm font-semibold leading-6 text-gray-600">
                    /month
                  </span>
                )}
              </p>
              <Button
                href={tier.href}
                aria-describedby={tier.id}
                className="mt-6 w-full"
                variant={tier.name === 'Professional' ? 'default' : 'outline'}
              >
                {tier.name === 'Enterprise' ? 'Contact sales' : 'Get started'}
              </Button>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check
                      className="h-6 w-5 flex-none text-blue-600"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mx-auto max-w-4xl mt-24">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Frequently asked questions
          </h2>
          <dl className="space-y-8">
            <div>
              <dt className="text-lg font-semibold text-gray-900">
                Can I switch plans later?
              </dt>
              <dd className="mt-2 text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes
                will be reflected in your next billing cycle.
              </dd>
            </div>
            <div>
              <dt className="text-lg font-semibold text-gray-900">
                What payment methods do you accept?
              </dt>
              <dd className="mt-2 text-gray-600">
                We accept all major credit cards, PayPal, and bank transfers for
                enterprise customers.
              </dd>
            </div>
            <div>
              <dt className="text-lg font-semibold text-gray-900">
                Is there a free trial?
              </dt>
              <dd className="mt-2 text-gray-600">
                Yes, all plans come with a 14-day free trial. No credit card
                required.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
