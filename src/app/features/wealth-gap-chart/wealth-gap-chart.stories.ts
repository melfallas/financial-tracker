import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { WealthGapChart } from './wealth-gap-chart';
import { WealthGapService } from './wealth-gap.service';

const meta: Meta<WealthGapChart> = {
  title: 'Features/US3.1 Wealth Gap Chart',
  component: WealthGapChart,
  decorators: [
    moduleMetadata({
      imports: [WealthGapChart],
      providers: [WealthGapService],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Wealth Gap Chart (US3.1)
A dual-line Chart.js area chart that visualizes the divergence between **nominal wealth** (green)
and **real purchasing power** (dashed blue), with a **critical pulse** effect when inflation exceeds 8%.

### Features
- Reactive sliders using Angular Signals
- IntersectionObserver entry animation (1s left-to-right draw)
- Odometer-style count-up for total erosion (1.5s)
- Critical alert pulse when inflation > 8%
- Accessible sliders with ARIA attributes
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<WealthGapChart>;

export const Default: Story = {
  name: '📊 Default (6% Inflation)',
  parameters: {
    viewport: { defaultViewport: 'desktop' },
  },
};

export const HighInflation: Story = {
  name: '🔴 High Inflation (10%) — Critical Pulse',
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: WealthGapService,
          useFactory: () => {
            const svc = new WealthGapService();
            svc.updateInput('annualInflationRate', 10);
            return svc;
          },
        },
      ],
    }),
  ],
  parameters: {
    viewport: { defaultViewport: 'desktop' },
  },
};

export const MobileView: Story = {
  name: '📱 Mobile Viewport',
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};

export const ShortProjection: Story = {
  name: '⏱️ 5-Year Short Projection',
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: WealthGapService,
          useFactory: () => {
            const svc = new WealthGapService();
            svc.updateInput('years', 5);
            return svc;
          },
        },
      ],
    }),
  ],
};

export const HighReturn: Story = {
  name: '📈 High Return (15%)',
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: WealthGapService,
          useFactory: () => {
            const svc = new WealthGapService();
            svc.updateInput('annualReturnRate', 15);
            svc.updateInput('initialCapital', 20000);
            return svc;
          },
        },
      ],
    }),
  ],
};
