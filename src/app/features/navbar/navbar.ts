import { Component, signal, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../../shared/components/button/button';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, Button],
    template: `
    <nav
      [class.navbar-sticky]="isNavbarSticky()"
      [class.navbar-hidden]="!isNavbarVisible()"
      class="fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4 flex items-center justify-between"
    >
      <div class="flex items-center gap-2">
        <div class="w-10 h-10 bg-deep-blue rounded-lg flex items-center justify-center text-emerald-green text-2xl font-bold">
          FT
        </div>
        <span class="text-xl font-extrabold text-deep-blue hidden sm:block">Financial<span class="text-emerald-green">Tracker</span></span>
      </div>

      <div class="flex items-center gap-4">
        <div class="hidden md:flex items-center gap-2">
          <select class="bg-transparent text-charcoal font-medium focus:outline-none cursor-pointer">
            <option>ES</option>
            <option>EN</option>
          </select>
          <select class="bg-transparent text-charcoal font-medium focus:outline-none cursor-pointer">
            <option>CRC</option>
            <option>USD</option>
          </select>
        </div>
        
        <app-button 
          label="Agendar" 
          variant="ghost" 
          class="scale-90"
        ></app-button>
      </div>
    </nav>
  `,
    styles: `
    :host {
      display: block;
    }
    .navbar-sticky {
      background-color: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
    }
    .navbar-hidden {
      transform: translateY(-100%);
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
    lastScrollTop = signal<number>(0);
    isNavbarVisible = signal<boolean>(true);
    isNavbarSticky = signal<boolean>(false);

    @HostListener('window:scroll')
    onScroll() {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            this.isNavbarSticky.set(true);
            // Headroom logic: hide when scrolling down, show when scrolling up
            // Add a small threshold to avoid flickering
            if (Math.abs(currentScroll - this.lastScrollTop()) > 5) {
                this.isNavbarVisible.set(currentScroll < this.lastScrollTop());
            }
        } else {
            this.isNavbarSticky.set(false);
            this.isNavbarVisible.set(true);
        }

        this.lastScrollTop.set(currentScroll);
    }
}
