import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = `${this.configService.getApiUrl()}/cliente`;
  }

  cadastrarCliente(cliente: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/criar`, cliente);
  }

  obterClientes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clientes`);
  }

  obterClientePorCpf(cpf: string): Observable<any> {
    const params = new HttpParams().set('cpf', cpf);
    return this.http.get(`${this.apiUrl}/obter-cliente-por-cpf`, { params });
  }

  obterClientePorCnpj(cnpj: string): Observable<any> {
    const params = new HttpParams().set('cnpj', cnpj);
    return this.http.get(`${this.apiUrl}/obter-cliente-por-cnpj`, { params });
  }
}
