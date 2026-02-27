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
        const problemY = 50;
        doc.setFillColor('#FEE2E2'); // Very soft red background
        doc.rect(20, problemY, pageWidth - 40, 8, 'F');

        doc.setTextColor(softRed);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text(this.getLocalizedString(lang, 'problemSection'), 25, problemY + 6);

        // Wealth Gap Chart
        if (wealthChartBase64) {
            doc.addImage(wealthChartBase64, 'PNG', 20, problemY + 12, pageWidth - 40, 55);
        }

        // 3. Section 2 (Hope)
        const hopeOffset = 130;
        doc.setFillColor('#DCFCE7'); // Very soft emerald background
        doc.rect(20, hopeOffset, pageWidth - 40, 8, 'F');

        doc.setTextColor(emerald);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text(this.getLocalizedString(lang, 'hopeSection'), 25, hopeOffset + 6);

        // Retirement Chart
        if (retirementChartBase64) {
            doc.addImage(retirementChartBase64, 'PNG', 20, hopeOffset + 12, pageWidth - 40, 55);
        }

        // Summary Table - Ensure we show ~5 rows including the first and LAST one
        const totalPoints = projections.length;
        const step = Math.max(1, Math.floor((totalPoints - 1) / 4));
        const pickedIndices = new Set<number>();
        for (let i = 0; i < totalPoints; i += step) pickedIndices.add(i);
        pickedIndices.add(totalPoints - 1); // Always include the last one

        const tableData = Array.from(pickedIndices)
            .sort((a, b) => a - b)
            .map(idx => {
                const p = projections[idx];
                return [
                    p.year.toString(),
                    this.formatCurrency(p.nominalBalance),
                    this.formatCurrency(p.realValue),
                    this.formatCurrency(p.gap)
                ];
            });

        autoTable(doc, {
            startY: hopeOffset + 72,
            head: [[
                lang === 'ES' ? 'Año' : 'Year',
                lang === 'ES' ? 'Balance Nominal' : 'Nominal Balance',
                lang === 'ES' ? 'Poder Real' : 'Real Value',
                lang === 'ES' ? 'Inflación (Brecha)' : 'Inflation (Gap)'
            ]],
            body: tableData,
            theme: 'striped',
            headStyles: { fillColor: deepBlue, fontStyle: 'bold' },
            margin: { left: 20, right: 20 },
            styles: { fontSize: 8, cellPadding: 3 }
        });

        // 4. Page 2 (Conversion Anchor)
        doc.addPage();

        doc.setFillColor(deepBlue);
        doc.rect(0, 0, pageWidth, pageHeight, 'F');

        // Center Logo or Icon Placeholder (White circle)
        doc.setFillColor('#FFFFFF');
        doc.circle(pageWidth / 2, 40, 15, 'F');
        doc.setTextColor(deepBlue);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('FT', pageWidth / 2, 42, { align: 'center' });

        doc.setTextColor('#FFFFFF');
        doc.setFontSize(24);
        doc.text(lang === 'ES' ? 'Toma el Siguiente Paso' : 'Take the Next Step', pageWidth / 2, 75, { align: 'center' });

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        const instructionText = lang === 'ES'
            ? ['Escanea este código o haz clic en el enlace de tu correo', 'para agendar tu consultoría estratégica gratuita.']
            : ['Scan this code or click the link included in your email', 'to book your free strategic consultation.'];

        doc.text(instructionText[0], pageWidth / 2, 85, { align: 'center' });
        doc.text(instructionText[1], pageWidth / 2, 92, { align: 'center' });

        const url = this.getBookingUrl(lead.email);
        const qrBase64 = await QRCode.toDataURL(url, {
            margin: 1,
            scale: 10,
            color: {
                dark: deepBlue,
                light: '#FFFFFF'
            }
        });

        // White background for QR for better scanning
        doc.setFillColor('#FFFFFF');
        doc.rect((pageWidth / 2) - 35, 110, 70, 70, 'F');
        doc.addImage(qrBase64, 'PNG', (pageWidth / 2) - 30, 115, 60, 60);

        // Footer link
        doc.setFontSize(10);
        doc.setTextColor('#CBD5E1');
        doc.text(url, pageWidth / 2, 195, { align: 'center' });

        // Return Data URI
        return doc.output('datauristring');
    }
}
