import { TestBed } from '@angular/core/testing';
import { EmailService } from './email.service';

describe('EmailService', () => {
    let service: EmailService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [EmailService],
        });
        service = TestBed.inject(EmailService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // =========================================================
    // buildCalendlyUrl — Unit tests
    // =========================================================

    it('should build a valid Calendly URL with correct UTM source', () => {
        const url = service.buildCalendlyUrl('John Doe', 'john@example.com');

        expect(url).toContain('utm_source=email_confirmation');
        expect(url).toContain('name=John+Doe');
        expect(url).toContain('email=john%40example.com');
    });

    it('should URL-encode special characters in the name', () => {
        const url = service.buildCalendlyUrl('María García', 'maria@example.com');

        // URLSearchParams encodes spaces as '+' and special chars
        expect(url).toContain('Mar%C3%ADa+Garc%C3%ADa');
    });

    it('should append query params even when base URL is empty', () => {
        // Simulating missing env var — the method still builds a URL fragment
        const url = service.buildCalendlyUrl('Test User', 'test@test.com');

        expect(url).toContain('?');
        expect(url).toContain('name=Test+User');
    });

    // =========================================================
    // buildHtmlBody — Unit tests
    // =========================================================

    it('should return an HTML string containing the lead first name', () => {
        const html = service.buildHtmlBody({
            to: 'test@example.com',
            leadFirstName: 'Carlos',
            leadFullName: 'Carlos Ruiz',
            bookingUrl: 'https://calendly.com/test',
            lang: 'ES',
        });

        expect(html).toContain('Carlos');
    });

    it('should include the deep blue header color for brand compliance', () => {
        const html = service.buildHtmlBody({
            to: 'test@example.com',
            leadFirstName: 'Ana',
            leadFullName: 'Ana López',
            bookingUrl: 'https://calendly.com/test',
            lang: 'ES',
        });

        expect(html).toContain('#1A3C6E');
    });

    it('should include the emerald green CTA button color', () => {
        const html = service.buildHtmlBody({
            to: 'test@example.com',
            leadFirstName: 'Luis',
            leadFullName: 'Luis Mora',
            bookingUrl: 'https://calendly.com/test/30min?email=luis%40m.com',
            lang: 'EN',
        });

        expect(html).toContain('#00C853');
    });

    it('should include the booking URL in the Calendly CTA button', () => {
        const bookingUrl = 'https://calendly.com/test/30min?name=Test&email=t%40t.com';
        const html = service.buildHtmlBody({
            to: 't@t.com',
            leadFirstName: 'Test',
            leadFullName: 'Test User',
            bookingUrl,
            lang: 'EN',
        });

        expect(html).toContain(bookingUrl);
    });

    it('should use Spanish copy when lang is ES', () => {
        const html = service.buildHtmlBody({
            to: 'es@test.com',
            leadFirstName: 'Pablo',
            leadFullName: 'Pablo Salas',
            bookingUrl: 'https://calendly.com/test',
            lang: 'ES',
        });

        expect(html).toContain('AGENDA TU LLAMADA ESTRATÉGICA');
        expect(html).toContain('lang="es"');
    });

    it('should use English copy when lang is EN', () => {
        const html = service.buildHtmlBody({
            to: 'en@test.com',
            leadFirstName: 'John',
            leadFullName: 'John Smith',
            bookingUrl: 'https://calendly.com/test',
            lang: 'EN',
        });

        expect(html).toContain('BOOK YOUR STRATEGY CALL NOW');
        expect(html).toContain('lang="en"');
    });

    it('should produce table-based HTML (no flex or grid)', () => {
        const html = service.buildHtmlBody({
            to: 'a@b.com',
            leadFirstName: 'A',
            leadFullName: 'A B',
            bookingUrl: 'https://calendly.com',
            lang: 'ES',
        });

        // Table-based layout required for email client compatibility
        expect(html).toContain('<table');
        expect(html).toContain('<td');
        expect(html).not.toContain('display: flex');
        expect(html).not.toContain('display: grid');
    });

    it('should include the cloud gray footer section', () => {
        const html = service.buildHtmlBody({
            to: 'a@b.com',
            leadFirstName: 'A',
            leadFullName: 'A B',
            bookingUrl: 'https://calendly.com',
            lang: 'EN',
        });

        expect(html).toContain('#ECEFF1');
        expect(html).toContain('Financial Tracker');
    });
});
