import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { Navbar } from '@shared/components/navbar/navbar';

@Component({
  selector: 'app-contact-page',
  imports: [Navbar],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPage {
  public readonly title = signal('Contact');
  protected readonly description = signal('Get in touch with us!');
  protected readonly menuItems = signal([
    { title: 'Go to Home', link: '/', isInternal: true },
    { title: 'Go to Docs', link: '/doc', isInternal: true },
    { title: 'Testimonials', link: '/testimonials', isInternal: true },
    { title: 'Contact', link: '/contact', isInternal: true },
    { title: 'Compound Interest Calculator', link: '/financial-tools/compound-interest', isInternal: true },
    { title: 'Go to About', link: '/about', isInternal: true },
    { title: 'Learn with Tutorials', link: 'https://angular.dev/tutorials', isInternal: false },
    { title: 'Prompt and best practices for AI', link: 'https://angular.dev/ai/develop-with-ai', isInternal: false },
    { title: 'CLI Docs', link: 'https://angular.dev/tools/cli', isInternal: false },
    { title: 'Angular Language Service', link: 'https://angular.dev/tools/language-service', isInternal: false },
    { title: 'Angular DevTools', link: 'https://angular.dev/tools/devtools', isInternal: false },
  ]);
}
