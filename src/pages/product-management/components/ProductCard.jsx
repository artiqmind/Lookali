import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onEdit, onDelete, onToggleStatus, onViewDetails }) => {
  const [isImageLoading, setIsImageLoading] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10 border-success/20';
      case 'inactive':
        return 'text-muted-foreground bg-muted border-border';
      case 'out_of_stock':
        return 'text-destructive bg-destructive/10 border-destructive/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'inactive':
        return 'Inativo';
      case 'out_of_stock':
        return 'Sem Estoque';
      default:
        return 'Desconhecido';
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })?.format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-warm-sm hover:shadow-warm-md transition-all duration-200">
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <Image
          src={product?.images?.[0] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'}
          alt={product?.name}
          className="w-full h-full object-cover"
          onLoad={() => setIsImageLoading(false)}
          onLoadStart={() => setIsImageLoading(true)}
        />
        
        {/* Status Badge */}
        <div className={`absolute top-2 left-2 px-2 py-1 rounded-sm text-xs font-medium border ${getStatusColor(product?.status)}`}>
          {getStatusLabel(product?.status)}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 flex space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 bg-background/80 hover:bg-background"
            onClick={() => onEdit(product)}
          >
            <Icon name="Edit" size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 bg-background/80 hover:bg-background text-destructive hover:text-destructive"
            onClick={() => onDelete(product)}
          >
            <Icon name="Trash2" size={14} />
          </Button>
        </div>

        {/* Loading Overlay */}
        {isImageLoading && (
          <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
            <Icon name="Image" size={24} color="var(--color-muted-foreground)" />
          </div>
        )}
      </div>
      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 
            className="font-medium text-foreground line-clamp-2 cursor-pointer hover:text-primary transition-colors duration-150"
            onClick={() => onViewDetails(product)}
          >
            {product?.name}
          </h3>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Preço:</span>
            <span className="font-semibold text-primary">{formatPrice(product?.price)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Estoque:</span>
            <span className={`text-sm font-medium ${product?.stock <= 5 ? 'text-warning' : 'text-foreground'}`}>
              {product?.stock} unidades
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Categoria:</span>
            <span className="text-sm text-foreground">{product?.category}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Edit"
            iconPosition="left"
            onClick={() => onEdit(product)}
          >
            Editar
          </Button>
          <Button
            variant={product?.status === 'active' ? 'secondary' : 'default'}
            size="sm"
            fullWidth
            iconName={product?.status === 'active' ? 'EyeOff' : 'Eye'}
            iconPosition="left"
            onClick={() => onToggleStatus(product)}
          >
            {product?.status === 'active' ? 'Desativar' : 'Ativar'}
          </Button>
        </div>

        {/* Last Updated */}
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Atualizado em:</span>
            <span>{formatDate(product?.updatedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;