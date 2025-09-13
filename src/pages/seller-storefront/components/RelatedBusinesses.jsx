import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RelatedBusinesses = ({ businesses, currentBusinessId }) => {
  const filteredBusinesses = businesses?.filter(business => business?.id !== currentBusinessId);

  const BusinessCard = ({ business }) => (
    <Link
      to={`/seller-storefront?id=${business?.id}`}
      className="block bg-card border border-border rounded-lg overflow-hidden shadow-warm-sm hover:shadow-warm-md transition-all duration-200 group"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={business?.coverImage}
          alt={`${business?.name} cover`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Business Status */}
        <div className="absolute top-2 left-2">
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-sm text-xs font-medium ${
            business?.isOpen 
              ? 'bg-success text-success-foreground' 
              : 'bg-destructive text-destructive-foreground'
          }`}>
            <div className={`w-1.5 h-1.5 rounded-full ${
              business?.isOpen ? 'bg-success-foreground' : 'bg-destructive-foreground'
            }`} />
            <span>{business?.isOpen ? 'Aberto' : 'Fechado'}</span>
          </div>
        </div>

        {/* Premium Badge */}
        {business?.isPremium && (
          <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-2 py-1 rounded-sm text-xs font-medium flex items-center space-x-1">
            <Icon name="Crown" size={10} />
            <span>Premium</span>
          </div>
        )}

        {/* Distance */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-sm text-xs">
          {business?.distance}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 border-card shadow-warm-sm">
            <Image
              src={business?.logo}
              alt={`${business?.name} logo`}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-medium text-foreground truncate group-hover:text-primary transition-colors duration-200">
                {business?.name}
              </h3>
              {business?.isVerified && (
                <div className="flex-shrink-0 bg-primary text-primary-foreground p-0.5 rounded-full">
                  <Icon name="Check" size={10} />
                </div>
              )}
            </div>

            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
              {business?.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5]?.map((star) => (
                    <Icon
                      key={star}
                      name="Star"
                      size={12}
                      color={star <= Math.floor(business?.rating) ? 'var(--color-warning)' : 'var(--color-muted)'}
                      className={star <= Math.floor(business?.rating) ? 'fill-current' : ''}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {business?.rating?.toFixed(1)} ({business?.reviewCount})
                </span>
              </div>

              <span className="text-xs text-muted-foreground">
                {business?.productCount} produtos
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );

  if (filteredBusinesses?.length === 0) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-heading font-bold text-foreground">
            Negócios Relacionados
          </h3>
          <Link
            to="/product-search-results"
            className="text-sm text-primary hover:text-primary/80 transition-colors duration-150"
          >
            Ver todos
          </Link>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Outros negócios próximos que podem interessar você
        </p>
      </div>
      <div className="p-6">
        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredBusinesses?.slice(0, 6)?.map(business => (
            <BusinessCard key={business?.id} business={business} />
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden">
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {filteredBusinesses?.slice(0, 8)?.map(business => (
              <div key={business?.id} className="flex-shrink-0 w-64">
                <BusinessCard business={business} />
              </div>
            ))}
          </div>
        </div>

        {/* Load More Button */}
        {filteredBusinesses?.length > 6 && (
          <div className="text-center mt-6">
            <Button
              variant="outline"
              iconName="ArrowRight"
              iconPosition="right"
              onClick={() => window.location.href = '/product-search-results'}
            >
              Explorar mais negócios
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedBusinesses;