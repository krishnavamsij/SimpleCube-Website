import { Navbar } from "@/components/navbar";
import { HeroCarousel } from "@/components/hero-carousel";
// Scrolling client logos temporarily hidden from this build
// import { TrustBar } from "@/components/trust-bar";
import { Challenges } from "@/components/challenges";
// Agile Delivery Model temporarily hidden from this build
// import { Approach } from "@/components/approach";
import { Services } from "@/components/services";
// Products section temporarily hidden from this build
// import { ProductsShowcase } from "@/components/products-showcase";
// Case Studies temporarily hidden from this build
// import { CaseStudies } from "@/components/case-studies";
import { WhyHyniva } from "@/components/why-hyniva";
// Industries temporarily hidden from this build
// import { Industries } from "@/components/industries";
import { TechPartners } from "@/components/tech-partners";
// Customer Stories temporarily hidden from this build
// import { VoiceOfCustomer } from "@/components/voice-of-customer";
// FAQ temporarily hidden from this build
// import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar forceDarkText />
      <main>
        <HeroCarousel />
        {/* Scrolling client logos temporarily hidden from this build */}
        {/* <TrustBar /> */}
        {/* Customer Stories temporarily hidden from this build */}
        {/* <VoiceOfCustomer /> */}
        <WhyHyniva />
        <Challenges />
        {/* Agile Delivery Model temporarily hidden from this build */}
        {/* <Approach /> */}
        {/* Case Studies temporarily hidden from this build */}
        {/* <CaseStudies /> */}
        {/* Industries temporarily hidden from this build */}
        {/* <Industries /> */}
        {/* Products section temporarily hidden from this build */}
        {/* <ProductsShowcase /> */}
      </main>
      {/* FAQ temporarily hidden from this build */}
      {/* <Faq /> */}
      <Footer />
    </>
  );
}
