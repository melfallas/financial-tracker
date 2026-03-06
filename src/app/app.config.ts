import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { I_LEAD_REPOSITORY } from './core/interfaces/i-lead-repository';
import { I_INTERACTION_REPOSITORY } from './core/interfaces/i-interaction-repository';
import { IEmailProvider } from './core/interfaces/i-email-provider';
import { LocalLeadRepository } from './infrastructure/local-lead-repository';
import { LocalInteractionRepository } from './infrastructure/local-interaction-repository';
import { SupabaseEmailAdapter } from './core/services/email/supabase-email.adapter';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: I_LEAD_REPOSITORY, useClass: LocalLeadRepository },
    { provide: I_INTERACTION_REPOSITORY, useClass: LocalInteractionRepository },
    // Selection of email provider adapter
    { provide: IEmailProvider, useClass: SupabaseEmailAdapter },
  ]
};
