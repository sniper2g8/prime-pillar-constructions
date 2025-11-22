import Link from "next/link";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import { Logo } from "./logo";

export function Footer() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Equipment", href: "/equipment" },
    { name: "HSE", href: "/hse" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    "Architectural Works",
    "Building & Construction",
    "Electrical Works",
    "Plumbing Works",
    "Equipment Hiring",
    "Road Construction",
    "Civil Works",
    "Facility Maintenance",
  ];

  return (
    <footer className="bg-primary-500 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Logo size="small" variant="footer" />
            </div>
            <p className="text-gray-300 mb-4">
              Solid Pillars, Lasting Legacy. Providing construction services for mining, petroleum, oil & gas, energy, industrial, and public infrastructure sectors.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <Link 
                    href="/services" 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-gray-300">
              <p className="mb-2">No. 13 Beach Drive Nungua,</p>
              <p className="mb-2">Accra, Ghana</p>
              <p className="mb-2">Phone: +233 246 937 073 / +233 248 472 774</p>
              <p className="mb-2">Email: info@primepillargh.com</p>
            </address>
          </div>
        </div>

        <div className="border-t border-primary-400 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            &copy; 2025 PrimePillar Constructions Ltd. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="bg-secondary-500 text-white px-3 py-1 rounded-full text-xs">
              100% Ghanaian-Owned
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}