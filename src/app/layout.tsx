import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import { ClerkProvider } from '@clerk/nextjs'
import { FacebookProvider } from '@/providers/FacebookProvider'
import { InstagramProvider } from '@/providers/InstagramProvider'
import { TikTokProvider } from '@/providers/TikTokProvider'
import { NavbarWrapper } from '@/components/NavbarWrapper'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tunisian Social Hub',
  description: 'Manage your social media presence efficiently',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider 
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      appearance={{
        elements: {
          formButtonPrimary: 'bg-primary hover:bg-primary/90',
          footerActionLink: 'text-primary hover:text-primary/90',
          card: 'bg-white shadow-md',
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} min-h-screen bg-background`}>
          <FacebookProvider>
            <InstagramProvider>
              <TikTokProvider>
                <NavbarWrapper />
                <main className="min-h-[calc(100vh-4rem)]">
                  {children}
                </main>
                <Toaster position="bottom-right" />
              </TikTokProvider>
            </InstagramProvider>
          </FacebookProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
