import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Button } from '../../shared/components/button/button';

@Component({
    selector: 'app-hero',
    imports: [Button, NgOptimizedImage],
    templateUrl: './hero.html',
    styleUrl: './hero.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
    scrollToDiagnostic() {
        const element = document.getElementById('wealth-gap-section');
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        } else {
            // Fallback if section doesn't exist yet, scroll down a bit
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth',
            });
        }
    }
}
