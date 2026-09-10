import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './ProductSearch.css';
import type { Company } from '../../types/product.types';

const ARABIC_TEXT_REGEX = /[\u0600-\u06FF]/
const ENGLISH_TEXT_REGEX = /[A-Za-z]/

interface ProductSearchProps {
  companies: Company[];
  categories: string[];
  onSearch: (params: {
    q?: string;
    company_id?: string;
    category?: string;
  }) => void;
  loading?: boolean;
}

export default function ProductSearch({
  companies,
  categories,
  onSearch,
  loading = false,
}: ProductSearchProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [queryValidationError, setQueryValidationError] = useState('');

  const validateQueryLanguage = (value: string) => {
    const trimmedValue = value.trim()

    if (!trimmedValue) {
      return ''
    }

    if (isRTL) {
      return ENGLISH_TEXT_REGEX.test(trimmedValue) ? t('products.searchLanguageArabicOnly') : ''
    }

    return ARABIC_TEXT_REGEX.test(trimmedValue) ? t('products.searchLanguageEnglishOnly') : ''
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const validationMessage = validateQueryLanguage(searchQuery)

    if (validationMessage) {
      setQueryValidationError(validationMessage)
      return
    }

    setQueryValidationError('')

    onSearch({
      q: searchQuery || undefined,
      company_id: selectedCompany || undefined,
      category: selectedCategory || undefined,
    });
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCompany('');
    setSelectedCategory('');
    setQueryValidationError('');
    onSearch({});
  };

  return (
    <section className="product-search-section">
      <div className="product-search-container">
        <div className="search-header">
          <h2 className="search-title">{t('products.searchTitle')}</h2>
          <p className="search-subtitle">{t('products.searchSubtitle')}</p>
        </div>

        <form className="search-form" onSubmit={handleSearch}>
          {/* Search Input */}
          <div className="search-field">
            <label htmlFor="search-query" className="search-label">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="search-icon"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              {t('products.searchPlaceholder')}
            </label>
            <input
              id="search-query"
              type="text"
              className={`search-input${queryValidationError ? ' search-input--error' : ''}`}
              placeholder={t('products.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => {
                const nextValue = e.target.value
                setSearchQuery(nextValue)

                if (queryValidationError) {
                  setQueryValidationError(validateQueryLanguage(nextValue))
                }
              }}
              disabled={loading}
              aria-invalid={Boolean(queryValidationError)}
            />
            {queryValidationError && (
              <p className="search-validation-message" role="alert" aria-live="polite">
                {queryValidationError}
              </p>
            )}
          </div>

          {/* Company Filter */}
          <div className="search-field">
            <label htmlFor="company-filter" className="search-label">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="search-icon"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              {t('products.companyLabel')}
            </label>
            <select
              id="company-filter"
              className="search-select"
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              disabled={loading}
            >
              <option value="">{t('products.allCompanies')}</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {isRTL ? company.name_ar : company.name_en}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="search-field">
            <label htmlFor="category-filter" className="search-label">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="search-icon"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              {t('products.categoryLabel')}
            </label>
            <select
              id="category-filter"
              className="search-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              disabled={loading}
            >
              <option value="">{t('products.allCategories')}</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="search-actions">
            <button
              type="submit"
              className="search-btn search-btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="btn-spinner" />
                  {t('products.searching')}
                </>
              ) : (
                <>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  {t('products.searchButton')}
                </>
              )}
            </button>

            <button
              type="button"
              className="search-btn search-btn-secondary"
              onClick={handleReset}
              disabled={loading}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              {t('products.resetButton')}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
