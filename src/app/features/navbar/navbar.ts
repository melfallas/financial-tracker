import { Component, signal, ChangeDetectionStrategy, inject, OnInit, OnDestroy } from '@angular/core';
import { Button } from '../../shared/components/button/button';
import { LanguageService, Language } from '../../core/services/language.service';
import { ScrollService } from '../../core/services/scroll.service';
import { BOOKING_URL } from '../../core/constants/booking';

@Component({
  selector: 'ft-navbar',
  imports: [Button],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onScroll()',
  },
})
export class Navbar implements OnInit, OnDestroy {
  langService = inject(LanguageService);
  scrollService = inject(ScrollService);
  readonly bookingUrl = BOOKING_URL;

  lastScrollTop = signal<number>(0);
  isNavbarVisible = signal<boolean>(true);
  isNavbarSticky = signal<boolean>(false);
  
  get isMenuOpen() { return this.scrollService.isMenuOpen; }
  get activeSection() { return this.scrollService.activeSection; }

  private observer: IntersectionObserver | null = null;

  navItems = [
    { label: 'Diagnóstico', id: 'hero' },
    { label: 'Brecha', id: 'wealth-gap' },
    { label: 'Impacto', id: 'cost-of-waiting' },
    { label: 'Retiro', id: 'retirement-simulator' },
    { label: 'Asesoría', id: 'review-call' }
  ];

  ngOnInit() {
    // Small timeout to ensure DOM elements are rendered
    setTimeout(() => {
      this.setupIntersectionObserver();
    }, 500);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Center-focused trigger
      threshold: 0
    };

    if (typeof IntersectionObserver !== 'undefined') {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.scrollService.activeSection.set(entry.target.id);
          }
        });
      }, options);
    }

    this.navItems.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) {
        this.observer?.observe(element);
      }
    });
  }

  onLanguageChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.langService.setLanguage(select.value as Language);
  }

  onScroll() {
    const currentScroll = window.scrollY;

    // Close mobile menu on scroll
    if (this.scrollService.isMenuOpen()) {
      this.scrollService.isMenuOpen.set(false);
    }

    if (currentScroll > 50) {
      this.isNavbarSticky.set(true);
      if (Math.abs(currentScroll - this.lastScrollTop()) > 5) {
        this.isNavbarVisible.set(currentScroll < this.lastScrollTop());
      }
    } else {
      this.isNavbarSticky.set(false);
      this.isNavbarVisible.set(true);
    }

    this.lastScrollTop.set(currentScroll);
  }

  toggleMenu() {
    this.scrollService.isMenuOpen.update(v => !v);
  }

  scrollTo(id: string) {
    this.scrollService.scrollToNavbarSection(id);
  }

  openBooking() {
    window.open(this.bookingUrl, '_blank', 'noopener,noreferrer');
    this.scrollService.isMenuOpen.set(false);
  }
}
