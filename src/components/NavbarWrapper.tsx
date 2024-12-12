'use client'

import { usePathname } from 'next/navigation'
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';

export function NavbarWrapper() {
  const pathname = usePathname()
  const isDashboardPage = pathname?.startsWith('/dashboard')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Don't render navbar on dashboard pages
  if (isDashboardPage) return null

  const navLinks = [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Sign In', href: '/sign-in' },
    { name: 'Sign Up', href: '/sign-up' },
  ]

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-white'
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center gap-8">
            <Link 
              href="/" 
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              Tunisian Social Hub
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <SignedOut>
              <div className="flex items-center gap-3">
                <Link href="/sign-in">
                  <Button 
                    variant="outline" 
                    className="hidden sm:inline-flex hover:bg-gray-100"
                  >
                    Sign in
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Get Started
                  </Button>
                </Link>
              </div>
            </SignedOut>

            <SignedIn>
              <Link href="/dashboard">
                <Button 
                  variant="outline" 
                  className="hover:bg-gray-100"
                >
                  Dashboard
                </Button>
              </Link>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 hover:scale-105 transition-transform",
                    userButtonPopoverCard: "shadow-lg",
                  }
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  )
}
