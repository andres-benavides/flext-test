import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocationService } from '../../../core/services/location.service';
import { Department, City } from '../../../models/location.model';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CompaniesService } from '../../../core/services/companies/companies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-companies-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss'],
  imports: [
    MatFormField, 
    MatLabel, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule, 
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule
  ]
})
export class CompaniesFormComponent implements OnInit {
  
  private snackBar = inject(MatSnackBar);

  companyForm!: FormGroup;
  departments: Department[] = [];
  cities: City[] = [];
  isEditMode = false;
  companyId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private companiesRequest: CompaniesService,
    private locationService: LocationService
  ) {}

  async ngOnInit(): Promise<void> {
    this.companyForm = this.fb.group({
      name: [''],
      sector:['', Validators.required],
      phone:['', Validators.required],
      address:['', Validators.required],
      assets:['', Validators.required],
      liabilities:['', Validators.required],
      department_id: [null],
      city_id: [null],
    });

    this.departments = await this.locationService.getDepartments();

    this.route.paramMap.subscribe(async params => {
      const idParam = params.get('id');
      if (idParam) {
        this.companyId = +idParam;
        const company = await this.companiesRequest.getById(this.companyId);
  
        if (company) {
          this.isEditMode = true;
          if (company.department_id) {
            this.cities = await this.locationService.getCitiesByDepartment(company.department_id);
          }
        
          this.companyForm.patchValue(company);
        } else {
          // this.toastr.error('No se pudo cargar la compañía');
        }
      }
    });
  }

  async onDepartmentChange(departmentId: number): Promise<void> {
    this.cities = await this.locationService.getCitiesByDepartment(departmentId);
    this.companyForm.patchValue({ cityId: null });
  }

  async loadCompanyData(id: number) {
    const company = await this.companiesRequest.getById(id);
    if (company) {
      this.companyForm.patchValue({
        name: company.name,
        sector: company.sector,
        phone: company.phone,
        address: company.address,
        assets: company.assets,
        liabilities: company.liabilities,
        department_id: company.department_id,
        city_id: company.city_id
      });
      await this.onDepartmentChange(company.department_id);
    }
  }

  async onSubmit() {
    if (this.companyForm.invalid) return;

    const data = this.companyForm.value;

    try {
      if (this.isEditMode) {
        await this.companiesRequest.update(this.companyId, data);
        this.snackBar.open('Compañía editada con éxito', 'Cerrar', { duration: 3000 });
      } else {
        await this.companiesRequest.create(data);
      }
      this.router.navigate(['/dashboard/companies']);
    } catch (error) {
      console.error('Error al guardar la compañía:', error);
    }
  }
}

