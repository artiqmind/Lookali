import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const UserRoleToggle = ({ onRoleChange, className = '' }) => {
  const [userRole, setUserRole] = useState('buyer');
  const [isExpanded, setIsExpanded] = useState(false);

  const roles = [
    {
      value: 'buyer',
      label: 'Buyer',
      description: 'Browse and purchase products',
      icon: 'ShoppingBag',
      color: 'var(--color-primary)'
    },
    {
      value: 'seller',
      label: 'Seller',
      description: 'Manage products and business',
      icon: 'Store',
      color: 'var(--color-secondary)'
    }
  ];

  useEffect(() => {
    // Check localStorage for saved role preference
    const savedRole = localStorage.getItem('userRole');
    if (savedRole && ['buyer', 'seller']?.includes(savedRole)) {
      setUserRole(savedRole);
      if (onRoleChange) {
        onRoleChange(savedRole);
      }
    }
  }, [onRoleChange]);

  const handleRoleChange = (newRole) => {
    setUserRole(newRole);
    setIsExpanded(false);
    
    // Save to localStorage
    localStorage.setItem('userRole', newRole);
    
    if (onRoleChange) {
      onRoleChange(newRole);
    }
  };

  const toggleRole = () => {
    const newRole = userRole === 'buyer' ? 'seller' : 'buyer';
    handleRoleChange(newRole);
  };

  const currentRole = roles?.find(role => role?.value === userRole);

  return (
    <div className={`relative ${className}`}>
      {/* Desktop Quick Toggle */}
      <div className="hidden md:flex items-center space-x-2">
        <button
          onClick={toggleRole}
          className={`px-3 py-1 rounded-sm text-xs font-medium transition-all duration-200 flex items-center space-x-1 ${
            userRole === 'buyer' ?'bg-primary text-primary-foreground hover:bg-primary/90' :'bg-secondary text-secondary-foreground hover:bg-secondary/90'
          }`}
        >
          <Icon name={currentRole?.icon} size={12} />
          <span>{currentRole?.label}</span>
        </button>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 text-muted-foreground hover:text-foreground transition-colors duration-150"
        >
          <Icon name="ChevronDown" size={14} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
      {/* Mobile Toggle */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-1"
        >
          <Icon name={currentRole?.icon} size={16} color={currentRole?.color} />
          <span className="text-sm">{currentRole?.label}</span>
          <Icon name="ChevronDown" size={12} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
        </Button>
      </div>
      {/* Expanded Role Menu */}
      {isExpanded && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-popover border border-border rounded-md shadow-warm-lg z-50">
          <div className="p-3">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Switch Mode
            </div>
            
            <div className="space-y-2">
              {roles?.map((role) => (
                <button
                  key={role?.value}
                  onClick={() => handleRoleChange(role?.value)}
                  className={`w-full text-left p-3 rounded-md transition-all duration-200 ${
                    userRole === role?.value
                      ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted border border-transparent'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-sm ${
                      userRole === role?.value
                        ? role?.value === 'buyer' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <Icon name={role?.icon} size={16} />
                    </div>
                    
                    <div className="flex-1">
                      <div className={`font-medium text-sm ${
                        userRole === role?.value ? 'text-primary' : 'text-popover-foreground'
                      }`}>
                        {role?.label}
                        {userRole === role?.value && (
                          <Icon name="Check" size={14} className="inline ml-2" />
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {role?.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Role Benefits */}
            <div className="mt-4 pt-3 border-t border-border">
              <div className="text-xs text-muted-foreground">
                {userRole === 'buyer' ? (
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Icon name="Search" size={12} />
                      <span>Discover local products</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="MessageCircle" size={12} />
                      <span>Direct seller communication</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Icon name="Package" size={12} />
                      <span>Manage your inventory</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="BarChart3" size={12} />
                      <span>Track business analytics</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Close Button */}
            <div className="mt-3 pt-3 border-t border-border">
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
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default UserRoleToggle;