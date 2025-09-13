import React from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const SearchContextBreadcrumb = ({ 
  searchContext = {},
  onRemoveFilter,
  onClearAll,
  className = ''
}) => {
  const {
    query = '',
    location = '',
    radius = '',
    category = '',
    priceRange = null,
    availability = '',
    sortBy = '',
    filters = {}
  } = searchContext;

  const contextItems = [];

  // Add search query
  if (query) {
    contextItems?.push({
      type: 'query',
      label: `"${query}"`,
      value: query,
      icon: 'Search',
      removable: true
    });
  }

  // Add location context
  if (location) {
    contextItems?.push({
      type: 'location',
      label: location,
      value: location,
      icon: 'MapPin',
      removable: false // Location is core context
    });
  }

  // Add radius
  if (radius) {
    contextItems?.push({
      type: 'radius',
      label: `within ${radius}`,
      value: radius,
      icon: 'Circle',
      removable: true
    });
  }

  // Add category
  if (category) {
    contextItems?.push({
      type: 'category',
      label: category,
      value: category,
      icon: 'Tag',
      removable: true
    });
  }

  // Add price range
  if (priceRange && (priceRange?.min || priceRange?.max)) {
    const priceLabel = priceRange?.min && priceRange?.max 
      ? `R$ ${priceRange?.min} - R$ ${priceRange?.max}`
      : priceRange?.min 
        ? `R$ ${priceRange?.min}+`
        : `up to R$ ${priceRange?.max}`;
    
    contextItems?.push({
      type: 'price',
      label: priceLabel,
      value: priceRange,
      icon: 'DollarSign',
      removable: true
    });
  }

  // Add availability filter
  if (availability && availability !== 'all') {
    contextItems?.push({
      type: 'availability',
      label: availability === 'available' ? 'Available now' : availability,
      value: availability,
      icon: 'Clock',
      removable: true
    });
  }

  // Add custom filters
  Object.entries(filters)?.forEach(([key, value]) => {
    if (value && value !== 'all') {
      contextItems?.push({
        type: 'filter',
        label: `${key}: ${value}`,
        value: { key, value },
        icon: 'Filter',
        removable: true
      });
    }
  });

  // Add sort context (non-removable, just informational)
  if (sortBy && sortBy !== 'relevance') {
    contextItems?.push({
      type: 'sort',
      label: `sorted by ${sortBy}`,
      value: sortBy,
      icon: 'ArrowUpDown',
      removable: false,
      isSort: true
    });
  }

  const handleRemoveItem = (item) => {
    if (onRemoveFilter) {
      onRemoveFilter(item?.type, item?.value);
    }
  };

  const handleClearAll = () => {
    if (onClearAll) {
      onClearAll();
    }
  };

  if (contextItems?.length === 0) {
    return null;
  }

  return (
    <div className={`bg-background border-b border-border ${className}`}>
      <div className="px-4 lg:px-6 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Icon name="Search" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm font-medium text-muted-foreground">Search Context</span>
          </div>
          
          {contextItems?.some(item => item?.removable) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Clear all
            </Button>
          )}
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex flex-wrap items-center gap-2">
          {contextItems?.map((item, index) => (
            <div
              key={`${item?.type}-${index}`}
              className={`flex items-center space-x-1 px-3 py-1 rounded-sm text-sm transition-colors duration-150 ${
                item?.isSort
                  ? 'bg-muted/50 text-muted-foreground border border-border'
                  : item?.removable
                    ? 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20' :'bg-muted text-muted-foreground border border-border'
              }`}
            >
              <Icon name={item?.icon} size={12} />
              <span>{item?.label}</span>
              {item?.removable && (
                <button
                  onClick={() => handleRemoveItem(item)}
                  className="ml-1 hover:text-destructive transition-colors duration-150"
                >
                  <Icon name="X" size={12} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Mobile View - Horizontal Scroll */}
        <div className="md:hidden">
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {contextItems?.map((item, index) => (
              <div
                key={`${item?.type}-${index}`}
                className={`flex items-center space-x-1 px-3 py-1 rounded-sm text-sm whitespace-nowrap transition-colors duration-150 ${
                  item?.isSort
                    ? 'bg-muted/50 text-muted-foreground border border-border'
                    : item?.removable
                      ? 'bg-primary/10 text-primary border border-primary/20' :'bg-muted text-muted-foreground border border-border'
                }`}
              >
                <Icon name={item?.icon} size={12} />
                <span className="text-xs">{item?.label}</span>
                {item?.removable && (
                  <button
                    onClick={() => handleRemoveItem(item)}
                    className="ml-1 hover:text-destructive transition-colors duration-150"
                  >
                    <Icon name="X" size={10} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Results Summary */}
        {searchContext?.resultCount !== undefined && (
          <div className="mt-2 text-xs text-muted-foreground">
            {searchContext?.resultCount === 0 
              ? 'No results found'
              : `${searchContext?.resultCount?.toLocaleString()} ${searchContext?.resultCount === 1 ? 'result' : 'results'} found`
            }
            {searchContext?.searchTime && (
              <span> in {searchContext?.searchTime}ms</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchContextBreadcrumb;