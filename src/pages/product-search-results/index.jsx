import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import SearchResultsHeader from './components/SearchResultsHeader';
import SearchContextBreadcrumb from '../../components/ui/SearchContextBreadcrumb';
import SearchFilters from './components/SearchFilters';
import ProductGrid from './components/ProductGrid';
import SearchResultsMap from './components/SearchResultsMap';
import WhatsAppBridge from '../../components/ui/WhatsAppBridge';

const ProductSearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [searchContext, setSearchContext] = useState({});

  // Filter state
  const [filters, setFilters] = useState({
    category: 'all',
    sortBy: 'relevance',
    radius: '5',
    availability: 'all',
    priceRange: { min: null, max: null },
    hasDelivery: false,
    hasPickup: false,
    promotedOnly: false
  });

  // Mock products data
  const mockProducts = [
    {
      id: 1,
      name: "iPhone 14 Pro Max 256GB Roxo Profundo",
      price: 6999.99,
      originalPrice: 7499.99,
      images: ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400"],
      seller: {
        id: 1,
        name: "Carlos Silva",
        businessName: "TechStore São Paulo",
        whatsapp: "+5511999887766",
        rating: 4.8,
        verified: true
      },
      distance: "1.2 km",
      availability: "available",
      rating: 4.9,
      reviewCount: 127,
      isPromoted: true,
      deliveryOptions: ["pickup", "delivery"],
      category: "Eletrônicos",
      location: { lat: -23.5505, lng: -46.6333 }
    },
    {
      id: 2,
      name: "Vestido Floral Midi Primavera/Verão",
      price: 89.90,
      images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400"],
      seller: {
        id: 2,
        name: "Maria Santos",
        businessName: "Boutique Elegance",
        whatsapp: "+5511988776655",
        rating: 4.6
      },
      distance: "800 m",
      availability: "limited",
      rating: 4.7,
      reviewCount: 89,
      isPromoted: false,
      deliveryOptions: ["pickup"],
      category: "Moda e Beleza"
    },
    {
      id: 3,
      name: "Conjunto de Panelas Antiaderente 5 Peças",
      price: 299.99,
      originalPrice: 399.99,
      images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400"],
      seller: {
        id: 3,
        name: "João Oliveira",
        businessName: "Casa & Cozinha",
        whatsapp: "+5511977665544",
        rating: 4.5
      },
      distance: "2.1 km",
      availability: "available",
      rating: 4.4,
      reviewCount: 203,
      isPromoted: false,
      deliveryOptions: ["pickup", "delivery"],
      category: "Casa e Jardim"
    },
    {
      id: 4,
      name: "Tênis Nike Air Max 270 Masculino",
      price: 449.90,
      images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"],
      seller: {
        id: 4,
        name: "Pedro Costa",
        businessName: "SportZone",
        whatsapp: "+5511966554433",
        rating: 4.7
      },
      distance: "1.8 km",
      availability: "available",
      rating: 4.6,
      reviewCount: 156,
      isPromoted: true,
      deliveryOptions: ["pickup", "delivery"],
      category: "Esportes e Lazer"
    },
    {
      id: 5,
      name: "Notebook Dell Inspiron 15 i5 8GB 256GB SSD",
      price: 2899.99,
      images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400"],
      seller: {
        id: 5,
        name: "Ana Ferreira",
        businessName: "InfoTech Solutions",
        whatsapp: "+5511955443322",
        rating: 4.9
      },
      distance: "3.2 km",
      availability: "available",
      rating: 4.8,
      reviewCount: 94,
      isPromoted: false,
      deliveryOptions: ["pickup", "delivery"],
      category: "Eletrônicos"
    },
    {
      id: 6,
      name: "Cafeteira Expresso Automática Premium",
      price: 1299.99,
      originalPrice: 1599.99,
      images: ["https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400"],
      seller: {
        id: 6,
        name: "Roberto Lima",
        businessName: "Café & Cia",
        whatsapp: "+5511944332211",
        rating: 4.3
      },
      distance: "2.7 km",
      availability: "limited",
      rating: 4.5,
      reviewCount: 67,
      isPromoted: false,
      deliveryOptions: ["pickup"],
      category: "Casa e Jardim"
    }
  ];

  useEffect(() => {
    // Initialize search context from URL params
    const query = searchParams?.get('q') || '';
    const location = searchParams?.get('location') || 'São Paulo, SP';
    const category = searchParams?.get('category') || 'all';
    
    setSearchContext({
      query,
      location,
      category,
      radius: filters?.radius + 'km',
      resultCount: mockProducts?.length,
      searchTime: Math.floor(Math.random() * 200) + 50
    });

    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, [searchParams, filters?.radius]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    
    // Update URL params
    const params = new URLSearchParams(searchParams);
    if (newFilters?.category !== 'all') {
      params?.set('category', newFilters?.category);
    } else {
      params?.delete('category');
    }
    if (newFilters?.sortBy !== 'relevance') {
      params?.set('sort', newFilters?.sortBy);
    } else {
      params?.delete('sort');
    }
    setSearchParams(params);

    // Simulate filtered results
    setLoading(true);
    setTimeout(() => {
      let filteredProducts = [...mockProducts];
      
      if (newFilters?.category !== 'all') {
        filteredProducts = filteredProducts?.filter(p => 
          p?.category?.toLowerCase()?.includes(newFilters?.category?.toLowerCase())
        );
      }
      
      if (newFilters?.availability !== 'all') {
        filteredProducts = filteredProducts?.filter(p => p?.availability === newFilters?.availability);
      }
      
      if (newFilters?.priceRange?.min) {
        filteredProducts = filteredProducts?.filter(p => p?.price >= newFilters?.priceRange?.min);
      }
      
      if (newFilters?.priceRange?.max) {
        filteredProducts = filteredProducts?.filter(p => p?.price <= newFilters?.priceRange?.max);
      }
      
      if (newFilters?.promotedOnly) {
        filteredProducts = filteredProducts?.filter(p => p?.isPromoted);
      }

      // Sort results
      switch (newFilters?.sortBy) {
        case 'price_low':
          filteredProducts?.sort((a, b) => a?.price - b?.price);
          break;
        case 'price_high':
          filteredProducts?.sort((a, b) => b?.price - a?.price);
          break;
        case 'distance':
          filteredProducts?.sort((a, b) => parseFloat(a?.distance) - parseFloat(b?.distance));
          break;
        case 'rating':
          filteredProducts?.sort((a, b) => b?.rating - a?.rating);
          break;
        default:
          // Keep original order for relevance
          break;
      }
      
      setProducts(filteredProducts);
      setSearchContext(prev => ({
        ...prev,
        resultCount: filteredProducts?.length,
        searchTime: Math.floor(Math.random() * 200) + 50
      }));
      setLoading(false);
    }, 500);
  };

  const handleClearFilters = () => {
    const defaultFilters = {
      category: 'all',
      sortBy: 'relevance',
      radius: '5',
      availability: 'all',
      priceRange: { min: null, max: null },
      hasDelivery: false,
      hasPickup: false,
      promotedOnly: false
    };
    setFilters(defaultFilters);
    
    // Clear URL params
    const params = new URLSearchParams(searchParams);
    params?.delete('category');
    params?.delete('sort');
    setSearchParams(params);
  };

  const handleLocationChange = (locationData) => {
    const params = new URLSearchParams(searchParams);
    params?.set('location', locationData?.location);
    setSearchParams(params);
    
    setSearchContext(prev => ({
      ...prev,
      location: locationData?.location,
      radius: locationData?.radius || prev?.radius
    }));
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      // In real app, this would load more products
      setHasMore(false);
      setLoading(false);
    }, 1000);
  };

  const handleRemoveFilter = (filterType, filterValue) => {
    const newFilters = { ...filters };
    
    switch (filterType) {
      case 'category':
        newFilters.category = 'all';
        break;
      case 'price':
        newFilters.priceRange = { min: null, max: null };
        break;
      case 'availability':
        newFilters.availability = 'all';
        break;
      default:
        break;
    }
    
    handleFiltersChange(newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SearchResultsHeader
        searchQuery={searchContext?.query}
        resultCount={searchContext?.resultCount}
        searchTime={searchContext?.searchTime}
        location={searchContext?.location}
        onLocationChange={handleLocationChange}
        onSearchChange={() => {}} // Add missing required prop
      />
      <SearchContextBreadcrumb
        searchContext={searchContext}
        onRemoveFilter={handleRemoveFilter}
        onClearAll={handleClearFilters}
      />
      <div className="container mx-auto px-4 lg:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <SearchFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
              className="sticky top-24"
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <ProductGrid
              products={products}
              loading={loading}
              selectedProduct={selectedProduct}
              onProductSelect={handleProductSelect}
              onLoadMore={handleLoadMore}
              hasMore={hasMore}
            />
          </div>

          {/* Map Sidebar */}
          <div className="lg:col-span-1">
            <SearchResultsMap
              products={products}
              selectedProduct={selectedProduct}
              onProductSelect={handleProductSelect}
              className="sticky top-24"
            />
          </div>
        </div>
      </div>
      {/* Floating WhatsApp */}
      <WhatsAppBridge
        variant="floating"
        messageType="general"
      />
    </div>
  );
};

export default ProductSearchResults;