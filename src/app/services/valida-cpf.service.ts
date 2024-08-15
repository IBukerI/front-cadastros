import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidaCpfService {

  constructor() { }

  validaCPF(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, '');
    if(cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    let result = true;
    [9,10].forEach(j => {
      let soma = 0, r;
      cpf.split(/(?=)/).splice(0,j).forEach((e, i) => {
        soma += parseInt(e) * ((j+2)-(i+1));
      });
      r = soma % 11;
      r = (r <2)?0:11-r;
      if(r != parseInt(cpf.substring(j,j+1)) ) result = false;
    });
    return result;
  }

}
