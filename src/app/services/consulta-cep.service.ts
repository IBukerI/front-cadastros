import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private http: HttpClient) { }

  buscarCep(cep: string): Observable<any> {
    return this.http.get<any>(`https://brasilapi.com.br/api/cep/v1/${cep}`);
  }
}
