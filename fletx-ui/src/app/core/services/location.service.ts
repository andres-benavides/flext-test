import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department, City } from '../../models/location.model';

@Injectable({ providedIn: 'root' })
export class LocationService {
  private baseUrl = 'http://localhost:3000/api/v1';
  constructor(private http: HttpClient) {}

  async getDepartments() {
    return await this.http.get<Department[]>(`${this.baseUrl}/departments`).toPromise() ?? [];
  }

  async getCitiesByDepartment(departmentId: number) {
    return await this.http.get<City[]>(`${this.baseUrl}/departments/${departmentId}/cities`).toPromise() ?? [];
  }
}