import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsaveisComponent } from './responsaveis.component';

describe('ResponsaveisComponent', () => {
  let component: ResponsaveisComponent;
  let fixture: ComponentFixture<ResponsaveisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsaveisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsaveisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
