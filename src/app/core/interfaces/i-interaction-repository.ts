import { InjectionToken } from '@angular/core';
import { InteractionLog } from '../../shared/types';
import { Observable } from 'rxjs';

export interface IInteractionRepository {
    log(interaction: InteractionLog): Observable<void>;
    getAll(): Observable<InteractionLog[]>;
    getByWidgetId(widgetId: string): Observable<InteractionLog[]>;
    clearLogs(): Observable<void>;
}

export const I_INTERACTION_REPOSITORY = new InjectionToken<IInteractionRepository>('IInteractionRepository');
