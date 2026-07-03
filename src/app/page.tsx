import { Hero } from "@/components/Hero";
import { Expertise } from "@/components/Expertise";
import { PopularProperties } from "@/components/PopularProperties";
import { FeaturedProperties } from "@/components/FeaturedProperties";
import { MortgagePromo } from "@/components/MortgagePromo";
import { Agents } from "@/components/Agents";
import { WhyUs } from "@/components/WhyUs";
import { FAQ } from "@/components/FAQ";
import { CTASection } from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <Expertise />
      <PopularProperties />
      <FeaturedProperties />
      <MortgagePromo />
      <Agents />
      <WhyUs />
      <FAQ />
      <CTASection />
    </>
  );
}
