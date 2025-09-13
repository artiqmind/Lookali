import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SellerRegistrationForm = ({ formData, onFormChange, onSubmit, isLoading, className = '' }) => {
  const [locationPermission, setLocationPermission] = useState('prompt');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const businessCategories = [
    { value: 'alimentacao', label: 'Alimentação e Bebidas' },
    { value: 'moda', label: 'Moda e Vestuário' },
    { value: 'beleza', label: 'Beleza e Estética' },
    { value: 'casa', label: 'Casa e Decoração' },
    { value: 'eletronicos', label: 'Eletrônicos' },
    { value: 'servicos', label: 'Serviços Gerais' },
    { value: 'saude', label: 'Saúde e Bem-estar' },
    { value: 'educacao', label: 'Educação' },
    { value: 'automotivo', label: 'Automotivo' },
    { value: 'outros', label: 'Outros' }
  ];

  const stateOptions = [
    { value: 'SP', label: 'São Paulo' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'BA', label: 'Bahia' },
    { value: 'PR', label: 'Paraná' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'CE', label: 'Ceará' },
    { value: 'SC', label: 'Santa Catarina' },
    { value: 'GO', label: 'Goiás' }
  ];

  const deliveryRadiusOptions = [
    { value: '5', label: '5 km' },
    { value: '10', label: '10 km' },
    { value: '20', label: '20 km' },
    { value: '50', label: '50 km' },
    { value: 'unlimited', label: 'Sem limite (todo Brasil)' }
  ];

  const businessTypeOptions = [
    { value: 'individual', label: 'Pessoa Física (MEI)' },
    { value: 'company', label: 'Pessoa Jurídica' },
    { value: 'informal', label: 'Negócio Informal' }
  ];

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 25;
    if (/[A-Z]/?.test(password)) strength += 25;
    if (/[0-9]/?.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/?.test(password)) strength += 25;
    return strength;
  };

  const handlePasswordChange = (e) => {
    const password = e?.target?.value;
    setPasswordStrength(calculatePasswordStrength(password));
    onFormChange('password', password);
  };

  const requestLocationPermission = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          setLocationPermission('granted');
          onFormChange('coordinates', {
            lat: position?.coords?.latitude,
            lng: position?.coords?.longitude
          });
          // Simulate reverse geocoding
          onFormChange('city', 'São Paulo');
          onFormChange('state', 'SP');
        },
        (error) => {
          setLocationPermission('denied');
          console.error('Location error:', error);
        }
      );
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'var(--color-error)';
    if (passwordStrength < 50) return 'var(--color-warning)';
    if (passwordStrength < 75) return 'var(--color-accent)';
    return 'var(--color-success)';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Fraca';
    if (passwordStrength < 50) return 'Regular';
    if (passwordStrength < 75) return 'Boa';
    return 'Forte';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
          Criar Conta de Vendedor
        </h2>
        <p className="text-muted-foreground">
          Configure sua loja virtual gratuita e comece a vender hoje mesmo
        </p>
      </div>
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Informações Pessoais
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nome Completo"
              type="text"
              placeholder="Digite seu nome completo"
              value={formData?.fullName || ''}
              onChange={(e) => onFormChange('fullName', e?.target?.value)}
              required
            />
            
            <Input
              label="CPF/CNPJ"
              type="text"
              placeholder="000.000.000-00 ou 00.000.000/0001-00"
              value={formData?.document || ''}
              onChange={(e) => onFormChange('document', e?.target?.value)}
              required
            />
          </div>

          <Input
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            value={formData?.email || ''}
            onChange={(e) => onFormChange('email', e?.target?.value)}
            required
          />

          <div className="space-y-2">
            <div className="relative">
              <Input
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                placeholder="Crie uma senha segura"
                value={formData?.password || ''}
                onChange={handlePasswordChange}
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
              >
                <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
              </button>
            </div>
            
            {formData?.password && (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Força da senha:</span>
                  <span className="text-xs font-medium" style={{ color: getPasswordStrengthColor() }}>
                    {getPasswordStrengthText()}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${passwordStrength}%`,
                      backgroundColor: getPasswordStrengthColor()
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <Input
            label="Telefone/WhatsApp"
            type="tel"
            placeholder="(11) 99999-9999"
            description="Este número será usado para comunicação com clientes"
            value={formData?.phone || ''}
            onChange={(e) => onFormChange('phone', e?.target?.value)}
            required
          />
        </div>

        {/* Business Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Informações do Negócio
          </h3>
          
          <Input
            label="Nome do Negócio"
            type="text"
            placeholder="Digite o nome da sua empresa/loja"
            value={formData?.businessName || ''}
            onChange={(e) => onFormChange('businessName', e?.target?.value)}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Categoria Principal"
              placeholder="Selecione a categoria"
              options={businessCategories}
              value={formData?.category || ''}
              onChange={(value) => onFormChange('category', value)}
              required
            />
            
            <Select
              label="Tipo de Negócio"
              placeholder="Selecione o tipo"
              options={businessTypeOptions}
              value={formData?.businessType || ''}
              onChange={(value) => onFormChange('businessType', value)}
              required
            />
          </div>

          <Input
            label="Descrição do Negócio"
            type="text"
            placeholder="Descreva brevemente seus produtos/serviços"
            value={formData?.businessDescription || ''}
            onChange={(e) => onFormChange('businessDescription', e?.target?.value)}
            maxLength={200}
          />
        </div>

        {/* Location Information */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Localização do Negócio
            </h3>
            {locationPermission !== 'granted' && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={requestLocationPermission}
                iconName="MapPin"
                iconPosition="left"
              >
                Usar Localização Atual
              </Button>
            )}
          </div>

          {locationPermission === 'granted' && (
            <div className="p-3 bg-success/10 border border-success/20 rounded-md">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                <span className="text-sm text-success">Localização detectada automaticamente</span>
              </div>
            </div>
          )}

          <Input
            label="Endereço Completo"
            type="text"
            placeholder="Rua, número, bairro"
            value={formData?.address || ''}
            onChange={(e) => onFormChange('address', e?.target?.value)}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Cidade"
              type="text"
              placeholder="Digite sua cidade"
              value={formData?.city || ''}
              onChange={(e) => onFormChange('city', e?.target?.value)}
              required
            />
            
            <Select
              label="Estado"
              placeholder="Selecione o estado"
              options={stateOptions}
              value={formData?.state || ''}
              onChange={(value) => onFormChange('state', value)}
              required
            />
            
            <Input
              label="CEP"
              type="text"
              placeholder="00000-000"
              value={formData?.zipCode || ''}
              onChange={(e) => onFormChange('zipCode', e?.target?.value)}
              pattern="[0-9]{5}-[0-9]{3}"
              required
            />
          </div>
        </div>

        {/* Business Operations */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Operações do Negócio
          </h3>
          
          <Select
            label="Raio de Entrega"
            description="Até que distância você faz entregas?"
            placeholder="Selecione o raio"
            options={deliveryRadiusOptions}
            value={formData?.deliveryRadius || '10'}
            onChange={(value) => onFormChange('deliveryRadius', value)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Horário de Funcionamento"
              type="text"
              placeholder="Ex: Seg-Sex 8h-18h, Sáb 8h-12h"
              value={formData?.businessHours || ''}
              onChange={(e) => onFormChange('businessHours', e?.target?.value)}
            />
            
            <Input
              label="Taxa de Entrega (R$)"
              type="number"
              placeholder="0.00"
              min="0"
              step="0.01"
              value={formData?.deliveryFee || ''}
              onChange={(e) => onFormChange('deliveryFee', e?.target?.value)}
            />
          </div>

          <div className="space-y-3">
            <Checkbox
              label="Ofereço entrega em domicílio"
              checked={formData?.offersDelivery || false}
              onChange={(e) => onFormChange('offersDelivery', e?.target?.checked)}
            />
            
            <Checkbox
              label="Aceito retirada no local"
              checked={formData?.offersPickup || true}
              onChange={(e) => onFormChange('offersPickup', e?.target?.checked)}
            />
            
            <Checkbox
              label="Aceito pagamento via PIX"
              checked={formData?.acceptsPix || true}
              onChange={(e) => onFormChange('acceptsPix', e?.target?.checked)}
            />
            
            <Checkbox
              label="Aceito cartão de crédito/débito"
              checked={formData?.acceptsCard || false}
              onChange={(e) => onFormChange('acceptsCard', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Premium Account Option */}
        <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Star" size={20} color="var(--color-accent)" />
            <div className="flex-1">
              <h4 className="font-heading font-semibold text-foreground mb-2">
                Conta Premium - R$ 10/mês
              </h4>
              <div className="space-y-1 text-sm text-muted-foreground mb-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Check" size={14} color="var(--color-success)" />
                  <span>Destaque nos resultados de busca</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Check" size={14} color="var(--color-success)" />
                  <span>Analytics detalhados de vendas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Check" size={14} color="var(--color-success)" />
                  <span>Múltiplas opções de entrega</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Check" size={14} color="var(--color-success)" />
                  <span>Suporte prioritário</span>
                </div>
              </div>
              <Checkbox
                label="Quero ativar a conta Premium (7 dias grátis)"
                checked={formData?.wantsPremium || false}
                onChange={(e) => onFormChange('wantsPremium', e?.target?.checked)}
              />
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-md space-y-3">
            <Checkbox
              label="Aceito os Termos de Uso e Política de Privacidade"
              required
              checked={formData?.acceptTerms || false}
              onChange={(e) => onFormChange('acceptTerms', e?.target?.checked)}
            />
            
            <Checkbox
              label="Concordo com as Políticas de Vendas do Lookali"
              required
              checked={formData?.acceptSalesPolicy || false}
              onChange={(e) => onFormChange('acceptSalesPolicy', e?.target?.checked)}
            />
            
            <Checkbox
              label="Autorizo o uso dos meus dados para melhorar a experiência de compra"
              checked={formData?.allowDataUsage || false}
              onChange={(e) => onFormChange('allowDataUsage', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            disabled={!formData?.acceptTerms || !formData?.acceptSalesPolicy}
            iconName="Store"
            iconPosition="left"
          >
            Criar Minha Loja Virtual
          </Button>
        </div>
      </form>
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Já tem uma conta?{' '}
          <button className="text-primary hover:text-primary/80 font-medium">
            Fazer login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SellerRegistrationForm;