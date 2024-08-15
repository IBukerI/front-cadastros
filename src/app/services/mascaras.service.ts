import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MascarasService {

  public celular = '(00) 0 0000-0000';
  public telefone = '(00) 0000-0000';
  public cep = '00000-000';
  public cpf = '000.000.000-00';
  public cnpj = '00.000.000/0000-00';
  public data = '00/00/0000';


  constructor() { }
}

