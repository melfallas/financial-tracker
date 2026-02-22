import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { MenuItem } from '../../../shared/components/navbar/navbar.model';

@Component({
  selector: 'app-testimonial-page',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './testimonial-page.html',
  styleUrl: './testimonial-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialPage {
  protected readonly testimonials = signal([
    { name: 'John Doe', text: 'This tool has transformed how I manage my finances!' },
    { name: 'Jane Smith', text: 'Elegant, simple, and powerful. Exactly what I needed.' },
    { name: 'Bob Johnson', text: 'The compound interest calculator is a game changer.' },
  ]);

  protected readonly menuItems = signal<MenuItem[]>([
    { title: 'Go to Home', link: '/', isInternal: true },
    { title: 'Go to Docs', link: '/doc', isInternal: true },
    { title: 'Testimonials', link: '/testimonials', isInternal: true },
    { title: 'Contact', link: '/contact', isInternal: true },
    { title: 'Compound Interest Calculator', link: '/financial-tools/compound-interest', isInternal: true },
    { title: 'Go to About', link: '/about', isInternal: true },
  ]);
}
