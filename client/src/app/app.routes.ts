import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [


    {
        path: "mi-perfil",
        loadComponent: () => import('./home/mi-perfil/mi-perfil').then((archivo) => archivo.MiPerfil),
        canActivate: [authGuard],
    },
    {
        path: "",
        loadComponent: () => import('./cargando/cargando').then((archivo) => archivo.Cargando),
    },
    {
        path: "cargando",
        loadComponent: () => import('./cargando/cargando').then((archivo) => archivo.Cargando),
    },
    {
        path:"login",
        loadComponent: () => import('./auth/login/login').then((archivo) => archivo.Login),
    },
    {
        path:"registro",
        loadComponent: () => import('./auth/registro/registro').then((archivo) => archivo.Registro),
    },
    {
        path: "publicaciones",
        loadComponent: () => import('./home/publicaciones/publicaciones').then((archivo) => archivo.Publicaciones),
        canActivate: [authGuard],
    },
    {
        path: "publicacion/:id",
        loadComponent: () => import('./home/publicacion/publicacion').then((archivo) => archivo.Publicacion),
        canActivate: [authGuard],
    },
    {
        path: "dashboard/usuarios",
        loadComponent: () => import('./home/dashboard-usuarios/dashboard-usuarios').then((archivo) => archivo.DashboardUsuarios),
        canActivate: [adminGuard],
    },
    {
        path: "dashboard/estadisticas",
        loadComponent: () => import('./home/dashboard-estadisticas/dashboard-estadisticas').then((archivo) => archivo.DashboardEstadisticas),
        canActivate: [adminGuard],
    },


    
];
