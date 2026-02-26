import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Navbar } from '../../navbar/navbar';
import { Hero } from '../../hero/hero';
import { WealthGapChart } from '../../wealth-gap-chart/wealth-gap-chart';
import { CostOfWaiting } from '../../cost-of-waiting/cost-of-waiting';
import { RetirementSimulator } from '../../retirement-simulator/retirement-simulator';

@Component({
  selector: 'ft-home-page',
  imports: [Navbar, Hero, WealthGapChart, CostOfWaiting, RetirementSimulator],
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage { }
