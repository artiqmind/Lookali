import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductCatalog = ({ products, categories, onProductClick, onContactSeller }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');

  const sortOptions = [
    { value: 'featured', label: 'Destaques' },
    { value: 'price_low', label: 'Menor preço' },
    { value: 'price_high', label: 'Maior preço' },
    { value: 'newest', label: 'Mais recentes' },
    { value: 'popular', label: 'Mais populares' }
  ];

  const filteredProducts = products?.filter(product => 
    selectedCategory === 'all' || product?.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts]?.sort((a, b) => {
    switch (sortBy) {
      case 'price_low':
        return a?.price - b?.price;
      case 'price_high':
        return b?.price - a?.price;
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'popular':
        return b?.views - a?.views;
      default:
        return b?.featured ? 1 : -1;
    }
  });

  const ProductCard = ({ product }) => (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-warm-sm hover:shadow-warm-md transition-all duration-200 group">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product?.images?.[0]}
          alt={product?.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Product Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {product?.featured && (
            <span className="bg-accent text-accent-foreground px-2 py-1 rounded-sm text-xs font-medium">
              Destaque
            </span>
          )}
          {product?.isNew && (
            <span className="bg-success text-success-foreground px-2 py-1 rounded-sm text-xs font-medium">
              Novo
            </span>
          )}
          {product?.discount > 0 && (
            <span className="bg-destructive text-destructive-foreground px-2 py-1 rounded-sm text-xs font-medium">
              -{product?.discount}%
            </span>
          )}
        </div>

        {/* Availability Status */}
        <div className="absolute top-2 right-2">
          <div className={`w-3 h-3 rounded-full ${
            product?.availability === 'available' ? 'bg-success' : 
            product?.availability === 'limited' ? 'bg-warning' : 'bg-destructive'
          }`} />
        </div>

        {/* Quick Actions */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2">
          <Button
            variant="secondary"
            size="sm"
            iconName="Eye"
            onClick={() => onProductClick(product)}
          >
            Ver
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="MessageCircle"
            onClick={() => onContactSeller(product)}
          >
            Contatar
          </Button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {product?.name}
        </h3>
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            {product?.originalPrice && product?.originalPrice > product?.price && (
              <span className="text-sm text-muted-foreground line-through">
                R$ {product?.originalPrice?.toFixed(2)}
              </span>
            )}
            <span className="text-lg font-bold text-foreground">
              R$ {product?.price?.toFixed(2)}
            </span>
          </div>
          
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Icon name="Eye" size={12} />
            <span>{product?.views}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className={`font-medium ${
            product?.availability === 'available' ? 'text-success' : 
            product?.availability === 'limited' ? 'text-warning' : 'text-destructive'
          }`}>
            {product?.availability === 'available' ? 'Disponível' : 
             product?.availability === 'limited' ? 'Estoque limitado' : 'Indisponível'}
          </span>
          
          {product?.deliveryOptions?.includes('pickup') && (
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={12} />
              <span>Retirada local</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-background">
      {/* Catalog Header */}
      <div className="px-4 lg:px-6 py-4 border-b border-border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-1">
              Catálogo de Produtos
            </h2>
            <p className="text-sm text-muted-foreground">
              {sortedProducts?.length} produtos disponíveis
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-muted rounded-md p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-sm transition-colors duration-150 ${
                  viewMode === 'grid' ? 'bg-background text-foreground' : 'text-muted-foreground'
                }`}
              >
                <Icon name="Grid3X3" size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-sm transition-colors duration-150 ${
                  viewMode === 'list' ? 'bg-background text-foreground' : 'text-muted-foreground'
                }`}
              >
                <Icon name="List" size={16} />
              </button>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="bg-input border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {sortOptions?.map(option => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Category Filter */}
      <div className="px-4 lg:px-6 py-4 border-b border-border">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-150 ${
              selectedCategory === 'all' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Todos ({products?.length})
          </button>
          
          {categories?.map(category => {
            const categoryCount = products?.filter(p => p?.category === category?.id)?.length;
            return (
              <button
                key={category?.id}
                onClick={() => setSelectedCategory(category?.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-150 ${
                  selectedCategory === category?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {category?.name}({categoryCount})
                              </button>
            );
          })}
        </div>
      </div>
      {/* Products Grid */}
      <div className="px-4 lg:px-6 py-6">
        {sortedProducts?.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' ?'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' :'grid-cols-1'
          }`}>
            {sortedProducts?.map(product => (
              <ProductCard key={product?.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Icon name="Package" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-muted-foreground">
              Não há produtos disponíveis nesta categoria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;