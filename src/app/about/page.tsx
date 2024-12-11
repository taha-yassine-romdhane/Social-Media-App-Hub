'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'

const team = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Co-founder',
    image: '/team/sarah.jpg',
    bio: '10+ years of experience in social media marketing and tech leadership.',
  },
  {
    name: 'Michael Chen',
    role: 'CTO & Co-founder',
    image: '/team/michael.jpg',
    bio: 'Former senior engineer at Facebook with expertise in AI and automation.',
  },
  {
    name: 'Emma Williams',
    role: 'Head of Product',
    image: '/team/emma.jpg',
    bio: 'Product leader with a passion for creating intuitive user experiences.',
  },
]

const values = [
  {
    name: 'Innovation',
    description:
      'We constantly push the boundaries of what is possible in social media management.',
  },
  {
    name: 'User-Centric',
    description:
      'Every feature we build starts with understanding our users and their needs',
  },
  {
    name: 'Reliability',
    description:
      'We provide a stable and secure platform that our customers can depend on.',
  },
  {
    name: 'Transparency',
    description:
      'We believe in open communication and honest relationships with our customers.',
  },
]

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-100/20 pt-24">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              About Social Hub
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We're on a mission to simplify social media management for businesses
              of all sizes. Our platform combines powerful features with intuitive
              design to help you succeed in the digital world.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button href="/auth/signup">Start free trial</Button>
              <Button href="/contact" variant="outline">
                Contact sales
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Values section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Values
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            These core values guide everything we do at Social Hub.
          </p>
        </div>
        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
          {values.map((value) => (
            <div key={value.name} className="relative pl-9">
              <dt className="inline font-semibold text-gray-900">
                <div className="absolute left-1 top-1 h-5 w-5 text-blue-600">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {value.name}
              </dt>{' '}
              <dd className="inline">{value.description}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Team section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Team
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Meet the passionate people behind Social Hub.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {team.map((person) => (
            <li key={person.name}>
              <div className="relative">
                <div className="aspect-[3/2] w-full rounded-2xl bg-gray-100" />
                <div className="mt-6">
                  <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
                    {person.name}
                  </h3>
                  <p className="text-base leading-7 text-blue-600">
                    {person.role}
                  </p>
                  <p className="mt-4 text-base leading-7 text-gray-600">
                    {person.bio}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA section */}
      <div className="relative isolate -z-10 mt-32 sm:mt-40">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-2xl flex-col gap-16 bg-white/5 px-6 py-16 ring-1 ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20">
            <div className="w-full flex-auto">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Join us in reshaping social media management
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Start your journey with Social Hub today and experience the
                difference our platform can make for your business.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Button href="/auth/signup">Start free trial</Button>
                <Button href="/contact" variant="outline">
                  Learn more
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
