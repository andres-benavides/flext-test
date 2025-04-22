import { Component, OnInit, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UsersService } from '../../../core/services/users/users.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  imports: [MatTableModule, MatButtonModule],
})
export class UsersListComponent implements OnInit {
  private readonly usersRequest = inject(UsersService);
  private readonly router = inject(Router);

  users: User[] = [];
  isLoading = false;
  errorMessage = '';

  async ngOnInit() {
    this.isLoading = true;
    try {
      this.usersRequest.getAll().then((data) => {
        this.users = data;
      });
    } catch (error) {
      this.errorMessage = 'Error al cargar los usuarios';
    } finally {
      this.isLoading = false;
    }
    console.log(this.isLoading, this.users);
  }

  onEdit(company: User) {
    this.router.navigate(['/dashboard/users/edit', company.id]);
  }

  async onDelete(company: User) {
    if (
      confirm(
        `¿Estás seguro que deseas eliminar a ${company.first_name} ${company.last_name}?`
      )
    ) {
      try {
        await this.usersRequest.delete(company.id);
        this.users = this.users.filter((c) => c.id !== company.id);
      } catch (error) {
        alert('Error al eliminar la compañía');
      }
    }
  }
}
