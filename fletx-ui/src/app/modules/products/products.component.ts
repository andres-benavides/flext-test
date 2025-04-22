import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  imports: [MatTableModule, MatButtonModule, ProductsListComponent],
})
export class ProductsComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  onCreate() {
    this.router.navigate(['create'], { relativeTo: this.activatedRoute });
  }
}
