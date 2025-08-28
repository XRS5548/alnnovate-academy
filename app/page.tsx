import AboutUs from '@/components/persional/about'
import FeaturesSection from '@/components/persional/features'
import HeroSection from '@/components/persional/hero'
import PopularCourses from '@/components/persional/populercourse'
import React from 'react'

export default function page() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <PopularCourses />
      <AboutUs />
    </>
  )
}
