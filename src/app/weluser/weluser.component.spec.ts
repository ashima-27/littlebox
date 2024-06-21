import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeluserComponent } from './weluser.component';

describe('WeluserComponent', () => {
  let component: WeluserComponent;
  let fixture: ComponentFixture<WeluserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeluserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeluserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
