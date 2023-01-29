import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Observables y Operadores
import { Subscription } from 'rxjs';
// Modelo de Datos
import { Action } from 'src/app/interface/Action';
// Servicios
import { AuthService } from 'src/app/services/auth.service';
import { SearchService } from 'src/app/services/search.service';
import { AccionesService } from 'src/app/services/acciones.service';

@Component({
  selector: 'app-acciones',
  templateUrl: './acciones.component.html',
  styleUrls: ['./acciones.component.css']
})
export class AccionesComponent implements OnInit, OnDestroy {
  currentUser!: any;
  displayedColumns: string[] = ['Acción'];
  listActions: Action[] = [];
  actionsArray!: Action[];
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    public authService: AuthService,
    public searchService: SearchService,
    public accionesService: AccionesService) {}

  ngOnInit(): void{
    this.currentUser = this.authService.getUsuario();
    this.accionesService.obtenerAcciones().subscribe((data:any) => {
      this.listActions = data.acciones
      this.actionsArray = data.acciones;
    })
  }

  ngOnDestroy(): void {
    this.clearSubscriptions();
  }

  inputSearch(search: string): void{
    const newArray = this.searchService.searchAction(search, this.listActions);
    this.actionsArray = newArray;
  }

  eliminarAccion(id: string): void{
    this.accionesService.eliminarAccion(id).subscribe(response => {
      console.log(response)
    });
  }

  logOut() {
    this.currentUser = null;
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }

  private clearSubscriptions(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
