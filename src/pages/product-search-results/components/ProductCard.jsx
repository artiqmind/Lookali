import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import WhatsAppBridge from '../../../components/ui/WhatsAppBridge';

const ProductCard = ({ product, onMapHighlight }) => {
  const {
    id,
    name,
    price,
    originalPrice,
    images,
    seller,
    distance,
    availability,
    rating,
    reviewCount,
    isPromoted,
    deliveryOptions,
    category
  } = product;

  const handleCardClick = () => {
    if (onMapHighlight) {
      onMapHighlight(product);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })?.format(price);
  };

  const getAvailabilityColor = (status) => {
    switch (status) {
      case 'available':
        return 'text-success';
      case 'limited':
        return 'text-warning';
      case 'out_of_stock':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getAvailabilityText = (status) => {
    switch (status) {
      case 'available':
        return 'Disponível';
      case 'limited':
        return 'Estoque limitado';
      case 'out_of_stock':
        return 'Esgotado';
      default:
        return 'Consultar';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-warm hover:shadow-warm-md transition-all duration-200 overflow-hidden group">
      {/* Promoted Badge */}
      {isPromoted && (
        <div className="absolute top-2 left-2 z-10 bg-accent text-accent-foreground px-2 py-1 rounded-sm text-xs font-medium">
          Destaque
        </div>
      )}
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden cursor-pointer" onClick={handleCardClick}>
        <Image
          src={images?.[0]}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Availability Overlay */}
        <div className="absolute bottom-2 right-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-sm">
          <div className={`flex items-center space-x-1 text-xs font-medium ${getAvailabilityColor(availability)}`}>
            <Icon 
              name={availability === 'available' ? 'CheckCircle' : availability === 'limited' ? 'Clock' : 'XCircle'} 
              size={12} 
            />
            <span>{getAvailabilityText(availability)}</span>
          </div>
        </div>
      </div>
      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
          {category}
        </div>

        {/* Product Name */}
        <Link 
          to={`/product-details?id=${id}`}
          className="block hover:text-primary transition-colors duration-150"
        >
          <h3 className="font-medium text-sm line-clamp-2 mb-2">
            {name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg font-bold text-foreground">
            {formatPrice(price)}
          </span>
          {originalPrice && originalPrice > price && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>

        {/* Seller Info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Store" size={12} color="var(--color-primary)" />
            </div>
            <div>
              <div className="text-xs font-medium text-foreground">
                {seller?.businessName || seller?.name}
              </div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Icon name="MapPin" size={10} />
                <span>{distance}</span>
              </div>
            </div>
          </div>

          {/* Rating */}
          {rating && (
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={12} color="var(--color-warning)" />
              <span className="text-xs font-medium">{rating?.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">({reviewCount})</span>
            </div>
          )}
        </div>

        {/* Delivery Options */}
        {deliveryOptions && deliveryOptions?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {deliveryOptions?.slice(0, 2)?.map((option, index) => (
              <div key={index} className="flex items-center space-x-1 bg-muted px-2 py-1 rounded-sm">
                <Icon 
                  name={option === 'pickup' ? 'MapPin' : option === 'delivery' ? 'Truck' : 'Package'} 
                  size={10} 
                />
                <span className="text-xs text-muted-foreground capitalize">
                  {option === 'pickup' ? 'Retirada' : option === 'delivery' ? 'Entrega' : option}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          <WhatsAppBridge
            variant="button"
            productInfo={product}
            sellerInfo={seller}
            messageType="product_inquiry"
            className="w-full"
          />
          
          <Link to={`/product-details?id=${id}`} className="block">
            <Button variant="outline" size="sm" fullWidth>
              Ver detalhes
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;