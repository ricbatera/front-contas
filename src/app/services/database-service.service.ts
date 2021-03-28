import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseServiceService {
  apiUrl = environment.URLSERVIDOR;

  constructor(private httpClient: HttpClient) { }
   // Headers
   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  listarTiposEntradasSaidas(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + "entradas-saidas/listar");
  }
  listarRecursosEntradasSaidas(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + "recursos-entrada-saida/listar");
  }

  salvar(payload: any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl+"/recursos-entrada-saida", JSON.stringify(payload), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  salvarSaida(payload: any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl+"saidas", JSON.stringify(payload), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }
// temorário, ajustar depois conforme a necessidade
  listarTodasSaidas(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl+"saidas");
  }

  pagarParcela(id: any): Observable<any> {
    return this.httpClient.put<any>(this.apiUrl+"parcelas/"+id, JSON.stringify(id), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }


  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    console.log(error)
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
