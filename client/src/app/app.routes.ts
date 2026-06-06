import { Routes } from '@angular/router';

export const routes: Routes = [


    {
    path: "mi-perfil",
    loadComponent: () => import('./home/mi-perfil/mi-perfil').then((archivo) => archivo.MiPerfil),
    },
    {
        path:"",
        redirectTo: "registro", pathMatch: "full"
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
    },


    
];
