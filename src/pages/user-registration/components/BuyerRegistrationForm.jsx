import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const BuyerRegistrationForm = ({ formData, onFormChange, onSubmit, isLoading, className = '' }) => {
  const [locationPermission, setLocationPermission] = useState('prompt');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

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

  const radiusOptions = [
    { value: '1', label: '1 km' },
    { value: '2', label: '2 km' },
    { value: '5', label: '5 km' },
    { value: '10', label: '10 km' },
    { value: '20', label: '20 km' },
    { value: '50', label: '50 km' }
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
          Criar Conta de Comprador
        </h2>
        <p className="text-muted-foreground">
          Preencha seus dados para começar a descobrir produtos locais
        </p>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
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
              label="CPF"
              type="text"
              placeholder="000.000.000-00"
              value={formData?.cpf || ''}
              onChange={(e) => onFormChange('cpf', e?.target?.value)}
              pattern="[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}"
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
            value={formData?.phone || ''}
            onChange={(e) => onFormChange('phone', e?.target?.value)}
            required
          />
        </div>

        {/* Location Information */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Localização
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          <Input
            label="CEP"
            type="text"
            placeholder="00000-000"
            value={formData?.zipCode || ''}
            onChange={(e) => onFormChange('zipCode', e?.target?.value)}
            pattern="[0-9]{5}-[0-9]{3}"
          />

          <Select
            label="Raio de Busca Preferido"
            description="Distância máxima para buscar produtos"
            placeholder="Selecione o raio"
            options={radiusOptions}
            value={formData?.searchRadius || '5'}
            onChange={(value) => onFormChange('searchRadius', value)}
          />
        </div>

        {/* Preferences */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Preferências
          </h3>
          
          <div className="space-y-3">
            <Checkbox
              label="Receber notificações por e-mail sobre produtos próximos"
              checked={formData?.emailNotifications || false}
              onChange={(e) => onFormChange('emailNotifications', e?.target?.checked)}
            />
            
            <Checkbox
              label="Receber notificações por WhatsApp sobre ofertas especiais"
              checked={formData?.whatsappNotifications || false}
              onChange={(e) => onFormChange('whatsappNotifications', e?.target?.checked)}
            />
            
            <Checkbox
              label="Permitir que vendedores vejam meu perfil público"
              checked={formData?.publicProfile || false}
              onChange={(e) => onFormChange('publicProfile', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-md">
            <Checkbox
              label="Aceito os Termos de Uso e Política de Privacidade"
              description="Ao criar uma conta, você concorda com nossos termos e condições"
              required
              checked={formData?.acceptTerms || false}
              onChange={(e) => onFormChange('acceptTerms', e?.target?.checked)}
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
            disabled={!formData?.acceptTerms}
            iconName="UserPlus"
            iconPosition="left"
          >
            Criar Conta de Comprador
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

export default BuyerRegistrationForm;