import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-auth',
  imports: [],
  templateUrl: './nav-auth.html',
  styleUrl: './nav-auth.css',
})
export class NavAuth {

  router = inject(Router);

  irALogin() {
    this.router.navigateByUrl('/login');
  }

  irARegistro() {
    this.router.navigateByUrl('/registro');
  }
}