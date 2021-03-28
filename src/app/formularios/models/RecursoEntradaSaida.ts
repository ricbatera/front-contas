import { TipoEntradaSaida } from './TipoEntradaSaida';
export interface RecursoEntradaSaida{
    id:number,
    descricao:string,
    nomeCartao:string,
    numeroCartao,
    validade:Date,
    diaVencimento: number
    agencia: string,
    conta: string,
    banco: string
    entradaSaida:TipoEntradaSaida;
}