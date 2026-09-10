import type {
  SearchParams,
  SearchResponse,
  CompaniesResponse,
  CategoriesResponse,
} from '../types/product.types';

const API_BASE_URL = 'https://hayani-pharma.com/hayani';

function buildEmptySearchResponse(lang: string = 'en'): SearchResponse {
  return {
    status: 'success',
    message: lang === 'ar' ? 'لم يتم العثور على منتجات مطابقة.' : 'No matching products were found.',
    data: {
      pagination: {
        current_page: 1,
        per_page: 0,
        total_items: 0,
        total_pages: 0,
      },
      language: lang,
      results: [],
    },
  }
}

function isNoProductsFoundMessage(message: string): boolean {
  const normalizedMessage = message.toLowerCase()

  return (
    normalizedMessage.includes('no products found') ||
    normalizedMessage.includes('no products') ||
    normalizedMessage.includes('matching your criteria')
  )
}

// Helper function to create user-friendly error messages
function createErrorMessage(error: unknown, lang: string = 'en'): string {
  if (error instanceof Error) {
    // Network or fetch errors
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      return lang === 'ar' 
        ? 'فشل الاتصال بالخادم. يرجى التحقق من الاتصال بالإنترنت والمحاولة مرة أخرى.'
        : 'Failed to connect to server. Please check your internet connection and try again.';
    }
    
    // HTTP errors
    if (error.message.includes('404')) {
      return lang === 'ar'
        ? 'عذراً، لم يتم العثور على البيانات المطلوبة. يرجى المحاولة لاحقاً.'
        : 'Sorry, the requested data was not found. Please try again later.';
    }
    
    if (error.message.includes('500')) {
      return lang === 'ar'
        ? 'حدث خطأ في الخادم. يرجى المحاولة لاحقاً.'
        : 'Server error occurred. Please try again later.';
    }
    
    if (error.message.includes('403')) {
      return lang === 'ar'
        ? 'غير مصرح بالوصول إلى هذه البيانات.'
        : 'Access to this data is forbidden.';
    }
    
    // Timeout errors
    if (error.message.includes('timeout')) {
      return lang === 'ar'
        ? 'انتهت مهلة الطلب. يرجى المحاولة مرة أخرى.'
        : 'Request timed out. Please try again.';
    }
  }
  
  // Generic error
  return lang === 'ar'
    ? 'حدث خطأ غير متوقع. يرجى المحاولة لاحقاً.'
    : 'An unexpected error occurred. Please try again later.';
}

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

    const rawText = await response.text();
    let data: SearchResponse | null = null;

    try {
      data = JSON.parse(rawText) as SearchResponse;
    } catch {
      data = null;
    }

    const responseMessage = data?.message || rawText || '';

    if (response.status === 404 && isNoProductsFoundMessage(responseMessage)) {
      return buildEmptySearchResponse(params.lang);
    }

    if (!response.ok) {
      const errorMsg = createErrorMessage(
        new Error(responseMessage || `HTTP error! status: ${response.status}`),
        params.lang
      );
      throw new Error(errorMsg);
    }

    if (!data) {
      throw new Error(params.lang === 'ar'
        ? 'حدث خطأ غير متوقع. يرجى المحاولة لاحقاً.'
        : 'An unexpected error occurred. Please try again later.')
    }

    if (data.status === 'error' && isNoProductsFoundMessage(data.message || '')) {
      return buildEmptySearchResponse(params.lang);
    }

    return data;
  } catch (error) {
    console.error('Error searching products:', error);
    const errorMsg = createErrorMessage(error, params.lang);
    throw new Error(errorMsg);
  }
}

/**
 * Get all companies
 */
export async function getCompanies(): Promise<CompaniesResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/get_companies.php`);

    if (!response.ok) {
      const errorMsg = createErrorMessage(new Error(`HTTP error! status: ${response.status}`), 'en');
      throw new Error(errorMsg);
    }

    const data: CompaniesResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching companies:', error);
    const errorMsg = createErrorMessage(error, 'en');
    throw new Error(errorMsg);
  }
}

/**
 * Get all categories
 */
export async function getCategories(): Promise<CategoriesResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/get_categories.php`);

    if (!response.ok) {
      const errorMsg = createErrorMessage(new Error(`HTTP error! status: ${response.status}`), 'en');
      throw new Error(errorMsg);
    }

    const data: CategoriesResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    const errorMsg = createErrorMessage(error, 'en');
    throw new Error(errorMsg);
  }
}
