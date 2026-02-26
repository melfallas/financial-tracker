import { Component, ChangeDetectionStrategy, inject, viewChild, isDevMode } from '@angular/core';
import { Navbar } from '../../navbar/navbar';
import { Hero } from '../../hero/hero';
import { WealthGapChart } from '../../wealth-gap-chart/wealth-gap-chart';
import { CostOfWaiting } from '../../cost-of-waiting/cost-of-waiting';
import { RetirementSimulator } from '../../retirement-simulator/retirement-simulator';
import { PdfReportService } from '../../../core/services/pdf-report.service';
import { WealthGapService } from '../../wealth-gap-chart/wealth-gap.service';
import { LanguageService } from '../../../core/services/language.service';
import { Lead } from '@shared/types';

@Component({
  selector: 'ft-home-page',
  imports: [Navbar, Hero, WealthGapChart, CostOfWaiting, RetirementSimulator],
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  private pdfService = inject(PdfReportService);
  private wealthGapService = inject(WealthGapService);
  private langService = inject(LanguageService);

  private wealthGapComp = viewChild(WealthGapChart);
  private retirementComp = viewChild(RetirementSimulator);

  constructor() {
    // QA Hook as per US2.2 Acceptance Criteria
    if (isDevMode()) {
      (window as any).ftDownloadReport = () => {
        const mockLead: Lead = {
          id: 'test-qa',
          firstName: 'QA',
          lastName: 'Tester',
          email: 'qa@example.com',
          createdAt: new Date().toISOString(),
          source: 'landing-page'
        };
        this.handlePlanRequested({ lead: mockLead });
        return 'Generating PDF... check downloads.';
      };
    }
  }

  async handlePlanRequested({ lead }: { lead: Lead }) {
    const wealthImage = this.wealthGapComp()?.getChartImage() || '';
    const retirementImage = this.retirementComp()?.getChartImage() || '';
    const lang = this.langService.currentLanguage();

    try {
      const pdfDataUri = await this.pdfService.generateReport(
        lead,
        this.wealthGapService.projections(),
        wealthImage,
        retirementImage,
        lang
      );

      // Trigger browser download
      const link = document.createElement('a');
      link.href = pdfDataUri;
      link.download = `Plan_Financiero_${lead.firstName}_${lead.lastName}.pdf`;
      link.click();
    } catch (err) {
      console.error('Error generating PDF:', err);
    }
  }
}
