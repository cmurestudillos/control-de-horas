import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Servicios
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {
  currentUser!: any;
  userName!: string;

  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getUsuario();
    let usuario = JSON.parse(this.currentUser);
    this.userName = usuario?.nombre;
  }

  logOut() {
    this.currentUser = null;
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }

}
