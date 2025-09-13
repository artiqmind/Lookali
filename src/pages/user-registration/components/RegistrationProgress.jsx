import React from 'react';
import Icon from '../../../components/AppIcon';

const RegistrationProgress = ({ currentStep, totalSteps, userType, className = '' }) => {
  const steps = [
    {
      id: 1,
      label: 'Tipo de Conta',
      description: 'Escolha como usar o Lookali',
      icon: 'UserCheck'
    },
    {
      id: 2,
      label: userType === 'buyer' ? 'Dados Pessoais' : 'Informações do Negócio',
      description: userType === 'buyer' ? 'Seus dados básicos' : 'Configure sua loja',
      icon: userType === 'buyer' ? 'User' : 'Store'
    },
    {
      id: 3,
      label: 'Verificação',
      description: 'Confirme seu e-mail',
      icon: 'Mail'
    }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepColor = (status) => {
    switch (status) {
      case 'completed':
        return 'var(--color-success)';
      case 'current':
        return 'var(--color-primary)';
      default:
        return 'var(--color-muted-foreground)';
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Desktop Progress Bar */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between mb-8">
          {steps?.map((step, index) => {
            const status = getStepStatus(step?.id);
            const isLast = index === steps?.length - 1;
            
            return (
              <div key={step?.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  {/* Step Circle */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                      status === 'completed'
                        ? 'bg-success border-success text-success-foreground'
                        : status === 'current' ?'bg-primary border-primary text-primary-foreground' :'bg-background border-border text-muted-foreground'
                    }`}
                  >
                    {status === 'completed' ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <Icon name={step?.icon} size={16} />
                    )}
                  </div>
                  
                  {/* Step Info */}
                  <div className="mt-2 text-center">
                    <div className={`text-sm font-medium ${
                      status === 'current' ? 'text-primary' : 
                      status === 'completed' ? 'text-success' : 'text-muted-foreground'
                    }`}>
                      {step?.label}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {step?.description}
                    </div>
                  </div>
                </div>
                {/* Connector Line */}
                {!isLast && (
                  <div className="flex-1 h-0.5 mx-4 mt-[-2rem]">
                    <div
                      className={`h-full transition-all duration-300 ${
                        status === 'completed' ? 'bg-success' : 'bg-border'
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Mobile Progress Bar */}
      <div className="md:hidden mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-foreground">
            Passo {currentStep} de {totalSteps}
          </div>
          <div className="text-sm text-muted-foreground">
            {Math.round((currentStep / totalSteps) * 100)}% concluído
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        
        {/* Current Step Info */}
        <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-md">
          <div className="flex items-center space-x-2">
            <Icon name={steps?.[currentStep - 1]?.icon} size={16} color="var(--color-primary)" />
            <div>
              <div className="text-sm font-medium text-primary">
                {steps?.[currentStep - 1]?.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {steps?.[currentStep - 1]?.description}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Step Navigation Dots (Mobile) */}
      <div className="md:hidden flex justify-center space-x-2 mb-6">
        {steps?.map((step) => {
          const status = getStepStatus(step?.id);
          return (
            <div
              key={step?.id}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                status === 'completed'
                  ? 'bg-success'
                  : status === 'current' ?'bg-primary' :'bg-border'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RegistrationProgress;