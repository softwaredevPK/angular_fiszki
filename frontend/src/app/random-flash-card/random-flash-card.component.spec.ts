import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomFlashCardComponent } from './random-flash-card.component';

describe('RandomFlashCardComponent', () => {
  let component: RandomFlashCardComponent;
  let fixture: ComponentFixture<RandomFlashCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomFlashCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomFlashCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
