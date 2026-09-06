import { useState, useEffect, useCallback } from 'react';
import { searchProducts, getCompanies, getCategories } from '../services/productApi';
import type { Product, Company, SearchParams } from '../types/product.types';

interface UseProductsReturn {
  products: Product[];
  companies: Company[];
  categories: string[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalResults: number;
  searchParams: SearchParams;
  setSearchParams: (params: Partial<SearchParams>) => void;
  refetch: () => void;
}

export function useProducts(
  initialParams: SearchParams = { page: 1, limit: 12 }
): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(initialParams.page || 1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [searchParams, setSearchParamsState] = useState<SearchParams>(initialParams);

  // Fetch companies and categories on mount
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const [companiesRes, categoriesRes] = await Promise.all([
          getCompanies(),
          getCategories(),
        ]);

        if (companiesRes.status === 'success') {
          setCompanies(companiesRes.data);
        }

        if (categoriesRes.status === 'success') {
          setCategories(categoriesRes.data);
        }
      } catch (err) {
        console.error('Error fetching metadata:', err);
      }
    };

    fetchMetadata();
  }, []);

  // Fetch products based on search params
  const fetchProducts = useCallback(async () => {
    // Don't fetch if no search criteria provided
    if (!searchParams.company_id && !searchParams.q && !searchParams.category) {
      setProducts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await searchProducts(searchParams);

      if (response.status === 'success') {
        setProducts(response.data.results);
        
        if (response.data.pagination) {
          setCurrentPage(response.data.pagination.current_page);
          setTotalPages(response.data.pagination.total_pages);
          setTotalResults(response.data.pagination.total_items);
        }
      } else {
        setError(response.message || 'Failed to fetch products');
        setProducts([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const setSearchParams = useCallback((params: Partial<SearchParams>) => {
    setSearchParamsState((prev) => ({
      ...prev,
      ...params,
      // Reset to page 1 when changing filters (except when explicitly changing page)
      page: params.page !== undefined ? params.page : 1,
    }));
  }, []);

  return {
    products,
    companies,
    categories,
    loading,
    error,
    currentPage,
    totalPages,
    totalResults,
    searchParams,
    setSearchParams,
    refetch: fetchProducts,
  };
}
