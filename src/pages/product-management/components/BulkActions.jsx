import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const BulkActions = ({ 
  selectedProducts, 
  onBulkAction, 
  onClearSelection,
  totalProducts 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [bulkPriceChange, setBulkPriceChange] = useState({
    type: 'percentage', // percentage or fixed
    value: '',
    operation: 'increase' // increase or decrease
  });
  const [bulkCategory, setBulkCategory] = useState('');
  const [bulkStatus, setBulkStatus] = useState('');

  const categories = [
    { value: 'electronics', label: 'Eletrônicos' },
    { value: 'clothing', label: 'Roupas e Acessórios' },
    { value: 'home', label: 'Casa e Jardim' },
    { value: 'beauty', label: 'Beleza e Cuidados' },
    { value: 'sports', label: 'Esportes e Lazer' },
    { value: 'books', label: 'Livros e Mídia' },
    { value: 'food', label: 'Alimentos e Bebidas' },
    { value: 'automotive', label: 'Automotivo' },
    { value: 'toys', label: 'Brinquedos e Jogos' },
    { value: 'health', label: 'Saúde e Bem-estar' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Ativo' },
    { value: 'inactive', label: 'Inativo' },
    { value: 'out_of_stock', label: 'Sem Estoque' }
  ];

  const priceChangeTypes = [
    { value: 'percentage', label: 'Porcentagem (%)' },
    { value: 'fixed', label: 'Valor Fixo (R$)' }
  ];

  const priceOperations = [
    { value: 'increase', label: 'Aumentar' },
    { value: 'decrease', label: 'Diminuir' }
  ];

  const handleBulkPriceUpdate = () => {
    if (!bulkPriceChange?.value || parseFloat(bulkPriceChange?.value) <= 0) {
      alert('Por favor, insira um valor válido para a alteração de preço.');
      return;
    }

    onBulkAction('updatePrices', {
      productIds: selectedProducts,
      priceChange: {
        ...bulkPriceChange,
        value: parseFloat(bulkPriceChange?.value)
      }
    });

    setBulkPriceChange({ type: 'percentage', value: '', operation: 'increase' });
  };

  const handleBulkCategoryUpdate = () => {
    if (!bulkCategory) {
      alert('Por favor, selecione uma categoria.');
      return;
    }

    onBulkAction('updateCategory', {
      productIds: selectedProducts,
      category: bulkCategory
    });

    setBulkCategory('');
  };

  const handleBulkStatusUpdate = () => {
    if (!bulkStatus) {
      alert('Por favor, selecione um status.');
      return;
    }

    onBulkAction('updateStatus', {
      productIds: selectedProducts,
      status: bulkStatus
    });

    setBulkStatus('');
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Tem certeza que deseja excluir ${selectedProducts?.length} produto(s)? Esta ação não pode ser desfeita.`)) {
      onBulkAction('delete', {
        productIds: selectedProducts
      });
    }
  };

  const handleBulkExport = () => {
    onBulkAction('export', {
      productIds: selectedProducts
    });
  };

  if (selectedProducts?.length === 0) {
    return null;
  }

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon name="CheckSquare" size={20} color="var(--color-primary)" />
          <span className="font-medium text-primary">
            {selectedProducts?.length} de {totalProducts} produto(s) selecionado(s)
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            Ações em Lote
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            iconName="X"
            iconPosition="left"
          >
            Limpar Seleção
          </Button>
        </div>
      </div>
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-primary/20 space-y-6">
          {/* Quick Actions */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Ações Rápidas</h4>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Eye"
                iconPosition="left"
                onClick={() => onBulkAction('activate', { productIds: selectedProducts })}
              >
                Ativar Todos
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="EyeOff"
                iconPosition="left"
                onClick={() => onBulkAction('deactivate', { productIds: selectedProducts })}
              >
                Desativar Todos
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
                onClick={handleBulkExport}
              >
                Exportar Selecionados
              </Button>
              <Button
                variant="destructive"
                size="sm"
                iconName="Trash2"
                iconPosition="left"
                onClick={handleBulkDelete}
              >
                Excluir Selecionados
              </Button>
            </div>
          </div>

          {/* Bulk Price Update */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Atualização de Preços</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <Select
                options={priceOperations}
                value={bulkPriceChange?.operation}
                onChange={(value) => setBulkPriceChange(prev => ({ ...prev, operation: value }))}
                placeholder="Operação"
              />
              <Input
                type="number"
                step="0.01"
                min="0"
                value={bulkPriceChange?.value}
                onChange={(e) => setBulkPriceChange(prev => ({ ...prev, value: e?.target?.value }))}
                placeholder="Valor"
              />
              <Select
                options={priceChangeTypes}
                value={bulkPriceChange?.type}
                onChange={(value) => setBulkPriceChange(prev => ({ ...prev, type: value }))}
              />
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={handleBulkPriceUpdate}
                iconName="DollarSign"
                iconPosition="left"
              >
                Aplicar Preços
              </Button>
            </div>
          </div>

          {/* Bulk Category Update */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Atualização de Categoria</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Select
                options={categories}
                value={bulkCategory}
                onChange={setBulkCategory}
                placeholder="Selecione uma categoria"
              />
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={handleBulkCategoryUpdate}
                iconName="Tag"
                iconPosition="left"
              >
                Aplicar Categoria
              </Button>
            </div>
          </div>

          {/* Bulk Status Update */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Atualização de Status</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Select
                options={statusOptions}
                value={bulkStatus}
                onChange={setBulkStatus}
                placeholder="Selecione um status"
              />
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={handleBulkStatusUpdate}
                iconName="ToggleLeft"
                iconPosition="left"
              >
                Aplicar Status
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkActions;