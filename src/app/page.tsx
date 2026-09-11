import { Navbar } from "@/components/navbar";
import { HeroCarousel } from "@/components/hero-carousel";
// Scrolling client logos temporarily hidden from this build
// import { TrustBar } from "@/components/trust-bar";
import { ChallengesSolve } from "@/components/ChallengesSolve";
import { CoreExpertise } from "@/components/core-expertise";
// Agile Delivery Model temporarily hidden from this build
// import { Approach } from "@/components/approach";
// Products section temporarily hidden from this build
// import { ProductsShowcase } from "@/components/products-showcase";
// Case Studies temporarily hidden from this build
// import { CaseStudies } from "@/components/case-studies";
import { WhySimpleCube } from "@/components/why-simplecube";
import { CareersHome } from "@/components/careers-home";
// Industries temporarily hidden from this build
// import { Industries } from "@/components/industries";
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
        <WhySimpleCube />
        <ChallengesSolve />
        <CoreExpertise />
        <CareersHome />
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
