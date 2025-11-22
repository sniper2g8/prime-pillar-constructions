"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const quoteSchema = z.object({
  // Step 1: Personal Information
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  company: z.string().optional(),
  
  // Step 2: Services
  services: z.array(z.string()).min(1, "Please select at least one service"),
  
  // Step 3: Project Details
  description: z.string().min(20, "Project description must be at least 20 characters"),
  timeline: z.enum(["immediate", "1-3_months", "3-6_months", "6_plus_months"]),
  budget: z.enum(["under_100k", "100k-500k", "500k-1m", "1m-5m", "5m_plus", "not_sure"])
});

type QuoteFormData = z.infer<typeof quoteSchema>;

const services = [
  "Architectural Works",
  "Building & Construction",
  "Electrical Works",
  "Plumbing Works",
  "Equipment Hiring",
  "Road Construction",
  "Civil Works",
  "Facility Maintenance"
];

const timelineOptions = [
  { value: "immediate", label: "Immediate (within 1 month)" },
  { value: "1-3_months", label: "1-3 months" },
  { value: "3-6_months", label: "3-6 months" },
  { value: "6_plus_months", label: "6+ months" }
];

const budgetOptions = [
  { value: "under_100k", label: "Under GHC 100,000" },
  { value: "100k-500k", label: "GHC 100,000 - 500,000" },
  { value: "500k-1m", label: "GHC 500,000 - 1 million" },
  { value: "1m-5m", label: "GHC 1 million - 5 million" },
  { value: "5m_plus", label: "Over GHC 5 million" },
  { value: "not_sure", label: "Not sure at the moment" }
];

export function QuoteForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      services: []
    }
  });

  const watchedServices = watch("services");

  const toggleService = (service: string) => {
    const currentServices = watchedServices || [];
    if (currentServices.includes(service)) {
      setValue("services", currentServices.filter(s => s !== service));
    } else {
      setValue("services", [...currentServices, service]);
    }
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    setSubmitError("");
    
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSubmitSuccess(true);
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
          setStep(1);
        }, 5000);
      } else {
        setSubmitError(result.message || "Failed to submit quote request. Please try again.");
      }
    } catch (error) {
      setSubmitError("Failed to submit quote request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {submitSuccess ? (
        <div className="text-center py-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Quote Request Submitted!</h3>
          <p className="text-gray-600 mb-6">
            Thank you for your quote request. Our team will review your information and get back to you within 24-48 hours.
          </p>
          <button
            onClick={() => {
              setSubmitSuccess(false);
              setStep(1);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= stepNum 
                      ? "bg-primary-500 text-white" 
                      : "bg-gray-200 text-gray-500"
                  }`}>
                    {stepNum}
                  </div>
                  <div className="mt-2 text-sm font-medium text-gray-900">
                    {stepNum === 1 && "Personal Info"}
                    {stepNum === 2 && "Services"}
                    {stepNum === 3 && "Project Details"}
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {submitError && (
            <div className="rounded-md bg-red-50 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">
                    {submitError}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
              <p className="text-gray-600">
                Please provide your contact details so we can get back to you with your quote.
              </p>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                    errors.name ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                    errors.phone ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company (Optional)
                </label>
                <input
                  id="company"
                  type="text"
                  {...register("company")}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                    errors.company ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.company && (
                  <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Next: Services
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Services */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Services Required</h2>
              <p className="text-gray-600">
                Please select all the services you're interested in for your project.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div 
                    key={service}
                    onClick={() => toggleService(service)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      watchedServices?.includes(service)
                        ? "border-primary-500 bg-primary-50"
                        : "border-gray-300 hover:border-primary-300"
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded border mr-3 flex items-center justify-center ${
                        watchedServices?.includes(service)
                          ? "bg-primary-500 border-primary-500"
                          : "border-gray-300"
                      }`}>
                        {watchedServices?.includes(service) && (
                          <svg className="w-3 h-3 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span className="font-medium text-gray-900">{service}</span>
                    </div>
                  </div>
                ))}
              </div>

              {errors.services && (
                <p className="text-sm text-red-600">{errors.services.message}</p>
              )}

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Next: Project Details
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Project Details */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Project Details</h2>
              <p className="text-gray-600">
                Provide more information about your project to help us prepare an accurate quote.
              </p>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Description *
                </label>
                <textarea
                  id="description"
                  rows={5}
                  {...register("description")}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                    errors.description ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Please describe your project in detail, including scope, size, location, and any special requirements..."
                ></textarea>
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Timeline *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {timelineOptions.map((option) => (
                    <label 
                      key={option.value}
                      className={`flex items-center p-3 border rounded-md cursor-pointer ${
                        watch("timeline") === option.value
                          ? "border-primary-500 bg-primary-50"
                          : "border-gray-300 hover:border-primary-300"
                      }`}
                    >
                      <input
                        type="radio"
                        value={option.value}
                        {...register("timeline")}
                        className="h-4 w-4 text-primary-500 focus:ring-primary-500"
                      />
                      <span className="ml-3 text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
                {errors.timeline && (
                  <p className="mt-1 text-sm text-red-600">{errors.timeline.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estimated Budget *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {budgetOptions.map((option) => (
                    <label 
                      key={option.value}
                      className={`flex items-center p-3 border rounded-md cursor-pointer ${
                        watch("budget") === option.value
                          ? "border-primary-500 bg-primary-50"
                          : "border-gray-300 hover:border-primary-300"
                      }`}
                    >
                      <input
                        type="radio"
                        value={option.value}
                        {...register("budget")}
                        className="h-4 w-4 text-primary-500 focus:ring-primary-500"
                      />
                      <span className="ml-3 text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
                {errors.budget && (
                  <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>
                )}
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Previous
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                    isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit Quote Request"
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
}