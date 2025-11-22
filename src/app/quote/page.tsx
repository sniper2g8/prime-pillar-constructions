import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { QuoteForm } from "@/components/forms/quote-form";
import { Metadata } from "next";

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
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-500 to-primary-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold tracking-wide uppercase mb-6">
                Request a Quote
              </h1>
              <p className="text-xl text-gray-200">
                Get a customized quote for your construction project. Provide details about your requirements and we will get back to you with a competitive proposal.
              </p>
            </div>
          </div>
        </section>

        {/* Quote Form */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="bg-gray-50 rounded-lg p-8">
                <QuoteForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}