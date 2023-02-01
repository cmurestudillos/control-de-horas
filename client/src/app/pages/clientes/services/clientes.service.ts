import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
// API endpoint
import url from 'src/app/api/endpoint';
// Formularios
import { FormGroup } from '@angular/forms';
// Operadores y Observables
import { Observable } from 'rxjs';
// Modelo de Datos
import { Client } from '../../../interface/Client';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  endpoint: string = url.api;

  constructor(private http: HttpClient) {}

  // Obtener Clientes
  obtenerClientes(): Observable<Client> {
    return this.http.get<Client>(`${this.endpoint}/clientes/`);
  }

  // Obtener detalle de un Cliente
  obtenerClienteById(id:string): Observable<any> {
    return this.http.get(`${this.endpoint}/clientes/${id}`);
  }

  // Crear Cliente
  crearCliente(valueForm: FormGroup): Observable<Client> {
    const data = {
      nombre: valueForm.value.nombre,
      proyecto: valueForm.value.proyecto
    };
    return this.http.post<Client>(`${this.endpoint}/clientes`, data);
  }

  // Actualizar Cliente
  actualizarCliente(id:string, valueForm: FormGroup): Observable<Client> {
    const data = {
      nombre: valueForm.value.nombre,
      proyecto: valueForm.value.proyecto
    };
    return this.http.put<Client>(`${this.endpoint}/clientes/${id}`, data);
  }

  // Eliminar Cliente
  eliminarCliente(id:string): Observable<Client> {
    return this.http.delete<Client>(`${this.endpoint}/clientes/${id}`);
  }

}
