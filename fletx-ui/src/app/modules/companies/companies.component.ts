import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CompaniesListComponent } from './companies-list/companies-list.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss',
  imports: [MatTableModule, MatButtonModule, CompaniesListComponent],
})
export class CompaniesComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  onCreate() {
    this.router.navigate(['create'], { relativeTo: this.activatedRoute });
  }
}
