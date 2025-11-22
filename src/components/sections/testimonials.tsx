"use client";

import { useState } from "react";

const testimonials = [
  {
    id: "technipfmc-testimonial",
    clientName: "Kwame Asante",
    company: "TechnipFMC",
    role: "Project Manager",
    content: "PrimePillar Constructions delivered our road signage project on time and within budget. Their attention to detail and professionalism exceeded our expectations.",
    rating: 5,
  },
  {
    id: "heat-gold-fields-testimonial",
    clientName: "Akosua Mensah",
    company: "Heat Gold Fields",
    role: "Operations Director",
    content: "The site signage systems installed by PrimePillar have significantly improved safety and operational efficiency at our mining facility. Highly recommended!",
    rating: 5,
  },
  {
    id: "armed-forces-testimonial",
    clientName: "Kofi Boateng",
    company: "Ghana Armed Forces",
    role: "Facilities Manager",
    content: "Working with PrimePillar on our residential project has been a pleasure. Their expertise and commitment to quality are evident in every aspect of the construction.",
    rating: 5,
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Client Testimonials</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear what our clients have to say about working with PrimePillar Constructions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <blockquote className="text-xl text-gray-700 mb-6 italic">
                "{testimonials[currentIndex].content}"
              </blockquote>
              
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {testimonials[currentIndex].clientName}
                </p>
                <p className="text-gray-600">
                  {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? "bg-primary-500" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white shadow-md text-primary-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white shadow-md text-primary-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}