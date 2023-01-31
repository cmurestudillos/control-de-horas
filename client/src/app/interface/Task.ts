// Modelo de Datos
import { Action } from "./Action";
import { Client } from "./Client";
import { Project } from "./Project";

export class Task {
  _id!: string;
  fecha!: Date;
  usuario!: string;
  cliente!: Client;
  proyecto!: Project;
  accion!: Action;
  tiempo!: number;
}
