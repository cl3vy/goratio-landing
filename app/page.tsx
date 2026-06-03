import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Problem from "@/components/Problem";
import HiddenCost from "@/components/HiddenCost";
import Solution from "@/components/Solution";
import WhyHandBuilt from "@/components/WhyHandBuilt";
import HowItWorks from "@/components/HowItWorks";
import WhatYouGet from "@/components/WhatYouGet";
import Proof from "@/components/Proof";
import WhoFor from "@/components/WhoFor";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import RatioRuntime from "@/components/RatioRuntime";

export default function Page() {
  return (
    <>
      <canvas id="bg-canvas" />
      <div id="cursor" />

      <Nav />

      <main id="top">
        <Hero />
        <TrustBar />
        <Problem />
        <HiddenCost />
        <Solution />
        <WhyHandBuilt />
        <HowItWorks />
        <WhatYouGet />
        <Proof />
        <WhoFor />
        <Faq />
        <FinalCta />
      </main>

      <Footer />

      <RatioRuntime />
    </>
  );
}
