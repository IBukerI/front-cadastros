export class Cliente {
  id: number;
  tipo: string;
  nome: string;
  email: string;
  razaoSocial: string;
  cpf: string;
  cnpj: string;
  inscricaoEstadual: string;
  inscricaoMunicipal: string;
  telefone: string;
  rua: string;
  bairro: string;
  numero: string;
  cidade: string;
  estado: string;
  cep: string;
  complemento: string;
  cpfCnpj: string;

  constructor(
    id: number = 0,
    tipo: string = '',
    nome: string = '',
    cpf: string = '',
    razaoSocial: string = '',
    cnpj: string = '',
    inscricaoEstadual: string = '',
    inscricaoMunicipal: string = '',
    email: string = '',
    telefone: string = '',
    rua: string = '',
    bairro: string = '',
    numero: string = '',
    cidade: string = '',
    estado: string = '',
    cep: string = '',
    complemento: string = ''
  ) {
    this.id = id;
    this.tipo = tipo;
    this.nome = nome;
    this.razaoSocial = razaoSocial;
    this.cpf = cpf;
    this.cnpj = cnpj;
    this.inscricaoEstadual = inscricaoEstadual;
    this.inscricaoMunicipal = inscricaoMunicipal;
    this.email = email;
    this.telefone = telefone;
    this.rua = rua;
    this.bairro = bairro;
    this.numero = numero;
    this.cidade = cidade;
    this.estado = estado;
    this.cep = cep;
    this.complemento = complemento;
    this.cpfCnpj = cpf || cnpj;
  }
}
