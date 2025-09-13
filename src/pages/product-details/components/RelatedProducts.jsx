import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const RelatedProducts = ({ currentProductId = '', sellerId = '', category = '' }) => {
  const mockRelatedProducts = [
    {
      id: "prod_002",
      name: "Carregador Wireless Premium",
      price: 89.90,
      originalPrice: 119.90,
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop",
      seller: "TechStore SP",
      distance: "1.2 km",
      rating: 4.7,
      availability: "available",
      isNew: true
    },
    {
      id: "prod_003",
      name: "Cabo USB-C Premium 2m",
      price: 45.90,
      image: "https://images.pexels.com/photos/163117/circuit-circuit-board-resistor-computer-163117.jpeg?w=300&h=300&fit=crop",
      seller: "TechStore SP",
      distance: "1.2 km",
      rating: 4.9,
      availability: "limited",
      stock: 3
    },
    {
      id: "prod_004",
      name: "Suporte para Celular Ajustável",
      price: 29.90,
      image: "https://images.pixabay.com/photo/2016/12/09/11/33/smartphone-1894723_1280.jpg?w=300&h=300&fit=crop",
      seller: "TechStore SP",
      distance: "1.2 km",
      rating: 4.5,
      availability: "available"
    },
    {
      id: "prod_005",
      name: "Power Bank 20000mAh",
      price: 159.90,
      originalPrice: 199.90,
      image: "https://images.unsplash.com/photo-1609592806596-b43bcd3d4b5d?w=300&h=300&fit=crop",
      seller: "TechStore SP",
      distance: "1.2 km",
      rating: 4.8,
      availability: "available"
    }
  ];

  const getAvailabilityBadge = (product) => {
    switch (product?.availability) {
      case 'available':
        return (
          <div className="flex items-center space-x-1 text-xs text-success">
            <Icon name="Check" size={10} />
            <span>Disponível</span>
          </div>
        );
      case 'limited':
        return (
          <div className="flex items-center space-x-1 text-xs text-warning">
            <Icon name="AlertTriangle" size={10} />
            <span>Últimas {product?.stock} unidades</span>
          </div>
        );
      case 'out_of_stock':
        return (
          <div className="flex items-center space-x-1 text-xs text-destructive">
            <Icon name="X" size={10} />
            <span>Esgotado</span>
          </div>
        );
      default:
        return null;
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={10} color="var(--color-warning)" className="fill-current" />
      );
    }
    
    const emptyStars = 5 - fullStars;
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={10} color="var(--color-border)" />
      );
    }
    
    return stars;
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-heading font-bold text-foreground">
            Produtos Relacionados
          </h2>
          <p className="text-sm text-muted-foreground">
            Outros produtos desta loja que podem interessar
          </p>
        </div>
        
        <Link to="/seller-storefront">
          <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right">
            Ver todos
          </Button>
        </Link>
      </div>
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockRelatedProducts?.map((product) => (
          <Link
            key={product?.id}
            to="/product-details"
            className="group bg-card border border-border rounded-lg overflow-hidden shadow-warm-sm hover:shadow-warm-md transition-all duration-200 hover:border-primary/30"
          >
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={product?.image}
                alt={product?.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col space-y-1">
                {product?.isNew && (
                  <span className="bg-primary text-primary-foreground px-2 py-1 rounded-sm text-xs font-medium">
                    Novo
                  </span>
                )}
                {product?.originalPrice && product?.originalPrice > product?.price && (
                  <span className="bg-destructive text-destructive-foreground px-2 py-1 rounded-sm text-xs font-medium">
                    -{Math.round(((product?.originalPrice - product?.price) / product?.originalPrice) * 100)}%
                  </span>
                )}
              </div>

              {/* Quick Actions */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/90 hover:bg-white text-foreground shadow-warm-sm"
                  onClick={(e) => {
                    e?.preventDefault();
                    // Handle favorite toggle
                  }}
                >
                  <Icon name="Heart" size={16} />
                </Button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4 space-y-3">
              {/* Product Name */}
              <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-150">
                {product?.name}
              </h3>

              {/* Rating & Availability */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {renderStars(product?.rating)}
                  <span className="text-xs text-muted-foreground ml-1">
                    {product?.rating}
                  </span>
                </div>
                {getAvailabilityBadge(product)}
              </div>

              {/* Price */}
              <div className="space-y-1">
                <div className="flex items-baseline space-x-2">
                  <span className="text-lg font-heading font-bold text-foreground">
                    R$ {product?.price?.toFixed(2)?.replace('.', ',')}
                  </span>
                  {product?.originalPrice && product?.originalPrice > product?.price && (
                    <span className="text-sm text-muted-foreground line-through">
                      R$ {product?.originalPrice?.toFixed(2)?.replace('.', ',')}
                    </span>
                  )}
                </div>
              </div>

              {/* Seller Info */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{product?.seller}</span>
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={10} />
                  <span>{product?.distance}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* View More Button */}
      <div className="text-center pt-4">
        <Link to="/seller-storefront">
          <Button variant="outline" iconName="Store" iconPosition="left">
            Ver Todos os Produtos da Loja
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RelatedProducts;