import { render, screen } from '@testing-library/angular';
import { Footer } from './footer';

describe('Footer', () => {
  it('should render the footer with correct branding and accessibility', async () => {
    await render(Footer);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeTruthy();
    expect(screen.getAllByText(/Financial Tracker/i).length).toBeGreaterThan(0);
  });

  it('should display the correct legal disclaimer', async () => {
    await render(Footer);

    expect(
      screen.getByText(/La información proporcionada es solo con fines educativos/i)
    ).toBeTruthy();
  });

  it('should display the dynamic current year and rights reserved', async () => {
    await render(Footer);
    
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeTruthy();
    expect(screen.getByText(/Todos los derechos reservados/i)).toBeTruthy();
  });

  it('should display navigation links', async () => {
    await render(Footer);
    expect(screen.getByText(/Diagnóstico/i)).toBeTruthy();
    expect(screen.getByText(/Retiro/i)).toBeTruthy();
  });

  it('should display the CTA section', async () => {
    await render(Footer);
    expect(screen.getByText(/Agenda tu Cita/i)).toBeTruthy();
    expect(screen.getByText(/Quiero mi Asesoría Gratuita/i)).toBeTruthy();
  });
});
