import { Injectable, signal } from '@angular/core';

export type Language = 'EN' | 'ES';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    readonly currentLanguage = signal<Language>('ES');

    setLanguage(lang: Language) {
        this.currentLanguage.set(lang);
    }
}
