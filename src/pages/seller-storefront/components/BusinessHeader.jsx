import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BusinessHeader = ({ businessData, onContactClick }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  const getBusinessStatus = () => {
    const now = new Date();
    const currentHour = now?.getHours();
    const currentDay = now?.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    const todayHours = businessData?.operatingHours?.[currentDay];
    if (!todayHours || todayHours?.closed) {
      return { isOpen: false, message: 'Fechado hoje' };
    }

    const [openHour] = todayHours?.open?.split(':')?.map(Number);
    const [closeHour] = todayHours?.close?.split(':')?.map(Number);

    if (currentHour >= openHour && currentHour < closeHour) {
      return { isOpen: true, message: `Aberto até ${todayHours?.close}` };
    } else if (currentHour < openHour) {
      return { isOpen: false, message: `Abre às ${todayHours?.open}` };
    } else {
      return { isOpen: false, message: 'Fechado' };
    }
  };

  const businessStatus = getBusinessStatus();

  return (
    <div className="relative bg-card border-b border-border">
      {/* Cover Image */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <Image
          src={businessData?.coverImage}
          alt={`${businessData?.name} cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Premium Badge */}
        {businessData?.isPremium && (
          <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <Icon name="Crown" size={12} />
            <span>Premium</span>
          </div>
        )}
      </div>
      {/* Business Info */}
      <div className="px-4 lg:px-6 py-6">
        <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
          {/* Logo */}
          <div className="flex-shrink-0 -mt-16 md:-mt-20 mb-4 md:mb-0">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden border-4 border-card shadow-warm-lg bg-card">
              <Image
                src={businessData?.logo}
                alt={`${businessData?.name} logo`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Business Details */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
              <div className="flex-1 min-w-0 mb-4 md:mb-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground truncate">
                    {businessData?.name}
                  </h1>
                  {businessData?.isVerified && (
                    <div className="flex-shrink-0 bg-primary text-primary-foreground p-1 rounded-full">
                      <Icon name="Check" size={14} />
                    </div>
                  )}
                </div>

                <p className="text-muted-foreground mb-3 line-clamp-2">
                  {businessData?.description}
                </p>

                {/* Rating and Reviews */}
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5]?.map((star) => (
                        <Icon
                          key={star}
                          name="Star"
                          size={16}
                          color={star <= Math.floor(businessData?.rating) ? 'var(--color-warning)' : 'var(--color-muted)'}
                          className={star <= Math.floor(businessData?.rating) ? 'fill-current' : ''}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {businessData?.rating?.toFixed(1)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({businessData?.reviewCount} avaliações)
                    </span>
                  </div>
                </div>

                {/* Business Status */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className={`w-2 h-2 rounded-full ${businessStatus?.isOpen ? 'bg-success' : 'bg-destructive'}`} />
                  <span className={`text-sm font-medium ${businessStatus?.isOpen ? 'text-success' : 'text-destructive'}`}>
                    {businessStatus?.message}
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="MapPin" size={14} />
                  <span>{businessData?.address}</span>
                  <span>•</span>
                  <span>{businessData?.distance}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                <Button
                  variant="default"
                  size="sm"
                  iconName="MessageCircle"
                  iconPosition="left"
                  onClick={onContactClick}
                >
                  Contatar
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName={isFollowing ? "UserCheck" : "UserPlus"}
                  iconPosition="left"
                  onClick={handleFollowToggle}
                >
                  {isFollowing ? 'Seguindo' : 'Seguir'}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Share2"
                  iconPosition="left"
                >
                  Compartilhar
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">{businessData?.productCount}</div>
            <div className="text-xs text-muted-foreground">Produtos</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">{businessData?.yearsInBusiness}</div>
            <div className="text-xs text-muted-foreground">Anos no mercado</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">{businessData?.responseTime}</div>
            <div className="text-xs text-muted-foreground">Tempo resposta</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">{businessData?.deliveryZones}</div>
            <div className="text-xs text-muted-foreground">Zonas entrega</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessHeader;