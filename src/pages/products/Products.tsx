import { useTranslation } from 'react-i18next';
import { useProducts } from '../../hooks/useProducts';
import {
  Navbar,
  ProductHero,
  ProductSearch,
  ProductGrid,
  KeepInTouch,
  Footer,
} from '../../sections/index';

export default function Products() {
  const { i18n } = useTranslation();
  const {
    products,
    companies,
    categories,
    loading,
    error,
    currentPage,
    totalPages,
    totalResults,

    setSearchParams,
  } = useProducts({
    company_id: 2,
    lang: i18n.language as 'ar' | 'en',
    limit: 10,
  });

  const handleSearch = (params: {
    q?: string;
    company_id?: string;
    category?: string;
  }) => {
    setSearchParams({
      ...params,
      lang: i18n.language as 'ar' | 'en',
      page: 1,
    });
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ page });
    // Scroll to top of products section
    document.getElementById('product-search')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />
      <ProductHero />
      <div id="product-search">
        <ProductSearch
          companies={companies}
          categories={categories}
          onSearch={handleSearch}
          loading={loading}
        />
      </div>
      <ProductGrid
        products={products}
        loading={loading}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        totalResults={totalResults}
        onPageChange={handlePageChange}
      />
      <KeepInTouch />
      <Footer />
    </>
  );
}

