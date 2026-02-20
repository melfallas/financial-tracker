import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-doc-page',
  imports: [RouterLink],
  templateUrl: './doc-page.html',
  styleUrl: './doc-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocPage {
  protected readonly title = signal('Documentation');
  protected readonly description = signal('This is the doc !');
  protected readonly menuItems = signal([
    { title: 'Go to Home', link: '/', isInternal: true },
    { title: 'Go to Docs', link: '/doc', isInternal: true },
    { title: 'Go to About', link: '/about', isInternal: true },
    { title: 'Learn with Tutorials', link: 'https://angular.dev/tutorials', isInternal: false },
    { title: 'Prompt and best practices for AI', link: 'https://angular.dev/ai/develop-with-ai', isInternal: false },
    { title: 'CLI Docs', link: 'https://angular.dev/tools/cli', isInternal: false },
    { title: 'Angular Language Service', link: 'https://angular.dev/tools/language-service', isInternal: false },
    { title: 'Angular DevTools', link: 'https://angular.dev/tools/devtools', isInternal: false },
  ]);
}
