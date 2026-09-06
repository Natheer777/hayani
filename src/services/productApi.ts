import type {
  SearchParams,
  SearchResponse,
  CompaniesResponse,
  CategoriesResponse,
} from '../types/product.types';

const API_BASE_URL = 'https://hayani-pharma.com/hayani';

/**
 * Search for products with filters
 */
export async function searchProducts(
  params: SearchParams
): Promise<SearchResponse> {
  try {
    // Validate at least one required param
    if (!params.company_id && !params.q && !params.category) {
      throw new Error('At least one of company_id, q, or category is required');
    }

    // Prepare JSON body for POST request
    const body: Record<string, string | number> = {};

    if (params.company_id) body.company_id = params.company_id;
    if (params.q) body.q = params.q;
    if (params.category) body.category = params.category;
    if (params.lang) body.lang = params.lang;
    if (params.page) body.page = params.page;
    if (params.limit) body.limit = params.limit;

    console.log('Sending POST JSON:', JSON.stringify(body));

    const response = await fetch(`${API_BASE_URL}/search_all.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: SearchResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
}

/**
 * Get all companies
 */
export async function getCompanies(): Promise<CompaniesResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/get_companies.php`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: CompaniesResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
}

/**
 * Get all categories
 */
export async function getCategories(): Promise<CategoriesResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/get_categories.php`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: CategoriesResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}
