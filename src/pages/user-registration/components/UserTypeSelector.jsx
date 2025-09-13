import React from 'react';
import Icon from '../../../components/AppIcon';


const UserTypeSelector = ({ selectedType, onTypeSelect, className = '' }) => {
  const userTypes = [
    {
      value: 'buyer',
      label: 'Comprador',
      description: 'Encontre produtos e serviços locais',
      icon: 'ShoppingBag',
      color: 'var(--color-primary)',
      benefits: [
        'Descubra produtos próximos a você',
        'Comunicação direta com vendedores',
        'Preços competitivos locais',
        'Suporte via WhatsApp'
      ]
    },
    {
      value: 'seller',
      label: 'Vendedor',
      description: 'Venda seus produtos online gratuitamente',
      icon: 'Store',
      color: 'var(--color-secondary)',
      benefits: [
        'Vitrine profissional gratuita',
        'Alcance clientes locais',
        'Zero comissão nas vendas',
        'Ferramentas de gestão incluídas'
      ]
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
          Como você quer usar o Lookali?
        </h2>
        <p className="text-muted-foreground">
          Escolha o tipo de conta que melhor se adequa às suas necessidades
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userTypes?.map((type) => (
          <div
            key={type?.value}
            className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              selectedType === type?.value
                ? 'border-primary bg-primary/5 shadow-warm-md'
                : 'border-border bg-card hover:border-primary/50 hover:shadow-warm-sm'
            }`}
            onClick={() => onTypeSelect(type?.value)}
          >
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-md ${
                selectedType === type?.value
                  ? type?.value === 'buyer' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                <Icon name={type?.icon} size={24} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className={`text-lg font-heading font-semibold ${
                    selectedType === type?.value ? 'text-primary' : 'text-foreground'
                  }`}>
                    {type?.label}
                  </h3>
                  {selectedType === type?.value && (
                    <Icon name="CheckCircle" size={20} color="var(--color-primary)" />
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {type?.description}
                </p>
                
                <div className="space-y-2">
                  {type?.benefits?.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="Check" size={14} color="var(--color-success)" />
                      <span className="text-xs text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Selection indicator */}
            {selectedType === type?.value && (
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Check" size={14} color="white" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Você pode alterar o tipo de conta a qualquer momento nas configurações
        </p>
      </div>
    </div>
  );
};

export default UserTypeSelector;