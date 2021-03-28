import { TipoEntradaSaida } from './../models/TipoEntradaSaida';
import { DatabaseServiceService } from './../../services/database-service.service';
import { Component, OnInit } from '@angular/core';
import { ResponsaveisService } from './../services/responsaveis.service';
import { ValidacoesService } from './../services/validacoes.service';
import { ConfiguracoesPtBrService } from './../services/configuracoes-pt-br.service';
import { CartaoCredito } from './../models/CartaoCredito';
import { TiposMeiosPagtoService } from '../services/tipos-meios-pagto.service';
import { MeiosPagtoService } from './../services/meios-pagto.service';
import { SelectItem } from 'primeng/api';
import { TiposMeiospagto } from './../models/TiposMeiosPagto';
import { ContaBancaria } from './../models/ContaBancaria';
import { Meiopagto } from './../models/MeioPagto';

@Component({
  selector: 'app-meios-pagto',
  templateUrl: './meios-pagto.component.html',
  styleUrls: ['./meios-pagto.component.css']
})
export class MeiosPagtoComponent implements OnInit {
  dataPtBR;
  tiposMeioPgto: TiposMeiospagto[];
  tipoSelecionado: SelectItem;
  tipoSelec: string = "Escolha um tipo...";
  tiposEntradaSaidaList: TipoEntradaSaida[];
  tipoEntradaSaidaSelecionado:TipoEntradaSaida;
  descricao: string = null;

  meioPagto: Meiopagto = {
    id: null,
    descricao: null,
    tipo: null
  }
  cartao: CartaoCredito = {
    nomeCartao: null,
    numeroCartao: null,
    validade: null,
    diaVencimento: null
  }

  contaBancaria: ContaBancaria = {
    agencia: null,
    conta: null,
    banco: null
  }


  mostraCamposCartao: boolean = true;
  mostraCamposConta: boolean = true;

  constructor(
    private tiposService: TiposMeiosPagtoService,
    private validacaoService: ValidacoesService,
    private meioPagtoService: MeiosPagtoService,
    private responsavelService: ResponsaveisService,
    private databaseService: DatabaseServiceService,
    private ptBR: ConfiguracoesPtBrService) { }

  ngOnInit(): void {
    this.tiposMeioPgto = this.tiposService.tiposMeiosPagto;
    this.dataPtBR = this.ptBR.ptBr;
    this.buscarTiposentradasSaidas();
  }

  buscarTiposentradasSaidas(){
    this.databaseService.listarTiposEntradasSaidas()
    .subscribe(
      response => {
        this.tiposEntradaSaidaList = response;
      },
      error => {
        console.log(error);
        alert(error.error);
      });
  }

  mostra(ev) {
    this.tipoEntradaSaidaSelecionado = ev.value;
    switch (this.tipoEntradaSaidaSelecionado.nome) {
      case "Cartão de Crédito":
        //this.tipoSelec = ev.value.tipo;
        this.mostraCamposCartao = false;
        this.mostraCamposConta = true;
        break;
      case "Conta Bancária":
       // this.tipoSelec = ev.value.tipo;
        this.mostraCamposConta = false;
        this.mostraCamposCartao = true;
        break;

      case "Dinheiro":
        //this.tipoSelec = "Dinheiro";
        this.mostraCamposCartao = true;
        this.mostraCamposConta = true;
        break;

      default:
        this.tipoSelec = "Escolha um tipo...";
        this.mostraCamposCartao = true;
        this.mostraCamposConta = true;
    }
  }

  salva() {
    var dataValidade = null;
    if(!this.mostraCamposCartao){
      dataValidade = this.validacaoService.converteDatas(this.cartao.validade);
    }
    const validaDescricaoETipo = this.validacaoService.validarDescricao(this.descricao, this.tipoEntradaSaidaSelecionado.nome);
    if (validaDescricaoETipo) {

      const payload = {
        descricao: this.descricao,
        nomeCartao: this.cartao.nomeCartao,
        numeroCartao: this.cartao.numeroCartao,
        validade: dataValidade,
        diaVencimento: this.cartao.diaVencimento,
        banco: this.contaBancaria.banco,
        conta: this.contaBancaria.conta,
        agencia: this.contaBancaria.agencia,
        entradaSaida:this.tipoEntradaSaidaSelecionado
      }
      this.databaseService.salvar(payload)
      .subscribe(
        response => {
          console.log("Pegar a resposta aqui. Quando salva um novo meio de pagamento");            
        },
        error => {
          console.log(error);
        });
      
    } else {

    }

  }

}
