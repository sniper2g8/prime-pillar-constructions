import { NextRequest } from "next/server";
import { z } from "zod";
import { createClient } from '@/lib/supabase/server';
import { sendQuoteNotification, sendQuoteConfirmation } from '@/lib/email';

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  // reCAPTCHA token
  recaptchaToken: z.string().min(1, "reCAPTCHA validation failed"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = contactSchema.parse(body);
    
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
        type: 'contact',
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        company: validatedData.company,
        services_interested: validatedData.service ? [validatedData.service] : [],
        message: validatedData.message,
        status: 'new'
      });
    
    if (error) {
      console.error("Error saving contact to database:", error);
      throw new Error("Failed to save contact request");
    }
    
    // Send email notifications
    try {
      console.log("Sending email notifications...");
      // Send notification to company
      await sendQuoteNotification({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || '',
        company: validatedData.company,
        services: validatedData.service ? [validatedData.service] : [],
        description: validatedData.message,
        timeline: 'N/A',
        budget: 'N/A',
      });
      
      // Send confirmation to client
      await sendQuoteConfirmation(validatedData.email, validatedData.name);
      console.log("Email notifications sent successfully");
    } catch (emailError: any) {
      console.error("Error sending email notifications:", emailError);
      console.error("Email error details:", {
        message: emailError.message,
        code: emailError.code,
        command: emailError.command,
        stack: emailError.stack
      });
      // Return the specific error to the client
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: `Email error: ${emailError.message || "Failed to send email notification. Please try again."}` 
        }),
        { 
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Message sent successfully! We'll get back to you soon." 
      }),
      { 
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    console.error("Contact form error:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: `Server error: ${error.message || "Failed to send message. Please try again."}` 
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