import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { StatsBar } from "@/components/sections/stats-bar";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Industries } from "@/components/sections/industries";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaSection } from "@/components/sections/cta-section";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <StatsBar />
        <ServicesGrid />
        <Industries />
        <Suspense fallback={<div>Loading projects...</div>}>
          <ProjectsGrid />
        </Suspense>
        <Testimonials />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}