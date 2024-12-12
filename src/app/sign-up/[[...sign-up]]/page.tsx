'use client'

import { SignUp } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'

export default function Page() {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect_url')

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join Tunisian Social Hub and start managing your social media presence
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-4 sm:px-10">
          <SignUp 
            appearance={{
              elements: {
                formButtonPrimary: 
                  "bg-blue-600 hover:bg-blue-700 text-sm normal-case",
                card: "shadow-none",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: 
                  "text-gray-600 hover:bg-gray-50 border border-gray-300 text-sm normal-case",
                socialButtonsBlockButtonText: "font-normal",
                dividerLine: "bg-gray-200",
                dividerText: "text-gray-500 text-sm",
                formFieldLabel: "text-gray-700",
                formFieldInput: 
                  "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6",
                footerActionLink: 
                  "font-normal text-blue-600 hover:text-blue-500",
              },
            }}
            redirectUrl={redirectUrl || '/dashboard'}
            signInUrl="/sign-in"
          />
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          By signing up, you agree to our{' '}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}
