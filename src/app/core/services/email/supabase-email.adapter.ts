import { Injectable } from '@angular/core';
import { IEmailProvider, EmailPayload, EmailResult } from '@core/interfaces/i-email-provider';

interface EmailInfo {
  to: string;
  subject: string;
  htmlBody: string;
  pdfFilename: string;
  pdfBase64: string;
}

/**
 * SupabaseEmailAdapter — Sends transactional emails via a Supabase Edge Function.
 *
 * Architecture Note:
 *   This follows the new architectural standard. Adapters communicating with external
 *   services must delegate execution to Edge Functions, containing minimal logic.
 *
 * Environment variables consumed:
 *   - NG_APP_EMAIL_SENDING_FUNCTION_URL: Edge function URL
 *   - NG_APP_EMAIL_SENDING_FUNCTION_KEY: Auth token for the function
 */
@Injectable()
export class SupabaseEmailAdapter extends IEmailProvider {

    override async send(payload: EmailPayload): Promise<EmailResult> {
        const functionUrl = import.meta.env['NG_APP_EMAIL_SENDING_FUNCTION_URL'];
        const functionKey = import.meta.env['NG_APP_EMAIL_SENDING_FUNCTION_KEY'];

        if (!functionUrl || !functionKey) {
            console.error('[SupabaseEmailAdapter] Missing required environment variables: NG_APP_EMAIL_SENDING_FUNCTION_URL or NG_APP_EMAIL_SENDING_FUNCTION_KEY');
            return {
                success: false,
                errorMessage: 'Email service is not configured. Missing Edge Function URL or Key.',
            };
        }

        // Strip the data URI prefix if present (e.g., "data:application/pdf;base64,")
        const base64Content = payload.pdfBase64.includes(',')
            ? payload.pdfBase64.split(',')[1]
            : payload.pdfBase64;

        const emailInfo: EmailInfo = {
            to: payload.to,
            subject: this.buildSubjectLine(payload.leadFirstName, payload.lang),
            htmlBody: payload.htmlBody,
            pdfFilename: payload.pdfFilename,
            pdfBase64: base64Content,
        };

        try {
            const response = await fetch(functionUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${functionKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailInfo),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
                console.error('[SupabaseEmailAdapter] Edge Function error:', errorData);
                return {
                    success: false,
                    errorMessage: `Supabase Edge Function error: ${response.status} — ${(errorData as { message?: string }).message ?? 'Unknown'}`,
                };
            }

            return { success: true };

        } catch (error) {
            const message = error instanceof Error ? error.message : 'Network error';
            console.error('[SupabaseEmailAdapter] Network or fetch error:', error);
            return {
                success: false,
                errorMessage: message,
            };
        }
    }

    private buildSubjectLine(firstName: string, lang: 'ES' | 'EN'): string {
        return lang === 'ES'
            ? `${firstName}, descarga tu Plan Financiero 🔒`
            : `${firstName}, download your Financial Blueprint 🔒`;
    }
}
