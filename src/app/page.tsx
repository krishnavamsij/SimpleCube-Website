import { Navbar } from "@/components/navbar";
import { HeroCarousel } from "@/components/hero-carousel";
import { TrustBar } from "@/components/trust-bar";
import { Challenges } from "@/components/challenges";
import { Approach } from "@/components/approach";
import { Services } from "@/components/services";
import { ProductsShowcase } from "@/components/products-showcase";
import { CaseStudies } from "@/components/case-studies";
import { WhyHyniva } from "@/components/why-hyniva";
import { Industries } from "@/components/industries";
import { TechPartners } from "@/components/tech-partners";
import { VoiceOfCustomer } from "@/components/voice-of-customer";
import { Testimonials } from "@/components/testimonials";

import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroCarousel />
        <TrustBar />
        <Challenges />
        <Approach />
        <Services />
        <ProductsShowcase />
        <Industries />
        <CaseStudies />
        <WhyHyniva />
        <TechPartners />
        <VoiceOfCustomer />
      </main>
      <Footer />
    </>
  );
}
