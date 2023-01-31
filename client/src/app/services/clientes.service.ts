import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
// Formularios
import { FormGroup } from '@angular/forms';
// Operadores y Observables
import { Observable } from 'rxjs';
// Modelo de Datos
import { Client } from '../interface/Client';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  endpoint: string = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  // Obtener Clientes
  obtenerClientes(): Observable<Client> {
    return this.http.get<Client>(`${this.endpoint}/api/clientes/`);
  }

  // Obtener detalle de un Cliente
  obtenerClienteById(id:string): Observable<any> {
    return this.http.get(`${this.endpoint}/api/clientes/${id}`);
  }

  // Crear Cliente
  crearCliente(valueForm: FormGroup): Observable<Client> {
    const data = {
      nombre: valueForm.value.nombre,
      proyecto: valueForm.value.proyecto
    };
    return this.http.post<Client>(`${this.endpoint}/api/clientes`, data);
  }

  // Actualizar Cliente
  actualizarCliente(id:string, valueForm: FormGroup): Observable<Client> {
    const data = {
      nombre: valueForm.value.nombre,
      proyecto: valueForm.value.proyecto
    };
    return this.http.put<Client>(`${this.endpoint}/api/clientes/${id}`, data);
  }

  // Eliminar Cliente
  eliminarCliente(id:string): Observable<Client> {
    return this.http.delete<Client>(`${this.endpoint}/api/clientes/${id}`);
  }

}
