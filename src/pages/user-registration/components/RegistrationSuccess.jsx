import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegistrationSuccess = ({ userType, userEmail, className = '' }) => {
  const successMessages = {
    buyer: {
      title: 'Conta de Comprador Criada!',
      subtitle: 'Bem-vindo ao Lookali! Sua conta foi criada com sucesso.',
      description: 'Agora você pode descobrir produtos incríveis próximos a você e se conectar diretamente com vendedores locais.',
      nextSteps: [
        {
          icon: 'Search',
          title: 'Explore Produtos',
          description: 'Comece a buscar produtos na sua região',
          action: 'Buscar Produtos',
          link: '/product-search-results'
        },
        {
          icon: 'MapPin',
          title: 'Configure Localização',
          description: 'Ajuste sua localização para resultados mais precisos',
          action: 'Ver Perfil',
          link: '/user-registration'
        }
      ]
    },
    seller: {
      title: 'Sua Loja Virtual Foi Criada!',
      subtitle: 'Parabéns! Sua loja no Lookali está pronta para receber clientes.',
      description: 'Comece adicionando seus produtos e configurando sua vitrine para atrair mais clientes locais.',
      nextSteps: [
        {
          icon: 'Package',
          title: 'Adicionar Produtos',
          description: 'Cadastre seus primeiros produtos na loja',
          action: 'Gerenciar Produtos',
          link: '/product-management'
        },
        {
          icon: 'Store',
          title: 'Personalizar Loja',
          description: 'Configure sua vitrine e informações do negócio',
          action: 'Ver Minha Loja',
          link: '/seller-storefront'
        }
      ]
    }
  };

  const currentMessages = successMessages?.[userType] || successMessages?.buyer;

  return (
    <div className={`max-w-2xl mx-auto text-center space-y-8 ${className}`}>
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center">
          <Icon name="CheckCircle" size={40} color="var(--color-success)" />
        </div>
      </div>
      {/* Success Message */}
      <div className="space-y-4">
        <h1 className="text-3xl font-heading font-bold text-foreground">
          {currentMessages?.title}
        </h1>
        <p className="text-lg text-muted-foreground">
          {currentMessages?.subtitle}
        </p>
        <p className="text-muted-foreground">
          {currentMessages?.description}
        </p>
      </div>
      {/* Email Verification Notice */}
      <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Mail" size={20} color="var(--color-warning)" />
          <div className="text-left">
            <h3 className="font-medium text-foreground mb-1">
              Verifique seu e-mail
            </h3>
            <p className="text-sm text-muted-foreground">
              Enviamos um link de verificação para{' '}
              <span className="font-data text-foreground">{userEmail}</span>.
              Clique no link para ativar completamente sua conta.
            </p>
          </div>
        </div>
      </div>
      {/* Next Steps */}
      <div className="space-y-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Próximos Passos
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentMessages?.nextSteps?.map((step, index) => (
            <div key={index} className="p-6 bg-card border border-border rounded-lg hover:shadow-warm-md transition-all duration-200">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={step?.icon} size={24} color="var(--color-primary)" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-heading font-semibold text-foreground">
                    {step?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step?.description}
                  </p>
                </div>
                
                <Link to={step?.link} className="w-full">
                  <Button variant="outline" size="sm" fullWidth>
                    {step?.action}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Account Benefits */}
      <div className="p-6 bg-muted rounded-lg">
        <h3 className="font-heading font-semibold text-foreground mb-4">
          {userType === 'buyer' ? 'Benefícios da sua conta' : 'Recursos da sua loja'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {userType === 'buyer' ? (
            <>
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} color="var(--color-success)" />
                <span>Busca por localização</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="MessageCircle" size={16} color="var(--color-success)" />
                <span>Comunicação direta via WhatsApp</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Heart" size={16} color="var(--color-success)" />
                <span>Lista de favoritos</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Bell" size={16} color="var(--color-success)" />
                <span>Notificações de ofertas</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-2">
                <Icon name="Store" size={16} color="var(--color-success)" />
                <span>Vitrine profissional gratuita</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Package" size={16} color="var(--color-success)" />
                <span>Gestão ilimitada de produtos</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="MessageCircle" size={16} color="var(--color-success)" />
                <span>Comunicação com clientes</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="BarChart3" size={16} color="var(--color-success)" />
                <span>Relatórios básicos de vendas</span>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Primary Action */}
      <div className="space-y-4">
        <Link to={userType === 'buyer' ? '/product-search-results' : '/product-management'}>
          <Button variant="default" size="lg" fullWidth iconName="ArrowRight" iconPosition="right">
            {userType === 'buyer' ? 'Começar a Explorar' : 'Ir para Minha Loja'}
          </Button>
        </Link>
        
        <div className="text-sm text-muted-foreground">
          Precisa de ajuda?{' '}
          <Link to="/message-center" className="text-primary hover:text-primary/80 font-medium">
            Entre em contato conosco
          </Link>
        </div>
      </div>
      {/* Footer Note */}
      <div className="pt-8 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Ao usar o Lookali, você está ajudando a fortalecer o comércio local da sua região.
          Obrigado por fazer parte da nossa comunidade!
        </p>
      </div>
    </div>
  );
};

export default RegistrationSuccess;