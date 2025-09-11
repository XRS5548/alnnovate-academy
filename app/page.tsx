import AboutUs from '@/components/persional/about'
import ExamsList from '@/components/persional/examssection'
import FeaturesSection from '@/components/persional/features'
import HeroSection from '@/components/persional/hero'
import PopularCourses from '@/components/persional/populercourse'
import CertificatePreviewForm from '@/components/persional/preview_certificate'
import React from 'react'

export default function page() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ExamsList />
      <PopularCourses />
      <AboutUs />
      <CertificatePreviewForm />
    </>
  )
}
