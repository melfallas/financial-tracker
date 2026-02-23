import { Injectable } from '@angular/core';
import { Observable, from, Subject } from 'rxjs';
import { IInteractionRepository } from '../core/interfaces/i-interaction-repository';
import { InteractionLog } from '../shared/types';

@Injectable({
    providedIn: 'root'
})
export class LocalInteractionRepository implements IInteractionRepository {
    private readonly DB_NAME = 'ft_database';
    private readonly STORE_NAME = 'interactions';
    private readonly DB_VERSION = 1;

    private dbPromise: Promise<IDBDatabase>;

    constructor() {
        this.dbPromise = this.initDb();
    }

    private initDb(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            // Check if globalThis.indexedDB is available (for SSR or test env)
            if (typeof indexedDB === 'undefined') {
                reject(new Error('IndexedDB is not available'));
                return;
            }

            const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

            request.onupgradeneeded = (event: any) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.STORE_NAME)) {
                    const store = db.createObjectStore(this.STORE_NAME, { keyPath: 'id' });
                    store.createIndex('widget_id', 'widget_id', { unique: false });
                }
            };

            request.onsuccess = (event: any) => resolve(event.target.result);
            request.onerror = (event: any) => reject(event.target.error);
        });
    }

    log(interaction: InteractionLog): Observable<void> {
        const result$ = new Subject<void>();

        this.dbPromise.then(db => {
            const transaction = db.transaction([this.STORE_NAME], 'readwrite');
            const store = transaction.objectStore(this.STORE_NAME);
            const request = store.put(interaction);

            request.onsuccess = () => {
                result$.next();
                result$.complete();
            };
            request.onerror = () => result$.error(request.error);
        }).catch(err => result$.error(err));

        return result$.asObservable();
    }

    getAll(): Observable<InteractionLog[]> {
        const result$ = new Subject<InteractionLog[]>();

        this.dbPromise.then(db => {
            const transaction = db.transaction([this.STORE_NAME], 'readonly');
            const store = transaction.objectStore(this.STORE_NAME);
            const request = store.getAll();

            request.onsuccess = () => {
                result$.next(request.result);
                result$.complete();
            };
            request.onerror = () => result$.error(request.error);
        }).catch(err => result$.error(err));

        return result$.asObservable();
    }

    getByWidgetId(widgetId: string): Observable<InteractionLog[]> {
        const result$ = new Subject<InteractionLog[]>();

        this.dbPromise.then(db => {
            const transaction = db.transaction([this.STORE_NAME], 'readonly');
            const store = transaction.objectStore(this.STORE_NAME);
            const index = store.index('widget_id');
            const request = index.getAll(widgetId);

            request.onsuccess = () => {
                result$.next(request.result);
                result$.complete();
            };
            request.onerror = () => result$.error(request.error);
        }).catch(err => result$.error(err));

        return result$.asObservable();
    }

    clearLogs(): Observable<void> {
        const result$ = new Subject<void>();

        this.dbPromise.then(db => {
            const transaction = db.transaction([this.STORE_NAME], 'readwrite');
            const store = transaction.objectStore(this.STORE_NAME);
            const request = store.clear();

            request.onsuccess = () => {
                result$.next();
                result$.complete();
            };
            request.onerror = () => result$.error(request.error);
        }).catch(err => result$.error(err));

        return result$.asObservable();
    }
}
