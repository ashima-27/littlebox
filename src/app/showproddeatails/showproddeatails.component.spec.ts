import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowproddeatailsComponent } from './showproddeatails.component';

describe('ShowproddeatailsComponent', () => {
  let component: ShowproddeatailsComponent;
  let fixture: ComponentFixture<ShowproddeatailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowproddeatailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowproddeatailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
