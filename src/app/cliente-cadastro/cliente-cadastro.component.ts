import { ConsultaCepService } from './../services/consulta-cep.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClienteService } from '../services/clientes.service';
import { Cliente } from '../models/cliente.model';
import  * as bootstrap from 'bootstrap';
import { ConsultaCnpjService } from '../services/consulta-cnpj.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MascarasService } from '../services/mascaras.service';
import { ValidaCpfService } from '../services/valida-cpf.service';


@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.scss']
})
export class ClienteCadastroComponent implements OnInit {
  cliente: Cliente = new Cliente();
  clientes: Cliente[] = [];
  filteredClientes: Cliente[] = [];
  searchTerm: string = '';
  mensagemSucesso: string = '';
  mensagemErro: string = '';
  cepInvalido: boolean = false;
  cpfInvalido: boolean = false;

  constructor(private clienteService: ClienteService,  private consultaCepService: ConsultaCepService,
    private consultaCnpjService: ConsultaCnpjService, private snackBar: MatSnackBar, private mascarasService: MascarasService,
    private validaCpfService: ValidaCpfService
  ) {}

  ngOnInit(): void {
    this.obterClientes();
  }

  obterClientes(): void {
    this.clienteService.obterClientes().subscribe(data => {
      this.clientes = data.clientes.map((item: any) => ({
        id: item.cliente.id,
        nome: item.cliente.nome,
        cpfCnpj: item.cliente.cpf ? item.cliente.cpf : item.cliente.cnpj
      }));
      this.filteredClientes = this.clientes;
    });
  }
  searchClientes(): void {
    if (this.searchTerm) {
      this.filteredClientes = this.clientes.filter(cliente =>
        cliente.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredClientes = this.clientes;
    }
  }

  openCadastroModal(): void {
    const modalElement = document.getElementById('cadastroClienteModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.clienteService.cadastrarCliente(this.cliente).subscribe(
        response => {
          this.mensagemSucesso = 'Cliente cadastrado com sucesso!';
          this.mensagemErro = '';
          console.log('Cliente cadastrado com sucesso!', response);
          form.resetForm();
          this.cliente = new Cliente();
          this.obterClientes(); // Atualiza a lista de clientes após o cadastro
        },
        error => {
          this.mensagemErro = 'Erro ao cadastrar cliente';
          this.mensagemSucesso = '';
          console.error('Erro ao cadastrar cliente', error);
        }
      );
    }
  }

  buscarDadosCep(cep: string) {
    if (cep && cep.length === 8) {
      this.consultaCepService.buscarCep(cep).subscribe(
        data => {
          this.cliente.rua = data.street;
          this.cliente.bairro = data.neighborhood;
          this.cliente.cidade = data.city;
          this.cliente.estado = data.state;
        },
        error => {
          this.cepInvalido = true;
        }
      );
    }
  }

  buscarDadosCNPJ(cnpj: string) {
    if (cnpj && cnpj.length === 14) {
      let resp;
      this.consultaCnpjService.buscarDadosCNPJ(cnpj).subscribe(
        data => {
          if(data.situacao_cadastral === 2 || data.situacao_cadastral === 5) {
            this.cliente.razaoSocial = data.razao_social;
            this.cliente.nome = data.nome_fantasia;
            this.cliente.cep = data.cep;
            if (data.cep) {
              this.buscarDadosCep(this.cliente.cep);
            }
          } else if (data.situacao_cadastral === 8) {
            this.snackBar.open('CNPJ Baixado', 'Fechar', {
              duration: 3000,
            });
          } else if (data.situacao_cadastral === 3) {
            this.snackBar.open('CNPJ Suspenso', 'Fechar', {
              duration: 3000,
            });
          } else if (data.situcao_cadastral === 4){
            this.snackBar.open('CNPJ Inapto', 'Fechar', {
              duration: 3000,
            });
          } else if (data.situacao_cadastral === 1) {
            this.snackBar.open('CNPJ Nulo', 'Fechar', {
              duration: 3000,
            });
          }
        },
        error => {
          this.snackBar.open('CNPJ Inválido', 'Fechar', {
            duration: 3000,
            panelClass: ['red-snackbar']
          });
        }
      );
      if (resp) {
        console.log('teste')
      }
    }
  }

  validaCpf(cpf: string) {
    if (cpf && cpf.length === 11) {
      if (!this.validaCpfService.validaCPF(cpf)) {
        this.snackBar.open('CPF inválido', 'Fechar', {
          duration: 3000,
          panelClass: ['red-snackbar']
        });
      }
      if (!this.cpfInvalido) {
        console.log('CPF válido, buscar no banco se já existe cadastro com esse CPF')
        this.consultaCpf(cpf);
      }
    }
  }

  consultaCpf(cpf: string) {

  }
  
}
