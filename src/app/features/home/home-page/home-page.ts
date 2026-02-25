import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Navbar } from '../../navbar/navbar';
import { Hero } from '../../hero/hero';
import { WealthGapChart } from '../../wealth-gap-chart/wealth-gap-chart';

@Component({
  selector: 'ft-home-page',
  imports: [Navbar, Hero, WealthGapChart],
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage { }
