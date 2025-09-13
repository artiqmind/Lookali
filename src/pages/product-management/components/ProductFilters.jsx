import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ProductFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const categories = [
    { value: '', label: 'Todas as Categorias' },
    { value: 'electronics', label: 'Eletrônicos' },
    { value: 'clothing', label: 'Roupas e Acessórios' },
    { value: 'home', label: 'Casa e Jardim' },
    { value: 'beauty', label: 'Beleza e Cuidados' },
    { value: 'sports', label: 'Esportes e Lazer' },
    { value: 'books', label: 'Livros e Mídia' },
    { value: 'food', label: 'Alimentos e Bebidas' },
    { value: 'automotive', label: 'Automotivo' },
    { value: 'toys', label: 'Brinquedos e Jogos' },
    { value: 'health', label: 'Saúde e Bem-estar' }
  ];

  const statusOptions = [
    { value: '', label: 'Todos os Status' },
    { value: 'active', label: 'Ativo' },
    { value: 'inactive', label: 'Inativo' },
    { value: 'out_of_stock', label: 'Sem Estoque' }
  ];

  const stockLevelOptions = [
    { value: '', label: 'Todos os Níveis' },
    { value: 'low', label: 'Estoque Baixo (≤5)' },
    { value: 'medium', label: 'Estoque Médio (6-20)' },
    { value: 'high', label: 'Estoque Alto (>20)' },
    { value: 'zero', label: 'Sem Estoque (0)' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handlePriceRangeChange = (type, value) => {
    const newPriceRange = { ...localFilters?.priceRange, [type]: value };
    const newFilters = { ...localFilters, priceRange: newPriceRange };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      category: '',
      status: '',
      stockLevel: '',
      priceRange: { min: '', max: '' },
      lowStock: false,
      hasImages: false,
      recentlyUpdated: false
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
    onClearFilters();
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (localFilters?.search) count++;
    if (localFilters?.category) count++;
    if (localFilters?.status) count++;
    if (localFilters?.stockLevel) count++;
    if (localFilters?.priceRange?.min || localFilters?.priceRange?.max) count++;
    if (localFilters?.lowStock) count++;
    if (localFilters?.hasImages) count++;
    if (localFilters?.recentlyUpdated) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="bg-card border border-border rounded-lg shadow-warm-sm mb-6">
      <div className="p-4">
        {/* Search and Quick Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="flex-1 max-w-md">
            <Input
              type="search"
              placeholder="Buscar produtos..."
              value={localFilters?.search}
              onChange={(e) => handleFilterChange('search', e?.target?.value)}
              className="w-full"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Select
              options={categories}
              value={localFilters?.category}
              onChange={(value) => handleFilterChange('category', value)}
              placeholder="Categoria"
              className="w-48"
            />
            
            <Select
              options={statusOptions}
              value={localFilters?.status}
              onChange={(value) => handleFilterChange('status', value)}
              placeholder="Status"
              className="w-32"
            />

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
            >
              Filtros
              {activeFiltersCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </Button>

            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                iconName="X"
                iconPosition="left"
              >
                Limpar
              </Button>
            )}
          </div>
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="pt-4 border-t border-border space-y-4">
            {/* Price Range */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Faixa de Preço (R$)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Preço mínimo"
                  value={localFilters?.priceRange?.min || ''}
                  onChange={(e) => handlePriceRangeChange('min', e?.target?.value)}
                />
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Preço máximo"
                  value={localFilters?.priceRange?.max || ''}
                  onChange={(e) => handlePriceRangeChange('max', e?.target?.value)}
                />
              </div>
            </div>

            {/* Stock Level */}
            <div>
              <Select
                label="Nível de Estoque"
                options={stockLevelOptions}
                value={localFilters?.stockLevel}
                onChange={(value) => handleFilterChange('stockLevel', value)}
              />
            </div>

            {/* Additional Filters */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                Filtros Adicionais
              </label>
              <div className="space-y-2">
                <Checkbox
                  label="Apenas produtos com estoque baixo"
                  checked={localFilters?.lowStock}
                  onChange={(e) => handleFilterChange('lowStock', e?.target?.checked)}
                />
                <Checkbox
                  label="Apenas produtos com imagens"
                  checked={localFilters?.hasImages}
                  onChange={(e) => handleFilterChange('hasImages', e?.target?.checked)}
                />
                <Checkbox
                  label="Atualizados nos últimos 7 dias"
                  checked={localFilters?.recentlyUpdated}
                  onChange={(e) => handleFilterChange('recentlyUpdated', e?.target?.checked)}
                />
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex justify-end space-x-2 pt-4 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
              >
                Fechar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearFilters}
                iconName="RotateCcw"
                iconPosition="left"
              >
                Resetar Filtros
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFilters;