import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashCardListElComponent } from './flash-card-list-el.component';

describe('FlashCardListElComponent', () => {
  let component: FlashCardListElComponent;
  let fixture: ComponentFixture<FlashCardListElComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashCardListElComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashCardListElComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
