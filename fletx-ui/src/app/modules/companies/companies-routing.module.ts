import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesListComponent } from './companies-list/companies-list.component';
import { CompaniesFormComponent } from './company-form/company-form.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { PermissionsGuard } from '../../core/guards/role.guard';

const routes: Routes = [
  { path: '', component: CompaniesListComponent },
  {
    path: 'create',
    component: CompaniesFormComponent,
    canActivate: [PermissionsGuard],
    data: { permissions: ['Manager'] },
  },
  {
    path: 'edit/:id',
    component: CompaniesFormComponent,
    canActivate: [PermissionsGuard],
    data: { permissions: ['Manager'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompaniesRoutingModule {}
