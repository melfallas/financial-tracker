import { vi, describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ResendEmailAdapter } from './resend-email.adapter';
import { EmailPayload } from '@core/interfaces/i-email-provider';

describe('ResendEmailAdapter', () => {
    let adapter: ResendEmailAdapter;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ResendEmailAdapter],
        });
        adapter = TestBed.inject(ResendEmailAdapter);

        // Mock fetch for tests
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ id: 'res_123' }), {
            status: 200,
            statusText: 'OK'
        })));
    });

    it('should be created', () => {
        expect(adapter).toBeTruthy();
    });

    const payload: EmailPayload = {
        to: 'test@example.com',
        leadFirstName: 'Jane',
        leadFullName: 'Jane Doe',
        pdfBase64: 'data:application/pdf;base64,JVBERi...',
        pdfFilename: 'Test.pdf',
        bookingUrl: 'https://calendly.com/test',
        lang: 'EN',
        htmlBody: '<p>Test</p>',
    };

    it('should send an email and strip data URI prefix from base64 string', async () => {
        // // Enforce mock env for test stability if not present
        // if (!import.meta.env.NG_APP_EMAIL_SENDING_KEY) {
        //     (import.meta as any).env = {
        //         NG_APP_EMAIL_SENDING_KEY: 're_test_key',
        //         NG_APP_EMAIL_SENDING_DOMAIN: 'test@example.com'
        //     };
        // }

        const result = await adapter.send(payload);

        expect(fetch).toHaveBeenCalled();
        const fetchArgs = (fetch as any).mock.calls[0];
        expect(fetchArgs[0]).toBe('https://api.resend.com/emails');

        const bodyText = fetchArgs[1]?.body as string;
        const bodyObj = JSON.parse(bodyText);

        // Assert Base64 stripping
        expect(bodyObj.attachments[0].content).toBe('JVBERi...');
        expect(result.success).toBe(true);
    });

    it('should return success false when fetch fails (e.g. 500 error)', async () => {
        (fetch as any).mockResolvedValue(new Response(JSON.stringify({ message: 'Internal Server Error' }), {
            status: 500,
            statusText: 'Server Error'
        }));

        vi.spyOn(console, 'error').mockImplementation(() => { });

        const result = await adapter.send(payload);

        expect(result.success).toBe(false);
        expect(result.errorMessage).toContain('Resend API error: 500');
    });

    it('should return success false on network exception', async () => {
        (fetch as any).mockRejectedValue(new Error('Network failure'));
        vi.spyOn(console, 'error').mockImplementation(() => { });

        const result = await adapter.send(payload);

        expect(result.success).toBe(false);
        expect(result.errorMessage).toBe('Network failure');
    });
});
