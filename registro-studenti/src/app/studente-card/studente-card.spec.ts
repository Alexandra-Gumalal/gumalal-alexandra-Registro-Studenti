import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudenteCard } from './studente-card';

describe('StudenteCard', () => {
  let component: StudenteCard;
  let fixture: ComponentFixture<StudenteCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudenteCard],
    }).compileComponents();

    fixture = TestBed.createComponent(StudenteCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('studente', {
      id: 1,
      nome: 'Luca Bianchi',
      classe: '4B',
      mediaVoti: 7.5,
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
