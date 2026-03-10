import { TestBed } from '@angular/core/testing';
import { WealthGapService } from './wealth-gap.service';

describe('WealthGapService', () => {
  let service: WealthGapService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [WealthGapService] });
    service = TestBed.inject(WealthGapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('default inputs', () => {
    it('should have default initial capital of 1000', () => {
      expect(service.inputs().initialCapital).toBe(1000);
    });

    it('should have default monthly contribution of 0', () => {
      expect(service.inputs().monthlyContribution).toBe(0);
    });

    it('should have default annual return rate of 15', () => {
      expect(service.inputs().annualReturnRate).toBe(15);
    });

    it('should have default annual inflation rate of 6', () => {
      expect(service.inputs().annualInflationRate).toBe(6);
    });

    it('should have default years of 20', () => {
      expect(service.inputs().years).toBe(20);
    });
  });

  describe('projections (computed)', () => {
    it('should compute projections array with length = years + 1', () => {
      expect(service.projections().length).toBe(service.inputs().years + 1);
    });

    it('should start with year 0 having nominalBalance equal to initialCapital', () => {
      const first = service.projections()[0];
      expect(first.year).toBe(0);
      expect(first.nominalBalance).toBe(service.inputs().initialCapital);
    });

    it('should have positive nominalBalance growth over time', () => {
      const projections = service.projections();
      const last = projections[projections.length - 1];
      expect(last.nominalBalance).toBeGreaterThan(service.inputs().initialCapital);
    });

    it('should have realValue less than nominalBalance after year 1 (inflation erosion)', () => {
      const year1 = service.projections()[1];
      expect(year1.realValue).toBeLessThan(year1.nominalBalance);
    });

    it('should have a positive gap for year > 0', () => {
      const year5 = service.projections()[5];
      expect(year5.gap).toBeGreaterThan(0);
    });
  });

  describe('totalErosion (computed)', () => {
    it('should return the gap value of the last projection entry', () => {
      const projections = service.projections();
      const lastGap = projections[projections.length - 1].gap;
      expect(service.totalErosion()).toBe(lastGap);
    });
  });

  describe('isHighInflation (computed)', () => {
    it('should return false when inflation is <= 8', () => {
      service.updateInput('annualInflationRate', 6);
      expect(service.isHighInflation()).toBe(false);
    });

    it('should return true when inflation > 8', () => {
      service.updateInput('annualInflationRate', 9);
      expect(service.isHighInflation()).toBe(true);
    });
  });

  describe('chartLabels (computed)', () => {
    it('should return labels from Year 0 to Year N', () => {
      const labels = service.chartLabels();
      expect(labels[0]).toBe('Año 0');
      expect(labels[labels.length - 1]).toBe(`Año ${service.inputs().years}`);
    });
  });

  describe('nominalDataset / realDataset (computed)', () => {
    it('should have the same length as projections', () => {
      expect(service.nominalDataset().length).toBe(service.projections().length);
      expect(service.realDataset().length).toBe(service.projections().length);
    });
  });

  describe('updateInput', () => {
    it('should update initialCapital and recompute projections', () => {
      service.updateInput('initialCapital', 10000);
      expect(service.inputs().initialCapital).toBe(10000);
      expect(service.projections()[0].nominalBalance).toBe(10000);
    });

    it('should update years and recompute projections length', () => {
      service.updateInput('years', 10);
      expect(service.projections().length).toBe(11);
    });
  });
});
