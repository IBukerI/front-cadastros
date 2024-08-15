import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ValidationService } from '../services/validation.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  passwordVisible: boolean = false;
  emailError: string = '';
  passwordError: string = '';
  errorMessage: string = '';


  constructor(private authService: AuthService, private router: Router,
  private validationService: ValidationService) {}

  login(): void {
    this.clearErrors();

    if (!this.email) {
      this.emailError = 'Por favor entre com um E-mail';
    } else if (!this.validationService.isValidEmail(this.email)) {
      this.emailError = 'Por favor entre com um E-mail válido';
    }

    if (!this.password) {
      this.passwordError = 'Por favor entre com uma Senha';
    }

    if (!this.emailError && !this.passwordError) {
      this.authService.login(this.email, this.password).subscribe(success => {
        if (success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'E-mail ou Senha Incorreta';
        }
      });
    }
  }


  clearErrors(): void {
    this.emailError = '';
    this.passwordError = '';
    this.errorMessage = '';
  }


}
