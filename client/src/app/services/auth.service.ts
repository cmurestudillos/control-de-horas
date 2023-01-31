import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
// Operadores y Observables
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
// Modelo de datos
import { User } from '../interface/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = 'http://localhost:4000';
  headers = new HttpHeaders().set('Authorization', 'application/json');
  currentUser!: User;
  public isShowSideNav: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly sidenav: Observable<boolean> = this.isShowSideNav.asObservable();

  constructor(private http: HttpClient, public router: Router) {}

  setShowSidenav(value: boolean): void {
    this.isShowSideNav.next(value);
  }

  getsetShowSidenav(): boolean {
    return this.isShowSideNav.getValue();
  }

  iniciarSesion(user: User) {
    return this.http.post<any>(`${this.endpoint}/api/auth`, user).subscribe((res: any) => {
        localStorage.setItem('token', res.token);
        this.getUserProfile(res.usuario._id).subscribe((res) => {
          const usuario = localStorage.getItem('usuario');
          if (usuario === null){
            this.currentUser = {
              _id: res.usuario._id,
              nombre: res.usuario.nombre,
              email: res.usuario.email
            };
            localStorage.setItem('usuario', JSON.stringify(this.currentUser));
            this.setShowSidenav(true);
          }
        });
        this.router.navigate(['tareas']);
      });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUsuario(){
    return localStorage.getItem('usuario');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('token');
    return authToken !== null ? true : false;
  }

  cerrarSesion() {
    let removeUser = localStorage.removeItem('usuario');
    let removeToken = localStorage.removeItem('token');
    if (removeToken == null && removeUser == null) {
      this.router.navigate(['login']);
    }
  }

  usuarioAutenticado() {
    return this.http.get(`${this.endpoint}/api/auth`);
  }

  // User profile
  getUserProfile(id: any): Observable<any> {
    let api = `${this.endpoint}/api/usuarios/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client error
      msg = error.error.message;
    } else {
      // server error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return msg;
  }
}
