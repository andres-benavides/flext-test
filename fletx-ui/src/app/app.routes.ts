import { Routes } from '@angular/router';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./modules/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'companies',
        loadChildren: () =>
          import('./modules/companies/companies.module').then(
            (m) => m.CompaniesModule
          ),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./modules/products/products.module').then(
            (m) => m.ProductsModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./modules/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: '',
        redirectTo: 'companies',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'forbidden',
    loadComponent: () =>
      import('./layout/forbidden/forbidden.component').then(
        (m) => m.ForbiddenComponent
      ),
  },
];
