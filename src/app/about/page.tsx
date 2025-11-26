import { Metadata } from "next";
import AboutClientPage from "./about-client";

export const metadata: Metadata = {
  title: 'About Us | PrimePillar Constructions',
  description: 'Learn about PrimePillar Constructions Ltd, our vision, mission, core values, and leadership team.',
  openGraph: {
    title: 'About Us | PrimePillar Constructions',
    description: 'Learn about PrimePillar Constructions Ltd, our vision, mission, core values, and leadership team.',
    url: 'https://www.primepillargh.com/about',
    siteName: 'PrimePillar Constructions',
    locale: 'en_GH',
    type: 'website',
  },
};

export default function AboutPage() {
  return <AboutClientPage />;
}