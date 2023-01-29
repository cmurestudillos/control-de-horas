import { Injectable } from '@angular/core';
// Modelo de Datos
import { Action } from '../interface/Action';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchAction( search: string, acciones: Action[] ){
    search = search.toLocaleLowerCase() || '';
    return acciones.filter((item) => item.nombre.toLocaleLowerCase().indexOf(search) > -1);
  }

}
