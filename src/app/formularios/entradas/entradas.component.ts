import { ValidacoesService } from './../services/validacoes.service';
import { Component, OnInit } from '@angular/core';
import { ConfiguracoesPtBrService } from './../services/configuracoes-pt-br.service';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.css']
})
export class EntradasComponent implements OnInit {

  //   CAMPOS DO FORMÚLÁRIO ********  //
  descricao;
  fontePagadora;
  valorEntrada;
  recebido: boolean;
  dataEntrada;
  ptBr: any;
  recorrencia =1;
  
  
  // FIM -   CAMPOS DO FORMÚLÁRIO ********  //

  constructor(
    private ptBR: ConfiguracoesPtBrService,
    private validacao: ValidacoesService
  ) { }

  ngOnInit(): void {
    this.ptBr = this.ptBR.ptBr;
  }

salvar(){

  if(this.recebido){
    this.recorrencia = 1;
  }
  const payload ={
    dataEntrada: this.validacao.converteDatas3(this.dataEntrada),
    descricao: this.descricao,
    pagador: this.fontePagadora,
    valor: this.valorEntrada,
    recebido: this.recebido,
    recorrencia: this.recorrencia
  }
  alert(payload.recorrencia);
}

}
