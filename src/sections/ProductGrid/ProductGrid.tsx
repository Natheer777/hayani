import { useTranslation } from 'react-i18next';
import './ProductGrid.css';
import type { Product } from '../../types/product.types';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalResults: number;
  onPageChange: (page: number) => void;
}

export default function ProductGrid({
  products,
  loading,
  error,
  currentPage,
  totalPages,
  totalResults,
  onPageChange,
}: ProductGridProps) {
  const { t } = useTranslation();

  if (loading) {
    return (
      <section className="product-grid-section">
        <div className="product-grid-container">
          <div className="loading-state">
            <div className="loading-spinner" />
            <p>{t('products.loading')}</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="product-grid-section">
        <div className="product-grid-container">
          <div className="error-state">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <h3>{t('products.errorTitle')}</h3>
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="product-grid-section">
        <div className="product-grid-container">
          <div className="empty-state">
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <h3>{t('products.noProductsTitle')}</h3>
            <p>{t('products.noProductsMessage')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="product-grid-section">
      <div className="product-grid-container">
        {/* Results Info */}
        <div className="results-info">
          <p>
            {t('products.showingResults', {
              from: (currentPage - 1) * 12 + 1,
              to: Math.min(currentPage * 12, totalResults),
              total: totalResults,
            })}
          </p>
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {products.map((product) => (
            <article key={product.id} className="product-card">
              {/* Product Info */}
              <div className="product-info">
                {product.category && (
                  <span className="product-category-badge">{product.category}</span>
                )}
                <h3 className="product-name">{product.trade_name}</h3>

                {product.scientific_name && (
                  <p className="product-scientific">{product.scientific_name}</p>
                )}

                {product.company_name && (
                  <p className="product-company">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    </svg>
                    {product.company_name}
                  </p>
                )}

                {product.active_ingredient && (
                  <div className="product-meta">
                    <span className="product-badge">{product.active_ingredient}</span>
                  </div>
                )}

                {product.description && (
                  <p className="product-description">{product.description}</p>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label={t('products.previousPage')}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className="pagination-pages">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    className={`pagination-page ${
                      pageNum === currentPage ? 'active' : ''
                    }`}
                    onClick={() => onPageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              className="pagination-btn"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label={t('products.nextPage')}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
