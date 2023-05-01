import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreCardComponent } from './more-card.component';

describe('MoreCardComponent', () => {
  let component: MoreCardComponent;
  let fixture: ComponentFixture<MoreCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
