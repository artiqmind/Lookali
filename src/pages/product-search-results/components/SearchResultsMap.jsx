import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchResultsMap = ({ products, selectedProduct, onProductSelect, className = '' }) => {
  const [mapCenter, setMapCenter] = useState({ lat: -23.5505, lng: -46.6333 }); // São Paulo default
  const [isExpanded, setIsExpanded] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Mock coordinates for demonstration
  const getProductCoordinates = (product) => {
    // In real implementation, this would come from the product data
    const baseCoords = mapCenter;
    const randomOffset = () => (Math.random() - 0.5) * 0.02; // ~1km radius
    
    return {
      lat: baseCoords?.lat + randomOffset(),
      lng: baseCoords?.lng + randomOffset()
    };
  };

  const generateMapUrl = () => {
    const markers = products?.slice(0, 10)?.map((product, index) => {
      const coords = getProductCoordinates(product);
      return `markers=color:red%7Clabel:${index + 1}%7C${coords?.lat},${coords?.lng}`;
    })?.join('&');

    return `https://www.google.com/maps/embed/v1/view?key=demo&center=${mapCenter?.lat},${mapCenter?.lng}&zoom=13&${markers}`;
  };

  const handleMarkerClick = (product) => {
    if (onProductSelect) {
      onProductSelect(product);
    }
  };

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => setMapLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`bg-card border border-border rounded-lg shadow-warm overflow-hidden ${className}`}>
      {/* Map Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Map" size={16} color="var(--color-primary)" />
            <span className="font-medium text-sm">Mapa de resultados</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">
              {products?.length} {products?.length === 1 ? 'resultado' : 'resultados'}
            </span>
            
            {/* Mobile Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="md:hidden"
            >
              <Icon 
                name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                size={16} 
              />
            </Button>
          </div>
        </div>
      </div>
      {/* Map Content */}
      <div className={`${isExpanded ? 'block' : 'hidden'} md:block`}>
        {/* Map Container */}
        <div className="relative h-64 md:h-80 bg-muted">
          {!mapLoaded ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Icon name="MapPin" size={32} color="var(--color-muted-foreground)" className="mx-auto mb-2" />
                <div className="text-sm text-muted-foreground">Carregando mapa...</div>
              </div>
            </div>
          ) : (
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Mapa de resultados de busca"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=13&output=embed`}
              className="border-0"
            />
          )}

          {/* Map Controls */}
          <div className="absolute top-2 right-2 space-y-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMapCenter({ lat: -23.5505, lng: -46.6333 })}
              className="bg-background/90 backdrop-blur-sm"
            >
              <Icon name="RotateCcw" size={14} />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="bg-background/90 backdrop-blur-sm"
            >
              <Icon name="Maximize" size={14} />
            </Button>
          </div>
        </div>

        {/* Product Markers List */}
        <div className="p-4 max-h-48 overflow-y-auto">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Produtos no mapa
          </div>
          
          <div className="space-y-2">
            {products?.slice(0, 10)?.map((product, index) => (
              <button
                key={product?.id}
                onClick={() => handleMarkerClick(product)}
                className={`w-full text-left p-2 rounded-sm transition-colors duration-150 ${
                  selectedProduct?.id === product?.id
                    ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">
                      {product?.name}
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{product?.seller?.businessName || product?.seller?.name}</span>
                      <span>•</span>
                      <span>{product?.distance}</span>
                    </div>
                  </div>
                  
                  <div className="text-sm font-bold text-foreground">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })?.format(product?.price)}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {products?.length > 10 && (
            <div className="mt-3 pt-3 border-t border-border text-center">
              <div className="text-xs text-muted-foreground">
                +{products?.length - 10} produtos adicionais não exibidos no mapa
              </div>
            </div>
          )}
        </div>

        {/* Map Legend */}
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-destructive rounded-full"></div>
                <span className="text-muted-foreground">Produtos</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">Selecionado</span>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=13`, '_blank')}
              className="text-xs"
            >
              Abrir no Google Maps
              <Icon name="ExternalLink" size={12} className="ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsMap;