import { render, screen, fireEvent } from '@testing-library/angular';
import { ReviewCallSection } from './review-call-section';
import { BOOKING_URL } from '@core/constants/booking';

describe('ReviewCallSection', () => {
  it('should render the section with correct ID and accessibility attributes', async () => {
    await render(ReviewCallSection);

    const section = screen.getByRole('region', { name: /¡Has dado el primer paso!/i });
    expect(section).toBeTruthy();
    expect(section.id).toBe('agenda-llamada');
  });

  it('should display the correct heading and body text', async () => {
    await render(ReviewCallSection);

    expect(screen.getByText(/¡Has dado el primer paso!/i)).toBeTruthy();
    expect(screen.getByText(/Ahora necesitas definir tu línea de tiempo/i)).toBeTruthy();
  });

  // it('should have a CTA button that opens the Calendly link', async () => {
  //   // Mock window.open using Jasmine-standard spyOn (supported via shim in Vitest)
  //   const spy = spyOn(window, 'open');
    
  //   await render(ReviewCallSection);

  //   const button = screen.getByRole('button', { name: /Agendar una llamada gratuita/i });
  //   expect(button).toBeTruthy();

  //   fireEvent.click(button);

  //   expect(spy).toHaveBeenCalledWith(BOOKING_URL, '_blank', 'noopener,noreferrer');
  // });
});
