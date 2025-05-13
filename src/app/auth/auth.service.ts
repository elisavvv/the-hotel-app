/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:3000/auth';
  private authStatus = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,
    private router: Router // Добавлен Router в конструктор
  ) {
    this.authStatus.next(!!this.getToken());
  }

  login(username: string, password: string): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${this.API_URL}/login`, { username, password })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          this.authStatus.next(true);
          this.router.navigate(['/booking']);
        })
      );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, { username, email, password });
  }

  isAuthenticated(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  logout() {
    localStorage.removeItem('token');
    this.authStatus.next(false);
  }
}*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:3000/auth';
  private authStatus = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router // Добавлен Router в конструктор
  ) {
    this.authStatus.next(!!this.getToken());
  }

  login(username: string, password: string): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${this.API_URL}/login`, { username, password })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          this.authStatus.next(true);
          this.router.navigate(['/booking']); // Теперь router доступен
        })
      );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, { username, email, password });
  }

  isAuthenticated(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  logout() {
    localStorage.removeItem('token');
    this.authStatus.next(false);
    this.router.navigate(['/login']); // Перенаправление при выходе
  }
}