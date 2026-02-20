import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about-page.html',
  styleUrl: './about-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutPage {}
