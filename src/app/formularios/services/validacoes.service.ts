import { element } from 'protractor';
import { Injectable, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidacoesService {

  constructor() { }

  validarDescricao(valor: string, valor2: string){    
    if(valor){
      if(valor.length > 5){
        if(valor2 == 'Escolha um tipo...'){
          alert('Selecione um tipo de Pagamento');
          return false
        }
        return true;
      }else{
        alert('Descrição inválida, digite mais de 5 letras');
        return false
      }    
    }else{
      alert('Descrição não pode ficar em branco');
      return false;
    }
  }

  converteDatas(valor: Date){
    //console.log(valor);
    return `${valor.getFullYear()}-${valor.getMonth()+1 >=10? valor.getMonth()+1: `0${valor.getMonth()+1}`}-${valor.getDate() >= 10?valor.getDate(): `0${valor.getDate()}`}T20:00:00-03:00`;
  }
  converteDatas3(valor: Date){
    //console.log(valor);
    return `${valor.getFullYear()}-${valor.getMonth()+1 >=10? valor.getMonth()+1: `0${valor.getMonth()+1}`}-${valor.getDate() >= 10?valor.getDate(): `0${valor.getDate()}`}`;
  }

  converteDatas2(data:String){
    var valores = data.split("/")    
    return `${valores[2]}-${valores[1]}-${valores[0]}`
  }

  calculaVencimento(diaVencimento: number){
    const hoje = new Date;
    return `${hoje.getFullYear()}-${hoje.getMonth()+1}-${diaVencimento}`;
  }

  listaVencimentosCartoes(lista: any){
    var listaVencimentos:any = new Array();
    lista.forEach((element, index) => {
      listaVencimentos.push(
        {
          nomeCartao: element.meiosPagamentos[0].descricao,
          diaVencimento: element.diaVencimento
        }
      )
    });
    return listaVencimentos;
  }

  montaDataVencimento(dia: number){
    const hoje = new Date;
    if(hoje.getDate()<= 29){      
      return `${dia >= 10? dia : `0${dia}`}/${hoje.getMonth()+2 >= 10? hoje.getMonth()+2: `0${hoje.getMonth()+2}`}/${hoje.getFullYear()}`;
    }else{
      return `${dia}/${hoje.getMonth()+3}/${hoje.getFullYear()}`;
    }
  }

  dataPtBR(data){
    let hoje = new Date;
    const dataSplit = data.split("-")
    const ano = dataSplit[0];
    const mes = dataSplit[1];
    const dia = dataSplit[2]
    hoje.setDate(dia)
    hoje.setMonth(mes)
    hoje.setFullYear(ano)
    return `${hoje.getDate()>=10? hoje.getDate():`0${hoje.getDate()}`}/${hoje.getMonth()>=10? hoje.getMonth(): `0${hoje.getMonth()}`}/${hoje.getFullYear()}`;
  }
}
