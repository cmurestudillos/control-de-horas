import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
// Formulario
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Operadores y Observables
import { Subscription } from 'rxjs';
// Modelo de datos
import { Project } from 'src/app/interface/Project';
// Servicios
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProyectosService } from 'src/app/pages/proyectos/services/proyectos.service';
import { SearchService } from 'src/app/services/search.service';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: []
})
export class ProyectosComponent implements OnInit, OnDestroy {
  currentUser!: any;
  formulario!: FormGroup;
  listProjects: Project[] = [];
  projectsArray!: Project[];
  itemSelected!: Project;
  isSelected: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public authService: AuthService,
    public searchService: SearchService,
    public proyectosService: ProyectosService,
    private notificationService: NotificationService,
    private subscriptionService: SubscriptionService) {
      this.formulario = this.fb.group({
        nombre: new FormControl('', [Validators.required])
      });
    }

  ngOnInit(): void{
    this.isSelected = false;
    this.currentUser = this.authService.getUsuario();
    this.getProjectsData();
  }

  ngOnDestroy(): void {
    this.subscriptionService.clearSubscriptions();
  }

  getProjectsData() {
    this.subscriptions.push(
      this.proyectosService.obtenerProyectos().subscribe((data:any) => {
        this.listProjects = data.proyectos
        this.projectsArray = data.proyectos;
      })
    )
  }

  onSubmit(): void{
    if(this.isSelected){
      this.actualizarProyecto(this.itemSelected);
    } else {
      this.crearProyecto();
    }
  }

  dataTableChange(evt: boolean): void {
    if (evt) {
      this.getProjectsData();
    }
  }

  inputSearch(search: string): void{
    const newArray = this.searchService.searchProyecto(search, this.listProjects);
    this.projectsArray = newArray;
  }


  obtenerProyectoById(id: string): void{
    this.isSelected = true;
    this.subscriptions.push(
      this.proyectosService.obtenerProyectoById(id).subscribe((data:any) => {
        this.itemSelected = data.proyecto;
        this.formulario.patchValue({nombre: this.itemSelected.nombre});
     },
      (error: HttpErrorResponse) => {
        const mensaje = error.error.msg;
        this.notificationService.showErrorMessage(mensaje);
      })
    );
  }

  crearProyecto(): void{
    this.subscriptions.push(
      this.proyectosService.crearProyecto(this.formulario).subscribe((data:any) => {
        this.formulario.reset();
        this.dataTableChange(true);
        this.notificationService.showSuccessMessage(data.msg);
     },
      (error: HttpErrorResponse) => {
        const mensaje = error.error.msg;
        this.notificationService.showErrorMessage(mensaje);
      })
    );
  }

  actualizarProyecto(value: Project): void{
    this.subscriptions.push(
      this.proyectosService.actualizarProyecto(value._id, this.formulario).subscribe((data:any) => {
        this.isSelected = false;
        this.formulario.reset();
        this.getProjectsData();
        this.notificationService.showSuccessMessage(data.msg);
     },
      (error: HttpErrorResponse) => {
        const mensaje = error.error.msg;
        this.notificationService.showErrorMessage(mensaje);
      })
    );
  }

  eliminarProyecto(id: string): void{
    this.subscriptions.push(
      this.proyectosService.eliminarProyecto(id).subscribe((data:any) => {
        this.isSelected = false;
        this.formulario.reset();
        this.getProjectsData();
        this.notificationService.showSuccessMessage(data.msg);
     },
      (error: HttpErrorResponse) => {
        const mensaje = error.error.msg;
        this.notificationService.showErrorMessage(mensaje);
      })
    );
  }

  cancelar(): void{
    this.isSelected = false;
    this.formulario.reset();
    this.getProjectsData();
  }

}
