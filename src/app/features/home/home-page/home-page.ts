import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Navbar } from '../../navbar/navbar';
import { Hero } from '../../hero/hero';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [Navbar, Hero],
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage { }
