import { Component, OnInit, inject } from '@angular/core';
import { Company } from '../models/company.model';
import { CompaniesService } from '../../../core/services/companies/companies.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.scss'],
  imports: [MatTableModule, MatButtonModule],
})
export class CompaniesListComponent implements OnInit {
  private readonly companiesRequest = inject(CompaniesService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  companies: Company[] = [];
  isLoading = false;
  errorMessage = '';

  async ngOnInit() {
    this.isLoading = true;
    try {
      this.companiesRequest.getAll().then((data) => {
        this.companies = data;
      });
    } catch (error) {
      this.errorMessage = 'Error al cargar las compañías.';
    } finally {
      this.isLoading = false;
    }
    console.log(this.isLoading, this.companies);
  }

  onEdit(company: Company) {
    this.router.navigate(['/dashboard/companies/edit', company.id]);
  }

  onCreate() {
    this.router.navigate(['create'], { relativeTo: this.activatedRoute });
  }

  async onDelete(company: Company) {
    if (confirm(`¿Estás seguro que deseas eliminar a ${company.name}?`)) {
      try {
        // await this.companiesRequest.delete(company.id);
        this.companies = this.companies.filter((c) => c.id !== company.id);
      } catch (error) {
        alert('Error al eliminar la compañía');
      }
    }
  }
}
