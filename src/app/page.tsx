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
import { ProcessTimeline } from "@/components/process-timeline";
import { TechPartners } from "@/components/tech-partners";
import { Testimonials } from "@/components/testimonials";
import { Stats } from "@/components/stats";

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
        <ProcessTimeline />
        <Testimonials />
        <Stats />

      </main>
      <Footer />
    </>
  );
}
