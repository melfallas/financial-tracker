import { vi, describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { SupabaseEmailAdapter } from './supabase-email.adapter';
import { EmailPayload } from '@core/interfaces/i-email-provider';

describe('SupabaseEmailAdapter', () => {
    let adapter: SupabaseEmailAdapter;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SupabaseEmailAdapter],
        });
        adapter = TestBed.inject(SupabaseEmailAdapter);

        // Mock fetch for tests
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ id: 'res_123' }), {
            status: 200,
            statusText: 'OK'
        })));
        
        // // Ensure mock environment variables for test stability
        // if (!import.meta.env['NG_APP_EMAIL_SENDING_FUNCTION_URL']) {
        //     (import.meta as any).env = {
        //         ...import.meta.env,
        //         NG_APP_EMAIL_SENDING_FUNCTION_URL: 'https://test.dev/functions/v1/send-email',
        //         NG_APP_EMAIL_SENDING_FUNCTION_KEY: 'test-key'
        //     };
        // }
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
        bookingUrl: 'https://booking.platform.url.dev/test',
        lang: 'EN',
        htmlBody: '<p>Test</p>',
    };

    it('should send an email and strip data URI prefix from base64 string', async () => {
        const result = await adapter.send(payload);

        expect(fetch).toHaveBeenCalled();
        const fetchArgs = (fetch as any).mock.calls[0];
        expect(fetchArgs[0]).toBe('https://test.dev/functions/v1/send-email');

        const bodyText = fetchArgs[1]?.body as string;
        const bodyObj = JSON.parse(bodyText);

        // Assert Base64 stripping
        expect(bodyObj.pdfBase64).toBe('JVBERi...');
        expect(bodyObj.to).toBe('test@example.com');
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
        expect(result.errorMessage).toContain('Supabase Edge Function error: 500');
    });

    it('should return success false on network exception', async () => {
        (fetch as any).mockRejectedValue(new Error('Network failure'));
        vi.spyOn(console, 'error').mockImplementation(() => { });

        const result = await adapter.send(payload);

        expect(result.success).toBe(false);
        expect(result.errorMessage).toBe('Network failure');
    });
});
