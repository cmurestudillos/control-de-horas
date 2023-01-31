import { Injectable } from '@angular/core';
// Libreria de fechas
import {format} from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchAccion( search: string, acciones: any[] ){
    search = search.toLocaleLowerCase() || '';
    return acciones.filter((item) => item.nombre.toLocaleLowerCase().indexOf(search) > -1);
  }

  searchProyecto( search: string, proyectos: any[] ){
    search = search.toLocaleLowerCase() || '';
    return proyectos.filter((item) => item.nombre.toLocaleLowerCase().indexOf(search) > -1);
  }

  searchCliente( search: string, clientes: any[] ){
    search = search.toLocaleLowerCase() || '';
    return clientes.filter((item) => item.nombre.toLocaleLowerCase().indexOf(search) > -1 ||
                                     item.proyecto.nombre.toLocaleLowerCase().indexOf(search) > -1);
  }

  searchTarea( search: string, tareas: any[] ){
    search = search.toLocaleLowerCase() || '';
    return tareas.filter((item) => item.cliente.nombre.toLocaleLowerCase().indexOf(search) > -1 ||
                                   item.proyecto.nombre.toLocaleLowerCase().indexOf(search) > -1 ||
                                   item.accion.nombre.toLocaleLowerCase().indexOf(search) > -1 ||
                                   item.tiempo.toString().toLocaleLowerCase().indexOf(search) > -1);
  }

  searchDate( search: string, tareas: any[] ){
    search = search || '';
    return tareas.filter((item) => format(new Date(item.fecha), 'dd/MM/yyyy').indexOf(format(new Date(search), 'dd/MM/yyyy')) > -1);
  }

}
