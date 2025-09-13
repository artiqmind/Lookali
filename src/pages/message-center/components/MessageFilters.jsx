import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessageFilters = ({ onFilterChange, activeFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const filterOptions = {
    status: [
      { value: 'all', label: 'All Status', icon: 'List' },
      { value: 'unread', label: 'Unread', icon: 'Mail' },
      { value: 'pending', label: 'Pending', icon: 'Clock' },
      { value: 'responded', label: 'Responded', icon: 'CheckCircle' },
      { value: 'closed', label: 'Closed', icon: 'XCircle' }
    ],
    timeRange: [
      { value: 'today', label: 'Today', icon: 'Calendar' },
      { value: 'week', label: 'This Week', icon: 'Calendar' },
      { value: 'month', label: 'This Month', icon: 'Calendar' },
      { value: 'all', label: 'All Time', icon: 'Calendar' }
    ],
    deliveryType: [
      { value: 'all', label: 'All Types', icon: 'Package' },
      { value: 'delivery', label: 'Delivery', icon: 'Truck' },
      { value: 'pickup', label: 'Pickup', icon: 'MapPin' }
    ],
    priority: [
      { value: 'all', label: 'All Priority', icon: 'Flag' },
      { value: 'high', label: 'High Priority', icon: 'AlertTriangle' },
      { value: 'normal', label: 'Normal', icon: 'Flag' },
      { value: 'low', label: 'Low Priority', icon: 'Flag' }
    ]
  };

  const handleFilterChange = (category, value) => {
    onFilterChange({
      ...activeFilters,
      [category]: value
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      status: 'all',
      timeRange: 'all',
      deliveryType: 'all',
      priority: 'all'
    });
  };

  const hasActiveFilters = Object.values(activeFilters)?.some(value => value !== 'all');

  return (
    <div className="bg-card border-b border-border">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filters</span>
            {hasActiveFilters && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                Active
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-xs"
              >
                Clear All
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Icon 
                name="ChevronDown" 
                size={16} 
                className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
              />
            </Button>
          </div>
        </div>

        {/* Quick Filters - Always Visible */}
        <div className="flex flex-wrap gap-2 mb-4">
          {filterOptions?.status?.slice(0, 4)?.map((option) => (
            <button
              key={option?.value}
              onClick={() => handleFilterChange('status', option?.value)}
              className={`flex items-center space-x-1 px-3 py-1 rounded-sm text-xs font-medium transition-colors duration-200 ${
                activeFilters?.status === option?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name={option?.icon} size={12} />
              <span>{option?.label}</span>
            </button>
          ))}
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="space-y-4 pt-4 border-t border-border">
            {Object.entries(filterOptions)?.map(([category, options]) => (
              <div key={category}>
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  {category?.replace(/([A-Z])/g, ' $1')?.trim()}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {options?.map((option) => (
                    <button
                      key={option?.value}
                      onClick={() => handleFilterChange(category, option?.value)}
                      className={`flex items-center space-x-1 px-3 py-1 rounded-sm text-xs font-medium transition-colors duration-200 ${
                        activeFilters?.[category] === option?.value
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      <Icon name={option?.icon} size={12} />
                      <span>{option?.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Advanced Options */}
            <div className="pt-4 border-t border-border">
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                Advanced Options
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-border text-primary focus:ring-ring"
                  />
                  <span className="text-sm text-foreground">Show archived</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-border text-primary focus:ring-ring"
                  />
                  <span className="text-sm text-foreground">Include system messages</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-border text-primary focus:ring-ring"
                  />
                  <span className="text-sm text-foreground">Show customer notes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-border text-primary focus:ring-ring"
                  />
                  <span className="text-sm text-foreground">Priority messages only</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageFilters;