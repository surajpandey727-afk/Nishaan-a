import { Chakravaat } from '@/components/home/Chakravaat'
import { Clients } from '@/components/home/Clients'
import { Hero } from '@/components/home/Hero'
import { IndustryAgnostic } from '@/components/home/IndustryAgnostic'
import { Methodology } from '@/components/home/Methodology'
import { Philosophy } from '@/components/home/Philosophy'
import { StrategicStatement } from '@/components/home/StrategicStatement'
import { Thinking } from '@/components/home/Thinking'
import { WhoWeAre } from '@/components/home/WhoWeAre'
import { CallToAction } from '@/components/shared/CallToAction'

/**
 * Chapter order, one idea per viewport:
 * Hero → Strategic Statement → Who We Are → Philosophy → Chakravaat →
 * Industry Agnostic → Methodology → Clients → Insights → CTA
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <StrategicStatement />
      <WhoWeAre />
      <Philosophy />
      <Chakravaat />
      <IndustryAgnostic />
      <Methodology />
      <Clients />
      <Thinking />
      <CallToAction />
    </>
  )
}
