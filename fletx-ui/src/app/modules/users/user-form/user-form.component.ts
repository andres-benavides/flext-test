import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompaniesService } from '../../../core/services/companies/companies.service';
import { UsersService } from '../../../core/services/users/users.service';
import { Company } from '../../companies/models/company.model';

@Component({
  selector: 'app-users-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  imports: [
    MatFormField,
    MatLabel,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
  ],
})
export class UsersFormComponent implements OnInit {
  private snackBar = inject(MatSnackBar);

  userForm!: FormGroup;
  companies: Company[] = [];
  isEditMode = false;
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usersRequest: UsersService,
    private companiesRequest: CompaniesService
  ) {}

  async ngOnInit(): Promise<void> {
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company_id: [null, Validators.required],
      position: ['', Validators.required],
      phone: [''],
      salary: [null, [Validators.min(0)]],
      password: [''],
    });

    this.companies = await this.companiesRequest.getAll();

    this.route.paramMap.subscribe(async (params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEditMode = true;
        this.userId = +idParam;
        const user = await this.usersRequest.getById(this.userId);

        if (user) {
          this.userForm.patchValue(user);

          this.userForm.get('password')?.clearValidators();
          this.userForm.get('password')?.updateValueAndValidity();
        }
      } else {
        this.userForm.get('password')?.setValidators(Validators.required);
        this.userForm.get('password')?.updateValueAndValidity();
      }
    });
  }

  async loaduserData(id: number) {
    const user = await this.usersRequest.getById(id);
    if (user) {
      this.userForm.patchValue({
        first_name: user.first_name,
        last_name: user.last_name,
        position: user.position,
        email: user.email,
        salary: user.salary,
        phone: user.phone,
        company_id: user.company_id,
      });
    }
  }

  async onSubmit() {
    const data = { ...this.userForm.value };

    if (this.isEditMode && !data.password) {
      delete data.password;
      this.userForm.removeControl('password');
    }
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    try {
      if (this.isEditMode) {
        await this.usersRequest.update(this.userId, data);
        this.snackBar.open('Usuario editado con éxito', 'Cerrar', {
          duration: 3000,
        });
      } else {
        await this.usersRequest.create(data);
      }
      this.router.navigate(['/dashboard/users']);
    } catch (error) {
      console.error('Error al guardar la compañía:', error);
    }
  }
}
