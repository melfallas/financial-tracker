import { Component, signal, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {}
