import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Servicios
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {


  currentUser!: any;

  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit(): void{
    this.currentUser = this.authService.getUsuario();
  }

  logOut() {
    this.currentUser = null;
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }

}
