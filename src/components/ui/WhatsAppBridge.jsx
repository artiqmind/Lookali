import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const WhatsAppBridge = ({ 
  productInfo = null, 
  sellerInfo = null, 
  messageType = 'general',
  className = '',
  variant = 'floating' // floating, inline, button
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [customMessage, setCustomMessage] = useState('');

  const messageTemplates = {
    general: "Olá! Vi seu anúncio no Lookali e gostaria de saber mais informações.",
    product_inquiry: productInfo 
      ? `Olá! Tenho interesse no produto "${productInfo?.name}" que vi no Lookali. Poderia me dar mais informações?`
      : "Olá! Tenho interesse em um produto que vi no Lookali. Poderia me dar mais informações?",
    availability: productInfo
      ? `Olá! O produto "${productInfo?.name}" ainda está disponível? Vi no Lookali.`
      : "Olá! O produto ainda está disponível? Vi no Lookali.",
    price_negotiation: productInfo
      ? `Olá! Vi o produto "${productInfo?.name}" no Lookali por R$ ${productInfo?.price}. Podemos conversar sobre o preço?`
      : "Olá! Vi seu produto no Lookali. Podemos conversar sobre o preço?",
    meeting_request: "Olá! Gostaria de agendar uma visita para ver o produto pessoalmente. Quando seria possível?"
  };

  const generateWhatsAppURL = (message) => {
    const phoneNumber = sellerInfo?.whatsapp || sellerInfo?.phone || '';
    const encodedMessage = encodeURIComponent(message);
    
    // Remove non-numeric characters from phone number
    const cleanPhone = phoneNumber?.replace(/\D/g, '');
    
    if (cleanPhone) {
      return `https://wa.me/55${cleanPhone}?text=${encodedMessage}`;
    } else {
      return `https://wa.me/?text=${encodedMessage}`;
    }
  };

  const handleSendMessage = (message) => {
    const whatsappURL = generateWhatsAppURL(message);
    window.open(whatsappURL, '_blank');
    setIsExpanded(false);
    
    // Track interaction for analytics
    if (window.gtag) {
      window.gtag('event', 'whatsapp_contact', {
        event_category: 'communication',
        event_label: messageType,
        product_id: productInfo?.id || null,
        seller_id: sellerInfo?.id || null
      });
    }
  };

  const handleQuickSend = () => {
    const defaultMessage = messageTemplates?.[messageType] || messageTemplates?.general;
    handleSendMessage(defaultMessage);
  };

  if (variant === 'floating') {
    return (
      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        {!isExpanded ? (
          <Button
            onClick={() => setIsExpanded(true)}
            className="w-14 h-14 rounded-full bg-success hover:bg-success/90 text-success-foreground shadow-warm-lg"
            size="icon"
          >
            <Icon name="MessageCircle" size={24} />
          </Button>
        ) : (
          <div className="bg-popover border border-border rounded-lg shadow-warm-xl w-80 max-w-[calc(100vw-3rem)]">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Icon name="MessageCircle" size={20} color="var(--color-success)" />
                  <span className="font-medium text-sm">WhatsApp Contact</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(false)}
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>

              {sellerInfo && (
                <div className="mb-4 p-3 bg-muted rounded-md">
                  <div className="text-sm font-medium">{sellerInfo?.name}</div>
                  {sellerInfo?.businessName && (
                    <div className="text-xs text-muted-foreground">{sellerInfo?.businessName}</div>
                  )}
                  {sellerInfo?.whatsapp && (
                    <div className="text-xs font-data text-muted-foreground mt-1">
                      {sellerInfo?.whatsapp}
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-2 mb-4">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Quick Messages
                </div>
                {Object.entries(messageTemplates)?.map(([key, template]) => (
                  <button
                    key={key}
                    onClick={() => handleSendMessage(template)}
                    className="w-full text-left p-2 text-xs bg-muted hover:bg-muted/80 rounded-sm transition-colors duration-150"
                  >
                    {template?.length > 60 ? `${template?.substring(0, 60)}...` : template}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Custom Message
                </div>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e?.target?.value)}
                  placeholder="Type your custom message..."
                  className="w-full p-2 text-sm bg-input border border-border rounded-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  rows={3}
                />
                <Button
                  onClick={() => handleSendMessage(customMessage)}
                  disabled={!customMessage?.trim()}
                  size="sm"
                  fullWidth
                  iconName="Send"
                  iconPosition="right"
                >
                  Send Custom Message
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`space-y-3 ${className}`}>
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="MessageCircle" size={16} color="var(--color-success)" />
          <span className="text-sm font-medium">Contact via WhatsApp</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleQuickSend}
            iconName="MessageCircle"
            iconPosition="left"
          >
            Quick Contact
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName="MoreHorizontal"
            iconPosition="left"
          >
            More Options
          </Button>
        </div>
        {isExpanded && (
          <div className="p-3 bg-muted rounded-md space-y-3">
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(messageTemplates)?.slice(1)?.map(([key, template]) => (
                <button
                  key={key}
                  onClick={() => handleSendMessage(template)}
                  className="text-left p-2 text-xs bg-background hover:bg-background/80 rounded-sm transition-colors duration-150 border border-border"
                >
                  <div className="font-medium capitalize mb-1">
                    {key?.replace('_', ' ')}
                  </div>
                  <div className="text-muted-foreground">
                    {template?.length > 80 ? `${template?.substring(0, 80)}...` : template}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Button variant
  return (
    <Button
      onClick={handleQuickSend}
      variant="outline"
      size="sm"
      iconName="MessageCircle"
      iconPosition="left"
      className={`text-success border-success hover:bg-success hover:text-success-foreground ${className}`}
    >
      WhatsApp
    </Button>
  );
};

export default WhatsAppBridge;