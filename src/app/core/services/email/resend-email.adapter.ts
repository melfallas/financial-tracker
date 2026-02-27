import { Injectable } from '@angular/core';
import { IEmailProvider, EmailPayload, EmailResult } from '@core/interfaces/i-email-provider';

/**
 * ResendEmailAdapter — Sends transactional emails via the Resend API.
 *
 * Architecture Note:
 *   This is the Phase 1 implementation of IEmailProvider.
 *   To migrate to SendGrid, implement IEmailProvider in a new
 *   SendGridEmailAdapter class and update the provider in app.config.ts.
 *
 * API docs: https://resend.com/docs/api-reference/emails/send-email
 *
 * Environment variables consumed:
 *   - NG_APP_EMAIL_SENDING_KEY: Resend API key (re_xxx...)
 *   - NG_APP_EMAIL_SENDING_DOMAIN: Verified sender address (e.g. onboarding@resend.dev)
 */
@Injectable()
export class ResendEmailAdapter extends IEmailProvider {

    private readonly RESEND_API_URL = 'https://api.resend.com/emails';

    override async send(payload: EmailPayload): Promise<EmailResult> {
        const apiKey = import.meta.env.NG_APP_EMAIL_SENDING_KEY;
        const senderAddress = import.meta.env.NG_APP_EMAIL_SENDING_DOMAIN;

        if (!apiKey || !senderAddress) {
            console.error('[ResendEmailAdapter] Missing required environment variables: NG_APP_EMAIL_SENDING_KEY or NG_APP_EMAIL_SENDING_DOMAIN');
            return {
                success: false,
                errorMessage: 'Email service is not configured. Missing API key or sender domain.',
            };
        }

        // Strip the data URI prefix if present (e.g., "data:application/pdf;base64,")
        const base64Content = payload.pdfBase64.includes(',')
            ? payload.pdfBase64.split(',')[1]
            : payload.pdfBase64;

        const emailBody = {
            from: `Mark @ Financial Tracker <${senderAddress}>`,
            to: [payload.to],
            subject: this.buildSubjectLine(payload.leadFirstName, payload.lang),
            html: payload.htmlBody,
            attachments: [
                {
                    filename: payload.pdfFilename,
                    content: base64Content,
                },
            ],
        };

        try {
            const response = await fetch(this.RESEND_API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailBody),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
                console.error('[ResendEmailAdapter] API error:', errorData);
                return {
                    success: false,
                    errorMessage: `Resend API error: ${response.status} — ${(errorData as { message?: string }).message ?? 'Unknown'}`,
                };
            }

            return { success: true };

        } catch (error) {
            const message = error instanceof Error ? error.message : 'Network error';
            console.error('[ResendEmailAdapter] Network or fetch error:', error);
            return {
                success: false,
                errorMessage: message,
            };
        }
    }

    private buildSubjectLine(firstName: string, lang: 'ES' | 'EN'): string {
        return lang === 'ES'
            ? `${firstName}, tu Plan Financiero está listo para descargar 🔒`
            : `${firstName}, your Financial Blueprint is ready to download 🔒`;
    }
}
