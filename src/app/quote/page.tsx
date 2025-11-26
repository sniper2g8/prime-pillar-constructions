import { Metadata } from "next";
import QuoteClientPage from "./quote-client";

export const metadata: Metadata = {
  title: 'Request a Quote | PrimePillar Constructions',
  description: 'Request a customized quote for your construction project. Provide details about your requirements and we will get back to you with a competitive proposal.',
  openGraph: {
    title: 'Request a Quote | PrimePillar Constructions',
    description: 'Request a customized quote for your construction project. Provide details about your requirements and we will get back to you with a competitive proposal.',
    url: 'https://www.primepillargh.com/quote',
    siteName: 'PrimePillar Constructions',
    locale: 'en_GH',
    type: 'website',
  },
};

export default function QuotePage() {
  return <QuoteClientPage />;
}