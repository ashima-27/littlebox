import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsubcatComponent } from './wsubcat.component';

describe('WsubcatComponent', () => {
  let component: WsubcatComponent;
  let fixture: ComponentFixture<WsubcatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WsubcatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WsubcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
