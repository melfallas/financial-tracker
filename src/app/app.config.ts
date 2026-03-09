import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

// AC3.2: Global Chart.js registration — all required scales and elements
// Must run before any chart component renders (module-level side-effect)
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend,
  Title
);

import { I_LEAD_REPOSITORY } from './core/interfaces/i-lead-repository';
import { I_INTERACTION_REPOSITORY } from './core/interfaces/i-interaction-repository';
import { IEmailProvider } from './core/interfaces/i-email-provider';
import { LocalLeadRepository } from './infrastructure/local-lead-repository';
import { LocalInteractionRepository } from './infrastructure/local-interaction-repository';
import { SupabaseEmailAdapter } from './core/services/email/supabase-email.adapter';
import { SimulatorConfigService } from './core/services/simulator-config.service';

function initializeSimulatorConfig(configService: SimulatorConfigService) {
  return () => configService.loadConfig();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeSimulatorConfig,
      deps: [SimulatorConfigService],
      multi: true
    },
    { provide: I_LEAD_REPOSITORY, useClass: LocalLeadRepository },
    { provide: I_INTERACTION_REPOSITORY, useClass: LocalInteractionRepository },
    // Selection of email provider adapter
    { provide: IEmailProvider, useClass: SupabaseEmailAdapter },
  ]
};
