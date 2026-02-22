import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TestimonialPage } from './testimonial-page';

describe('TestimonialPage', () => {
  let component: TestimonialPage;
  let fixture: ComponentFixture<TestimonialPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonialPage],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(TestimonialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Testimonials');
  });
});
