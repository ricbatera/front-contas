import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {

  constructor() { }


  filtrarPorResponsavel(saidas:any[], responsavel){
    //console.log(saidas);
    //console.log(responsavel);
    if(responsavel.id == 1000){
      return saidas;
    }
    let listaFiltrada = []
    saidas.forEach(element => {
      if(element.responsavel.id == responsavel.id){
        listaFiltrada.push(element)
      }
  });
  //console.log(listaFiltrada);
  return listaFiltrada;   
  }
}
