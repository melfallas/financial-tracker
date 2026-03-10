import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WealthGapChart } from './wealth-gap-chart';
import { WealthGapService } from './wealth-gap.service';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
// import { createCanvas } from 'canvas'

describe('WealthGapChart diagnostic', () => {
  let component: WealthGapChart;
  let fixture: ComponentFixture<WealthGapChart>;

  beforeEach(async () => {
    // Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    //   value: function (contextType: string) {
    //     return createCanvas(200, 200).getContext(contextType as any);
    //   },
    // });

    Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
      value: () => {
        return {
          fillRect: () => { },
          clearRect: () => { },
          getImageData: () => ({ data: [] }),
          putImageData: () => { },
          createImageData: () => [],
          setTransform: () => { },
          drawImage: () => {},
          save: () => {},
          restore: () => {},
          beginPath: () => {},
          moveTo: () => {},
          lineTo: () => {},
          closePath: () => {},
          stroke: () => {},
          fill: () => {},
          measureText: () => ({ width: 0 }),
        };
      },
    });

    class MockIntersectionObserver {
      constructor(private callback: any) { }
      observe() { }
      unobserve() { }
      disconnect() { }
    }
    (globalThis as any).IntersectionObserver = MockIntersectionObserver;

    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: MockIntersectionObserver,
    });

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
