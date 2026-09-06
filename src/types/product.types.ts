// Product API Types
export interface Company {
  id: string;
  name_ar: string;
  name_en: string;
  country: string;
}

export interface Product {
  id: number;
  company_id: number;
  company_name: string;
  country: string;
  trade_name: string;
  scientific_name: string;
  active_ingredient: string;
  description: string;
  category: string;
}

export interface SearchParams {
  company_id?: string | number;
  q?: string;
  category?: string;
  lang?: 'ar' | 'en' | 'all';
  page?: number;
  limit?: number;
}

export interface SearchResponse {
  status: 'success' | 'error';
  message: string;
  data: {
    pagination: {
      current_page: number;
      per_page: number;
      total_items: number;
      total_pages: number;
    };
    language: string;
    results: Product[];
  };
}

export interface CompaniesResponse {
  status: 'success' | 'error';
  message: string;
  data: Company[];
}

export interface CategoriesResponse {
  status: 'success' | 'error';
  message: string;
  data: string[];
}
