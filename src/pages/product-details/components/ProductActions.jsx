import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import WhatsAppBridge from '../../../components/ui/WhatsAppBridge';

const ProductActions = ({ product = {}, seller = {}, selectedDeliveryOption = null }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const mockProduct = {
    id: "prod_001",
    name: "Fone de Ouvido Bluetooth Premium",
    price: 299.90,
    availability: "available",
    ...product
  };

  const mockSeller = {
    id: "seller_001",
    name: "Maria Silva",
    businessName: "TechStore SP",
    whatsapp: "+55 11 99999-8888",
    ...seller
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    
    // Simulate API call to save/remove favorite
    if (window.gtag) {
      window.gtag('event', isFavorite ? 'remove_from_favorites' : 'add_to_favorites', {
        event_category: 'engagement',
        event_label: mockProduct?.id
      });
    }
  };

  const handleShare = (platform) => {
    const productUrl = window.location?.href;
    const shareText = `Confira este produto: ${mockProduct?.name} por R$ ${mockProduct?.price?.toFixed(2)?.replace('.', ',')} no Lookali`;
    
    const shareUrls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${productUrl}`)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(productUrl)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(shareText)}`,
      copy: productUrl
    };

    if (platform === 'copy') {
      navigator.clipboard?.writeText(shareUrls?.copy)?.then(() => {
        // Show success message (could be a toast)
        alert('Link copiado para a área de transferência!');
      });
    } else {
      window.open(shareUrls?.[platform], '_blank');
    }
    
    setShowShareMenu(false);
    
    // Track sharing
    if (window.gtag) {
      window.gtag('event', 'share', {
        event_category: 'engagement',
        event_label: platform,
        product_id: mockProduct?.id
      });
    }
  };

  const generateWhatsAppMessage = () => {
    let message = `Olá! Tenho interesse no produto "${mockProduct?.name}" que vi no Lookali.`;
    
    if (selectedDeliveryOption) {
      if (selectedDeliveryOption?.type === 'pickup') {
        message += `\n\nGostaria de agendar a retirada no local.`;
      } else {
        message += `\n\nGostaria da entrega via ${selectedDeliveryOption?.name}.`;
      }
    }
    
    message += `\n\nPoderia me dar mais informações sobre disponibilidade e condições?`;
    
    return message;
  };

  const isProductAvailable = mockProduct?.availability === 'available' || mockProduct?.availability === 'limited';

  return (
    <div className="space-y-4">
      {/* Primary Actions */}
      <div className="space-y-3">
        {/* WhatsApp Contact - Primary Action */}
        {isProductAvailable && (
          <div className="space-y-2">
            <WhatsAppBridge
              productInfo={mockProduct}
              sellerInfo={mockSeller}
              messageType="product_inquiry"
              variant="button"
              className="w-full bg-success hover:bg-success/90 text-success-foreground border-success"
            />
            <p className="text-xs text-muted-foreground text-center">
              Contato direto com o vendedor via WhatsApp
            </p>
          </div>
        )}

        {/* Unavailable Product Message */}
        {!isProductAvailable && (
          <div className="p-4 bg-muted border border-border rounded-lg text-center space-y-2">
            <Icon name="AlertCircle" size={20} color="var(--color-muted-foreground)" />
            <div className="text-sm font-medium text-muted-foreground">
              Produto Indisponível
            </div>
            <div className="text-xs text-muted-foreground">
              Entre em contato com o vendedor para verificar disponibilidade
            </div>
            <WhatsAppBridge
              productInfo={mockProduct}
              sellerInfo={mockSeller}
              messageType="availability"
              variant="button"
              className="mt-2"
            />
          </div>
        )}
      </div>
      {/* Secondary Actions */}
      <div className="grid grid-cols-2 gap-3">
        {/* Favorite Button */}
        <Button
          variant="outline"
          onClick={handleFavoriteToggle}
          iconName="Heart"
          iconPosition="left"
          className={isFavorite ? 'text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground' : ''}
        >
          {isFavorite ? 'Favoritado' : 'Favoritar'}
        </Button>

        {/* Share Button */}
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setShowShareMenu(!showShareMenu)}
            iconName="Share2"
            iconPosition="left"
          >
            Compartilhar
          </Button>

          {/* Share Menu */}
          {showShareMenu && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-warm-lg z-50">
              <div className="p-2 space-y-1">
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-sm transition-colors duration-150"
                >
                  <Icon name="MessageCircle" size={16} color="var(--color-success)" />
                  <span>WhatsApp</span>
                </button>
                
                <button
                  onClick={() => handleShare('facebook')}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-sm transition-colors duration-150"
                >
                  <Icon name="Facebook" size={16} color="#1877F2" />
                  <span>Facebook</span>
                </button>
                
                <button
                  onClick={() => handleShare('twitter')}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-sm transition-colors duration-150"
                >
                  <Icon name="Twitter" size={16} color="#1DA1F2" />
                  <span>Twitter</span>
                </button>
                
                <button
                  onClick={() => handleShare('telegram')}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-sm transition-colors duration-150"
                >
                  <Icon name="Send" size={16} color="#0088CC" />
                  <span>Telegram</span>
                </button>
                
                <div className="border-t border-border my-1"></div>
                
                <button
                  onClick={() => handleShare('copy')}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-sm transition-colors duration-150"
                >
                  <Icon name="Copy" size={16} />
                  <span>Copiar Link</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Additional Actions */}
      <div className="pt-4 border-t border-border space-y-3">
        {/* Report Product */}
        <button className="w-full flex items-center justify-center space-x-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">
          <Icon name="Flag" size={14} />
          <span>Reportar Produto</span>
        </button>

        {/* Product ID for Reference */}
        <div className="text-center">
          <span className="text-xs font-data text-muted-foreground">
            ID: {mockProduct?.id}
          </span>
        </div>
      </div>
      {/* Backdrop for share menu */}
      {showShareMenu && (
        <div 
          className="fixed inset-0 bg-transparent z-40"
          onClick={() => setShowShareMenu(false)}
        />
      )}
    </div>
  );
};

export default ProductActions;