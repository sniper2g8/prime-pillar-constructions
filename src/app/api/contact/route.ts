import { NextRequest } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = contactSchema.parse(body);
    
    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Process the inquiry
    
    // For now, we'll just log the data
    console.log("Contact form submission:", validatedData);
    
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
  } catch (error) {
    console.error("Contact form error:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "Failed to send message. Please try again." 
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