export interface Company {
  id: number;
  name: string;
  sector: string;
  address: string;
  phone: string;
  assets: string;
  liabilities: string;
  department_id: number;
  city_id: number;
  createdAt?: string;
  updatedAt?: string;
}
