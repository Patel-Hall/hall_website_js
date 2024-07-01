import {
  HeroSection,
  HomeNavBar,
  AboutUsSection,
  QuoteSection,
  NotableAlumniSection,
  Footer,
} from "@/components";

export default function Home() {
  return (
    <div>
      <HomeNavBar />
      <HeroSection />
      <AboutUsSection />
      <QuoteSection />
      <NotableAlumniSection />
      <Footer />
    </div>
  );
}
