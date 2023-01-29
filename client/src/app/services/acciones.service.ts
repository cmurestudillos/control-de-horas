import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
// Operadores y Observables
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
// Modelo de datos
import { User } from '../interface/User';

@Injectable({
  providedIn: 'root',
})
export class AccionesService {
  endpoint: string = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  // Obtener acciones
  obtenerAcciones(): Observable<any> {
    let api = `${this.endpoint}/api/acciones/`;
    return this.http.get(api).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // Crear Acción
  createAccion(data: any): Observable<any> {
    return this.http
      .post(`${this.endpoint}/api/acciones`, data)
      .pipe(catchError(this.handleError));
  }

  eliminarAccion(id:any): Observable<any> {
    return this.http.delete(`${this.endpoint}/api/acciones/${id}`).pipe(catchError(this.handleError));
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
