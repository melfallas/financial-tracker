import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BOOKING_URL } from '@core/constants/booking';

/**
 * ReviewCallSection — The "Next Step" conversion section.
 * Encourages leads to book a strategic 15-minute call on Calendly.
 */
@Component({
  selector: 'ft-review-call-section',
  templateUrl: './review-call-section.html',
  styleUrl: './review-call-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewCallSection {
  /** The destination Calendly URL */
  readonly bookingUrl = BOOKING_URL;

  /**
   * Opens the Calendly link in a new tab.
   */
  openBooking(): void {
    window.open(this.bookingUrl, '_blank', 'noopener,noreferrer');
  }
}
