import { DatabaseServiceService } from './../../services/database-service.service';
import { RecursoEntradaSaida } from './../models/RecursoEntradaSaida';
import { SaidasService } from './../services/saidas.service';
import { Meiopagto } from './../models/MeioPagto';
import { ValidacoesService } from './../services/validacoes.service';
import { MeiosPagtoService } from './../services/meios-pagto.service';
import { ConfiguracoesPtBrService } from './../services/configuracoes-pt-br.service';
import { Responsavel } from './../models/Responsavel';
import { Saida } from './../models/Saida';
import { Component, OnInit } from '@angular/core';
import { ResponsaveisService } from '../services/responsaveis.service';


@Component({
  selector: 'app-saidas',
  templateUrl: './saidas.component.html',
  styleUrls: ['./saidas.component.css']
})


export class SaidasComponent implements OnInit {
  saida: Saida = {
    id: null,
    descricao: null,
    dataCompra: null,
    parcelada: false,
    qtdeParcelas: 1,
    valorTotal: null,
    dataVencimento:null,
    responsavel: null,
    parcela: null,
    recursoEntradaSaida:null,
    situacao:null
  };

  valorUnitario: number;
  dataVencimento: any;
  dataVencimento2: any;
  dataCompra: any;
  value: Date;
  ptBr: any;
  responsaveis: Responsavel[];
  meiospagtos: Meiopagto[];
  parcelado: boolean;
  pago: boolean;
  desabilitaVencimento = true;
  listaVencimentosCartoes = new Array();
  diaVencimento: number = 1;
  recursosEntradaSaidaList: RecursoEntradaSaida[];

  constructor(
    private service: ResponsaveisService,
    private ptBR: ConfiguracoesPtBrService,
    private meiospagtoService: MeiosPagtoService,
    private validacoes: ValidacoesService,
    private saidaService: SaidasService,
    private databaseServiceService: DatabaseServiceService
  ) { }

  ngOnInit(): void {
    this.ptBr = this.ptBR.ptBr;

    this.buscarTodosResponsaveis();
    this.carregaTodosRecursosEntradaSaida()
  }

  salva() {
    if (this.pago) {
      this.saida.situacao = "Pago"
    } else {
      this.saida.situacao = "Aberto"
    }
    if(!this.desabilitaVencimento){
      this.dataVencimento = this.validacoes.converteDatas3(this.dataVencimento2);
    }else{
      console.log("caiu no else");
      this.dataVencimento = this.validacoes.converteDatas2(this.dataVencimento2);
    }
    const payload = {
      descricao: this.saida.descricao,
      dataCompra: this.validacoes.converteDatas3(this.saida.dataCompra),
      parcelada: this.saida.parcelada,
      valorTotal: this.saida.valorTotal,
      dataVencimento: this.validacoes.converteDatas4(this.dataVencimento),
      numParcelas: this.saida.qtdeParcelas,
      situacao: this.saida.situacao,
      responsavel: {id: this.saida.responsavel.id},
      recursoEntradaSaida: {id: this.saida.recursoEntradaSaida.id}
    }
    //console.log(payload);
    
    
    this.databaseServiceService.salvarSaida(payload)
    .subscribe(
      response => {
        console.log(response);            
      },
      error => {
        console.log(error);
      });
  }
  calculaTotal() {
    this.saida.valorTotal = this.valorUnitario * this.saida.qtdeParcelas;
  }

  buscarTodosResponsaveis() {
    this.service.listar()
      .subscribe(
        response => {
          this.responsaveis = response;
        },
        error => {
          console.log(error);
        });
  }


  mostraVencimento(event) {
    let diaVenc = this.saida.recursoEntradaSaida.diaVencimento;
    if(diaVenc !=0){
      this.dataVencimento2 = this.validacoes.montaDataVencimento(diaVenc, this.saida.dataCompra);
      console.log(this.dataVencimento2)
      this.desabilitaVencimento = true;
    }else{
      this.dataVencimento2 = null;
      this.desabilitaVencimento = false;
    }

  }
  carregaTodosRecursosEntradaSaida(){
    this.databaseServiceService.listarRecursosEntradasSaidas()
    .subscribe(
      response => {
        this.recursosEntradaSaidaList = response
      },
      error => {
        console.log(error);
      }
    )
  }
}
