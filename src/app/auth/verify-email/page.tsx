'use client'

import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100">
            <Mail className="h-6 w-6 text-indigo-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Check your email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We&apos;ve sent you a verification link to your email address.
            Please click the link to verify your account.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <p className="text-sm text-gray-500 text-center">
            Didn&apos;t receive the email? Check your spam folder or
          </p>
          <Button
            onClick={() => window.location.href = '/auth/login'}
            variant="outline"
            className="w-full"
          >
            Return to login
          </Button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Note: The verification link will expire in 24 hours.
          </p>
        </div>
      </div>
    </div>
  )
}
