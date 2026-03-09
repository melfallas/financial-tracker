import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  activeSection = signal<string>('hero');
  isMenuOpen = signal<boolean>(false);

  scrollToSection(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  scrollToNavbarSection(elementId: string): void {
    this.scrollToSection(elementId);
    this.isMenuOpen.set(false);
    this.activeSection.set(elementId);
  }
}
