import Link from "next/link";

export function CtaSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary-500 to-primary-700 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Your Legacy?</h2>
        <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
          Partner with us for your next construction project and experience excellence in every pillar.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/contact" 
            className="bg-white text-primary-500 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            Contact Us
          </Link>
          <Link 
            href="/quote" 
            className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            Request a Quote
          </Link>
        </div>
      </div>
    </section>
  );
}