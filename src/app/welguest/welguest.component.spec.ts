import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelguestComponent } from './welguest.component';

describe('WelguestComponent', () => {
  let component: WelguestComponent;
  let fixture: ComponentFixture<WelguestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelguestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelguestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
