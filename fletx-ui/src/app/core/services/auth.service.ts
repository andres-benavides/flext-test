import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
  iat: number;
  role: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'access_token';
  private apiUrl = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  async login(credentials: {
    email: string;
    password: string;
  }): Promise<string | null> {
    try {
      const response = await this.http
        .post<{ token: string }>(`${this.apiUrl}/login`, credentials)
        .toPromise();

      if (response?.token) {
        this.saveToken(response.token);
        return response.token;
      }

      return null;
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      return null;
    }
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp > currentTime;
    } catch (e) {
      return false;
    }
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded.role;
    } catch (e) {
      return null;
    }
  }

  getUserName(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded.name;
    } catch (e) {
      return null;
    }
  }

  getUserRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];
    const decoded: any = jwtDecode(token);
    return decoded.position || [];
  }

  hasPermission(required: string | string[]): boolean {
    const roles = this.getUserRoles();
    if (Array.isArray(required)) {
      return required.some((r) => roles.includes(r));
    }
    return roles.includes(required) || roles.pop() === required;
  }
}
