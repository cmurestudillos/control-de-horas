import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
// Formularios
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
// Operadores y Observables
import { Subscription } from 'rxjs';
// Modelo de Datos
import { Client } from 'src/app/interface/Client';
import { Project } from 'src/app/interface/Project';
// Servicios
import { AuthService } from 'src/app/services/auth.service';
import { ClientesService } from 'src/app/pages/clientes/services/clientes.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProyectosService } from 'src/app/pages/proyectos/services/proyectos.service';
import { SearchService } from 'src/app/services/search.service';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: []
})
export class ClientesComponent implements OnInit, OnDestroy {
  currentUser!: any;
  formulario!: FormGroup;
  listClients: Client[] = [];
  clientsArray!: Client[];
  projectsArray!: Project[];
  selectedValue!: string;
  itemSelected!: Client;
  isSelected: boolean = false;
  isRequired: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public searchService: SearchService,
    public clientesService: ClientesService,
    public proyectosService: ProyectosService,
    private notificationService: NotificationService,
    private subscriptionService: SubscriptionService) {
      this.formulario = this.fb.group({
        nombre: new FormControl(''),
        proyecto: new FormControl('')
      });
    }

  ngOnInit(): void{
    this.isSelected = false;
    this.currentUser = this.authService.getUsuario();
    this.getClientsData();
    this.getProjectsData();
  }

  ngOnDestroy(): void {
    this.subscriptionService.clearSubscriptions();
  }

  getClientsData() {
    this.subscriptions.push(
      this.clientesService.obtenerClientes().subscribe((data:any) => {
        this.listClients = data.clientes
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

  onSubmit(): void{
    if(this.isSelected){
      this.actualizarCliente(this.itemSelected);
    } else {
      this.crearCliente();
    }
  }

  dataTableChange(evt: boolean): void {
    if (evt) {
      this.getClientsData();
    }
  }

  inputSearch(search: string): void{
    const newArray = this.searchService.searchCliente(search, this.listClients);
    this.clientsArray = newArray;
  }


  obtenerClienteById(id: string): void{
    this.isSelected = true;
    this.subscriptions.push(
      this.clientesService.obtenerClienteById(id).subscribe((data:any) => {
        this.itemSelected = data.cliente;
        this.formulario.patchValue({nombre: this.itemSelected.nombre});
        for (const iterator of this.projectsArray) {
          if (iterator._id === this.itemSelected.proyecto._id) {
            this.formulario.patchValue({proyecto: iterator._id});
          }
        }
     },
      (error: HttpErrorResponse) => {
        const mensaje = error.error.msg;
        this.notificationService.showErrorMessage(mensaje);
      })
    );
  }

  crearCliente(): void{
    this.subscriptions.push(
      this.clientesService.crearCliente(this.formulario).subscribe((data:any) => {
        this.isRequired = false;
        this.formulario.reset();
        this.dataTableChange(true);
        this.notificationService.showSuccessMessage(data.msg);
     },
      (error: HttpErrorResponse) => {
        this.isRequired = true;
        const mensaje = error.error.toString();
        this.notificationService.showErrorMessage(mensaje);
      })
    );
  }

  actualizarCliente(value: Client): void{
    this.subscriptions.push(
      this.clientesService.actualizarCliente(value._id, this.formulario).subscribe((data:any) => {
        this.isRequired = false;
        this.isSelected = false;
        this.formulario.reset();
        this.getClientsData();
        this.notificationService.showSuccessMessage(data.msg);
     },
      (error: HttpErrorResponse) => {
        this.isRequired = true;
        const mensaje = error.error.toString();
        this.notificationService.showErrorMessage(mensaje);
      })
    );
  }

  eliminarCliente(id: string): void{
    this.subscriptions.push(
      this.clientesService.eliminarCliente(id).subscribe((data:any) => {
        this.isRequired = false;
        this.isSelected = false;
        this.getClientsData();
        this.notificationService.showSuccessMessage(data.msg);
     },
      (error: HttpErrorResponse) => {
        const mensaje = error.error.toString();
        this.notificationService.showErrorMessage(mensaje);
      })
    );
  }

  cancelar(): void{
    this.isRequired = false;
    this.isSelected = false;
    this.formulario.reset();
    this.getClientsData();
  }

}
