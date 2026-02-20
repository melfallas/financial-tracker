import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Calculator } from './calculator';
import { ReactiveFormsModule } from '@angular/forms';
import { Navbar } from '@shared/components/navbar/navbar';
import { provideRouter } from '@angular/router';

describe('Calculator', () => {
  let component: Calculator;
  let fixture: ComponentFixture<Calculator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Calculator, ReactiveFormsModule, Navbar],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(Calculator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate compound interest correctly', () => {
    (component as any).form.patchValue({
      initialInvestment: 1000,
      monthlyContribution: 0,
      years: 1,
      interestRate: 10,
      compoundFrequency: '1'
    });
    
    (component as any).calculate();
    
    const results = (component as any).results();
    expect(results.length).toBe(2); // Year 0 and Year 1
    expect(results[1].totalSavings).toBe(1100);
  });
});
