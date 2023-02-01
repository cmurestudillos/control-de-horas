import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
// Formularios
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
// Operadores y Observables
import { Subscription } from 'rxjs';
// Modelo de Datos
import { Task } from 'src/app/interface/Task';
import { Client } from 'src/app/interface/Client';
import { Project } from 'src/app/interface/Project';
import { Action } from 'src/app/interface/Action';
// Servicios
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SearchService } from 'src/app/services/search.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { TareasService } from 'src/app/pages/tareas/services/tareas.service';
import { ClientesService } from 'src/app/pages/clientes/services/clientes.service';
import { ProyectosService } from 'src/app/pages/proyectos/services/proyectos.service';
import { AccionesService } from 'src/app/pages/acciones/services/acciones.service';
import { ExportService } from 'src/app/services/export.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: []
})
export class TareasComponent implements OnInit, OnDestroy {
  currentUser!: any;
  formulario!: FormGroup;
  listTasks: Task[] = [];
  tasksArray!: Task[];
  clientsArray!: Client[];
  projectsArray!: Project[];
  actionsArray!: Action[];
  itemSelected!: Task;
  isSelected!: boolean;
  userId!: string;
  private subscriptions: Subscription[] = [];

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public searchService: SearchService,
    public tareasService: TareasService,
    public clientesService: ClientesService,
    public proyectosService: ProyectosService,
    public accionesService: AccionesService,
    private notificationService: NotificationService,
    private exportService: ExportService,
    private subscriptionService: SubscriptionService) {
      this.formulario = this.fb.group({
        fecha: new FormControl('', [Validators.required]),
        usuario: new FormControl('', [Validators.required]),
        cliente: new FormControl('', [Validators.required]),
        proyecto: new FormControl('', [Validators.required]),
        accion: new FormControl('', [Validators.required]),
        tiempo: new FormControl('', [Validators.required])
      });
    }

  ngOnInit(): void{
    this.isSelected = false;
    this.getData();
  }

  ngOnDestroy(): void {
    this.subscriptionService.clearSubscriptions();
  }

  getData():void{
    this.currentUser = this.authService.getUsuario();
    let idUser = JSON.parse(this.currentUser);
    this.userId = idUser?._id;
    this.getTasksData();
    this.getClientsData();
    this.getProjectsData();
    this.getActionsData();
  }

  getTasksData() {
    this.subscriptions.push(
      this.tareasService.obtenerTareas(this.userId).subscribe((data:any) => {
        this.listTasks = data.tareas;
        this.tasksArray = data.tareas;
      },
      (error: HttpErrorResponse) => {
        const mensaje = error.error;
        this.notificationService.showErrorMessage(mensaje);
      })
    )
  }

  getClientsData() {
    this.subscriptions.push(
      this.clientesService.obtenerClientes().subscribe((data:any) => {
        this.clientsArray = data.clientes;
      })
    )
  }

  getProjectsData() {
    this.subscriptions.push(
      this.proyectosService.obtenerProyectos().subscribe((data:any) => {
        this.projectsArray = data.proyectos;
      })
    )
  }

  getActionsData() {
    this.subscriptions.push(
      this.accionesService.obtenerAcciones().subscribe((data:any) => {
        this.actionsArray = data.acciones;
      })
    )
  }

  getClientProjects(event: Client): void{
    this.subscriptions.push(
      this.proyectosService.obtenerProyectos().subscribe((data:any) => {
        this.projectsArray = data.proyectos.filter((item:any) => item._id === event.proyecto._id);
      })
    )
  }

  onSubmit(): void{
    if(this.isSelected){
      this.actualizarTarea(this.itemSelected);
    } else {
      let user = JSON.parse(this.currentUser);
      this.formulario.patchValue({usuario: user});
      this.crearTarea();
    }
  }

  dataTableChange(evt: boolean): void {
    if (evt) {
      this.getTasksData();
    }
  }

  inputSearch(search: string): void{
    const newArray = this.searchService.searchTarea(search, this.listTasks);
    this.tasksArray = newArray;
  }

  inputSearchDate(search: string): void{
    const newArray = this.searchService.searchDate(search, this.listTasks);
    this.tasksArray = newArray;
  }

  obtenerTareaById(id: string): void{
    this.isSelected = true;
    this.subscriptions.push(
      this.tareasService.obtenerTareaById(id).subscribe((data:any) => {
        this.itemSelected = data.tarea[0];
        this.formulario.patchValue({fecha: this.itemSelected.fecha});
        for (const iterator of this.clientsArray) {
          if (iterator._id === this.itemSelected.cliente._id) {
            this.formulario.patchValue({cliente: iterator});
          }
        }
        let ind = 0;
        for (const iterator of this.projectsArray) {
          if (iterator._id === this.itemSelected.proyecto._id) {
            this.formulario.patchValue({proyecto: iterator});
          } else {
            this.projectsArray.splice(ind)
          }
          ind += 1;
        }
        for (const iterator of this.actionsArray) {
          if (iterator._id === this.itemSelected.accion._id) {
            this.formulario.patchValue({accion: iterator});
          }
        }
        this.formulario.patchValue({tiempo: this.itemSelected.tiempo});
     },
      (error: HttpErrorResponse) => {
        const mensaje = error.error.msg;
        this.notificationService.showErrorMessage(mensaje);
      })
    );
  }

  crearTarea(): void{
    this.subscriptions.push(
      this.tareasService.crearTarea(this.formulario).subscribe((data:any) => {
        this.isSelected = false;
        this.formulario.reset();
        this.dataTableChange(true);
        this.notificationService.showSuccessMessage(data.msg);
     },
      (error: HttpErrorResponse) => {
        const mensaje = error.error;
        this.notificationService.showErrorMessage(mensaje);
      })
    );
  }

  actualizarTarea(value: Task): void{
    this.subscriptions.push(
      this.tareasService.actualizarTarea(value._id, this.formulario).subscribe((data:any) => {
        this.cancelar();
        this.notificationService.showSuccessMessage(data.msg);
     },
      (error: HttpErrorResponse) => {
        const mensaje = error.error;
        this.notificationService.showErrorMessage(mensaje);
      })
    );
  }

  eliminarTarea(id: string): void{
    this.subscriptions.push(
      this.tareasService.eliminarTarea(id).subscribe((data:any) => {
        this.cancelar();
        this.notificationService.showSuccessMessage(data.msg);
     },
      (error: HttpErrorResponse) => {
        const mensaje = error.error;
        this.notificationService.showErrorMessage(mensaje);
      })
    );
  }

  cancelar(): void{
    this.isSelected = false;
    this.formulario.reset();
    this.getTasksData();
  }

  exportToExcel(): void {
    this.exportService.exportToExcel(this.tasksArray)
  }

}
