import { Resend } from 'resend';
import { SITE_CONFIG } from './constants';

// Create a Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// Send email notification for quote requests
export async function sendQuoteNotification(
  quoteData: {
    name: string;
    email: string;
    phone: string;
    company?: string;
    services: string[];
    description: string;
    timeline: string;
    budget: string;
  }
) {
  try {
    console.log('Attempting to send quote notification email via Resend...');
    
    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured in environment variables');
    }
    
    console.log('From email:', process.env.EMAIL_USER || SITE_CONFIG.email);
    console.log('To email:', SITE_CONFIG.email);
    
    const { data, error } = await resend.emails.send({
      from: `${SITE_CONFIG.name} <${process.env.EMAIL_USER || SITE_CONFIG.email}>`,
      to: [SITE_CONFIG.email],
      subject: `New Quote Request from ${quoteData.name}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${quoteData.name}</p>
        <p><strong>Email:</strong> ${quoteData.email}</p>
        <p><strong>Phone:</strong> ${quoteData.phone}</p>
        ${quoteData.company ? `<p><strong>Company:</strong> ${quoteData.company}</p>` : ''}
        <p><strong>Services Interested:</strong> ${quoteData.services.join(', ')}</p>
        <p><strong>Project Description:</strong> ${quoteData.description}</p>
        <p><strong>Timeline:</strong> ${quoteData.timeline}</p>
        <p><strong>Budget Range:</strong> ${quoteData.budget}</p>
        <hr>
        <p>Please follow up with this client within 24-48 hours.</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error(`Resend error: ${error.message}`);
    }

    console.log('Quote notification email sent successfully via Resend');
    return data;
  } catch (error: any) {
    console.error('Error sending quote notification email:', error);
    console.error('Error details:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    throw new Error(`Failed to send notification email: ${error.message}`);
  }
}

// Send confirmation email to client
export async function sendQuoteConfirmation(
  clientEmail: string,
  clientName: string
) {
  try {
    console.log('Attempting to send quote confirmation email via Resend...');
    
    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured in environment variables');
    }
    
    console.log('From email:', process.env.EMAIL_USER || SITE_CONFIG.email);
    console.log('To email:', clientEmail);
    
    const { data, error } = await resend.emails.send({
      from: `${SITE_CONFIG.name} <${process.env.EMAIL_USER || SITE_CONFIG.email}>`,
      to: [clientEmail],
      subject: `Thank you for your quote request - ${SITE_CONFIG.name}`,
      html: `
        <h2>Thank You for Your Quote Request</h2>
        <p>Dear ${clientName},</p>
        <p>Thank you for submitting a quote request to ${SITE_CONFIG.name}. We have received your request and our team will review it shortly.</p>
        <p>We typically respond to quote requests within 24-48 business hours. If you have any urgent questions, please feel free to contact us at ${SITE_CONFIG.phone}.</p>
        <p>Best regards,<br>The ${SITE_CONFIG.name} Team</p>
        <hr>
        <p>This is an automated message. Please do not reply to this email.</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error(`Resend error: ${error.message}`);
    }

    console.log('Quote confirmation email sent successfully via Resend');
    return data;
  } catch (error: any) {
    console.error('Error sending quote confirmation email:', error);
    console.error('Error details:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    throw new Error(`Failed to send confirmation email: ${error.message}`);
  }
}