import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { User } from '../../../modules/users/models/user.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly baseUrl = `${environment.apiUrl}/v1/users`;
  constructor(private http: HttpClient) {}

  // Obtener todos los users
  async getAll(): Promise<User[]> {
    return (await firstValueFrom(this.http.get<User[]>(this.baseUrl))) ?? [];
  }

  // Obtener un user por ID
  async getById(id: number): Promise<User | undefined> {
    return await firstValueFrom(this.http.get<User>(`${this.baseUrl}/${id}`));
  }

  // Crear un nuevo user
  async create(user: Partial<User>): Promise<User | undefined> {
    return await firstValueFrom(this.http.post<User>(this.baseUrl, { user }));
  }

  // Actualizar un user
  async update(id: number, user: Partial<User>): Promise<User | undefined> {
    return await firstValueFrom(
      this.http.put<User>(`${this.baseUrl}/${id}`, { user })
    );
  }

  // Eliminar un user
  async delete(id: number): Promise<void> {
    return await firstValueFrom(
      this.http.delete<void>(`${this.baseUrl}/${id}`)
    );
  }
}
