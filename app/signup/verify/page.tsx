'use client'
import VerifyEmailBox from '@/components/admin/VerifyEmailForm'
import { VerificationEmail } from '@/components/emails/verificationCodeEmail'
import { useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'

function MainPage() {
    const search = useSearchParams()

    return (
        <VerifyEmailBox email={search.get('email')!} />
    )
}


export default function page() {
  return (
    <Suspense >
        <MainPage />
    </Suspense>
  )
}
