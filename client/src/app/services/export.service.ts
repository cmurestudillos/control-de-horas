import { Injectable } from '@angular/core';
// Fecha
import { format } from 'date-fns';
// Exportar a Excel
import { utils, writeFileXLSX } from 'xlsx';
// Modelo de datos
import { Task } from '../interface/Task';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  exportToExcel(listado: Task[]) {
    const date = format(new Date(), 'dd-MM-yyy');

    let newArray: any = [];
    listado.forEach((item: any) => {
      newArray.push({
        fecha: item.fecha,
        cliente: item.cliente.nombre,
        proyecto: item.proyecto.nombre,
        accion: item.accion.nombre,
        tiempo: item.tiempo,
      });
    });

    const ws = utils.json_to_sheet(newArray);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Hoja1');
    writeFileXLSX(wb, `control-de-horas-${date}.xlsx`);
  }
}
