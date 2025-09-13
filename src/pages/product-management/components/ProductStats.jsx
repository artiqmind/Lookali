import React from 'react';
import Icon from '../../../components/AppIcon';

const ProductStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total de Produtos',
      value: stats?.totalProducts,
      icon: 'Package',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: stats?.totalProductsChange,
      changeType: stats?.totalProductsChange >= 0 ? 'positive' : 'negative'
    },
    {
      title: 'Produtos Ativos',
      value: stats?.activeProducts,
      icon: 'Eye',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: stats?.activeProductsChange,
      changeType: stats?.activeProductsChange >= 0 ? 'positive' : 'negative'
    },
    {
      title: 'Estoque Baixo',
      value: stats?.lowStockProducts,
      icon: 'AlertTriangle',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      change: stats?.lowStockChange,
      changeType: stats?.lowStockChange <= 0 ? 'positive' : 'negative'
    },
    {
      title: 'Sem Estoque',
      value: stats?.outOfStockProducts,
      icon: 'XCircle',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
      change: stats?.outOfStockChange,
      changeType: stats?.outOfStockChange <= 0 ? 'positive' : 'negative'
    }
  ];

  const formatNumber = (num) => {
    return new Intl.NumberFormat('pt-BR')?.format(num);
  };

  const formatChange = (change, isPositive) => {
    const sign = change > 0 ? '+' : '';
    const color = isPositive ? 'text-success' : 'text-destructive';
    return (
      <span className={`text-xs ${color} flex items-center space-x-1`}>
        <Icon 
          name={isPositive ? 'TrendingUp' : 'TrendingDown'} 
          size={12} 
        />
        <span>{sign}{change}</span>
      </span>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards?.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-4 shadow-warm-sm hover:shadow-warm-md transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-md ${stat?.bgColor}`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
            {stat?.change !== undefined && stat?.change !== 0 && (
              <div>
                {formatChange(stat?.change, stat?.changeType === 'positive')}
              </div>
            )}
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">
              {formatNumber(stat?.value)}
            </h3>
            <p className="text-sm text-muted-foreground">
              {stat?.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductStats;