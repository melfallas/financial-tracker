import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Button } from './button';

describe('Button', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button],
    }).compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
  });

  describe('Rendering', () => {
    it('should create the component', () => {
      fixture.componentRef.setInput('label', 'Test');
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should display the required label', () => {
      fixture.componentRef.setInput('label', 'Click me');
      fixture.detectChanges();
      const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
      expect(btn.textContent?.trim()).toContain('Click me');
    });

    it('should apply primary class by default', () => {
      fixture.componentRef.setInput('label', 'Primary');
      fixture.detectChanges();
      const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
      expect(btn.classList.contains('btn-primary')).toBe(true);
    });

    it('should apply secondary class when variant is "secondary"', () => {
      fixture.componentRef.setInput('label', 'Secondary');
      fixture.componentRef.setInput('variant', 'secondary');
      fixture.detectChanges();
      const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
      expect(btn.classList.contains('btn-secondary')).toBe(true);
    });

    it('should apply ghost class when variant is "ghost"', () => {
      fixture.componentRef.setInput('label', 'Ghost');
      fixture.componentRef.setInput('variant', 'ghost');
      fixture.detectChanges();
      const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
      expect(btn.classList.contains('btn-ghost')).toBe(true);
    });

    it('should be disabled when disabled input is true', () => {
      fixture.componentRef.setInput('label', 'Disabled');
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
      expect(btn.disabled).toBe(true);
    });

    it('should be disabled when loading input is true', () => {
      fixture.componentRef.setInput('label', 'Loading');
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();
      const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
      expect(btn.disabled).toBe(true);
    });
  });

  describe('Button type', () => {
    it('should default to type="button"', () => {
      fixture.componentRef.setInput('label', 'Type Test');
      fixture.detectChanges();
      const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
      expect(btn.type).toBe('button');
    });

    it('should render as type="submit" when specified', () => {
      fixture.componentRef.setInput('label', 'Submit');
      fixture.componentRef.setInput('type', 'submit');
      fixture.detectChanges();
      const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
      expect(btn.type).toBe('submit');
    });
  });

  describe('Events', () => {
    it('should emit clicked event when button is clicked', () => {
      fixture.componentRef.setInput('label', 'Emit Test');
      fixture.detectChanges();

      let emitted = false;
      component.clicked.subscribe(() => (emitted = true));

      const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
      btn.click();
      expect(emitted).toBe(true);
    });

    it('should NOT emit clicked when disabled is true', () => {
      fixture.componentRef.setInput('label', 'Disabled Click');
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      let emitted = false;
      component.clicked.subscribe(() => (emitted = true));

      const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
      btn.click();
      expect(emitted).toBe(false);
    });

    it('should NOT emit clicked when loading is true', () => {
      fixture.componentRef.setInput('label', 'Loading Click');
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      let emitted = false;
      component.clicked.subscribe(() => (emitted = true));

      const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
      btn.click();
      expect(emitted).toBe(false);
    });
  });

  describe('onButtonClick method', () => {
    it('should call onButtonClick without throwing when not disabled and not loading', () => {
      fixture.componentRef.setInput('label', 'Click');
      fixture.detectChanges();
      expect(() => component.onButtonClick()).not.toThrow();
    });

    it('should not emit when onButtonClick is called while disabled', () => {
      fixture.componentRef.setInput('label', 'No Emit');
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      let emitted = false;
      component.clicked.subscribe(() => (emitted = true));

      component.onButtonClick();
      expect(emitted).toBe(false);
    });
  });
});
