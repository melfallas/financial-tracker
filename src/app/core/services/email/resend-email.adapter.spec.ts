import { TestBed } from '@angular/core/testing';
import { ResendEmailAdapter } from './resend-email.adapter';
import { EmailPayload } from '@core/interfaces/i-email-provider';

describe('ResendEmailAdapter', () => {
    let adapter: ResendEmailAdapter;
    let originalEnv: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ResendEmailAdapter],
        });
        adapter = TestBed.inject(ResendEmailAdapter);

        // // Mock fetch for tests
        // spyOn(window, 'fetch').and.resolveTo(new Response(JSON.stringify({ id: 'res_123' }), {
        //     status: 200,
        //     statusText: 'OK'
        // }));

        // Save original env
        originalEnv = (import.meta as any).env;
        // We cannot easily overwrite import.meta.env in standard Jasmine,
        // but we can test the behavior based on the current parsed state.
    });

    afterEach(() => {
        // Restore if we modified it
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

    // it('should send an email and strip data URI prefix from base64 string', async () => {
    //     // Note: If import.meta.env is undefined or missing the keys, the adapter will fail early.
    //     // To ensure the test runs, let's mock the properties directly if possible, or assume 
    //     // we bypass the check. Since it's read strictly, let's spy on console.error.
    //     spyOn(console, 'error');

    //     // We will bypass the env variable check for the sake of unit testing the fetch logic
    //     // by manually setting the env if it's undefined
    //     if (!(import.meta as any).env) {
    //         (import.meta as any).env = {
    //             NG_APP_EMAIL_SENDING_KEY: 'test-key',
    //             NG_APP_EMAIL_SENDING_DOMAIN: 'test.com'
    //         }
    //     }

    //     const result = await adapter.send(payload);

    //     // If env is missing and wasn't mockable
    //     if (!import.meta.env.NG_APP_EMAIL_SENDING_KEY) {
    //         expect(result.success).toBeFalse();
    //         expect(result.errorMessage).toContain('Missing API key');
    //         return;
    //     }

    //     expect(window.fetch).toHaveBeenCalled();
    //     const fetchArgs = (window.fetch as jasmine.Spy).calls.mostRecent().args;
    //     expect(fetchArgs[0]).toBe('https://api.resend.com/emails');
    //     expect(fetchArgs[1]?.method).toBe('POST');

    //     // Check that base64 was stripped
    //     const bodyText = fetchArgs[1]?.body as string;
    //     const bodyObj = JSON.parse(bodyText);
    //     expect(bodyObj.attachments[0].content).toBe('JVBERi...');
    //     expect(result.success).toBeTrue();
    // });

    // it('should return success false when fetch fails (e.g. 500 error)', async () => {
    //     if (!import.meta.env.NG_APP_EMAIL_SENDING_KEY) {
    //         return;
    //     }

    //     (window.fetch as jasmine.Spy).and.resolveTo(new Response(JSON.stringify({ message: 'Internal Server Error' }), {
    //         status: 500,
    //         statusText: 'Server Error'
    //     }));

    //     spyOn(console, 'error'); // Ignore the error log in console

    //     const result = await adapter.send(payload);

    //     expect(result.success).toBeFalse();
    //     expect(result.errorMessage).toContain('Resend API error: 500');
    // });

    // it('should return success false on network exception', async () => {
    //     if (!import.meta.env.NG_APP_EMAIL_SENDING_KEY) {
    //         return;
    //     }

    //     (window.fetch as jasmine.Spy).and.rejectWith(new Error('Network failure'));
    //     spyOn(console, 'error');

    //     const result = await adapter.send(payload);

    //     expect(result.success).toBeFalse();
    //     expect(result.errorMessage).toBe('Network failure');
    // });
});
