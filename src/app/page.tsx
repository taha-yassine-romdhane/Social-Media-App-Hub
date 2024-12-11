'use client'

import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const features = [
  {
    name: 'Schedule Posts',
    description: 'Plan and schedule your content across multiple platforms in advance',
    icon: null,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    name: 'Analytics Dashboard',
    description: 'Get detailed insights about your social media performance',
    icon: null,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    name: 'Team Collaboration',
    description: 'Work together with your team seamlessly',
    icon: null,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    name: 'Instant Publishing',
    description: 'Publish content across all platforms with one click',
    icon: null,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
  },
  {
    name: 'Engagement Tools',
    description: 'Interact with your audience effectively and build relationships',
    icon: null,
    color: 'text-pink-600',
    bgColor: 'bg-pink-100',
  },
  {
    name: 'Multi-Platform Support',
    description: 'Support for all major social media platforms',
    icon: null,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
  },
]

const testimonials = [
  {
    content: "Social Hub has transformed how we manage our social media. It's intuitive and powerful.",
    author: "Sarah Johnson",
    role: "Marketing Director",
    company: "Tech Innovators",
  },
  {
    content: "The analytics features are incredible. We've increased our engagement by 150%.",
    author: "Michael Chen",
    role: "Social Media Manager",
    company: "Growth Co",
  },
  {
    content: "Best investment we've made for our social media strategy.",
    author: "Emma Williams",
    role: "CEO",
    company: "StartUp Inc",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        Tunisian Social Hub
      </h1>
      <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl">
        Manage all your social media accounts in one place. Schedule posts, analyze performance, and grow your online presence.
      </p>
      
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <SignedOut>
          <Link href="/sign-up">
            <Button size="lg">
              Get Started
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button variant="outline" size="lg">
              Sign In
            </Button>
          </Link>
        </SignedOut>
        
        <SignedIn>
          <Link href="/dashboard">
            <Button size="lg">
              Go to Dashboard
            </Button>
          </Link>
        </SignedIn>
      </div>
    </div>
  );
}
