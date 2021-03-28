import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeiosPagtoComponent } from './meios-pagto.component';

describe('MeiosPagtoComponent', () => {
  let component: MeiosPagtoComponent;
  let fixture: ComponentFixture<MeiosPagtoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeiosPagtoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeiosPagtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
