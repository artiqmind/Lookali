import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import UserTypeSelector from './components/UserTypeSelector';
import BuyerRegistrationForm from './components/BuyerRegistrationForm';
import SellerRegistrationForm from './components/SellerRegistrationForm';
import RegistrationProgress from './components/RegistrationProgress';
import RegistrationSuccess from './components/RegistrationSuccess';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const UserRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedUserType, setSelectedUserType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [formData, setFormData] = useState({});

  // Mock credentials for testing
  const mockCredentials = {
    buyer: {
      email: 'comprador@teste.com',
      password: 'Teste123!',
      fullName: 'João Silva',
      phone: '(11) 99999-9999'
    },
    seller: {
      email: 'vendedor@teste.com',
      password: 'Loja123!',
      fullName: 'Maria Santos',
      businessName: 'Loja da Maria',
      phone: '(11) 88888-8888'
    }
  };

  useEffect(() => {
    // Check if user is already logged in
    const existingUser = localStorage.getItem('lookali_user');
    if (existingUser) {
      const userData = JSON.parse(existingUser);
      if (userData?.userType === 'buyer') {
        navigate('/product-search-results');
      } else {
        navigate('/product-management');
      }
    }
  }, [navigate]);

  const handleUserTypeSelect = (type) => {
    setSelectedUserType(type);
    setCurrentStep(2);
    
    // Pre-fill with mock data for testing
    if (mockCredentials?.[type]) {
      setFormData(mockCredentials?.[type]);
    }
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e?.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create user data
      const userData = {
        id: Date.now(),
        userType: selectedUserType,
        email: formData?.email,
        fullName: formData?.fullName,
        phone: formData?.phone,
        businessName: formData?.businessName || null,
        category: formData?.category || null,
        city: formData?.city || 'São Paulo',
        state: formData?.state || 'SP',
        coordinates: formData?.coordinates || { lat: -23.5505, lng: -46.6333 },
        createdAt: new Date()?.toISOString(),
        isVerified: false,
        isPremium: formData?.wantsPremium || false
      };

      // Save to localStorage
      localStorage.setItem('lookali_user', JSON.stringify(userData));
      localStorage.setItem('userRole', selectedUserType);

      setRegistrationComplete(true);
      setCurrentStep(3);

    } catch (error) {
      console.error('Registration error:', error);
      alert('Erro ao criar conta. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      if (currentStep === 2) {
        setSelectedUserType('');
      }
    }
  };

  const getTotalSteps = () => {
    return registrationComplete ? 3 : 2;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {!registrationComplete && (
          <RegistrationProgress
            currentStep={currentStep}
            totalSteps={getTotalSteps()}
            userType={selectedUserType}
            className="mb-8"
          />
        )}

        <div className="bg-card rounded-lg shadow-warm-md p-6 md:p-8">
          {registrationComplete ? (
            <RegistrationSuccess
              userType={selectedUserType}
              userEmail={formData?.email}
            />
          ) : (
            <>
              {/* Step 1: User Type Selection */}
              {currentStep === 1 && (
                <UserTypeSelector
                  selectedType={selectedUserType}
                  onTypeSelect={handleUserTypeSelect}
                />
              )}

              {/* Step 2: Registration Form */}
              {currentStep === 2 && selectedUserType === 'buyer' && (
                <BuyerRegistrationForm
                  formData={formData}
                  onFormChange={handleFormChange}
                  onSubmit={handleFormSubmit}
                  isLoading={isLoading}
                />
              )}

              {currentStep === 2 && selectedUserType === 'seller' && (
                <SellerRegistrationForm
                  formData={formData}
                  onFormChange={handleFormChange}
                  onSubmit={handleFormSubmit}
                  isLoading={isLoading}
                />
              )}

              {/* Navigation Buttons */}
              {currentStep > 1 && !registrationComplete && (
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
                  <Button
                    variant="ghost"
                    onClick={handleBackStep}
                    iconName="ArrowLeft"
                    iconPosition="left"
                    disabled={isLoading}
                  >
                    Voltar
                  </Button>

                  <div className="text-sm text-muted-foreground">
                    {selectedUserType === 'buyer' ? 'Criando conta de comprador...' : 'Criando sua loja virtual...'}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Help Section */}
        {!registrationComplete && (
          <div className="mt-8 text-center">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Icon name="HelpCircle" size={16} color="var(--color-muted-foreground)" />
                <span className="text-sm font-medium text-muted-foreground">
                  Precisa de ajuda?
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Nossa equipe está pronta para ajudar você a começar no Lookali
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="MessageCircle"
                  iconPosition="left"
                  onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
                >
                  WhatsApp Suporte
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Mail"
                  iconPosition="left"
                  onClick={() => window.location.href = 'mailto:suporte@lookali.com'}
                >
                  E-mail
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Testing Credentials Info */}
        <div className="mt-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} color="var(--color-warning)" />
            <div className="text-sm">
              <div className="font-medium text-foreground mb-1">Credenciais de Teste</div>
              <div className="text-muted-foreground space-y-1">
                <div><strong>Comprador:</strong> comprador@teste.com / Teste123!</div>
                <div><strong>Vendedor:</strong> vendedor@teste.com / Loja123!</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserRegistration;