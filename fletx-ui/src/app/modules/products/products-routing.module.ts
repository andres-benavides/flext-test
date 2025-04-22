import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { PermissionsGuard } from '../../core/guards/role.guard';
import { ProductsFormComponent } from './product-form/product-form.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  {
    path: 'create',
    component: ProductsFormComponent,
    canActivate: [AuthGuard, PermissionsGuard],
    data: { permissions: ['Manager'] },
  },
  {
    path: 'edit/:id',
    component: ProductsFormComponent,
    canActivate: [AuthGuard, PermissionsGuard],
    data: { permissions: ['Manager'] },
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
