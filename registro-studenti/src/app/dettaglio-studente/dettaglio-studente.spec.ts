import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';
import { DettaglioStudente } from './dettaglio-studente';

describe('DettaglioStudente', () => {
  let component: DettaglioStudente;
  let fixture: ComponentFixture<DettaglioStudente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DettaglioStudente],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(DettaglioStudente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
