import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import LocationIndicator from '../../../components/ui/LocationIndicator';

const SearchResultsHeader = ({ 
  searchQuery, 
  resultCount, 
  searchTime,
  location,
  onLocationChange,
  onSearchChange,
  className = '' 
}) => {
  const handleShareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: `Resultados para "${searchQuery}" - Lookali`,
        text: `Encontrei ${resultCount} produtos para "${searchQuery}" perto de ${location}`,
        url: window.location?.href
      });
    } else {
      navigator.clipboard?.writeText(window.location?.href);
      // In a real app, you'd show a toast notification here
    }
  };

  const handleSaveSearch = () => {
    // In a real app, this would save to user preferences
    const savedSearches = JSON.parse(localStorage.getItem('savedSearches') || '[]');
    const newSearch = {
      id: Date.now(),
      query: searchQuery,
      location,
      timestamp: new Date()?.toISOString(),
      resultCount
    };
    
    savedSearches?.unshift(newSearch);
    localStorage.setItem('savedSearches', JSON.stringify(savedSearches?.slice(0, 10)));
  };

  return (
    <div className={`bg-background border-b border-border ${className}`}>
      <div className="px-4 lg:px-6 py-4">
        {/* Search Context */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-xl font-heading font-bold text-foreground mb-1">
              {searchQuery ? `Resultados para "${searchQuery}"` : 'Produtos próximos'}
            </h1>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Search" size={14} />
                <span>
                  {resultCount === 0 
                    ? 'Nenhum resultado encontrado'
                    : `${resultCount?.toLocaleString()} ${resultCount === 1 ? 'resultado' : 'resultados'}`
                  }
                </span>
              </div>
              
              {searchTime && (
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>em {searchTime}ms</span>
                </div>
              )}
              
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={14} />
                <span>próximo a {location}</span>
              </div>
            </div>
          </div>

          {/* Location Controls */}
          <div className="flex items-center space-x-2">
            <LocationIndicator 
              onLocationChange={onLocationChange}
              className="hidden lg:block"
            />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSaveSearch}
              iconName="Bookmark"
              iconPosition="left"
              className="hidden md:flex"
            >
              Salvar busca
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShareResults}
              iconName="Share"
              iconPosition="left"
            >
              Compartilhar
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history?.back()}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Voltar
            </Button>
            
            <div className="hidden md:flex items-center space-x-1 text-xs text-muted-foreground">
              <Icon name="Info" size={12} />
              <span>Dica: Clique nos produtos para destacá-los no mapa</span>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-1 bg-muted rounded-md p-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 data-[active=true]:bg-background data-[active=true]:shadow-warm-sm"
              data-active="true"
            >
              <Icon name="Grid3X3" size={14} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3"
            >
              <Icon name="List" size={14} />
            </Button>
          </div>
        </div>

        {/* Mobile Location */}
        <div className="lg:hidden mt-4">
          <LocationIndicator onLocationChange={onLocationChange} />
        </div>
      </div>
    </div>
  );
};

export default SearchResultsHeader;