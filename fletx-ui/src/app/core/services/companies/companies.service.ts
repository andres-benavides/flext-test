import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../../../modules/companies/models/company.model';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  private readonly baseUrl = `${environment.apiUrl}/v1/companies`;

  constructor(private http: HttpClient) {}

  // Obtener todas las compañías
  async getAll(): Promise<Company[]> {
    return (await firstValueFrom(this.http.get<Company[]>(this.baseUrl))) ?? [];
  }

  // Obtener una compañía por ID
  async getById(id: number): Promise<Company | undefined> {
    return await firstValueFrom(
      this.http.get<Company>(`${this.baseUrl}/${id}`)
    );
  }

  // Crear una nueva compañía
  async create(company: Partial<Company>): Promise<Company | undefined> {
    return await firstValueFrom(
      this.http.post<Company>(this.baseUrl, { company })
    );
  }

  // Actualizar una compañía existente
  async update(
    id: number,
    company: Partial<Company>
  ): Promise<Company | undefined> {
    return await firstValueFrom(
      this.http.put<Company>(`${this.baseUrl}/${id}`, { company })
    );
  }

  // Eliminar una compañía
  async delete(id: number): Promise<void> {
    return await firstValueFrom(
      this.http.delete<void>(`${this.baseUrl}/${id}`)
    );
  }
}
