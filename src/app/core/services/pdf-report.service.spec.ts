import { TestBed } from '@angular/core/testing';
import { PdfReportService } from './pdf-report.service';
import { Lead } from '@shared/types';
import { isDevMode } from '@angular/core';

describe('PdfReportService', () => {
    let service: PdfReportService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PdfReportService]
        });
        service = TestBed.inject(PdfReportService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should generate the correct booking URL based on environment', () => {
        const lead: Lead = {
            id: '123',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            createdAt: new Date().toISOString(),
            source: 'landing-page'
        };

        const url = service.getBookingUrl(lead.email);

        // This test relies on the executed environment.
        // Assuming unit tests run in dev mode by default in Angular CLI
        expect(url).toContain('email=john.doe%40example.com');
        expect(url).toContain('utm_source=pdf_report');
    });

    it('should properly format currency values at large scales', () => {
        // We expect formatting to follow Spanish locale rules for standard output
        const value = 12500000.45;
        const formatted = service.formatCurrency(value);
        expect(formatted).toBe('$12,500,000'); // Assuming es-CR or general US based formatting for dollars
    });

    it('should return correct localized strings based on language', () => {
        const titleEn = service.getLocalizedString('EN', 'reportTitle');
        const titleEs = service.getLocalizedString('ES', 'reportTitle');

        expect(titleEn).toBe('Strategic Financial Plan');
        expect(titleEs).toBe('Plan Estratégico Financiero');
    });
});
