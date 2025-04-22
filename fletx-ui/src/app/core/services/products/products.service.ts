import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Product } from '../../../modules/products/models/product.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly baseUrl = `${environment.apiUrl}/v1/products`;

  constructor(private http: HttpClient) {}

  // Obtener todas las compañías
  async getAll(): Promise<Product[]> {
    return (await firstValueFrom(this.http.get<Product[]>(this.baseUrl))) ?? [];
  }

  // Obtener una compañía por ID
  async getById(id: number): Promise<Product | undefined> {
    return await firstValueFrom(
      this.http.get<Product>(`${this.baseUrl}/${id}`)
    );
  }

  // Crear una nueva compañía
  async create(product: Partial<Product>): Promise<Product | undefined> {
    return await firstValueFrom(
      this.http.post<Product>(this.baseUrl, { product })
    );
  }

  // Actualizar una compañía existente
  async update(
    id: number,
    product: Partial<Product>
  ): Promise<Product | undefined> {
    return await firstValueFrom(
      this.http.put<Product>(`${this.baseUrl}/${id}`, { product })
    );
  }

  // Eliminar una compañía
  async delete(id: number): Promise<void> {
    return await firstValueFrom(
      this.http.delete<void>(`${this.baseUrl}/${id}`)
    );
  }
}
