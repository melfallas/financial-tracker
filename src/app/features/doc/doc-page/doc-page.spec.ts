import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DocPage } from './doc-page';

describe('DocPage', () => {
  let component: DocPage;
  let fixture: ComponentFixture<DocPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocPage],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(DocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
