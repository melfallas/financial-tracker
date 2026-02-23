import { InjectionToken } from '@angular/core';
import { Lead } from '../../shared/types';
import { Observable } from 'rxjs';

export interface ILeadRepository {
    save(lead: Lead): Observable<void>;
    getAll(): Observable<Lead[]>;
    getById(id: string): Observable<Lead | null>;
    delete(id: string): Observable<void>;
}

export const I_LEAD_REPOSITORY = new InjectionToken<ILeadRepository>('ILeadRepository');
