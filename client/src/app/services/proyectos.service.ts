import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
// Formularios
import { FormGroup } from '@angular/forms';
// Operadores y Observables
import { Observable } from 'rxjs';
// Modelo de Datos
import { Project } from '../interface/Project';

@Injectable({
  providedIn: 'root',
})
export class ProyectosService {
  endpoint: string = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  // Obtener Proyectos
  obtenerProyectos(): Observable<Project> {
    return this.http.get<Project>(`${this.endpoint}/api/proyectos/`);
  }

  // Obtener detalle de Proyecto
  obtenerProyectoById(id:string): Observable<any> {
    return this.http.get(`${this.endpoint}/api/proyectos/${id}`);
  }

  // Crear Proyecto
  crearProyecto(valueForm: FormGroup): Observable<Project> {
    const data = {nombre: valueForm.value.nombre};
    return this.http.post<Project>(`${this.endpoint}/api/proyectos`, data);
  }

  // Actualizar Proyecto
  actualizarProyecto(id:string, valueForm: FormGroup): Observable<Project> {
    const data = {nombre: valueForm.value.nombre};
    return this.http.put<Project>(`${this.endpoint}/api/proyectos/${id}`, data);
  }

  // Eliminar Proyecto
  eliminarProyecto(id:string): Observable<Project> {
    return this.http.delete<Project>(`${this.endpoint}/api/proyectos/${id}`);
  }

}
