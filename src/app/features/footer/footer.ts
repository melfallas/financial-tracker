import { Component, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { BOOKING_URL } from '../../core/constants/booking';

/**
 * Footer component — Displays copyright information and legal disclaimer.
 */
@Component({
  selector: 'ft-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  /** Internal signal for the current year to avoid raw Date objects in template logic */
  private readonly _currentYear = signal(new Date().getFullYear());

  /** Computed current year value */
  readonly currentYear = computed(() => this._currentYear());

  /** Exposed constant for template usage */
  readonly BOOKING_URL = BOOKING_URL;
}
