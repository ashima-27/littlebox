import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddwcatComponent } from './addwcat.component';

describe('AddwcatComponent', () => {
  let component: AddwcatComponent;
  let fixture: ComponentFixture<AddwcatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddwcatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddwcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
