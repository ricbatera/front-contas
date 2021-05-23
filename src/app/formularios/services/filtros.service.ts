import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {

  constructor() { }
selecionaFiltro(saidas:any[], meioPagamento, responsavel){
  if(responsavel.id == 1000 && meioPagamento.id == 1000){
    return saidas;
  }
  
  if(responsavel.id == 1000){
    return this.filtraPorMeioPagamento(saidas, meioPagamento);
  }

  if(meioPagamento.id == 1000){
    return this.filtrarPorResponsavel(saidas, responsavel);
  }
  return this.filtraPorMeioPagamentoEResp(saidas, meioPagamento, responsavel);
}

  private filtrarPorResponsavel(saidas:any[], responsavel){
    //console.log(saidas);
    //console.log(responsavel);
    if(responsavel.id == 1000){
      return saidas;
    }
    let listaFiltrada = []
    saidas.forEach(element => {
      if(element.responsavel.id == responsavel.id){
        listaFiltrada.push(element);
      }
  });
  //console.log(listaFiltrada);
  return listaFiltrada;   
  }

  private filtraPorMeioPagamento(saidas:any[], meioPagamento){
    if(meioPagamento.id == 1000){
      return saidas;
    }
    let listaFiltrada = [];
    saidas.forEach(element =>{
      if(element.recursoEntradaSaida.id == meioPagamento.id){
        listaFiltrada.push(element);
      }
    });
    return listaFiltrada;
  }

  private filtraPorMeioPagamentoEResp(saidas:any[], meioPagamento, responsavel){    
    let listaFiltrada = [];
    saidas.forEach(element =>{
      if(element.recursoEntradaSaida.id == meioPagamento.id && element.responsavel.id == responsavel.id){
        listaFiltrada.push(element);
      }
    });
    return listaFiltrada;
  }
}
