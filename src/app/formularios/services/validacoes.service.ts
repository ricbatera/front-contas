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

  converteDatas4(data:String){
    var valores = data.split("-");
    let ano = Number.parseInt(valores[0]);
    let mes = Number.parseInt(valores[1]);
    let dia = Number.parseInt(valores[2]);
    
    return `${ano}-${mes>=10? mes: `0${mes}`}-${dia>=10? dia: `0${dia}`}`;
  }

  mesAtual(valor: Date){
    return `${valor.getMonth()+1 >=10? valor.getMonth()+1: `0${valor.getMonth()+1}`}/${valor.getFullYear()}`;
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

  montaDataVencimento(dia: number, dataCompra: any){
    const hoje = dataCompra;
    // let diaCompra = hoje.getDate();
    let mesCompra = hoje.getMonth();
    let anoCompra = hoje.getFullYear();

    if(mesCompra == 11){
      mesCompra = 0;
      anoCompra++;
    }
    if(hoje.getDate()<= 29){      
      return `${dia >= 10? dia : `0${dia}`}/${mesCompra + 1 >= 10? mesCompra +2: `0${mesCompra + 1 }`}/${anoCompra}`;
    }else{
      return `${dia >= 10? dia : `0${dia}`}/${mesCompra+2}/${anoCompra}`;
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
    return `${dia}/${mes}/${ano}`;
    
  }
}
