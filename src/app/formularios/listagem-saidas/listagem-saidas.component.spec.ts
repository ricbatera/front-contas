import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemSaidasComponent } from './listagem-saidas.component';

describe('ListagemSaidasComponent', () => {
  let component: ListagemSaidasComponent;
  let fixture: ComponentFixture<ListagemSaidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListagemSaidasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemSaidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
