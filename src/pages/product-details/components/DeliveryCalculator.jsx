import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DeliveryCalculator = ({ productInfo = {}, sellerLocation = '' }) => {
  const [cep, setCep] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [deliveryOptions, setDeliveryOptions] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const mockDeliveryOptions = [
    {
      id: 'pickup',
      type: 'pickup',
      name: 'Retirada no Local',
      description: 'Retire diretamente na loja',
      price: 0,
      estimatedDays: 0,
      icon: 'MapPin',
      available: true,
      details: 'Disponível durante horário comercial'
    },
    {
      id: 'local_delivery',
      type: 'local_delivery',
      name: 'Entrega Local',
      description: 'Entrega na região metropolitana',
      price: 15.00,
      estimatedDays: 1,
      icon: 'Truck',
      available: true,
      details: 'Entrega no mesmo dia ou próximo dia útil'
    },
    {
      id: 'correios_pac',
      type: 'correios',
      name: 'Correios PAC',
      description: 'Entrega pelos Correios',
      price: 25.90,
      estimatedDays: 7,
      icon: 'Package',
      available: true,
      details: 'Prazo de 5 a 7 dias úteis'
    },
    {
      id: 'correios_sedex',
      type: 'correios',
      name: 'Correios SEDEX',
      description: 'Entrega expressa',
      price: 45.90,
      estimatedDays: 2,
      icon: 'Zap',
      available: true,
      details: 'Prazo de 1 a 2 dias úteis'
    }
  ];

  const handleCalculateDelivery = async () => {
    if (!cep || cep?.length < 8) return;
    
    setIsCalculating(true);
    
    // Simulate API call
    setTimeout(() => {
      setDeliveryOptions(mockDeliveryOptions);
      setIsCalculating(false);
    }, 1500);
  };

  const handleCepChange = (e) => {
    let value = e?.target?.value?.replace(/\D/g, '');
    if (value?.length <= 8) {
      if (value?.length > 5) {
        value = value?.replace(/(\d{5})(\d{1,3})/, '$1-$2');
      }
      setCep(value);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const getEstimatedDeliveryDate = (days) => {
    if (days === 0) return 'Hoje';
    
    const date = new Date();
    date?.setDate(date?.getDate() + days);
    
    return date?.toLocaleDateString('pt-BR', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-warm-sm space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-heading font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Truck" size={20} color="var(--color-primary)" />
          <span>Opções de Entrega</span>
        </h3>
        <p className="text-sm text-muted-foreground">
          Calcule o frete e prazo de entrega para sua região
        </p>
      </div>
      {/* CEP Input */}
      <div className="space-y-3">
        <div className="flex space-x-2">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="00000-000"
              value={cep}
              onChange={handleCepChange}
              label="CEP de Entrega"
              maxLength={9}
            />
          </div>
          <div className="flex items-end">
            <Button
              onClick={handleCalculateDelivery}
              disabled={cep?.length < 9 || isCalculating}
              loading={isCalculating}
              iconName="Calculator"
              iconPosition="left"
            >
              Calcular
            </Button>
          </div>
        </div>
        
        <button
          onClick={() => window.open('https://buscacepinter.correios.com.br/app/endereco/index.php', '_blank')}
          className="text-xs text-primary hover:text-primary/80 transition-colors duration-150"
        >
          Não sei meu CEP
        </button>
      </div>
      {/* Delivery Options */}
      {deliveryOptions && (
        <div className="space-y-4">
          <div className="text-sm font-medium text-foreground">
            Opções disponíveis para {cep}:
          </div>
          
          <div className="space-y-3">
            {deliveryOptions?.map((option) => (
              <div
                key={option?.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                  selectedOption?.id === option?.id
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
                }`}
                onClick={() => handleOptionSelect(option)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`p-2 rounded-md ${
                      selectedOption?.id === option?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <Icon name={option?.icon} size={16} />
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-foreground">
                          {option?.name}
                        </span>
                        {selectedOption?.id === option?.id && (
                          <Icon name="Check" size={14} color="var(--color-primary)" />
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        {option?.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{option?.details}</span>
                        {option?.estimatedDays > 0 && (
                          <span>
                            Entrega: {getEstimatedDeliveryDate(option?.estimatedDays)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-heading font-bold text-foreground">
                      {option?.price === 0 ? 'Grátis' : `R$ ${option?.price?.toFixed(2)?.replace('.', ',')}`}
                    </div>
                    {option?.estimatedDays > 0 && (
                      <div className="text-xs text-muted-foreground">
                        {option?.estimatedDays} {option?.estimatedDays === 1 ? 'dia' : 'dias'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Selected Option Summary */}
      {selectedOption && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="font-medium text-foreground">
                Opção Selecionada: {selectedOption?.name}
              </div>
              <div className="text-sm text-muted-foreground">
                {selectedOption?.details}
              </div>
            </div>
            <div className="text-right">
              <div className="font-heading font-bold text-primary">
                {selectedOption?.price === 0 ? 'Grátis' : `R$ ${selectedOption?.price?.toFixed(2)?.replace('.', ',')}`}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Seller Location Info */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="MapPin" size={14} />
          <span>Enviado de: {sellerLocation || 'São Paulo, SP'}</span>
        </div>
      </div>
    </div>
  );
};

export default DeliveryCalculator;