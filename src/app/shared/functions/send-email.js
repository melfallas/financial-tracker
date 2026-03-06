// Create a Supabase Function to send emails with Resend based on IEmailProvider send method using EmailPayload and EmailResult types

import { serve } from "https://deno.land/std/http/server.ts";
import { Resend } from "npm:resend";

interface EmailInfo {
  to: string;
  subject: string;
  htmlBody: string;
  pdfFilename: string;
  pdfBase64: string;
}

interface EmailPayload {
  to: string;
  leadFirstName: string;
  leadFullName: string;
  pdfBase64: string;
  pdfFilename: string;
  bookingUrl: string;
  lang: 'ES' | 'EN';
  htmlBody: string;
}

interface EmailResult {
  success: boolean;
  errorMessage?: string;
}

serve(async (request) => {
  const mainAllowedOrigin = "*";
  const corsHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": mainAllowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
  try {
    // const subject = "Test Email";
    // const { to, leadFirstName, leadFullName, pdfBase64, pdfFilename, bookingUrl, lang, htmlBody }: EmailPayload = await request.json();
    
    // const mainAllowedOrigin = "http://localhost:4200";
    // const mainAllowedOrigin = "https://finance.mbfast.online";

    // const origin = request.headers.get('origin');
    // const allowedOrigins = ['https://finance.mbfast.online', 'http://localhost:4200'];

    // if (!allowedOrigins.includes(origin ?? '')) {
    //   return new Response("Origin domain is not allowed", {
    //     headers: { "Content-Type": "application/json" },
    //     status: 403,
    //   });
    // }

    // Manage preflight requests for CORS in Options http method
    if (request.method === "OPTIONS") {
      return new Response("OK", {
        headers: corsHeaders,
        status: 200,
      });
    }

    const { to, subject, htmlBody, pdfFilename, pdfBase64 }: EmailInfo = await request.json();
    const senderAddress = "welcome@finance.mbfast.online";
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    const result = await resend.emails.send({
      from: `Financial Tracker <${senderAddress}>`,
      to,
      subject,
      html: htmlBody,
      attachments: [
        {
          filename: pdfFilename,
          content: pdfBase64,
        },
      ],
    });

    // Return 200 OK response based on EmailResult
    return new Response(JSON.stringify(result), {
      headers: corsHeaders,
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: corsHeaders,
      status: 500,
    });
  }
});
