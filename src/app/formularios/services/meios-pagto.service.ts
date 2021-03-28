import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MeiosPagtoService {
  apiUrl = environment.URLSERVIDOR + "meioPagto";

  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  salvar(meio: any): Observable<any> {
    console.log(JSON.stringify(meio))
    console.log(this.apiUrl);
    return this.httpClient.post<any>(this.apiUrl, JSON.stringify(meio), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  listar(): Observable<any> {
    return this.httpClient.get<any>(environment.URLSERVIDOR + "meioPagto");
  }

  listarCartoes():Observable<any>{
    return this.httpClient.get<any>(this.apiUrl+"/vencimentos");
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
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
