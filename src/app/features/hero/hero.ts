import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Button } from '../../shared/components/button/button';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [CommonModule, Button, NgOptimizedImage],
    template: `
    <section class="min-h-screen flex items-center pt-20 pb-12 px-6 sm:px-12 lg:px-24 bg-gradient-to-br from-cloud-gray to-white overflow-hidden">
      <div class="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-hero">
        
        <!-- Content Column -->
        <div class="flex flex-col space-y-8 z-10">
          <div class="space-y-4">
            <h1 class="text-5xl lg:text-7xl font-extrabold text-deep-blue leading-tight tracking-tight">
              Controla la inflación, <br class="hidden lg:block">
              y alcanza tu <br class="hidden lg:block">
              <span class="text-emerald-green">Libertad Financiera</span>
            </h1>
            <p class="text-xl text-charcoal max-w-lg leading-relaxed">
              Descubre cuánto dinero estás perdiendo hoy y simula tu retiro ideal con nuestras herramientas avanzadas de diagnóstico financiero.
            </p>
          </div>
          
          <div>
            <app-button 
              label="Comenzar mi Diagnóstico Gratis ↓" 
              variant="primary" 
              class="cta-hero shadow-xl shadow-emerald-green/20"
              (clicked)="scrollToDiagnostic()"
            ></app-button>
          </div>
        </div>

        <!-- Graphic Column -->
        <div class="relative flex justify-center lg:justify-end">
          <div class="relative w-full max-w-lg aspect-square">
            <div class="absolute inset-0 bg-emerald-green/5 rounded-full blur-3xl transform scale-110"></div>
            <img 
              ngSrc="hero_growth_graphic.png" 
              fill
              priority
              alt="Crecimiento Financiero" 
              class="object-contain drop-shadow-2xl z-0"
            >
          </div>
        </div>
        
      </div>
    </section>
  `,
    styles: `
    :host {
      display: block;
    }
    .animate-hero {
      animation: fadeInUp 800ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    ::ng-deep .cta-hero button {
      padding: 1.25rem 2.5rem !important;
      font-size: 1.25rem !important;
      border-radius: 999px !important;
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
    scrollToDiagnostic() {
        const element = document.getElementById('wealth-gap-section');
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            // Fallback if section doesn't exist yet, scroll down a bit
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        }
    }
}
