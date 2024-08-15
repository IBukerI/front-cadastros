export class Email {
  email: string;

  constructor(email: string = '') {
    this.email = email;
  }
}

export class ListaDeEmails {
  emails: Email[];

  constructor(emails: Email[] = []) {
    this.emails = emails;
  }

  adicionarEmail(email: Email): void {
    this.emails.push(email);
  }

  removerEmail(index: number): void {
    if (index >= 0 && index < this.emails.length) {
      this.emails.splice(index, 1);
    }
  }

  listarEmails(): Email[] {
    return this.emails;
  }
}
