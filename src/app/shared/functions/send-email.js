// Create a Supabase Function to send emails with Resend based on IEmailProvider send method using EmailPayload and EmailResult types

import { serve } from "https://deno.land/std/http/server.ts";
import { Resend } from "npm:resend";

// Create Interfaces EmailPayload and EmailResult
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

serve(async (req) => {
  try {
    const { to, leadFirstName, leadFullName, pdfBase64, pdfFilename, bookingUrl, lang, htmlBody }: EmailPayload = await req.json();
    const testSubject = "Test Email";
    const senderAddress = "welcome@finance.mbfast.online";

    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    const result = await resend.emails.send({
      from: `Financial Tracker <${senderAddress}>`,
      to,
      subject: testSubject,
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
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});
