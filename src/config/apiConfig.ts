/**
 * API Configuration
 * 
 * Centralized configuration for all API endpoints and settings
 */

export const API_CONFIG = {
  // Base URL for Hayani Pharma API
  BASE_URL: 'https://hayani-pharma.com/hayani',

  // Endpoints
  ENDPOINTS: {
    SEARCH_PRODUCTS: '/search_all.php',
    GET_COMPANIES: '/get_companies.php',
    GET_CATEGORIES: '/get_categories.php',
  },

  // Default parameters
  DEFAULTS: {
    LANG: 'all' as const,
    PAGE: 1,
    LIMIT: 12,
  },

  // Request timeout (in milliseconds)
  TIMEOUT: 30000,

  // Retry configuration
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 1000,
  },
} as const;

/**
 * Build full API URL
 */
export function buildApiUrl(endpoint: string, params?: Record<string, string>): string {
  const url = new URL(endpoint, API_CONFIG.BASE_URL);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.append(key, value);
      }
    });
  }
  
  return url.toString();
}

/**
 * Check if API is reachable
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GET_CATEGORIES}`,
      {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      }
    );
    return response.ok;
  } catch {
    return false;
  }
}
