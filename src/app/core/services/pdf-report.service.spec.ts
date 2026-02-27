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

    it('should properly format currency values at large scales ensuring rounding', () => {
        expect(service.formatCurrency(12500000.45)).toBe('$12,500,000');
        expect(service.formatCurrency(12500000.55)).toBe('$12,500,001');
        expect(service.formatCurrency(0)).toBe('$0');
    });

    it('should have parity between ES and EN localized keys', () => {
        const esKeys = Object.keys((service as any).LABELS.ES);
        const enKeys = Object.keys((service as any).LABELS.EN);

        expect(esKeys.sort()).toEqual(enKeys.sort());
        expect(esKeys.length).toBeGreaterThan(5);
    });

    it('should return the key itself if localization is missing', () => {
        const missing = service.getLocalizedString('ES', 'nonExistentKey');
        expect(missing).toBe('nonExistentKey');
    });

    it('should generate a valid data URI starting with data:application/pdf', async () => {
        // Mock data
        const lead: Lead = {
            id: '1',
            firstName: 'A',
            lastName: 'B',
            email: 'a@b.com',
            createdAt: new Date().toISOString(),
            source: 'landing-page'
        };
        const projections = [{ year: 2025, nominalBalance: 100, realValue: 90, gap: 10 }];

        // We don't need real base64 for the test to run, just strings
        const result = await service.generateReport(lead, projections, 'data:image/png;base64,xxx', 'data:image/png;base64,yyy', 'ES');

        expect(result).toContain('data:application/pdf;');
    });
});
