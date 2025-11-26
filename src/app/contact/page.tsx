import { Metadata } from "next";
import ContactClientPage from "./contact-client";

export const metadata: Metadata = {
  title: 'Contact Us | PrimePillar Constructions',
  description: 'Get in touch with PrimePillar Constructions Ltd. Contact us by phone, email, or visit our office in Nungua, Accra, Ghana.',
  openGraph: {
    title: 'Contact Us | PrimePillar Constructions',
    description: 'Get in touch with PrimePillar Constructions Ltd. Contact us by phone, email, or visit our office in Nungua, Accra, Ghana.',
    url: 'https://www.primepillargh.com/contact',
    siteName: 'PrimePillar Constructions',
    locale: 'en_GH',
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactClientPage />;
}