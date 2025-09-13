import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AutomatedTemplates = ({ onSelectTemplate, userRole }) => {
  const [selectedCategory, setSelectedCategory] = useState('inquiry');
  const [isExpanded, setIsExpanded] = useState(false);

  const templateCategories = {
    inquiry: {
      label: 'Product Inquiries',
      icon: 'HelpCircle',
      templates: [
        {
          id: 'greeting',
          title: 'Initial Greeting',
          content: `Olá! Obrigado pelo interesse no nosso produto.\n\nEstou aqui para esclarecer qualquer dúvida que você possa ter.\n\nComo posso ajudá-lo?`,
          variables: ['customerName', 'productName']
        },
        {
          id: 'availability',
          title: 'Product Availability',
          content: `Olá! O produto "{productName}" está disponível sim!\n\nPreço: R$ {productPrice}\nEstoque: {stockQuantity} unidades\n\nGostaria de mais informações?`,
          variables: ['productName', 'productPrice', 'stockQuantity']
        },
        {
          id: 'specifications',
          title: 'Product Details',
          content: `Aqui estão os detalhes do produto "{productName}":\n\n{productDescription}\n\nDimensões: {dimensions}\nCor: {color}\nGarantia: {warranty}\n\nPrecisa de mais alguma informação?`,
          variables: ['productName', 'productDescription', 'dimensions', 'color', 'warranty']
        }
      ]
    },
    delivery: {
      label: 'Delivery & Pickup',
      icon: 'Truck',
      templates: [
        {
          id: 'delivery_options',
          title: 'Delivery Options',
          content: `Temos as seguintes opções de entrega:\n\n🚚 Entrega: R$ {deliveryFee} - Prazo: {deliveryTime}\n📍 Retirada na loja: Gratuita\n\nQual opção prefere?\n\nEndereço da loja: {storeAddress}`,
          variables: ['deliveryFee', 'deliveryTime', 'storeAddress']
        },
        {
          id: 'pickup_schedule',
          title: 'Pickup Scheduling',
          content: `Perfeito! Você pode retirar o produto na nossa loja.\n\nHorário de funcionamento:\n{businessHours}\n\nEndereço: {storeAddress}\n\nQual seria o melhor dia e horário para você?`,
          variables: ['businessHours', 'storeAddress']
        },
        {
          id: 'delivery_confirmation',
          title: 'Delivery Confirmation',
          content: `Entrega confirmada!\n\n📦 Produto: {productName}\n📍 Endereço: {deliveryAddress}\n⏰ Previsão: {deliveryTime}\n💰 Taxa de entrega: R$ {deliveryFee}\n\nEm breve entraremos em contato para confirmar o horário.`,
          variables: ['productName', 'deliveryAddress', 'deliveryTime', 'deliveryFee']
        }
      ]
    },
    pricing: {
      label: 'Pricing & Payment',
      icon: 'DollarSign',
      templates: [
        {
          id: 'price_quote',
          title: 'Price Quote',
          content: `Segue o orçamento solicitado:\n\n📦 {productName}\n💰 Preço unitário: R$ {unitPrice}\n📊 Quantidade: {quantity}\n💵 Total: R$ {totalPrice}\n\nFormas de pagamento aceitas:\n{paymentMethods}\n\nEste orçamento é válido por {validityDays} dias.`,
          variables: ['productName', 'unitPrice', 'quantity', 'totalPrice', 'paymentMethods', 'validityDays']
        },
        {
          id: 'discount_offer',
          title: 'Discount Offer',
          content: `Tenho uma oferta especial para você!\n\n🎯 Produto: {productName}\n💰 Preço normal: R$ {originalPrice}\n🔥 Preço promocional: R$ {discountPrice}\n💸 Economia: R$ {savings} ({discountPercent}%)\n\nOferta válida até {expiryDate}. Interesse?`,
          variables: ['productName', 'originalPrice', 'discountPrice', 'savings', 'discountPercent', 'expiryDate']
        },
        {
          id: 'payment_methods',
          title: 'Payment Methods',
          content: `Aceitamos as seguintes formas de pagamento:\n\n💳 Cartão de crédito (até {maxInstallments}x)\n💰 PIX (5% de desconto)\n💵 Dinheiro na entrega\n🏦 Transferência bancária\n\nQual forma prefere?`,
          variables: ['maxInstallments']
        }
      ]
    },
    followup: {
      label: 'Follow-up',
      icon: 'Clock',
      templates: [
        {
          id: 'gentle_followup',
          title: 'Gentle Follow-up',
          content: `Olá! Espero que esteja bem.\n\nVi que demonstrou interesse no produto "{productName}" há alguns dias.\n\nAinda tem interesse? Posso esclarecer alguma dúvida?\n\nEstou à disposição!`,
          variables: ['productName']
        },
        {
          id: 'stock_alert',
          title: 'Stock Alert',
          content: `Oi! Lembra do produto "{productName}" que você perguntou?\n\n⚠️ Restam apenas {stockQuantity} unidades em estoque!\n\nSe ainda tem interesse, recomendo garantir o seu logo.\n\nPosso reservar uma unidade para você?`,
          variables: ['productName', 'stockQuantity']
        },
        {
          id: 'satisfaction_check',
          title: 'Satisfaction Check',
          content: `Olá! Como está o produto "{productName}" que você adquiriu?\n\nEspero que esteja satisfeito(a) com a compra!\n\nSe precisar de qualquer coisa ou tiver alguma dúvida, estou aqui para ajudar.\n\n⭐ Que tal deixar uma avaliação? Sua opinião é muito importante!`,
          variables: ['productName']
        }
      ]
    }
  };

  const handleTemplateSelect = (template) => {
    onSelectTemplate(template);
    setIsExpanded(false);
  };

  const replaceVariables = (content, variables = {}) => {
    let processedContent = content;
    Object.entries(variables)?.forEach(([key, value]) => {
      const regex = new RegExp(`{${key}}`, 'g');
      processedContent = processedContent?.replace(regex, value || `{${key}}`);
    });
    return processedContent;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="MessageSquare" size={16} className="text-primary" />
            <span className="font-medium text-foreground">Message Templates</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={16} 
            />
          </Button>
        </div>
      </div>
      {isExpanded && (
        <div className="p-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.entries(templateCategories)?.map(([key, category]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`flex items-center space-x-1 px-3 py-1 rounded-sm text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === key
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <Icon name={category?.icon} size={14} />
                <span>{category?.label}</span>
              </button>
            ))}
          </div>

          {/* Templates */}
          <div className="space-y-3">
            {templateCategories?.[selectedCategory]?.templates?.map((template) => (
              <div
                key={template?.id}
                className="p-3 bg-muted/30 rounded-md border border-border hover:bg-muted/50 transition-colors duration-150"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-foreground">{template?.title}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <Icon name="Plus" size={14} />
                  </Button>
                </div>
                
                <div className="text-sm text-muted-foreground mb-3 whitespace-pre-line">
                  {template?.content?.length > 150 
                    ? `${template?.content?.substring(0, 150)}...`
                    : template?.content
                  }
                </div>

                {template?.variables && template?.variables?.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs text-muted-foreground">Variables:</span>
                    {template?.variables?.map((variable) => (
                      <span
                        key={variable}
                        className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-sm"
                      >
                        {variable}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Custom Template */}
          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-foreground">Create Custom Template</h4>
              <Button variant="outline" size="sm">
                <Icon name="Plus" size={14} />
                <span className="ml-1">New Template</span>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Create your own message templates with custom variables and save them for future use.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutomatedTemplates;