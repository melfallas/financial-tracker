import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
import { applicationConfig } from '@storybook/angular';
import { provideZonelessChangeDetection } from '@angular/core';

// Global Styles (Tailwind + PrimeNG) - already handled by angular.json
// import '../src/styles.scss';

setCompodocJson(docJson);

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [provideZonelessChangeDetection()],
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile (375px)',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet (768px)',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop (1280px)',
          styles: {
            width: '1280px',
            height: '800px',
          },
        },
      },
    },
  },
};

export default preview;