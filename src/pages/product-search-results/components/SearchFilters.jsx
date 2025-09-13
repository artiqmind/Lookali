import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SearchFilters = ({ filters, onFiltersChange, onClearFilters, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const categories = [
    { value: 'all', label: 'Todas as categorias' },
    { value: 'electronics', label: 'Eletrônicos' },
    { value: 'fashion', label: 'Moda e Beleza' },
    { value: 'home', label: 'Casa e Jardim' },
    { value: 'sports', label: 'Esportes e Lazer' },
    { value: 'automotive', label: 'Automotivo' },
    { value: 'books', label: 'Livros e Mídia' },
    { value: 'food', label: 'Alimentação' },
    { value: 'services', label: 'Serviços' }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Relevância' },
    { value: 'distance', label: 'Distância' },
    { value: 'price_low', label: 'Menor preço' },
    { value: 'price_high', label: 'Maior preço' },
    { value: 'newest', label: 'Mais recentes' },
    { value: 'rating', label: 'Melhor avaliação' }
  ];

  const radiusOptions = [
    { value: '1', label: '1 km' },
    { value: '2', label: '2 km' },
    { value: '5', label: '5 km' },
    { value: '10', label: '10 km' },
    { value: '20', label: '20 km' },
    { value: '50', label: '50 km' }
  ];

  const availabilityOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'available', label: 'Disponível' },
    { value: 'limited', label: 'Estoque limitado' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handlePriceRangeChange = (type, value) => {
    const priceRange = { ...localFilters?.priceRange };
    priceRange[type] = value ? parseFloat(value) : null;
    handleFilterChange('priceRange', priceRange);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      category: 'all',
      sortBy: 'relevance',
      radius: '5',
      availability: 'all',
      priceRange: { min: null, max: null },
      hasDelivery: false,
      hasPickup: false,
      promotedOnly: false
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters?.category !== 'all') count++;
    if (localFilters?.sortBy !== 'relevance') count++;
    if (localFilters?.radius !== '5') count++;
    if (localFilters?.availability !== 'all') count++;
    if (localFilters?.priceRange?.min || localFilters?.priceRange?.max) count++;
    if (localFilters?.hasDelivery) count++;
    if (localFilters?.hasPickup) count++;
    if (localFilters?.promotedOnly) count++;
    return count;
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-warm ${className}`}>
      {/* Mobile Filter Toggle */}
      <div className="md:hidden p-4 border-b border-border">
        <Button
          variant="outline"
          fullWidth
          onClick={() => setIsExpanded(!isExpanded)}
          iconName="Filter"
          iconPosition="left"
        >
          Filtros {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
          <Icon 
            name="ChevronDown" 
            size={16} 
            className={`ml-auto transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
          />
        </Button>
      </div>
      {/* Filter Content */}
      <div className={`${isExpanded ? 'block' : 'hidden'} md:block p-4 space-y-4`}>
        {/* Quick Actions */}
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm">Filtros de busca</h3>
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Limpar tudo
            </Button>
          )}
        </div>

        {/* Category Filter */}
        <div>
          <Select
            label="Categoria"
            options={categories}
            value={localFilters?.category}
            onChange={(value) => handleFilterChange('category', value)}
            className="mb-3"
          />
        </div>

        {/* Sort Options */}
        <div>
          <Select
            label="Ordenar por"
            options={sortOptions}
            value={localFilters?.sortBy}
            onChange={(value) => handleFilterChange('sortBy', value)}
            className="mb-3"
          />
        </div>

        {/* Distance Radius */}
        <div>
          <Select
            label="Raio de busca"
            options={radiusOptions}
            value={localFilters?.radius}
            onChange={(value) => handleFilterChange('radius', value)}
            className="mb-3"
          />
        </div>

        {/* Price Range */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Faixa de preço
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Mín (R$)"
              value={localFilters?.priceRange?.min || ''}
              onChange={(e) => handlePriceRangeChange('min', e?.target?.value)}
            />
            <Input
              type="number"
              placeholder="Máx (R$)"
              value={localFilters?.priceRange?.max || ''}
              onChange={(e) => handlePriceRangeChange('max', e?.target?.value)}
            />
          </div>
        </div>

        {/* Availability Filter */}
        <div>
          <Select
            label="Disponibilidade"
            options={availabilityOptions}
            value={localFilters?.availability}
            onChange={(value) => handleFilterChange('availability', value)}
            className="mb-3"
          />
        </div>

        {/* Delivery Options */}
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">
            Opções de entrega
          </label>
          <div className="space-y-2">
            <Checkbox
              label="Oferece entrega"
              checked={localFilters?.hasDelivery}
              onChange={(e) => handleFilterChange('hasDelivery', e?.target?.checked)}
            />
            <Checkbox
              label="Permite retirada"
              checked={localFilters?.hasPickup}
              onChange={(e) => handleFilterChange('hasPickup', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Premium Features */}
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">
            Recursos especiais
          </label>
          <div className="space-y-2">
            <Checkbox
              label="Apenas anúncios em destaque"
              checked={localFilters?.promotedOnly}
              onChange={(e) => handleFilterChange('promotedOnly', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Apply Button for Mobile */}
        <div className="md:hidden pt-4 border-t border-border">
          <Button
            variant="default"
            fullWidth
            onClick={() => setIsExpanded(false)}
          >
            Aplicar filtros
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;