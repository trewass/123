'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import PsychologicalHooks from '@/components/PsychologicalHooks'
import ExamplesSection from '@/components/ExamplesSection'
import CaseStudiesSection from '@/components/CaseStudiesSection'
import PricingSection from '@/components/PricingSection'
import FAQSection from '@/components/FAQSection'
import Footer from '@/components/Footer'
import ContactModal from '@/components/ContactModal'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-background-primary">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <HeroSection onOpenModal={() => setIsModalOpen(true)} />
      <PsychologicalHooks />
      <ExamplesSection />
      <CaseStudiesSection />
      <PricingSection onOpenModal={() => setIsModalOpen(true)} />
      <FAQSection onOpenModal={() => setIsModalOpen(true)} />
      <Footer onOpenModal={() => setIsModalOpen(true)} />
      
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </main>
  )
} 