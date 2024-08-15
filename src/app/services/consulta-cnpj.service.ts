import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCnpjService {

  constructor(private http: HttpClient) { }

  buscarDadosCNPJ(cnpj: string): Observable<any> {
    return this.http.get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
  }


}

