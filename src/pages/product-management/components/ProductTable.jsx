import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ProductTable = ({ 
  products, 
  selectedProducts, 
  onSelectProduct, 
  onSelectAll, 
  onEdit, 
  onDelete, 
  onToggleStatus,
  onViewDetails,
  sortBy,
  sortOrder,
  onSort
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10 border-success/20';
      case 'inactive':
        return 'text-muted-foreground bg-muted border-border';
      case 'out_of_stock':
        return 'text-destructive bg-destructive/10 border-destructive/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'inactive':
        return 'Inativo';
      case 'out_of_stock':
        return 'Sem Estoque';
      default:
        return 'Desconhecido';
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })?.format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSort = (field) => {
    const newOrder = sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc';
    onSort(field, newOrder);
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return 'ArrowUpDown';
    return sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const isAllSelected = products?.length > 0 && selectedProducts?.length === products?.length;
  const isIndeterminate = selectedProducts?.length > 0 && selectedProducts?.length < products?.length;

  return (
    <div className="bg-card border border-border rounded-lg shadow-warm-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                Produto
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors duration-150"
                >
                  <span>Nome</span>
                  <Icon name={getSortIcon('name')} size={12} />
                </button>
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('price')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors duration-150"
                >
                  <span>Preço</span>
                  <Icon name={getSortIcon('price')} size={12} />
                </button>
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('stock')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors duration-150"
                >
                  <span>Estoque</span>
                  <Icon name={getSortIcon('stock')} size={12} />
                </button>
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors duration-150"
                >
                  <span>Status</span>
                  <Icon name={getSortIcon('status')} size={12} />
                </button>
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('updatedAt')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors duration-150"
                >
                  <span>Atualizado</span>
                  <Icon name={getSortIcon('updatedAt')} size={12} />
                </button>
              </th>
              <th className="w-32 px-4 py-3 text-sm font-medium text-muted-foreground">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr
                key={product?.id}
                className={`border-b border-border hover:bg-muted/30 transition-colors duration-150 ${
                  selectedProducts?.includes(product?.id) ? 'bg-primary/5' : ''
                }`}
                onMouseEnter={() => setHoveredRow(product?.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedProducts?.includes(product?.id)}
                    onChange={(e) => onSelectProduct(product?.id, e?.target?.checked)}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="w-12 h-12 overflow-hidden rounded-md">
                    <Image
                      src={product?.images?.[0] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop'}
                      alt={product?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div>
                    <button
                      onClick={() => onViewDetails(product)}
                      className="font-medium text-foreground hover:text-primary transition-colors duration-150 text-left"
                    >
                      {product?.name}
                    </button>
                    <div className="text-xs text-muted-foreground mt-1">
                      {product?.category}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="font-semibold text-primary">
                    {formatPrice(product?.price)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <span className={`font-medium ${product?.stock <= 5 ? 'text-warning' : 'text-foreground'}`}>
                      {product?.stock}
                    </span>
                    {product?.stock <= 5 && (
                      <Icon name="AlertTriangle" size={14} color="var(--color-warning)" />
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-sm text-xs font-medium border ${getStatusColor(product?.status)}`}>
                    {getStatusLabel(product?.status)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-muted-foreground">
                    {formatDate(product?.updatedAt)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className={`flex items-center space-x-1 transition-opacity duration-150 ${
                    hoveredRow === product?.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8"
                      onClick={() => onEdit(product)}
                    >
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8"
                      onClick={() => onToggleStatus(product)}
                    >
                      <Icon name={product?.status === 'active' ? 'EyeOff' : 'Eye'} size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 text-destructive hover:text-destructive"
                      onClick={() => onDelete(product)}
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {products?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Package" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Nenhum produto encontrado</h3>
          <p className="text-muted-foreground">
            Comece adicionando seu primeiro produto ao catálogo.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductTable;