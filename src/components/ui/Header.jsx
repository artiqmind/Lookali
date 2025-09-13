import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState('buyer'); // buyer or seller
  const [currentLocation, setCurrentLocation] = useState('São Paulo, SP');
  const [searchRadius, setSearchRadius] = useState('5km');
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Discover',
      items: [
        { label: 'Search Products', path: '/product-search-results', icon: 'Search', roleAccess: 'both' },
        { label: 'Product Details', path: '/product-details', icon: 'Package', roleAccess: 'both' },
        { label: 'Storefronts', path: '/seller-storefront', icon: 'Store', roleAccess: 'both' }
      ]
    },
    {
      label: 'My Business',
      items: [
        { label: 'Manage Products', path: '/product-management', icon: 'Settings', roleAccess: 'seller' }
      ]
    },
    {
      label: 'Messages',
      items: [
        { label: 'Message Center', path: '/message-center', icon: 'MessageCircle', roleAccess: 'both' }
      ]
    },
    {
      label: 'Account',
      items: [
        { label: 'Registration', path: '/user-registration', icon: 'User', roleAccess: 'both' }
      ]
    }
  ];

  const getVisibleNavItems = () => {
    const allItems = navigationItems?.flatMap(section => 
      section?.items?.filter(item => 
        item?.roleAccess === 'both' || item?.roleAccess === userRole
      )
    );
    
    // Show primary workflow items based on role
    if (userRole === 'buyer') {
      return allItems?.filter(item => 
        ['/product-search-results', '/message-center', '/user-registration']?.includes(item?.path)
      );
    } else {
      return allItems?.filter(item => 
        ['/product-management', '/message-center', '/user-registration']?.includes(item?.path)
      );
    }
  };

  const getOverflowItems = () => {
    const allItems = navigationItems?.flatMap(section => 
      section?.items?.filter(item => 
        item?.roleAccess === 'both' || item?.roleAccess === userRole
      )
    );
    
    const visiblePaths = getVisibleNavItems()?.map(item => item?.path);
    return allItems?.filter(item => !visiblePaths?.includes(item?.path));
  };

  const toggleUserRole = () => {
    setUserRole(prev => prev === 'buyer' ? 'seller' : 'buyer');
  };

  const handleLocationUpdate = () => {
    // Simulate location update
    const locations = ['São Paulo, SP', 'Rio de Janeiro, RJ', 'Belo Horizonte, MG'];
    const currentIndex = locations?.indexOf(currentLocation);
    const nextIndex = (currentIndex + 1) % locations?.length;
    setCurrentLocation(locations?.[nextIndex]);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-warm-sm">
      <div className="flex h-16 items-center px-4 lg:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 mr-8">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-md">
            <Icon name="MapPin" size={20} color="white" />
          </div>
          <span className="font-heading font-bold text-xl text-foreground">Lookali</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 flex-1">
          {getVisibleNavItems()?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center space-x-2 px-3 py-2 rounded-sm text-sm font-medium transition-colors duration-200 ${
                isActivePath(item?.path)
                  ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </Link>
          ))}

          {/* More Menu for Overflow Items */}
          {getOverflowItems()?.length > 0 && (
            <div className="relative group">
              <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                <Icon name="MoreHorizontal" size={16} />
                <span>More</span>
              </Button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-warm-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {getOverflowItems()?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className="flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-sm"
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Location Indicator */}
        <div className="hidden lg:flex items-center space-x-2 px-3 py-1 bg-muted rounded-md mr-4">
          <Icon name="MapPin" size={14} color="var(--color-primary)" />
          <button 
            onClick={handleLocationUpdate}
            className="text-sm font-data text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            {currentLocation} • {searchRadius}
          </button>
        </div>

        {/* User Role Toggle */}
        <div className="hidden md:flex items-center space-x-2 mr-4">
          <button
            onClick={toggleUserRole}
            className={`px-3 py-1 rounded-sm text-xs font-medium transition-all duration-200 ${
              userRole === 'buyer' ?'bg-primary text-primary-foreground' :'bg-secondary text-secondary-foreground'
            }`}
          >
            {userRole === 'buyer' ? 'Buyer' : 'Seller'}
          </button>
        </div>

        {/* WhatsApp Communication Bridge */}
        <Button
          variant="ghost"
          size="sm"
          className="hidden md:flex items-center space-x-1 mr-2"
          onClick={() => window.open('https://wa.me/', '_blank')}
        >
          <Icon name="MessageCircle" size={16} color="var(--color-success)" />
          <span className="text-sm">WhatsApp</span>
        </Button>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
        </Button>
      </div>
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border shadow-warm-md">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Location */}
            <div className="flex items-center justify-between p-3 bg-muted rounded-md">
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} color="var(--color-primary)" />
                <span className="text-sm font-data text-muted-foreground">{currentLocation}</span>
              </div>
              <button
                onClick={handleLocationUpdate}
                className="text-xs text-primary hover:text-primary/80"
              >
                Change
              </button>
            </div>

            {/* Mobile Role Toggle */}
            <div className="flex items-center justify-between p-3 bg-muted rounded-md">
              <span className="text-sm text-muted-foreground">Mode:</span>
              <button
                onClick={toggleUserRole}
                className={`px-3 py-1 rounded-sm text-xs font-medium transition-all duration-200 ${
                  userRole === 'buyer' ?'bg-primary text-primary-foreground' :'bg-secondary text-secondary-foreground'
                }`}
              >
                {userRole === 'buyer' ? 'Buyer' : 'Seller'}
              </button>
            </div>

            {/* Mobile Navigation Items */}
            <nav className="space-y-2">
              {navigationItems?.map((section) => (
                <div key={section?.label}>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    {section?.label}
                  </h3>
                  {section?.items?.filter(item => item?.roleAccess === 'both' || item?.roleAccess === userRole)?.map((item) => (
                      <Link
                        key={item?.path}
                        to={item?.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-sm text-sm transition-colors duration-200 ${
                          isActivePath(item?.path)
                            ? 'text-primary bg-primary/10' :'text-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon name={item?.icon} size={18} />
                        <span>{item?.label}</span>
                      </Link>
                    ))}
                </div>
              ))}
            </nav>

            {/* Mobile WhatsApp */}
            <Button
              variant="outline"
              size="sm"
              fullWidth
              iconName="MessageCircle"
              iconPosition="left"
              onClick={() => {
                window.open('https://wa.me/', '_blank');
                setIsMobileMenuOpen(false);
              }}
            >
              Open WhatsApp
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;