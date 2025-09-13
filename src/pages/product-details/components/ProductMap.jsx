import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductMap = ({ sellerLocation = {}, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const mockLocation = {
    address: "Rua Augusta, 123 - Vila Madalena, São Paulo - SP",
    coordinates: {
      lat: -23.5505,
      lng: -46.6333
    },
    businessName: "TechStore SP",
    distance: "1.2 km",
    ...sellerLocation
  };

  const mapSrc = `https://www.google.com/maps?q=${mockLocation?.coordinates?.lat},${mockLocation?.coordinates?.lng}&z=15&output=embed`;

  const handleGetDirections = () => {
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mockLocation?.coordinates?.lat},${mockLocation?.coordinates?.lng}`;
    window.open(directionsUrl, '_blank');
  };

  const handleViewInMaps = () => {
    const mapsUrl = `https://www.google.com/maps?q=${mockLocation?.coordinates?.lat},${mockLocation?.coordinates?.lng}&z=16`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className={`bg-card border border-border rounded-lg overflow-hidden shadow-warm-sm ${className}`}>
      {/* Map Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-heading font-semibold text-foreground flex items-center space-x-2">
              <Icon name="MapPin" size={20} color="var(--color-primary)" />
              <span>Localização</span>
            </h3>
            <p className="text-sm text-muted-foreground">
              {mockLocation?.businessName} • {mockLocation?.distance} de distância
            </p>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "Minimize2" : "Maximize2"}
            iconPosition="left"
          >
            {isExpanded ? 'Reduzir' : 'Expandir'}
          </Button>
        </div>
      </div>
      {/* Map Container */}
      <div className={`relative bg-muted transition-all duration-300 ${
        isExpanded ? 'h-96' : 'h-48'
      }`}>
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title={mockLocation?.businessName}
          referrerPolicy="no-referrer-when-downgrade"
          src={mapSrc}
          className="border-0"
        />
        
        {/* Map Overlay Controls */}
        <div className="absolute top-2 right-2 flex flex-col space-y-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/90 hover:bg-white text-foreground shadow-warm-sm"
            onClick={handleViewInMaps}
          >
            <Icon name="ExternalLink" size={16} />
          </Button>
        </div>
      </div>
      {/* Address & Actions */}
      <div className="p-4 space-y-4">
        {/* Address */}
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <Icon name="MapPin" size={16} color="var(--color-muted-foreground)" className="mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-foreground font-medium">
                {mockLocation?.address}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={handleGetDirections}
            iconName="Navigation"
            iconPosition="left"
            fullWidth
          >
            Como Chegar
          </Button>
          
          <Button
            variant="ghost"
            onClick={handleViewInMaps}
            iconName="Map"
            iconPosition="left"
            fullWidth
          >
            Ver no Google Maps
          </Button>
        </div>

        {/* Distance Info */}
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground pt-2 border-t border-border">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={12} />
            <span>~5 min de carro</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={12} />
            <span>{mockLocation?.distance}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMap;