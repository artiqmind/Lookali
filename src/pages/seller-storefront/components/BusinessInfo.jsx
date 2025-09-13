import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const BusinessInfo = ({ businessData }) => {
  const [activeTab, setActiveTab] = useState('about');

  const tabs = [
    { id: 'about', label: 'Sobre', icon: 'Info' },
    { id: 'hours', label: 'Horários', icon: 'Clock' },
    { id: 'delivery', label: 'Entrega', icon: 'Truck' },
    { id: 'contact', label: 'Contato', icon: 'Phone' }
  ];

  const daysOfWeek = [
    'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'
  ];

  const renderAboutTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
          Sobre o Negócio
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {businessData?.fullDescription}
        </p>
      </div>

      <div>
        <h4 className="font-medium text-foreground mb-3">Serviços Oferecidos</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {businessData?.services?.map((service, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="Check" size={16} color="var(--color-success)" />
              <span className="text-sm text-foreground">{service}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium text-foreground mb-3">Especialidades</h4>
        <div className="flex flex-wrap gap-2">
          {businessData?.specialties?.map((specialty, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>

      {businessData?.certifications && businessData?.certifications?.length > 0 && (
        <div>
          <h4 className="font-medium text-foreground mb-3">Certificações</h4>
          <div className="space-y-2">
            {businessData?.certifications?.map((cert, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Icon name="Award" size={16} color="var(--color-warning)" />
                <span className="text-sm text-foreground">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderHoursTab = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
        Horário de Funcionamento
      </h3>
      
      <div className="space-y-3">
        {businessData?.operatingHours?.map((dayHours, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
            <span className="font-medium text-foreground">
              {daysOfWeek?.[index]}
            </span>
            <span className="text-muted-foreground">
              {dayHours?.closed ? (
                <span className="text-destructive">Fechado</span>
              ) : (
                `${dayHours?.open} - ${dayHours?.close}`
              )}
            </span>
          </div>
        ))}
      </div>

      {businessData?.specialHours && (
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-medium text-foreground mb-2">Horários Especiais</h4>
          <p className="text-sm text-muted-foreground">
            {businessData?.specialHours}
          </p>
        </div>
      )}
    </div>
  );

  const renderDeliveryTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
        Opções de Entrega
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Delivery Options */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Métodos Disponíveis</h4>
          <div className="space-y-3">
            {businessData?.deliveryOptions?.map((option, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                <Icon 
                  name={option?.type === 'delivery' ? 'Truck' : option?.type === 'pickup' ? 'MapPin' : 'Package'} 
                  size={20} 
                  color="var(--color-primary)" 
                />
                <div>
                  <div className="font-medium text-foreground">{option?.name}</div>
                  <div className="text-sm text-muted-foreground">{option?.description}</div>
                  <div className="text-sm font-medium text-primary mt-1">
                    {option?.price === 0 ? 'Grátis' : `R$ ${option?.price?.toFixed(2)}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Zones */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Zonas de Entrega</h4>
          <div className="space-y-2">
            {businessData?.deliveryZonesList?.map((zone, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-sm">
                <span className="text-sm text-foreground">{zone?.area}</span>
                <span className="text-sm font-medium text-primary">
                  {zone?.fee === 0 ? 'Grátis' : `R$ ${zone?.fee?.toFixed(2)}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 bg-primary/10 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
          <div>
            <div className="text-sm font-medium text-primary">Tempo de Entrega</div>
            <div className="text-sm text-muted-foreground">
              {businessData?.estimatedDeliveryTime}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContactTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
        Informações de Contato
      </h3>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Icon name="MapPin" size={20} color="var(--color-primary)" />
          <div>
            <div className="font-medium text-foreground">Endereço</div>
            <div className="text-sm text-muted-foreground">{businessData?.fullAddress}</div>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Icon name="Phone" size={20} color="var(--color-primary)" />
          <div>
            <div className="font-medium text-foreground">Telefone</div>
            <div className="text-sm text-muted-foreground">{businessData?.phone}</div>
          </div>
        </div>

        {businessData?.whatsapp && (
          <div className="flex items-start space-x-3">
            <Icon name="MessageCircle" size={20} color="var(--color-success)" />
            <div>
              <div className="font-medium text-foreground">WhatsApp</div>
              <div className="text-sm text-muted-foreground">{businessData?.whatsapp}</div>
            </div>
          </div>
        )}

        {businessData?.email && (
          <div className="flex items-start space-x-3">
            <Icon name="Mail" size={20} color="var(--color-primary)" />
            <div>
              <div className="font-medium text-foreground">Email</div>
              <div className="text-sm text-muted-foreground">{businessData?.email}</div>
            </div>
          </div>
        )}

        {businessData?.website && (
          <div className="flex items-start space-x-3">
            <Icon name="Globe" size={20} color="var(--color-primary)" />
            <div>
              <div className="font-medium text-foreground">Website</div>
              <div className="text-sm text-muted-foreground">{businessData?.website}</div>
            </div>
          </div>
        )}
      </div>

      {/* Map Integration */}
      <div className="mt-6">
        <h4 className="font-medium text-foreground mb-3">Localização</h4>
        <div className="w-full h-64 rounded-lg overflow-hidden border border-border">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title={businessData?.name}
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${businessData?.coordinates?.lat},${businessData?.coordinates?.lng}&z=15&output=embed`}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {tabs?.map(tab => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-150 border-b-2 ${
                activeTab === tab?.id
                  ? 'text-primary border-primary' :'text-muted-foreground border-transparent hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'about' && renderAboutTab()}
        {activeTab === 'hours' && renderHoursTab()}
        {activeTab === 'delivery' && renderDeliveryTab()}
        {activeTab === 'contact' && renderContactTab()}
      </div>
    </div>
  );
};

export default BusinessInfo;