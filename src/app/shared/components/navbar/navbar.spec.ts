import { render, screen } from '@testing-library/angular';
import { Navbar } from './navbar';
import { provideRouter } from '@angular/router';

describe('Navbar', () => {
  it('should create', async () => {
    const { fixture } = await render(Navbar, {
      providers: [provideRouter([])],
      componentInputs: { items: [] }, // replaces fixture.componentRef.setInput
    });

    // Verify that the component instance was created
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render with empty items', async () => {
    await render(Navbar, {
      providers: [provideRouter([])],
      componentInputs: { items: [] },
    });

    // Example: check that no list items are rendered
    const navItems = screen.queryAllByRole('listitem');
    expect(navItems.length).toBe(0);
  });
});
