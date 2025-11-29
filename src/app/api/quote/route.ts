import { NextRequest } from "next/server";
import { z } from "zod";
import { createClient } from '@/lib/supabase/server';
import { sendQuoteNotification, sendQuoteConfirmation } from '@/lib/email';

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
  budget: z.enum(["under_100k", "100k-500k", "500k-1m", "1m-5m", "5m_plus", "not_sure"]),
  
  // reCAPTCHA token
  recaptchaToken: z.string().min(1, "reCAPTCHA validation failed"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = quoteSchema.parse(body);
    
    // Verify reCAPTCHA token
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (!recaptchaSecret) {
      throw new Error("reCAPTCHA secret key not configured");
    }
    
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${recaptchaSecret}&response=${validatedData.recaptchaToken}`,
      }
    );
    
    const recaptchaResult = await recaptchaResponse.json();
    
    if (!recaptchaResult.success) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "reCAPTCHA verification failed. Please try again." 
        }),
        { 
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    
    // Create Supabase client
    const supabase = await createClient();
    
    // Save to database
    const { error } = await supabase
      .from('inquiries')
      .insert({
        type: 'quote',
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        company: validatedData.company,
        services_interested: validatedData.services,
        project_details: {
          description: validatedData.description,
          timeline: validatedData.timeline,
          budget: validatedData.budget
        },
        message: validatedData.description,
        status: 'new'
      });
    
    if (error) {
      console.error("Error saving quote to database:", error);
      throw new Error("Failed to save quote request");
    }
    
    // Send email notifications
    try {
      // Send notification to company
      await sendQuoteNotification({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        company: validatedData.company,
        services: validatedData.services,
        description: validatedData.description,
        timeline: validatedData.timeline,
        budget: validatedData.budget,
      });
      
      // Send confirmation to client
      await sendQuoteConfirmation(validatedData.email, validatedData.name);
    } catch (emailError) {
      console.error("Error sending email notifications:", emailError);
      // Don't fail the request if email sending fails
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Quote request submitted successfully! We'll get back to you within 24-48 hours." 
      }),
      { 
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Quote form error:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "Failed to submit quote request. Please try again." 
      }),
      { 
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}