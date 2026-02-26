import { Injectable, isDevMode } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PdfReportService {

    // Localization Dictionary (Placeholder for US6.2 expansion)
    private readonly LABELS: Record<'ES' | 'EN', Record<string, string>> = {
        ES: {
            reportTitle: 'Plan Estratégico Financiero',
            problemSection: 'La Amenaza Silenciosa',
            hopeSection: 'Tu Mapa hacia la Libertad',
            preparedFor: 'Preparado para:',
            date: 'Fecha:',
            wealthGapTitle: 'Brecha de Riqueza Real',
            retirementTitle: 'Proyección de Jubilación',
        },
        EN: {
            reportTitle: 'Strategic Financial Plan',
            problemSection: 'The Silent Threat',
            hopeSection: 'Your Freedom Blueprint',
            preparedFor: 'Prepared for:',
            date: 'Date:',
            wealthGapTitle: 'Real Wealth Gap',
            retirementTitle: 'Retirement Projection',
        }
    };

    getBookingUrl(email: string): string {
        const baseUrl = isDevMode()
            ? 'http://localhost:4200/'
            : 'https://melfallas.github.io/financial-tracker/';

        return `${baseUrl}?email=${encodeURIComponent(email)}&utm_source=pdf_report`;
    }

    formatCurrency(value: number): string {
        return `$${Number(Math.round(value)).toLocaleString('en-US')}`;
    }

    getLocalizedString(lang: 'ES' | 'EN', key: string): string {
        return this.LABELS[lang][key] || key;
    }

    async generateReport(
        lead: import('@shared/types').Lead,
        projections: import('@shared/types').ProjectionEntry[],
        wealthChartBase64: string,
        retirementChartBase64: string,
        lang: 'EN' | 'ES' = 'ES'
    ): Promise<string> {
        // Dynamically import heavy PDF libraries to keep the main bundle small
        const { default: jsPDF } = await import('jspdf');
        const { default: autoTable } = await import('jspdf-autotable');
        const QRCode = await import('qrcode'); // Using raw qrcode to bypass angular DOM component need

        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        // Colors
        const deepBlue = '#1A3C6E';
        const emerald = '#00C853';
        const softRed = '#D32F2F';

        // 1. Header (Top 15%)
        doc.setFillColor(deepBlue);
        doc.rect(0, 0, pageWidth, 40, 'F');

        doc.setTextColor('#FFFFFF');
        doc.setFontSize(22);
        doc.text(this.getLocalizedString(lang, 'reportTitle'), 20, 25);

        // Subheader with Date
        doc.setFontSize(10);
        const currentDate = new Date().toLocaleDateString(lang === 'ES' ? 'es-ES' : 'en-US');
        doc.text(`${this.getLocalizedString(lang, 'preparedFor')} ${lead.firstName} ${lead.lastName} | ${this.getLocalizedString(lang, 'date')} ${currentDate}`, 20, 32);

        // 2. Section 1 (Problem)
        doc.setTextColor(softRed);
        doc.setFontSize(14);
        doc.text(this.getLocalizedString(lang, 'problemSection'), 20, 55);

        // Wealth Gap Chart
        if (wealthChartBase64) {
            doc.addImage(wealthChartBase64, 'PNG', 20, 60, pageWidth - 40, 60);
        }

        // 3. Section 2 (Hope)
        const hopeOffset = 135;
        doc.setTextColor(emerald);
        doc.setFontSize(14);
        doc.text(this.getLocalizedString(lang, 'hopeSection'), 20, hopeOffset);

        // Retirement Chart
        if (retirementChartBase64) {
            doc.addImage(retirementChartBase64, 'PNG', 20, hopeOffset + 5, pageWidth - 40, 60);
        }

        // Summary Table
        const tableData = projections.filter((_, i) => i % Math.max(1, Math.floor(projections.length / 5)) === 0).map(p => [
            p.year.toString(),
            this.formatCurrency(p.nominalBalance),
            this.formatCurrency(p.realValue),
            this.formatCurrency(p.gap)
        ]);

        autoTable(doc, {
            startY: hopeOffset + 75,
            head: [[lang === 'ES' ? 'Año' : 'Year', lang === 'ES' ? 'Balance Nominal' : 'Nominal Balance', lang === 'ES' ? 'Poder Real' : 'Real Value', lang === 'ES' ? 'Inflación (Brecha)' : 'Inflation (Gap)']],
            body: tableData,
            theme: 'striped',
            headStyles: { fillColor: deepBlue },
            margin: { left: 20, right: 20 },
            styles: { fontSize: 8 }
        });

        // 4. Page 2 (Conversion Anchor)
        doc.addPage();

        doc.setFillColor(deepBlue);
        doc.rect(0, 0, pageWidth, pageHeight, 'F');

        doc.setTextColor('#FFFFFF');
        doc.setFontSize(24);
        doc.text('Take the Next Step', pageWidth / 2, 60, { align: 'center' });

        doc.setFontSize(12);
        doc.text('Scan this code or click the link included in your email', pageWidth / 2, 70, { align: 'center' });
        doc.text('to book your free strategic consultation.', pageWidth / 2, 78, { align: 'center' });

        const url = this.getBookingUrl(lead.email);
        const qrBase64 = await QRCode.toDataURL(url, { margin: 2, scale: 8 });

        doc.addImage(qrBase64, 'PNG', (pageWidth / 2) - 40, 100, 80, 80);

        // We return the raw Blob URI or Base64 so it can be downloaded or emailed
        return doc.output('datauristring');
    }
}
