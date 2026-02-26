import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WealthGapChart } from './wealth-gap-chart';
import { WealthGapService } from './wealth-gap.service';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

describe('WealthGapChart diagnostic', () => {
  let component: WealthGapChart;
  let fixture: ComponentFixture<WealthGapChart>;

  beforeEach(async () => {
    class MockIntersectionObserver {
      constructor(private callback: any) { }
      observe() { }
      unobserve() { }
      disconnect() { }
    }
    (globalThis as any).IntersectionObserver = MockIntersectionObserver;

    await TestBed.configureTestingModule({
      imports: [WealthGapChart],
      providers: [
        WealthGapService,
        provideCharts(withDefaultRegisterables())
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WealthGapChart);
    component = fixture.componentInstance;
  });

  it('should not crash on first detectChanges', () => {
    try {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    } catch (e) {
      console.error('DETECT CHANGES FAILED:', e);
      throw e;
    }
  });
});
