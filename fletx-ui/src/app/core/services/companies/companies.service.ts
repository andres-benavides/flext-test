// src/app/core/services/companies/companies.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../../../modules/companies/models/company.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  private readonly baseUrl = 'http://localhost:3000/api/v1/companies';

  constructor(private http: HttpClient) {}

  // Obtener todas las compañías
  async getAll(): Promise<Company[]> {
    return (await firstValueFrom(this.http.get<Company[]>(this.baseUrl))) ?? [];
  }

  // Obtener una compañía por ID
  async getById(id: number): Promise<Company | undefined> {
    return await this.http.get<Company>(`${this.baseUrl}/${id}`).toPromise();
  }

  // Crear una nueva compañía
  async create(company: Partial<Company>): Promise<Company | undefined> {
    return await this.http.post<Company>(this.baseUrl, { company }).toPromise();
  }

  // Actualizar una compañía existente
  async update(
    id: number,
    company: Partial<Company>
  ): Promise<Company | undefined> {
    return await this.http
      .put<Company>(`${this.baseUrl}/${id}`, { company })
      .toPromise();
  }

  // Eliminar una compañía
  async delete(id: number): Promise<void> {
    return await this.http.delete<void>(`${this.baseUrl}/${id}`).toPromise();
  }
}
