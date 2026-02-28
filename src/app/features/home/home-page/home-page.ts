import { Component, ChangeDetectionStrategy, inject, viewChild, isDevMode, signal } from '@angular/core';
import { Navbar } from '../../navbar/navbar';
import { Hero } from '../../hero/hero';
import { WealthGapChart } from '../../wealth-gap-chart/wealth-gap-chart';
import { CostOfWaiting } from '../../cost-of-waiting/cost-of-waiting';
import { RetirementSimulator } from '../../retirement-simulator/retirement-simulator';
import { PdfReportService } from '../../../core/services/pdf-report.service';
import { EmailService } from '../../../core/services/email.service';
import { IEmailProvider } from '../../../core/interfaces/i-email-provider';
import { WealthGapService } from '../../wealth-gap-chart/wealth-gap.service';
import { LanguageService } from '../../../core/services/language.service';
import { Lead } from '@shared/types';

/** Tracks the async email dispatch state to drive UI feedback */
export type EmailDispatchStatus = 'idle' | 'sending' | 'sent' | 'failed';

@Component({
  selector: 'ft-home-page',
  imports: [Navbar, Hero, WealthGapChart, CostOfWaiting, RetirementSimulator],
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  private pdfService = inject(PdfReportService);
  private emailService = inject(EmailService);
  private emailProvider = inject(IEmailProvider);
  private wealthGapService = inject(WealthGapService);
  private langService = inject(LanguageService);

  private wealthGapComp = viewChild(WealthGapChart);
  private retirementComp = viewChild(RetirementSimulator);

  /** Drives the email dispatch feedback UI */
  readonly emailStatus = signal<EmailDispatchStatus>('idle');

  constructor() {
    // QA Hook as per US2.2 Acceptance Criteria
    if (isDevMode()) {
      (window as unknown as Record<string, unknown>)['ftDownloadReport'] = () => {
        const mockLead: Lead = {
          id: 'test-qa',
          firstName: 'QA',
          lastName: 'Tester',
          email: 'qa@example.com',
          createdAt: new Date().toISOString(),
          source: 'landing-page'
        };
        this.handlePlanRequested({ lead: mockLead });
        return 'Generating PDF and dispatching email... check downloads and console.';
      };
    }
  }

  async handlePlanRequested({ lead }: { lead: Lead }): Promise<void> {
    let wealthImage = this.wealthGapComp()?.getChartImage() ?? '';
    let retirementImage = this.retirementComp()?.getChartImage() ?? '';
    const lang = this.langService.currentLanguage();

    console.log('wealthImage: ', wealthImage);
    console.log('retirementImage: ', retirementImage);
    console.log('lang: ', lang);

    if (!wealthImage) {
      wealthImage = this.generateMockChartImage('#4e73df', 'Wealth Gap Chart Placeholder');
    }

    if (!retirementImage) {
      retirementImage = this.generateMockChartImage('#17a2b8', 'Retirement Chart Placeholder');
    }

    console.log('wealthImage: ', wealthImage);
    console.log('retirementImage: ', retirementImage);
    console.log('lang: ', lang);

    try {
      const pdfDataUri = await this.pdfService.generateReport(
        lead,
        this.wealthGapService.projections(),
        wealthImage,
        retirementImage,
        lang
      );

      // 1. Trigger immediate browser download (does not block)
      const filename = `Plan_Financiero_${lead.firstName}_${lead.lastName}.pdf`;
      const link = document.createElement('a');
      link.href = pdfDataUri;
      link.download = filename;
      link.click();

      // 2. Dispatch email asynchronously — fire-and-forget; success UI is not blocked
      this.dispatchEmail(lead, pdfDataUri, filename, lang).catch((err) => {
        console.error('[HomePage] Email dispatch failed:', err);
      });

    } catch (err) {
      console.error('[HomePage] Error generating PDF:', err);
    }
  }

  private generateMockChartImage(color: string, label: string): string {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Fondo
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Texto genérico para identificar la gráfica en el PDF
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '20px Arial';
      ctx.fillText(label, 50, 100);

      return canvas.toDataURL('image/png');
    }
    return '';
  }

  /**
   * Sends the lead confirmation email with the PDF as an attachment.
   * This is async fire-and-forget: the success screen is shown before
   * waiting for the email confirmation to arrive.
   *
   * Per US2.3 AC: if dispatch fails, set emailStatus to 'failed'
   * so the template can show a \"Download Locally\" fallback.
   */
  private async dispatchEmail(
    lead: Lead,
    pdfDataUri: string,
    filename: string,
    lang: 'ES' | 'EN'
  ): Promise<void> {
    this.emailStatus.set('sending');

    const leadFullName = `${lead.firstName} ${lead.lastName}`;
    const bookingUrl = this.emailService.buildCalendlyUrl(leadFullName, lead.email);

    const htmlBody = this.emailService.buildHtmlBody({
      to: lead.email,
      leadFirstName: lead.firstName,
      leadFullName,
      bookingUrl,
      lang,
    });

    // Set a 5-second fallback timeout per US2.3 Non-Functional Requirements
    const timeoutId = setTimeout(() => {
      if (this.emailStatus() === 'sending') {
        this.emailStatus.set('failed');
      }
    }, 5000);

    try {
      const result = await this.emailProvider.send({
        to: lead.email,
        leadFirstName: lead.firstName,
        leadFullName,
        pdfBase64: pdfDataUri,
        pdfFilename: filename,
        bookingUrl,
        lang,
        htmlBody,
      });

      clearTimeout(timeoutId);
      this.emailStatus.set(result.success ? 'sent' : 'failed');

      if (!result.success) {
        console.warn('[HomePage] Email delivery failed:', result.errorMessage);
      }

    } catch (err) {
      clearTimeout(timeoutId);
      this.emailStatus.set('failed');
      console.error('[HomePage] Unexpected error dispatching email:', err);
    }
  }
}
