import { RecursoEntradaSaida } from './../models/RecursoEntradaSaida';
import { TipoEntradaSaida } from './../models/TipoEntradaSaida';
import { FiltrosService } from './../services/filtros.service';
import { ValidacoesService } from './../services/validacoes.service';
import { DatabaseServiceService } from './../../services/database-service.service';
import { ConfiguracoesPtBrService } from './../services/configuracoes-pt-br.service';
import { Responsavel } from './../models/Responsavel';
import { ResponsaveisService } from './../services/responsaveis.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

// icones
import { faWallet, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-listagem-saidas',
  templateUrl: './listagem-saidas.component.html',
  styleUrls: ['./listagem-saidas.component.css'],
  providers: [MessageService]
})
export class ListagemSaidasComponent implements OnInit {

  //icones fontAwsome
  faWallet = faWallet;
  faCheck = faCheck;

  // controles de visibilidade
  pago: boolean = true
  naoPago: boolean = true
  loading: boolean = false;

  responsaveisList: Responsavel[];
  addTodos: Responsavel = { id: 1000, nome: "Todos", sobrenome: "Todos", dataCad: new Date };
  respSelected: Responsavel = this.addTodos;
  
  listaSaidas = [];
  listaRespFiltrada = [];

  tiposEntradaSaidaList: TipoEntradaSaida [];
  addTodosTipo: TipoEntradaSaida = {id:1000, nome: "Todos"};
  meioSelected: TipoEntradaSaida = this.addTodosTipo;
  
  recursoEntradaSaidaList: RecursoEntradaSaida[];
  addTodosRecursosEntradaSaida: RecursoEntradaSaida = {id: 1000, descricao: "Todos", nomeCartao: null, numeroCartao: null, validade: null, diaVencimento: null, agencia: null, conta: null, banco: null, entradaSaida: null};
  recursoSelected: RecursoEntradaSaida = this.addTodosRecursosEntradaSaida;
  
  mesSelected;
  ptBr: any;
  listaFiltros = [];

  // variáveis para os mostradores
  totalPago;
  totalAberto;
  totalGeral;

  // variaveis do TOAST
  parcelaPaga;

  constructor(
    private service: ResponsaveisService,
    private ptBR: ConfiguracoesPtBrService,
    private databaseService: DatabaseServiceService,
    private conversoes: ValidacoesService,
    private messageService: MessageService,
    private filtroService: FiltrosService,
  ) { }

  ngOnInit(): void {
    this.buscarTodosResponsaveis();
    this.buscarTodasSaidas();
    this.buscarTiposentradasSaidas();
    this.listarTodosRecursosEntradaSaida();
    this.ptBr = this.ptBR.ptBr;
    //alert(new Date)
  }

  buscarTodosResponsaveis() {
    this.service.listar()
      .subscribe(
        response => {
          this.responsaveisList = response;
          this.responsaveisList.unshift(this.addTodos);
        },
        error => {
          console.log(error);
        });
  }
  // aqui é um teste que busca todas a saídas de todos os reponsaveis, pagos e abertos de todos os meses
  buscarTodasSaidas() {
    this.databaseService.listarTodasSaidas()
      .subscribe(
        response => {
          this.listaSaidas = response;
          this.listaRespFiltrada = response;
          console.log(this.listaSaidas);
        },
        error => {
          console.log(error);
        });
  }


  filtra() {
    this.loading = true;
    const mesSplit = this.mesSelecionado(this.mesSelected);
    let listaFiltrada = [];
    for (let i = 0; i < this.listaRespFiltrada.length; i++) {
      const element = this.listaRespFiltrada[i];
      element.parcelas.forEach(e => {
        const val2 = this.mesParcelaSplit(e.dataVenvimento)
        if (this.comparaDatas(mesSplit, val2)) {
          listaFiltrada.push(
            {
              id: element.id,
              responsavel: element.responsavel.nome,
              descricao: element.descricao,
              parcela: `${e.parcelaNumero} de ${element.parcelas.length}`,
              valor: e.valorUnit,
              situacao: e.situacao,
              vencimento: this.conversoes.dataPtBR(e.dataVenvimento),
              idParcela: e.id,
              meio: element.recursoEntradaSaida.descricao
            }
          )

        }
      });
    }
    this.totalPago = this.somaValorPago(listaFiltrada);
    this.totalAberto = this.somaValorAberto(listaFiltrada);
    this.totalGeral = this.somaValorGeral(listaFiltrada);
    this.listaFiltros = listaFiltrada;
    this.loading = false;
  }

  // mover esses metodos daqui
  mesSelecionado(mes: string) {
    let mesSplit = mes.split("/");
    return mesSplit;
  }

  mesParcelaSplit(mes: string) {
    let mesSplit = mes.split("-");
    return mesSplit;
  }

  comparaDatas(val1, val2) {
    if (val1[1] == val2[0] && val1[0] == val2[1]) {
      return true
    } else return false;
  }

  somaValorPago(lista) {
    let valorPago = 0;
    lista.forEach(e => {
      if (e.situacao == "Pago") {
        valorPago += e.valor
      }
    });
    return valorPago;
  }

  somaValorAberto(lista) {
    let valorPago = 0;
    lista.forEach(e => {
      if (e.situacao == "Aberto") {
        valorPago += e.valor
      }
    });
    return valorPago;
  }

  somaValorGeral(lista) {
    let valorPago = 0;
    lista.forEach(e => {
      valorPago += e.valor
    });
    return valorPago;
  }

  pagar() {
    this.databaseService.pagarParcela(this.parcelaPaga.idParcela)
      .subscribe(
        response => {
          this.buscarTodasSaidas();
          setTimeout(() => {
            this.filtra();
            this.showSuccess();
          }, 1000);
          ;
        },
        error => {
          console.log(error);
        });
    this.messageService.clear('c');
  }

  showConfirm(saida) {
    this.parcelaPaga = saida;
    this.messageService.clear();
    this.messageService.add(
      {
        key: 'c', sticky: true,
        severity: 'warn',
        summary: 'Pagar esta Conta/ Parcela? ',
        detail: 'Clique em sim para confirmar, não é possível desfazer!'
      }
    );
  }
  onReject() {
    this.messageService.clear('c');
  }

  showSuccess() {
    console.log("chegou aqui")
    this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Conta Paga' });
  }

  filtrar() {
    //console.log(this.respSelected)
    // filtra por Responsável
    this.listaRespFiltrada = this.filtroService.selecionaFiltro(this.listaSaidas, this.recursoSelected, this.respSelected);
    this.filtra();
  }


  buscarTiposentradasSaidas() {
    this.databaseService.listarTiposEntradasSaidas()
      .subscribe(
        response => {
          this.tiposEntradaSaidaList = response;
          this.tiposEntradaSaidaList.unshift(this.addTodosTipo);
          //console.log(this.tiposEntradaSaidaList);
        },
        error => {
          console.log(error);
        });
  }
  

  listarTodosRecursosEntradaSaida(){
    this.databaseService.listarRecursosEntradasSaidas()
    .subscribe(
      response => {
        this.recursoEntradaSaidaList = response;
        this.recursoEntradaSaidaList.unshift(this.addTodosRecursosEntradaSaida);
        console.log(this.tiposEntradaSaidaList);
      },
      error => {
        console.log(error);
      });
  }
}
