import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { Button } from '../../shared/components/button/button';

@Component({
    selector: 'app-navbar',
    imports: [Button],
    templateUrl: './navbar.html',
    styleUrl: './navbar.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '(window:scroll)': 'onScroll()',
    },
})
export class Navbar {
    lastScrollTop = signal<number>(0);
    isNavbarVisible = signal<boolean>(true);
    isNavbarSticky = signal<boolean>(false);

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
