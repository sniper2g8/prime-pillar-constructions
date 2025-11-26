
import HSEClientPage from "./hse-client";

export const metadata: Metadata = {
  title: 'HSE Policy | PrimePillar Constructions',
  description: 'Our Health, Safety, and Environment policy focused on zero harm objectives, compliance with OHSAS/ISO 45001 standards, and commitment to environmental protection in all our construction projects.',
  openGraph: {
    title: 'HSE Policy | PrimePillar Constructions',
    description: 'Our Health, Safety, and Environment policy focused on zero harm objectives, compliance with OHSAS/ISO 45001 standards, and commitment to environmental protection in all our construction projects.',
    url: 'https://www.primepillargh.com/hse',
    siteName: 'PrimePillar Constructions',
    locale: 'en_GH',
    type: 'website',
  },
};

export default function HSEPage() {
  return <HSEClientPage />;
}
