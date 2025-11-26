import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Industries } from "@/components/sections/industries";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { CtaSection } from "@/components/sections/cta-section";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ServicesGrid />
        <Industries />
        <Suspense fallback={<div>Loading projects...</div>}>
          <ProjectsGrid />
        </Suspense>
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}