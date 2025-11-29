import nodemailer from 'nodemailer';
import { SITE_CONFIG } from './constants';

// Create a transporter object using SMTP transport
const createTransporter = () => {
  const port = parseInt(process.env.SMTP_PORT || '465');
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER || 'your-email@gmail.com',
      pass: process.env.EMAIL_PASS || 'your-app-password',
    },
  });
};

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
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"${SITE_CONFIG.name}" <${process.env.EMAIL_USER || SITE_CONFIG.email}>`,
      to: SITE_CONFIG.email,
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
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Quote notification email sent successfully');
    return result;
  } catch (error) {
    console.error('Error sending quote notification email:', error);
    throw error;
  }
}

// Send confirmation email to client
export async function sendQuoteConfirmation(
  clientEmail: string,
  clientName: string
) {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"${SITE_CONFIG.name}" <${process.env.EMAIL_USER || SITE_CONFIG.email}>`,
      to: clientEmail,
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
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Quote confirmation email sent successfully');
    return result;
  } catch (error) {
    console.error('Error sending quote confirmation email:', error);
    throw error;
  }
}