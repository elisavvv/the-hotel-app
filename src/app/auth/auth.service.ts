import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/auth';
  private authStatus = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router 
  ) {
    this.authStatus.next(!!this.getToken());
  }

  login(username: string, password: string): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          this.authStatus.next(true);
          this.router.navigate(['/']); 
        })
      );
  }

  register(username: string, email: string, password: string): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${this.apiUrl}/register`, { 
      username, 
      email, 
      password 
    }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.authStatus.next(true);
        this.router.navigate(['/']);
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  logout(): void{
    localStorage.removeItem('token');
    this.authStatus.next(false);
    this.router.navigate(['/login']); 
  }
}




