import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
// Formularios
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
// Observables y Operadores
import { Subscription } from 'rxjs';
// Modelo de Datos
import { Action } from 'src/app/interface/Action';
// Servicios
import { AuthService } from 'src/app/services/auth.service';
import { SearchService } from 'src/app/services/search.service';
import { AccionesService } from 'src/app/services/acciones.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SubscriptionService } from 'src/app/services/subscription.service';


@Component({
  selector: 'app-acciones',
  templateUrl: './acciones.component.html',
  styleUrls: ['./acciones.component.css']
})
export class AccionesComponent implements OnInit, OnDestroy {
  currentUser!: any;
  formulario!: FormGroup;
  listActions: Action[] = [];
  actionsArray!: Action[];
  itemSelected!: Action;
  isSelected: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public authService: AuthService,
    public searchService: SearchService,
    public accionesService: AccionesService,
    private notificationService: NotificationService,
    private subscriptionService: SubscriptionService) {
      this.formulario = this.fb.group({
        nombre: new FormControl('', [Validators.required])
      });
    }

  ngOnInit(): void{
    this.isSelected = false;
    this.currentUser = this.authService.getUsuario();
    this.getActionsData();
  }

  ngOnDestroy(): void {
    this.subscriptionService.clearSubscriptions();
  }

  getActionsData() {
    this.subscriptions.push(
      this.accionesService.obtenerAcciones().subscribe((data:any) => {
        this.listActions = data.acciones
        this.actionsArray = data.acciones;
      })
    )
  }

  onSubmit(): void{
    if(this.isSelected){
      this.actualizarAccion(this.itemSelected);
    } else {
      this.crearAccion();
    }
  }

  dataTableChange(evt: boolean): void {
    if (evt) {
      this.getActionsData();
    }
  }

  inputSearch(search: string): void{
    const newArray = this.searchService.searchAction(search, this.listActions);
    this.actionsArray = newArray;
  }

  obtenerAccionById(id: string): void{
    this.isSelected = true;
    this.subscriptions.push(
      this.accionesService.obtenerAccionById(id).subscribe((data:any) => {
        this.itemSelected = data.accion;
        this.formulario.patchValue({nombre: this.itemSelected.nombre});
     },
      (error: HttpErrorResponse) => {
        const mensaje = error.error.msg;
        this.notificationService.showErrorMessage(mensaje);
      })
    );
  }

  crearAccion(): void{
    this.subscriptions.push(
      this.accionesService.createAccion(this.formulario).subscribe((data:any) => {
        this.formulario.controls.nombre.reset();
        this.dataTableChange(true);
        this.notificationService.showSuccessMessage(data.msg);
     },
      (error: HttpErrorResponse) => {
        const mensaje = error.error.msg;
        this.notificationService.showErrorMessage(mensaje);
      })
    );
  }


  actualizarAccion(value: Action): void{
    this.subscriptions.push(
      this.accionesService.actualizarAccion(value._id, this.formulario).subscribe((data:any) => {
        this.isSelected = false;
        this.formulario.controls.nombre.reset();
        this.getActionsData();
        this.notificationService.showSuccessMessage(data.msg);
     },
      (error: HttpErrorResponse) => {
        const mensaje = error.error.msg;
        this.notificationService.showErrorMessage(mensaje);
      })
    );
  }

  eliminarAccion(id: string): void{
    this.subscriptions.push(
      this.accionesService.eliminarAccion(id).subscribe((data:any) => {
        this.isSelected = false;
        this.formulario.reset();
        this.getActionsData();
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
    this.getActionsData();
  }

  logOut() {
    this.currentUser = null;
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }

}
