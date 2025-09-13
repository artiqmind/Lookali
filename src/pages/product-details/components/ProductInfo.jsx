import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductInfo = ({ product = {} }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const mockProduct = {
    name: "Fone de Ouvido Bluetooth Premium",
    price: 299.90,
    originalPrice: 399.90,
    category: "Eletrônicos",
    brand: "TechSound",
    model: "TS-BT500",
    condition: "Novo",
    availability: "available",
    stock: 5,
    description: `Fone de ouvido Bluetooth de alta qualidade com cancelamento de ruído ativo e bateria de longa duração.\n\nCaracterísticas principais:\n• Cancelamento de ruído ativo\n• Bateria de até 30 horas\n• Conexão Bluetooth 5.0\n• Driver de 40mm para áudio premium\n• Microfone integrado para chamadas\n• Design confortável e dobrável\n\nIdeal para uso profissional, estudos ou entretenimento. Acompanha case de transporte e cabo USB-C para carregamento.`,
    specifications: {
      "Conectividade": "Bluetooth 5.0, Cabo P2 3.5mm",
      "Bateria": "30 horas de reprodução",
      "Drivers": "40mm Neodímio",
      "Peso": "250g",
      "Garantia": "12 meses",
      "Cor": "Preto Fosco"
    },
    tags: ["bluetooth", "cancelamento de ruído", "premium", "longa duração"],
    ...product
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  const getAvailabilityStatus = () => {
    switch (mockProduct?.availability) {
      case 'available':
        return {
          text: 'Disponível',
          color: 'text-success',
          bgColor: 'bg-success/10',
          icon: 'Check'
        };
      case 'limited':
        return {
          text: `Apenas ${mockProduct?.stock} restantes`,
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          icon: 'AlertTriangle'
        };
      case 'out_of_stock':
        return {
          text: 'Esgotado',
          color: 'text-destructive',
          bgColor: 'bg-destructive/10',
          icon: 'X'
        };
      default:
        return {
          text: 'Consultar disponibilidade',
          color: 'text-muted-foreground',
          bgColor: 'bg-muted',
          icon: 'Clock'
        };
    }
  };

  const status = getAvailabilityStatus();
  const hasDiscount = mockProduct?.originalPrice && mockProduct?.originalPrice > mockProduct?.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((mockProduct?.originalPrice - mockProduct?.price) / mockProduct?.originalPrice) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Product Header */}
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground leading-tight">
              {mockProduct?.name}
            </h1>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-sm text-muted-foreground">{mockProduct?.brand}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{mockProduct?.category}</span>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavoriteToggle}
            className="flex-shrink-0"
          >
            <Icon 
              name={isFavorite ? "Heart" : "Heart"} 
              size={20} 
              color={isFavorite ? "var(--color-destructive)" : "var(--color-muted-foreground)"}
              className={isFavorite ? "fill-current" : ""}
            />
          </Button>
        </div>

        {/* Price Section */}
        <div className="space-y-2">
          <div className="flex items-baseline space-x-3">
            <span className="text-3xl font-heading font-bold text-foreground">
              R$ {mockProduct?.price?.toFixed(2)?.replace('.', ',')}
            </span>
            {hasDiscount && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  R$ {mockProduct?.originalPrice?.toFixed(2)?.replace('.', ',')}
                </span>
                <span className="bg-destructive text-destructive-foreground px-2 py-1 rounded-sm text-sm font-medium">
                  -{discountPercentage}%
                </span>
              </>
            )}
          </div>
          
          {/* Availability Status */}
          <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-sm ${status?.bgColor}`}>
            <Icon name={status?.icon} size={14} className={status?.color} />
            <span className={`text-sm font-medium ${status?.color}`}>
              {status?.text}
            </span>
          </div>
        </div>
      </div>
      {/* Product Tags */}
      {mockProduct?.tags && mockProduct?.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {mockProduct?.tags?.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      {/* Description */}
      <div className="space-y-3">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Descrição
        </h3>
        <div className="prose prose-sm max-w-none">
          <p className="text-foreground leading-relaxed whitespace-pre-line">
            {showFullDescription 
              ? mockProduct?.description
              : mockProduct?.description?.length > 200
                ? `${mockProduct?.description?.substring(0, 200)}...`
                : mockProduct?.description
            }
          </p>
          {mockProduct?.description?.length > 200 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="mt-2 p-0 h-auto text-primary hover:text-primary/80"
            >
              {showFullDescription ? 'Ver menos' : 'Ver mais'}
            </Button>
          )}
        </div>
      </div>
      {/* Specifications */}
      {mockProduct?.specifications && (
        <div className="space-y-3">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Especificações
          </h3>
          <div className="bg-muted rounded-lg p-4 space-y-3">
            {Object.entries(mockProduct?.specifications)?.map(([key, value]) => (
              <div key={key} className="flex justify-between items-start">
                <span className="text-sm font-medium text-muted-foreground flex-shrink-0 w-1/3">
                  {key}:
                </span>
                <span className="text-sm text-foreground text-right flex-1">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Product Condition */}
      <div className="flex items-center space-x-2 p-3 bg-card border border-border rounded-lg">
        <Icon name="Package" size={16} color="var(--color-primary)" />
        <span className="text-sm font-medium text-foreground">
          Condição: {mockProduct?.condition}
        </span>
      </div>
    </div>
  );
};

export default ProductInfo;