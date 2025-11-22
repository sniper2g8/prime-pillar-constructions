import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Equipment Catalog | PrimePillar Constructions',
  description: 'Browse our comprehensive catalog of construction equipment available for hire, including concrete equipment, earth moving machinery, demolition tools, power tools, and safety equipment.',
  openGraph: {
    title: 'Equipment Catalog | PrimePillar Constructions',
    description: 'Browse our comprehensive catalog of construction equipment available for hire, including concrete equipment, earth moving machinery, demolition tools, power tools, and safety equipment.',
    url: 'https://www.primepillargh.com/equipment',
    siteName: 'PrimePillar Constructions',
    locale: 'en_GH',
    type: 'website',
  },
};

// Mock data - in a real app, this would come from a database
const equipment = [
  {
    id: 1,
    name: "Poker Vibrator",
    category: "Concrete Equipment",
    quantity: 15,
    isAvailable: true
  },
  {
    id: 2,
    name: "Concrete Mixer",
    category: "Concrete Equipment",
    quantity: 1,
    isAvailable: true
  },
  {
    id: 3,
    name: "Compactor",
    category: "Earth Moving",
    quantity: 4,
    isAvailable: true
  },
  {
    id: 4,
    name: "Jack Hammer",
    category: "Demolition",
    quantity: 4,
    isAvailable: true
  },
  {
    id: 5,
    name: "Angle Grinder",
    category: "Power Tools",
    quantity: 5,
    isAvailable: true
  },
  {
    id: 6,
    name: "Drilling Machine",
    category: "Power Tools",
    quantity: 2,
    isAvailable: true
  },
  {
    id: 7,
    name: "Head Pan",
    category: "Manual Tools",
    quantity: 20,
    isAvailable: true
  },
  {
    id: 8,
    name: "Safety Equipment (PPE Sets)",
    category: "Safety",
    quantity: 50,
    isAvailable: true
  }
];

export default function EquipmentPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-500 to-primary-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold tracking-wide uppercase mb-6">
                Equipment Catalog
              </h1>
              <p className="text-xl text-gray-200">
                Wide range of construction equipment available for hire with technical support.
              </p>
            </div>
          </div>
        </section>

        {/* Equipment List */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Equipment
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Availability
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {equipment.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{item.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.isAvailable 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {item.isAvailable ? "Available" : "Not Available"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link 
                          href="/contact" 
                          className="text-primary-600 hover:text-primary-900"
                        >
                          Inquire
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* CTA Section */}
            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Specific Equipment?</h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Can't find what you're looking for? Contact us and we'll help you source the right equipment for your project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact" 
                  className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
                >
                  Contact Us
                </Link>
                <Link 
                  href="/quote" 
                  className="bg-accent-500 hover:bg-accent-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
                >
                  Request a Quote
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}