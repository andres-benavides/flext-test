import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { PermissionsGuard } from '../../core/guards/role.guard';
import { UsersFormComponent } from './user-form/user-form.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  { path: '', component: UsersComponent },
  {
    path: 'create',
    component: UsersFormComponent,
    canActivate: [AuthGuard, PermissionsGuard],
    data: { permissions: ['Manager'] },
  },
  {
    path: 'edit/:id',
    component: UsersFormComponent,
    canActivate: [AuthGuard, PermissionsGuard],
    data: { permissions: ['Manager'] },
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
