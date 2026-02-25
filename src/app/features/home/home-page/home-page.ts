import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Navbar } from '../../navbar/navbar';
import { Hero } from '../../hero/hero';

@Component({
  selector: 'ft-home-page',
  imports: [Navbar, Hero],
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage { }
