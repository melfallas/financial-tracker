import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Navbar } from './navbar';
import { By } from '@angular/platform-browser';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';

describe('NavbarComponent', () => {
    let component: Navbar;
    let fixture: ComponentFixture<Navbar>;

    beforeAll(() => {
        try {
            TestBed.initTestEnvironment(
                BrowserTestingModule,
                platformBrowserTesting()
            );
        } catch {
            // already initialized
        }
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Navbar],
        }).compileComponents();

        fixture = TestBed.createComponent(Navbar);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not have sticky class at top', () => {
        const nav = fixture.debugElement.query(By.css('nav')).nativeElement;
        expect(nav.classList.contains('navbar-sticky')).toBe(false);
    });

    it('should have sticky class after scrolling down', () => {
        window.scrollY = 100;
        window.dispatchEvent(new Event('scroll'));
        fixture.detectChanges();

        const nav = fixture.debugElement.query(By.css('nav')).nativeElement;
        expect(nav.classList.contains('navbar-sticky')).toBe(true);
    });
});
