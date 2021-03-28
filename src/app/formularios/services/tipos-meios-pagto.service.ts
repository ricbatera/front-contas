import { TiposMeiospagto } from './../models/TiposMeiosPagto';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TiposMeiosPagtoService {
  tiposMeiosPagto: TiposMeiospagto[] = [
    {tipo: "Escolha um tipo..."},
    {tipo: "Cartão de Crédito"},
    {tipo: "Boleto Bancário"},
    {tipo: "Débito em Conta"},
    {tipo: "Dinheiro"},
    {tipo: "Cheque"}    
  ]

  constructor() { }
}
