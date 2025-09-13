import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import ProductCard from './components/ProductCard';
import ProductTable from './components/ProductTable';
import ProductForm from './components/ProductForm';
import BulkActions from './components/BulkActions';
import ProductFilters from './components/ProductFilters';
import ProductStats from './components/ProductStats';

const ProductManagement = () => {
  const [viewMode, setViewMode] = useState('table'); // table or grid
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('updatedAt');
  const [sortOrder, setSortOrder] = useState('desc');
  
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    stockLevel: '',
    priceRange: { min: '', max: '' },
    lowStock: false,
    hasImages: false,
    recentlyUpdated: false
  });

  // Mock data for products
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Smartphone Samsung Galaxy A54",
      description: "Smartphone com tela de 6.4 polegadas, câmera tripla de 50MP e bateria de 5000mAh. Ideal para uso diário com excelente qualidade de imagem.",
      price: 1299.99,
      stock: 15,
      category: "electronics",
      status: "active",
      images: [
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop"
      ],
      sku: "SAMS-A54-128",
      weight: 0.202,
      dimensions: { length: 15.8, width: 7.6, height: 0.82 },
      tags: ["smartphone", "samsung", "android", "5g"],
      seoTitle: "Samsung Galaxy A54 - Smartphone 5G com Câmera Tripla",
      seoDescription: "Compre o Samsung Galaxy A54 com tela Super AMOLED, câmera de 50MP e bateria de longa duração. Entrega rápida e garantia oficial.",
      availableForDelivery: true,
      availableForPickup: true,
      processingTime: "1-2",
      createdAt: "2025-01-10T10:00:00Z",
      updatedAt: "2025-01-12T14:30:00Z"
    },
    {
      id: 2,
      name: "Camiseta Básica Algodão",
      description: "Camiseta 100% algodão, confortável e durável. Disponível em várias cores e tamanhos. Perfeita para o dia a dia.",
      price: 39.90,
      stock: 3,
      category: "clothing",
      status: "active",
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop"
      ],
      sku: "CAM-BAS-001",
      weight: 0.15,
      dimensions: { length: 30, width: 25, height: 0.5 },
      tags: ["camiseta", "algodão", "básica", "casual"],
      seoTitle: "Camiseta Básica 100% Algodão - Conforto e Qualidade",
      seoDescription: "Camiseta básica de algodão premium, macia e resistente. Ideal para compor looks casuais com muito conforto.",
      availableForDelivery: true,
      availableForPickup: true,
      processingTime: "1-2",
      createdAt: "2025-01-08T09:15:00Z",
      updatedAt: "2025-01-11T16:45:00Z"
    },
    {
      id: 3,
      name: "Cafeteira Elétrica Philco",
      description: "Cafeteira elétrica com capacidade para 30 xícaras, sistema corta-pingos e placa aquecedora. Ideal para casa e escritório.",
      price: 189.90,
      stock: 0,
      category: "home",
      status: "out_of_stock",
      images: [
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop"
      ],
      sku: "CAF-PHI-30X",
      weight: 1.2,
      dimensions: { length: 25, width: 18, height: 32 },
      tags: ["cafeteira", "philco", "elétrica", "30 xícaras"],
      seoTitle: "Cafeteira Elétrica Philco 30 Xícaras - Café Sempre Quente",
      seoDescription: "Cafeteira elétrica Philco com capacidade para 30 xícaras, placa aquecedora e sistema anti-gotejamento.",
      availableForDelivery: true,
      availableForPickup: false,
      processingTime: "3-5",
      createdAt: "2025-01-05T11:20:00Z",
      updatedAt: "2025-01-09T13:10:00Z"
    },
    {
      id: 4,
      name: "Shampoo Hidratante 400ml",
      description: "Shampoo hidratante para cabelos secos e danificados. Fórmula com óleo de argan e vitamina E para nutrição profunda.",
      price: 24.90,
      stock: 45,
      category: "beauty",
      status: "active",
      images: [
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop"
      ],
      sku: "SHA-HID-400",
      weight: 0.45,
      dimensions: { length: 20, width: 6, height: 6 },
      tags: ["shampoo", "hidratante", "argan", "cabelo"],
      seoTitle: "Shampoo Hidratante com Óleo de Argan 400ml",
      seoDescription: "Shampoo hidratante premium com óleo de argan e vitamina E. Ideal para cabelos secos e danificados.",
      availableForDelivery: true,
      availableForPickup: true,
      processingTime: "1-2",
      createdAt: "2025-01-07T14:30:00Z",
      updatedAt: "2025-01-10T09:20:00Z"
    },
    {
      id: 5,
      name: "Tênis Esportivo Nike Air",
      description: "Tênis esportivo Nike com tecnologia Air para máximo conforto e performance. Ideal para corrida e atividades físicas.",
      price: 299.90,
      stock: 8,
      category: "sports",
      status: "active",
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop"
      ],
      sku: "TEN-NIK-AIR",
      weight: 0.8,
      dimensions: { length: 32, width: 12, height: 10 },
      tags: ["tênis", "nike", "esportivo", "corrida"],
      seoTitle: "Tênis Nike Air - Conforto e Performance para Esportes",
      seoDescription: "Tênis esportivo Nike com tecnologia Air, ideal para corrida e treinos. Máximo conforto e durabilidade.",
      availableForDelivery: true,
      availableForPickup: true,
      processingTime: "1-2",
      createdAt: "2025-01-06T16:45:00Z",
      updatedAt: "2025-01-11T11:30:00Z"
    },
    {
      id: 6,
      name: "Livro: O Poder do Hábito",
      description: "Livro bestseller sobre como os hábitos funcionam e como podemos transformá-los. Autor: Charles Duhigg.",
      price: 34.90,
      stock: 12,
      category: "books",
      status: "inactive",
      images: [
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop"
      ],
      sku: "LIV-HAB-001",
      weight: 0.3,
      dimensions: { length: 23, width: 16, height: 2 },
      tags: ["livro", "hábitos", "autoajuda", "bestseller"],
      seoTitle: "O Poder do Hábito - Charles Duhigg | Livro Bestseller",
      seoDescription: "Descubra como transformar sua vida através dos hábitos. Livro bestseller de Charles Duhigg sobre psicologia comportamental.",
      availableForDelivery: true,
      availableForPickup: true,
      processingTime: "1-2",
      createdAt: "2025-01-04T12:00:00Z",
      updatedAt: "2025-01-08T15:20:00Z"
    }
  ]);

  // Mock stats data
  const stats = {
    totalProducts: products?.length,
    activeProducts: products?.filter(p => p?.status === 'active')?.length,
    lowStockProducts: products?.filter(p => p?.stock <= 5 && p?.stock > 0)?.length,
    outOfStockProducts: products?.filter(p => p?.stock === 0)?.length,
    totalProductsChange: +2,
    activeProductsChange: +1,
    lowStockChange: -1,
    outOfStockChange: 0
  };

  // Filter and sort products
  const getFilteredProducts = () => {
    let filtered = [...products];

    // Apply search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(product =>
        product?.name?.toLowerCase()?.includes(searchTerm) ||
        product?.description?.toLowerCase()?.includes(searchTerm) ||
        product?.sku?.toLowerCase()?.includes(searchTerm) ||
        product?.tags?.some(tag => tag?.toLowerCase()?.includes(searchTerm))
      );
    }

    // Apply category filter
    if (filters?.category) {
      filtered = filtered?.filter(product => product?.category === filters?.category);
    }

    // Apply status filter
    if (filters?.status) {
      filtered = filtered?.filter(product => product?.status === filters?.status);
    }

    // Apply stock level filter
    if (filters?.stockLevel) {
      switch (filters?.stockLevel) {
        case 'low':
          filtered = filtered?.filter(product => product?.stock <= 5 && product?.stock > 0);
          break;
        case 'medium':
          filtered = filtered?.filter(product => product?.stock > 5 && product?.stock <= 20);
          break;
        case 'high':
          filtered = filtered?.filter(product => product?.stock > 20);
          break;
        case 'zero':
          filtered = filtered?.filter(product => product?.stock === 0);
          break;
      }
    }

    // Apply price range filter
    if (filters?.priceRange?.min || filters?.priceRange?.max) {
      const min = parseFloat(filters?.priceRange?.min) || 0;
      const max = parseFloat(filters?.priceRange?.max) || Infinity;
      filtered = filtered?.filter(product => product?.price >= min && product?.price <= max);
    }

    // Apply additional filters
    if (filters?.lowStock) {
      filtered = filtered?.filter(product => product?.stock <= 5);
    }

    if (filters?.hasImages) {
      filtered = filtered?.filter(product => product?.images && product?.images?.length > 0);
    }

    if (filters?.recentlyUpdated) {
      const sevenDaysAgo = new Date();
      sevenDaysAgo?.setDate(sevenDaysAgo?.getDate() - 7);
      filtered = filtered?.filter(product => new Date(product.updatedAt) >= sevenDaysAgo);
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      let aValue = a?.[sortBy];
      let bValue = b?.[sortBy];

      if (sortBy === 'price' || sortBy === 'stock') {
        aValue = parseFloat(aValue) || 0;
        bValue = parseFloat(bValue) || 0;
      } else if (sortBy === 'updatedAt' || sortBy === 'createdAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  const handleProductSave = (productData) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (editingProduct) {
        // Update existing product
        setProducts(prev => prev?.map(p => 
          p?.id === editingProduct?.id 
            ? { ...productData, id: editingProduct?.id, updatedAt: new Date()?.toISOString() }
            : p
        ));
      } else {
        // Create new product
        const newProduct = {
          ...productData,
          id: Date.now(),
          createdAt: new Date()?.toISOString(),
          updatedAt: new Date()?.toISOString()
        };
        setProducts(prev => [newProduct, ...prev]);
      }
      
      setShowProductForm(false);
      setEditingProduct(null);
      setIsLoading(false);
    }, 1000);
  };

  const handleProductEdit = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleProductDelete = (product) => {
    if (window.confirm(`Tem certeza que deseja excluir "${product?.name}"?`)) {
      setProducts(prev => prev?.filter(p => p?.id !== product?.id));
      setSelectedProducts(prev => prev?.filter(id => id !== product?.id));
    }
  };

  const handleProductToggleStatus = (product) => {
    const newStatus = product?.status === 'active' ? 'inactive' : 'active';
    setProducts(prev => prev?.map(p => 
      p?.id === product?.id 
        ? { ...p, status: newStatus, updatedAt: new Date()?.toISOString() }
        : p
    ));
  };

  const handleProductViewDetails = (product) => {
    // Navigate to product details or open modal
    console.log('View product details:', product);
  };

  const handleSelectProduct = (productId, selected) => {
    if (selected) {
      setSelectedProducts(prev => [...prev, productId]);
    } else {
      setSelectedProducts(prev => prev?.filter(id => id !== productId));
    }
  };

  const handleSelectAll = (selected) => {
    if (selected) {
      setSelectedProducts(filteredProducts?.map(p => p?.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleBulkAction = (action, data) => {
    switch (action) {
      case 'delete':
        if (window.confirm(`Excluir ${data?.productIds?.length} produto(s)?`)) {
          setProducts(prev => prev?.filter(p => !data?.productIds?.includes(p?.id)));
          setSelectedProducts([]);
        }
        break;
      case 'activate':
        setProducts(prev => prev?.map(p => 
          data?.productIds?.includes(p?.id) 
            ? { ...p, status: 'active', updatedAt: new Date()?.toISOString() }
            : p
        ));
        break;
      case 'deactivate':
        setProducts(prev => prev?.map(p => 
          data?.productIds?.includes(p?.id) 
            ? { ...p, status: 'inactive', updatedAt: new Date()?.toISOString() }
            : p
        ));
        break;
      case 'updatePrices':
        setProducts(prev => prev?.map(p => {
          if (data?.productIds?.includes(p?.id)) {
            let newPrice = p?.price;
            if (data?.priceChange?.type === 'percentage') {
              const multiplier = data?.priceChange?.operation === 'increase' 
                ? (1 + data?.priceChange?.value / 100)
                : (1 - data?.priceChange?.value / 100);
              newPrice = p?.price * multiplier;
            } else {
              newPrice = data?.priceChange?.operation === 'increase'
                ? p?.price + data?.priceChange?.value
                : p?.price - data?.priceChange?.value;
            }
            return { ...p, price: Math.max(0, newPrice), updatedAt: new Date()?.toISOString() };
          }
          return p;
        }));
        break;
      case 'updateCategory':
        setProducts(prev => prev?.map(p => 
          data?.productIds?.includes(p?.id) 
            ? { ...p, category: data?.category, updatedAt: new Date()?.toISOString() }
            : p
        ));
        break;
      case 'updateStatus':
        setProducts(prev => prev?.map(p => 
          data?.productIds?.includes(p?.id) 
            ? { ...p, status: data?.status, updatedAt: new Date()?.toISOString() }
            : p
        ));
        break;
      case 'export':
        // Simulate export functionality
        console.log('Exporting products:', data?.productIds);
        break;
    }
  };

  const handleSort = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setSelectedProducts([]); // Clear selection when filters change
  };

  const handleClearFilters = () => {
    setSelectedProducts([]);
  };

  if (showProductForm) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-6">
          <ProductForm
            product={editingProduct}
            onSave={handleProductSave}
            onCancel={() => {
              setShowProductForm(false);
              setEditingProduct(null);
            }}
            isLoading={isLoading}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Gerenciamento de Produtos
            </h1>
            <p className="text-muted-foreground">
              Gerencie seu catálogo de produtos de forma profissional
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <div className="flex items-center space-x-1 bg-muted rounded-md p-1">
              <Button
                variant={viewMode === 'table' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('table')}
                iconName="List"
              >
                Tabela
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                iconName="Grid3X3"
              >
                Grade
              </Button>
            </div>
            
            <Button
              onClick={() => setShowProductForm(true)}
              iconName="Plus"
              iconPosition="left"
            >
              Novo Produto
            </Button>
          </div>
        </div>

        {/* Stats */}
        <ProductStats stats={stats} />

        {/* Filters */}
        <ProductFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClearFilters={handleClearFilters}
        />

        {/* Bulk Actions */}
        <BulkActions
          selectedProducts={selectedProducts}
          onBulkAction={handleBulkAction}
          onClearSelection={() => setSelectedProducts([])}
          totalProducts={filteredProducts?.length}
        />

        {/* Products Display */}
        {viewMode === 'table' ? (
          <ProductTable
            products={filteredProducts}
            selectedProducts={selectedProducts}
            onSelectProduct={handleSelectProduct}
            onSelectAll={handleSelectAll}
            onEdit={handleProductEdit}
            onDelete={handleProductDelete}
            onToggleStatus={handleProductToggleStatus}
            onViewDetails={handleProductViewDetails}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts?.map((product) => (
              <ProductCard
                key={product?.id}
                product={product}
                onEdit={handleProductEdit}
                onDelete={handleProductDelete}
                onToggleStatus={handleProductToggleStatus}
                onViewDetails={handleProductViewDetails}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredProducts?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Package" size={64} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {products?.length === 0 ? 'Nenhum produto cadastrado' : 'Nenhum produto encontrado'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {products?.length === 0 
                ? 'Comece criando seu primeiro produto para aparecer nas buscas locais.'
                : 'Tente ajustar os filtros para encontrar os produtos desejados.'
              }
            </p>
            {products?.length === 0 && (
              <Button
                onClick={() => setShowProductForm(true)}
                iconName="Plus"
                iconPosition="left"
              >
                Criar Primeiro Produto
              </Button>
            )}
          </div>
        )}

        {/* Navigation Links */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/seller-storefront"
              className="flex items-center space-x-3 p-4 bg-card border border-border rounded-lg hover:shadow-warm-md transition-all duration-200"
            >
              <div className="p-2 bg-primary/10 rounded-md">
                <Icon name="Store" size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Minha Loja</h3>
                <p className="text-sm text-muted-foreground">Ver como os clientes veem sua loja</p>
              </div>
            </Link>

            <Link
              to="/message-center"
              className="flex items-center space-x-3 p-4 bg-card border border-border rounded-lg hover:shadow-warm-md transition-all duration-200"
            >
              <div className="p-2 bg-secondary/10 rounded-md">
                <Icon name="MessageCircle" size={20} color="var(--color-secondary)" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Mensagens</h3>
                <p className="text-sm text-muted-foreground">Conversar com clientes interessados</p>
              </div>
            </Link>

            <Link
              to="/product-search-results"
              className="flex items-center space-x-3 p-4 bg-card border border-border rounded-lg hover:shadow-warm-md transition-all duration-200"
            >
              <div className="p-2 bg-success/10 rounded-md">
                <Icon name="Search" size={20} color="var(--color-success)" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Buscar Produtos</h3>
                <p className="text-sm text-muted-foreground">Ver produtos de outros vendedores</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;