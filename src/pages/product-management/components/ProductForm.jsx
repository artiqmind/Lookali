import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ProductForm = ({ product, onSave, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    images: [],
    status: 'active',
    sku: '',
    weight: '',
    dimensions: {
      length: '',
      width: '',
      height: ''
    },
    tags: [],
    seoTitle: '',
    seoDescription: '',
    availableForDelivery: true,
    availableForPickup: true,
    processingTime: '1-2'
  });

  const [errors, setErrors] = useState({});
  const [imageUploading, setImageUploading] = useState(false);
  const [tagInput, setTagInput] = useState('');

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

  const processingTimeOptions = [
    { value: '1-2', label: '1-2 dias úteis' },
    { value: '3-5', label: '3-5 dias úteis' },
    { value: '1-2-weeks', label: '1-2 semanas' },
    { value: 'custom', label: 'Personalizado' }
  ];

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        price: product?.price?.toString() || '',
        stock: product?.stock?.toString() || '',
        weight: product?.weight?.toString() || '',
        dimensions: product?.dimensions || { length: '', width: '', height: '' },
        tags: product?.tags || [],
        seoTitle: product?.seoTitle || product?.name || '',
        seoDescription: product?.seoDescription || product?.description || '',
        availableForDelivery: product?.availableForDelivery ?? true,
        availableForPickup: product?.availableForPickup ?? true,
        processingTime: product?.processingTime || '1-2'
      });
    }
  }, [product]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleDimensionChange = (dimension, value) => {
    setFormData(prev => ({
      ...prev,
      dimensions: {
        ...prev?.dimensions,
        [dimension]: value
      }
    }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event?.target?.files);
    setImageUploading(true);

    // Simulate image upload
    setTimeout(() => {
      const newImages = files?.map((file, index) => ({
        id: Date.now() + index,
        url: URL.createObjectURL(file),
        name: file?.name,
        size: file?.size
      }));

      setFormData(prev => ({
        ...prev,
        images: [...prev?.images, ...newImages]?.slice(0, 5) // Max 5 images
      }));
      setImageUploading(false);
    }, 1000);
  };

  const removeImage = (imageId) => {
    setFormData(prev => ({
      ...prev,
      images: prev?.images?.filter(img => img?.id !== imageId)
    }));
  };

  const addTag = () => {
    if (tagInput?.trim() && !formData?.tags?.includes(tagInput?.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev?.tags, tagInput?.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev?.tags?.filter(tag => tag !== tagToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) newErrors.name = 'Nome do produto é obrigatório';
    if (!formData?.description?.trim()) newErrors.description = 'Descrição é obrigatória';
    if (!formData?.price || parseFloat(formData?.price) <= 0) newErrors.price = 'Preço deve ser maior que zero';
    if (!formData?.stock || parseInt(formData?.stock) < 0) newErrors.stock = 'Estoque deve ser um número válido';
    if (!formData?.category) newErrors.category = 'Categoria é obrigatória';
    if (formData?.images?.length === 0) newErrors.images = 'Pelo menos uma imagem é obrigatória';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    const productData = {
      ...formData,
      price: parseFloat(formData?.price),
      stock: parseInt(formData?.stock),
      weight: formData?.weight ? parseFloat(formData?.weight) : null,
      dimensions: {
        length: formData?.dimensions?.length ? parseFloat(formData?.dimensions?.length) : null,
        width: formData?.dimensions?.width ? parseFloat(formData?.dimensions?.width) : null,
        height: formData?.dimensions?.height ? parseFloat(formData?.dimensions?.height) : null
      }
    };

    onSave(productData);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-warm-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            {product ? 'Editar Produto' : 'Novo Produto'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <Icon name="X" size={20} />
          </Button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Informações Básicas</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nome do Produto"
              type="text"
              value={formData?.name}
              onChange={(e) => handleInputChange('name', e?.target?.value)}
              error={errors?.name}
              required
              placeholder="Digite o nome do produto"
            />

            <Input
              label="SKU (Código)"
              type="text"
              value={formData?.sku}
              onChange={(e) => handleInputChange('sku', e?.target?.value)}
              placeholder="Código único do produto"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Descrição *
            </label>
            <textarea
              value={formData?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
              className="w-full p-3 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              rows={4}
              placeholder="Descreva seu produto detalhadamente"
              required
            />
            {errors?.description && (
              <p className="text-sm text-destructive mt-1">{errors?.description}</p>
            )}
          </div>

          <Select
            label="Categoria"
            options={categories}
            value={formData?.category}
            onChange={(value) => handleInputChange('category', value)}
            error={errors?.category}
            required
            placeholder="Selecione uma categoria"
          />
        </div>

        {/* Images */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Imagens do Produto</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {formData?.images?.map((image, index) => (
              <div key={image?.id} className="relative group">
                <div className="aspect-square overflow-hidden rounded-md border border-border">
                  <Image
                    src={image?.url}
                    alt={`Produto ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  onClick={() => removeImage(image?.id)}
                >
                  <Icon name="X" size={12} />
                </Button>
                {index === 0 && (
                  <div className="absolute bottom-1 left-1 px-1 py-0.5 bg-primary text-primary-foreground text-xs rounded">
                    Principal
                  </div>
                )}
              </div>
            ))}
            
            {formData?.images?.length < 5 && (
              <label className="aspect-square border-2 border-dashed border-border rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors duration-150">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={imageUploading}
                />
                {imageUploading ? (
                  <Icon name="Loader2" size={24} color="var(--color-primary)" className="animate-spin" />
                ) : (
                  <>
                    <Icon name="Plus" size={24} color="var(--color-muted-foreground)" />
                    <span className="text-xs text-muted-foreground mt-1">Adicionar</span>
                  </>
                )}
              </label>
            )}
          </div>
          
          {errors?.images && (
            <p className="text-sm text-destructive">{errors?.images}</p>
          )}
          
          <p className="text-xs text-muted-foreground">
            Adicione até 5 imagens. A primeira será a imagem principal.
          </p>
        </div>

        {/* Pricing and Inventory */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Preço e Estoque</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Preço (R$)"
              type="number"
              step="0.01"
              min="0"
              value={formData?.price}
              onChange={(e) => handleInputChange('price', e?.target?.value)}
              error={errors?.price}
              required
              placeholder="0,00"
            />

            <Input
              label="Estoque"
              type="number"
              min="0"
              value={formData?.stock}
              onChange={(e) => handleInputChange('stock', e?.target?.value)}
              error={errors?.stock}
              required
              placeholder="0"
            />

            <Select
              label="Status"
              options={[
                { value: 'active', label: 'Ativo' },
                { value: 'inactive', label: 'Inativo' },
                { value: 'out_of_stock', label: 'Sem Estoque' }
              ]}
              value={formData?.status}
              onChange={(value) => handleInputChange('status', value)}
            />
          </div>
        </div>

        {/* Shipping Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Informações de Envio</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              label="Peso (kg)"
              type="number"
              step="0.01"
              min="0"
              value={formData?.weight}
              onChange={(e) => handleInputChange('weight', e?.target?.value)}
              placeholder="0,00"
            />

            <Input
              label="Comprimento (cm)"
              type="number"
              step="0.1"
              min="0"
              value={formData?.dimensions?.length}
              onChange={(e) => handleDimensionChange('length', e?.target?.value)}
              placeholder="0,0"
            />

            <Input
              label="Largura (cm)"
              type="number"
              step="0.1"
              min="0"
              value={formData?.dimensions?.width}
              onChange={(e) => handleDimensionChange('width', e?.target?.value)}
              placeholder="0,0"
            />

            <Input
              label="Altura (cm)"
              type="number"
              step="0.1"
              min="0"
              value={formData?.dimensions?.height}
              onChange={(e) => handleDimensionChange('height', e?.target?.value)}
              placeholder="0,0"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Opções de Entrega</label>
              <div className="space-y-2">
                <Checkbox
                  label="Disponível para entrega"
                  checked={formData?.availableForDelivery}
                  onChange={(e) => handleInputChange('availableForDelivery', e?.target?.checked)}
                />
                <Checkbox
                  label="Disponível para retirada"
                  checked={formData?.availableForPickup}
                  onChange={(e) => handleInputChange('availableForPickup', e?.target?.checked)}
                />
              </div>
            </div>

            <Select
              label="Tempo de Processamento"
              options={processingTimeOptions}
              value={formData?.processingTime}
              onChange={(value) => handleInputChange('processingTime', value)}
            />
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Tags e Palavras-chave</h3>
          
          <div className="flex flex-wrap gap-2 mb-2">
            {formData?.tags?.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-sm rounded-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 hover:text-destructive transition-colors duration-150"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            ))}
          </div>

          <div className="flex space-x-2">
            <Input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e?.target?.value)}
              placeholder="Digite uma tag"
              onKeyPress={(e) => e?.key === 'Enter' && (e?.preventDefault(), addTag())}
            />
            <Button type="button" variant="outline" onClick={addTag}>
              Adicionar
            </Button>
          </div>
        </div>

        {/* SEO */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">SEO (Otimização para Busca)</h3>
          
          <Input
            label="Título SEO"
            type="text"
            value={formData?.seoTitle}
            onChange={(e) => handleInputChange('seoTitle', e?.target?.value)}
            placeholder="Título otimizado para busca"
            description="Recomendado: 50-60 caracteres"
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Descrição SEO
            </label>
            <textarea
              value={formData?.seoDescription}
              onChange={(e) => handleInputChange('seoDescription', e?.target?.value)}
              className="w-full p-3 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              rows={3}
              placeholder="Descrição otimizada para motores de busca"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Recomendado: 150-160 caracteres
            </p>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-border">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" loading={isLoading}>
            {product ? 'Atualizar Produto' : 'Criar Produto'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;