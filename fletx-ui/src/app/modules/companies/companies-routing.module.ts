import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesFormComponent } from './company-form/company-form.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { PermissionsGuard } from '../../core/guards/role.guard';
import { CompaniesComponent } from './companies.component';

const routes: Routes = [
  { path: '', component: CompaniesComponent },
  {
    path: 'create',
    component: CompaniesFormComponent,
    canActivate: [AuthGuard, PermissionsGuard],
    data: { permissions: ['Manager'] },
  },
  {
    path: 'edit/:id',
    component: CompaniesFormComponent,
    canActivate: [AuthGuard, PermissionsGuard],
    data: { permissions: ['Manager'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompaniesRoutingModule {}
