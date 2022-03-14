import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultydialogComponent } from './facultydialog.component';

describe('FacultydialogComponent', () => {
  let component: FacultydialogComponent;
  let fixture: ComponentFixture<FacultydialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultydialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultydialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
