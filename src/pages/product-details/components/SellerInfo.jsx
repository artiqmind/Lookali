import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const SellerInfo = ({ seller = {} }) => {
  const mockSeller = {
    id: "seller_001",
    name: "Maria Silva",
    businessName: "TechStore SP",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    rating: 4.8,
    reviewCount: 127,
    location: "Vila Madalena, São Paulo - SP",
    distance: "1.2 km",
    verified: true,
    memberSince: "2022-03-15",
    responseTime: "Responde em até 2 horas",
    businessHours: {
      monday: "09:00 - 18:00",
      tuesday: "09:00 - 18:00",
      wednesday: "09:00 - 18:00",
      thursday: "09:00 - 18:00",
      friday: "09:00 - 18:00",
      saturday: "09:00 - 15:00",
      sunday: "Fechado"
    },
    isOnline: true,
    totalProducts: 45,
    completedSales: 89,
    whatsapp: "+55 11 99999-8888",
    ...seller
  };

  const getCurrentDayHours = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = days?.[new Date()?.getDay()];
    return mockSeller?.businessHours?.[today] || "Fechado";
  };

  const isCurrentlyOpen = () => {
    const currentHours = getCurrentDayHours();
    if (currentHours === "Fechado") return false;
    
    const now = new Date();
    const currentTime = now?.getHours() * 60 + now?.getMinutes();
    const [openTime, closeTime] = currentHours?.split(' - ')?.map(time => {
      const [hours, minutes] = time?.split(':')?.map(Number);
      return hours * 60 + minutes;
    });
    
    return currentTime >= openTime && currentTime <= closeTime;
  };

  const formatMemberSince = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('pt-BR', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={14} color="var(--color-warning)" className="fill-current" />
      );
    }
    
    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="Star" size={14} color="var(--color-warning)" className="fill-current opacity-50" />
      );
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={14} color="var(--color-border)" />
      );
    }
    
    return stars;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-warm-sm space-y-6">
      {/* Seller Header */}
      <div className="space-y-4">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <Image
              src={mockSeller?.avatar}
              alt={mockSeller?.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            {mockSeller?.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-card flex items-center justify-center">
                <div className="w-2 h-2 bg-success-foreground rounded-full"></div>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-heading font-semibold text-foreground truncate">
                {mockSeller?.businessName}
              </h3>
              {mockSeller?.verified && (
                <Icon name="BadgeCheck" size={16} color="var(--color-primary)" />
              )}
            </div>
            
            <p className="text-sm text-muted-foreground mb-2">
              por {mockSeller?.name}
            </p>
            
            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {renderStars(mockSeller?.rating)}
              </div>
              <span className="text-sm font-medium text-foreground">
                {mockSeller?.rating}
              </span>
              <span className="text-sm text-muted-foreground">
                ({mockSeller?.reviewCount} avaliações)
              </span>
            </div>
          </div>
        </div>

        {/* Location & Status */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={14} color="var(--color-primary)" />
            <span className="text-sm text-muted-foreground">
              {mockSeller?.location}
            </span>
            <span className="text-sm font-medium text-primary">
              • {mockSeller?.distance}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon 
              name="Clock" 
              size={14} 
              color={isCurrentlyOpen() ? "var(--color-success)" : "var(--color-muted-foreground)"} 
            />
            <span className={`text-sm ${isCurrentlyOpen() ? 'text-success' : 'text-muted-foreground'}`}>
              {isCurrentlyOpen() ? 'Aberto agora' : 'Fechado'} • {getCurrentDayHours()}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="MessageCircle" size={14} color="var(--color-muted-foreground)" />
            <span className="text-sm text-muted-foreground">
              {mockSeller?.responseTime}
            </span>
          </div>
        </div>
      </div>
      {/* Business Stats */}
      <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-border">
        <div className="text-center">
          <div className="text-lg font-heading font-bold text-foreground">
            {mockSeller?.totalProducts}
          </div>
          <div className="text-xs text-muted-foreground">
            Produtos
          </div>
        </div>
        <div className="text-center">
          <div className="text-lg font-heading font-bold text-foreground">
            {mockSeller?.completedSales}
          </div>
          <div className="text-xs text-muted-foreground">
            Vendas
          </div>
        </div>
        <div className="text-center">
          <div className="text-lg font-heading font-bold text-foreground">
            {formatMemberSince(mockSeller?.memberSince)?.split(' ')?.[1]}
          </div>
          <div className="text-xs text-muted-foreground">
            Desde {formatMemberSince(mockSeller?.memberSince)?.split(' ')?.[0]}
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <Link to="/seller-storefront" className="block">
          <Button variant="outline" fullWidth iconName="Store" iconPosition="left">
            Ver Loja Completa
          </Button>
        </Link>
        
        <Button 
          variant="ghost" 
          fullWidth 
          iconName="MapPin" 
          iconPosition="left"
          onClick={() => {
            // Simulate opening maps with seller location
            window.open(`https://maps.google.com/?q=${encodeURIComponent(mockSeller?.location)}`, '_blank');
          }}
        >
          Ver no Mapa
        </Button>
      </div>
      {/* Business Hours (Expandable) */}
      <details className="group">
        <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-foreground hover:text-primary transition-colors duration-150">
          <span>Horário de Funcionamento</span>
          <Icon name="ChevronDown" size={16} className="group-open:rotate-180 transition-transform duration-200" />
        </summary>
        
        <div className="mt-3 space-y-2">
          {Object.entries(mockSeller?.businessHours)?.map(([day, hours]) => {
            const dayNames = {
              monday: 'Segunda',
              tuesday: 'Terça',
              wednesday: 'Quarta',
              thursday: 'Quinta',
              friday: 'Sexta',
              saturday: 'Sábado',
              sunday: 'Domingo'
            };
            
            return (
              <div key={day} className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">
                  {dayNames?.[day]}
                </span>
                <span className={`font-data ${hours === 'Fechado' ? 'text-muted-foreground' : 'text-foreground'}`}>
                  {hours}
                </span>
              </div>
            );
          })}
        </div>
      </details>
    </div>
  );
};

export default SellerInfo;