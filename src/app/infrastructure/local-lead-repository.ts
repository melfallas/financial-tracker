import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ILeadRepository } from '../core/interfaces/i-lead-repository';
import { Lead } from '../shared/types';

@Injectable({
    providedIn: 'root'
})
export class LocalLeadRepository implements ILeadRepository {
    private readonly STORAGE_KEY = 'ft_leads';

    save(lead: Lead): Observable<void> {
        const leads = this.getLeadsFromStorage();
        const index = leads.findIndex(l => l.id === lead.id);

        if (index > -1) {
            leads[index] = lead;
        } else {
            leads.push(lead);
        }

        this.saveToStorage(leads);
        return of(undefined);
    }

    getAll(): Observable<Lead[]> {
        return of(this.getLeadsFromStorage());
    }

    getById(id: string): Observable<Lead | null> {
        const leads = this.getLeadsFromStorage();
        const lead = leads.find(l => l.id === id) || null;
        return of(lead);
    }

    delete(id: string): Observable<void> {
        const leads = this.getLeadsFromStorage().filter(l => l.id !== id);
        this.saveToStorage(leads);
        return of(undefined);
    }

    private getLeadsFromStorage(): Lead[] {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    private saveToStorage(leads: Lead[]): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(leads));
    }
}
