import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WealthGapChart } from './wealth-gap-chart';
import { WealthGapService } from './wealth-gap.service';

describe('WealthGapChart', () => {
  let component: WealthGapChart;
  let fixture: ComponentFixture<WealthGapChart>;
  let service: WealthGapService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WealthGapChart],
    }).compileComponents();

    fixture = TestBed.createComponent(WealthGapChart);
    component = fixture.componentInstance;
    service = TestBed.inject(WealthGapService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the section with id "wealth-gap-section"', () => {
    const section = fixture.nativeElement.querySelector('section#wealth-gap-section');
    expect(section).toBeTruthy();
  });

  it('should render the chart canvas', () => {
    const canvas = fixture.nativeElement.querySelector('canvas');
    expect(canvas).toBeTruthy();
  });

  it('should render 5 range inputs (sliders)', () => {
    const sliders = fixture.nativeElement.querySelectorAll('input[type="range"]');
    expect(sliders.length).toBe(5);
  });

  it('should render the total erosion summary card', () => {
    const card = fixture.nativeElement.querySelector('[data-testid="erosion-summary"]');
    expect(card).toBeTruthy();
  });

  it('should apply pulse CSS class when inflation > 8%', () => {
    service.updateInput('annualInflationRate', 9);
    fixture.detectChanges();
    const gapArea = fixture.nativeElement.querySelector('[data-testid="gap-area"]');
    expect(gapArea?.classList.contains('pulse')).toBe(true);
  });

  it('should NOT apply pulse CSS class when inflation <= 8%', () => {
    service.updateInput('annualInflationRate', 6);
    fixture.detectChanges();
    const gapArea = fixture.nativeElement.querySelector('[data-testid="gap-area"]');
    expect(gapArea?.classList.contains('pulse')).toBe(false);
  });

  it('should display formatted total erosion value with $ sign', () => {
    const card = fixture.nativeElement.querySelector('[data-testid="erosion-summary"]');
    expect(card?.textContent).toContain('$');
  });

  describe('updateSlider', () => {
    it('should call service.updateInput when a slider changes', () => {
      const spy = spyOn(service, 'updateInput');
      component.updateSlider('initialCapital', 8000);
      expect(spy).toHaveBeenCalledWith('initialCapital', 8000);
    });
  });

  describe('sliders config', () => {
    it('should have 5 slider configurations', () => {
      expect(component.sliders.length).toBe(5);
    });

    it('should include key "initialCapital" in sliders', () => {
      const keys = component.sliders.map((s: { key: string }) => s.key);
      expect(keys).toContain('initialCapital');
    });
  });
});
