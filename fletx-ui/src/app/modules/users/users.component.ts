import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  imports: [MatTableModule, MatButtonModule, UsersListComponent],
})
export class UsersComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  onCreate() {
    this.router.navigate(['create'], { relativeTo: this.activatedRoute });
  }
}
