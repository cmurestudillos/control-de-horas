import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
// Formularios
import { FormGroup } from '@angular/forms';
// Operadores y Observables
import { Observable } from 'rxjs';
// Modelo de Datos
import { Task } from '../interface/Task';

@Injectable({
  providedIn: 'root',
})
export class TareasService {
  endpoint: string = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  // Obtener Tareas
  obtenerTareas(usuario: string): Observable<Task> {
    return this.http.get<Task>(`${this.endpoint}/api/tareas/usuario/${usuario}`);
  }

  // Obtener detalle de una Tarea
  obtenerTareaById(id:string): Observable<any> {
    return this.http.get(`${this.endpoint}/api/tareas/${id}`);
  }

  // Crear Tarea
  crearTarea(valueForm: FormGroup): Observable<Task> {
    const data = {
      fecha: valueForm.value.fecha.toString(),
      usuario: valueForm.value.usuario._id,
      cliente: valueForm.value.cliente,
      proyecto: valueForm.value.proyecto,
      accion: valueForm.value.accion,
      tiempo: valueForm.value.tiempo
    };
    return this.http.post<Task>(`${this.endpoint}/api/tareas`, data);
  }

  // Actualizar Tarea
  actualizarTarea(id:string, valueForm: FormGroup): Observable<Task> {
    const data = {
      fecha: valueForm.value.fecha,
      usuario: valueForm.value.usuario,
      cliente: valueForm.value.cliente,
      proyecto: valueForm.value.proyecto,
      accion: valueForm.value.accion,
      tiempo: valueForm.value.tiempo
    };
    return this.http.put<Task>(`${this.endpoint}/api/tareas/${id}`, data);
  }

  // Eliminar Tarea
  eliminarTarea(id:string): Observable<Task> {
    return this.http.delete<Task>(`${this.endpoint}/api/tareas/${id}`);
  }

}