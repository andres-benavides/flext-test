import { Component, OnInit, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductsService } from '../../../core/services/products/products.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  imports: [MatTableModule, MatButtonModule],
})
export class ProductsListComponent implements OnInit {
  private readonly productsRequest = inject(ProductsService);
  private readonly router = inject(Router);

  products: Product[] = [];
  isLoading = false;
  errorMessage = '';

  async ngOnInit() {
    this.isLoading = true;
    try {
      this.productsRequest.getAll().then((data) => {
        this.products = data;
      });
    } catch (error) {
      this.errorMessage = 'Error al cargar los productos.';
    } finally {
      this.isLoading = false;
    }
    console.log(this.isLoading, this.products);
  }

  onEdit(company: Product) {
    this.router.navigate(['/dashboard/products/edit', company.id]);
  }

  async onDelete(company: Product) {
    if (confirm(`¿Estás seguro que deseas eliminar a ${company.name}?`)) {
      try {
        await this.productsRequest.delete(company.id);
        this.products = this.products.filter((c) => c.id !== company.id);
      } catch (error) {
        alert('Error al eliminar el producto');
      }
    }
  }
}
