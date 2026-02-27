import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { I_LEAD_REPOSITORY } from './core/interfaces/i-lead-repository';
import { I_INTERACTION_REPOSITORY } from './core/interfaces/i-interaction-repository';
import { IEmailProvider } from './core/interfaces/i-email-provider';
import { LocalLeadRepository } from './infrastructure/local-lead-repository';
import { LocalInteractionRepository } from './infrastructure/local-interaction-repository';
import { ResendEmailAdapter } from './core/services/email/resend-email.adapter';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: I_LEAD_REPOSITORY, useClass: LocalLeadRepository },
    { provide: I_INTERACTION_REPOSITORY, useClass: LocalInteractionRepository },
    // Email provider — swap ResendEmailAdapter for another adapter to change provider
    { provide: IEmailProvider, useClass: ResendEmailAdapter },
  ]
};
