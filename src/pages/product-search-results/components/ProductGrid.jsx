import React from 'react';
import ProductCard from './ProductCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductGrid = ({ 
  products, 
  loading, 
  selectedProduct,
  onProductSelect,
  onLoadMore,
  hasMore,
  className = '' 
}) => {
  if (loading && products?.length === 0) {
    return (
      <div className={`${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 })?.map((_, index) => (
            <div key={index} className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
              <div className="aspect-square bg-muted"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-6 bg-muted rounded w-1/2"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-8 bg-muted rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products?.length === 0) {
    return (
      <div className={`${className}`}>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Search" size={24} color="var(--color-muted-foreground)" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            Nenhum produto encontrado
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Não encontramos produtos que correspondam aos seus critérios de busca. 
            Tente ajustar os filtros ou expandir a área de busca.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="outline"
              iconName="RotateCcw"
              iconPosition="left"
              onClick={() => window.location?.reload()}
            >
              Tentar novamente
            </Button>
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              onClick={() => window.history?.back()}
            >
              Nova busca
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {products?.map((product) => (
          <div
            key={product?.id}
            className={`transition-all duration-200 ${
              selectedProduct?.id === product?.id 
                ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' :''
            }`}
          >
            <ProductCard
              product={product}
              onMapHighlight={onProductSelect}
            />
          </div>
        ))}
      </div>
      {/* Load More */}
      {hasMore && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={onLoadMore}
            disabled={loading}
            iconName={loading ? "Loader2" : "ChevronDown"}
            iconPosition="left"
            className={loading ? "animate-spin" : ""}
          >
            {loading ? 'Carregando...' : 'Carregar mais produtos'}
          </Button>
          
          <div className="mt-3 text-xs text-muted-foreground">
            Mostrando {products?.length} de muitos resultados
          </div>
        </div>
      )}
      {/* End of Results */}
      {!hasMore && products?.length > 0 && (
        <div className="text-center py-8 border-t border-border">
          <Icon name="CheckCircle" size={20} color="var(--color-success)" className="mx-auto mb-2" />
          <div className="text-sm text-muted-foreground">
            Você viu todos os produtos disponíveis nesta área
          </div>
          <div className="mt-3">
            <Button
              variant="ghost"
              size="sm"
              iconName="ArrowUp"
              iconPosition="left"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Voltar ao topo
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;