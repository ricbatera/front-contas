import { Parcela } from './Parcela';
import { RecursoEntradaSaida } from './RecursoEntradaSaida';
import { Responsavel } from "./Responsavel";
''
export interface Saida{
    id:number,
    descricao:string,
    dataCompra:Date,
    situacao: string,
    parcelada:boolean,
    qtdeParcelas: number,
    valorTotal:number,
    dataVencimento: string,
    responsavel:Responsavel,
    recursoEntradaSaida: RecursoEntradaSaida,
    parcela: Parcela
}