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
import { ProductsService } from '../../../core/services/products/products.service';
import { CompaniesService } from '../../../core/services/companies/companies.service';
import { Company } from '../../companies/models/company.model';

@Component({
  selector: 'app-products-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
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
export class ProductsFormComponent implements OnInit {
  private snackBar = inject(MatSnackBar);

  productForm!: FormGroup;
  companies: Company[] = [];
  isEditMode = false;
  productId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productsRequest: ProductsService,
    private companiesRequest: CompaniesService
  ) {}

  async ngOnInit(): Promise<void> {
    this.productForm = this.fb.group({
      name: [''],
      category: ['', Validators.required],
      price: ['', Validators.required],
      company_id: [null],
    });

    this.companies = await this.companiesRequest.getAll();

    this.route.paramMap.subscribe(async (params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.productId = +idParam;
        const product = await this.productsRequest.getById(this.productId);

        if (product) {
          this.isEditMode = true;
          this.productForm.patchValue(product);
        } else {
          // this.toastr.error('No se pudo cargar la compañía');
        }
      }
    });
  }

  async loadproductData(id: number) {
    const product = await this.productsRequest.getById(id);
    if (product) {
      this.productForm.patchValue({
        name: product.name,
        category: product.category,
        price: product.price,
        company_id: product.company_id,
      });
    }
  }

  async onSubmit() {
    if (this.productForm.invalid) return;

    const data = this.productForm.value;

    try {
      if (this.isEditMode) {
        await this.productsRequest.update(this.productId, data);
        this.snackBar.open('Compañía editada con éxito', 'Cerrar', {
          duration: 3000,
        });
      } else {
        await this.productsRequest.create(data);
      }
      this.router.navigate(['/dashboard/products']);
    } catch (error) {
      console.error('Error al guardar la compañía:', error);
    }
  }
}
