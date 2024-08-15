import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private configService: ConfigService
  ) {
    this.apiUrl = `${this.configService.getApiUrl()}/auth/login`;
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string }>(this.apiUrl, { email, password })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
        }),
        map(response => !!response.token),
        catchError(() => of(false))
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}


