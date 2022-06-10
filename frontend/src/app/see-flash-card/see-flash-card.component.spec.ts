import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeFlashCardComponent } from './see-flash-card.component';

describe('SeeFlashCardComponent', () => {
  let component: SeeFlashCardComponent;
  let fixture: ComponentFixture<SeeFlashCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeFlashCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeFlashCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
