import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { DashboardComponent } from './layout/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./modules/auth/login/login.component').then(m => m.LoginComponent)
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
      path: 'dashboard',
      component: DashboardComponent,
      // canActivate: [AuthGuard], // si ya lo tienes
      children: [
        {
          path: 'companies',
          loadChildren: () => import('./modules/companies/companies.module').then(m => m.CompaniesModule)
        },
        {
          path: 'products',
          loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule)
        },
        {
          path: 'users',
          loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule)
        },
        {
          path: '',
          redirectTo: 'companies',
          pathMatch: 'full'
        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
