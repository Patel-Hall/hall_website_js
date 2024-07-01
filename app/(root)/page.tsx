import {
  HeroSection,
  HomeNavBar,
  AboutUsSection,
  QuoteSection,
} from "@/components";

export default function Home() {
  return (
    <div>
      <HomeNavBar />
      <HeroSection />
      <AboutUsSection />
      <QuoteSection />
    </div>
  );
}
