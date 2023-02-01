import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
// API endpoint
import url from 'src/app/api/endpoint';
// Formularios
import { FormGroup } from '@angular/forms';
// Operadores y Observables
import { Observable } from 'rxjs';
// Modelo de Datos
import { Action } from '../../../interface/Action';

@Injectable({
  providedIn: 'root',
})
export class AccionesService {
  endpoint: string = url.api;

  constructor(private http: HttpClient) {}

  // Obtener acciones
  obtenerAcciones(): Observable<Action> {
    return this.http.get<Action>(`${this.endpoint}/acciones`);
  }

  // Obtener detalle de Accion
  obtenerAccionById(id:any): Observable<any> {
    return this.http.get(`${this.endpoint}/acciones/${id}`);
  }

  // Crear Acción
  createAccion(valueForm: FormGroup): Observable<Action> {
    const data = {nombre: valueForm.value.nombre};
    return this.http.post<Action>(`${this.endpoint}/acciones`, data);
  }

  // Actualizar Acción
  actualizarAccion(id:string, valueForm: FormGroup): Observable<Action> {
    const data = {nombre: valueForm.value.nombre};
    return this.http.put<Action>(`${this.endpoint}/acciones/${id}`, data);
  }

  // Eliminar Acción
  eliminarAccion(id:string): Observable<Action> {
    return this.http.delete<Action>(`${this.endpoint}/acciones/${id}`);
  }

}
