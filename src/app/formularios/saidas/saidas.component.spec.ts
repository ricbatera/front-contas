import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaidasComponent } from './saidas.component';

describe('SaidasComponent', () => {
  let component: SaidasComponent;
  let fixture: ComponentFixture<SaidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaidasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
