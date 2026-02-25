import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Hero } from './hero';
import { By } from '@angular/platform-browser';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';

describe('HeroComponent', () => {
    let component: Hero;
    let fixture: ComponentFixture<Hero>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Hero],
        }).compileComponents();

        fixture = TestBed.createComponent(Hero);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render the H1 title', () => {
        const h1 = fixture.debugElement.query(By.css('h1')).nativeElement;
        expect(h1.textContent).toContain('Controla la inflación');
    });

    it('should call scrollToDiagnostic when CTA button is clicked', () => {
        const spy = spyOn(component, 'scrollToDiagnostic');
        const button = fixture.debugElement.query(By.css('ft-button'));
        button.triggerEventHandler('clicked', null);
        expect(spy).toHaveBeenCalled();
    });
});
