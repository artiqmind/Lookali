import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const LocationIndicator = ({ onLocationChange, className = '' }) => {
  const [currentLocation, setCurrentLocation] = useState('São Paulo, SP');
  const [searchRadius, setSearchRadius] = useState('5km');
  const [isExpanded, setIsExpanded] = useState(false);
  const [locationPermission, setLocationPermission] = useState('prompt');

  const radiusOptions = ['1km', '2km', '5km', '10km', '20km'];
  const commonLocations = [
    'São Paulo, SP',
    'Rio de Janeiro, RJ',
    'Belo Horizonte, MG',
    'Salvador, BA',
    'Brasília, DF',
    'Fortaleza, CE'
  ];

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    if ('geolocation' in navigator) {
      try {
        const permission = await navigator.permissions?.query({ name: 'geolocation' });
        setLocationPermission(permission?.state);
      } catch (error) {
        setLocationPermission('denied');
      }
    }
  };

  const getCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          // Simulate reverse geocoding
          setCurrentLocation('Current Location');
          setLocationPermission('granted');
          if (onLocationChange) {
            onLocationChange({
              location: 'Current Location',
              coordinates: {
                lat: position?.coords?.latitude,
                lng: position?.coords?.longitude
              },
              radius: searchRadius
            });
          }
        },
        (error) => {
          console.error('Location error:', error);
          setLocationPermission('denied');
        }
      );
    }
  };

  const handleLocationSelect = (location) => {
    setCurrentLocation(location);
    setIsExpanded(false);
    if (onLocationChange) {
      onLocationChange({
        location,
        radius: searchRadius
      });
    }
  };

  const handleRadiusChange = (radius) => {
    setSearchRadius(radius);
    if (onLocationChange) {
      onLocationChange({
        location: currentLocation,
        radius
      });
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Desktop View */}
      <div className="hidden lg:flex items-center space-x-2 px-3 py-1 bg-muted rounded-md">
        <Icon 
          name="MapPin" 
          size={14} 
          color={locationPermission === 'granted' ? 'var(--color-success)' : 'var(--color-primary)'} 
        />
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm font-data text-muted-foreground hover:text-foreground transition-colors duration-150 flex items-center space-x-1"
        >
          <span>{currentLocation}</span>
          <span>•</span>
          <span>{searchRadius}</span>
          <Icon name="ChevronDown" size={12} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
      {/* Mobile View */}
      <div className="lg:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-1"
        >
          <Icon 
            name="MapPin" 
            size={16} 
            color={locationPermission === 'granted' ? 'var(--color-success)' : 'var(--color-primary)'} 
          />
          <span className="text-sm font-data">{searchRadius}</span>
        </Button>
      </div>
      {/* Expanded Location Menu */}
      {isExpanded && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-popover border border-border rounded-md shadow-warm-lg z-50">
          <div className="p-4 space-y-4">
            {/* Current Location Button */}
            {locationPermission !== 'denied' && (
              <div>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="Crosshair"
                  iconPosition="left"
                  onClick={getCurrentLocation}
                  disabled={locationPermission === 'denied'}
                >
                  Use Current Location
                </Button>
              </div>
            )}

            {/* Search Radius */}
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                Search Radius
              </label>
              <div className="flex flex-wrap gap-2">
                {radiusOptions?.map((radius) => (
                  <button
                    key={radius}
                    onClick={() => handleRadiusChange(radius)}
                    className={`px-3 py-1 rounded-sm text-xs font-medium transition-all duration-200 ${
                      searchRadius === radius
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {radius}
                  </button>
                ))}
              </div>
            </div>

            {/* Common Locations */}
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                Popular Areas
              </label>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {commonLocations?.map((location) => (
                  <button
                    key={location}
                    onClick={() => handleLocationSelect(location)}
                    className={`w-full text-left px-3 py-2 rounded-sm text-sm transition-colors duration-150 ${
                      currentLocation === location
                        ? 'bg-primary/10 text-primary' :'text-popover-foreground hover:bg-muted'
                    }`}
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>

            {/* Close Button */}
            <div className="pt-2 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                fullWidth
                onClick={() => setIsExpanded(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Backdrop for mobile */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default LocationIndicator;