import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import SearchContextBreadcrumb from '../../components/ui/SearchContextBreadcrumb';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import SellerInfo from './components/SellerInfo';
import DeliveryCalculator from './components/DeliveryCalculator';
import ProductActions from './components/ProductActions';
import ProductMap from './components/ProductMap';
import RelatedProducts from './components/RelatedProducts';
import WhatsAppBridge from '../../components/ui/WhatsAppBridge';

const ProductDetails = () => {
  const location = useLocation();
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(null);
  const [searchContext, setSearchContext] = useState({});

  // Mock product data
  const mockProduct = {
    id: "prod_001",
    name: "Fone de Ouvido Bluetooth Premium",
    price: 299.90,
    originalPrice: 399.90,
    category: "Eletrônicos",
    brand: "TechSound",
    model: "TS-BT500",
    condition: "Novo",
    availability: "available",
    stock: 5,
    description: `Fone de ouvido Bluetooth de alta qualidade com cancelamento de ruído ativo e bateria de longa duração.\n\nCaracterísticas principais:\n• Cancelamento de ruído ativo\n• Bateria de até 30 horas\n• Conexão Bluetooth 5.0\n• Driver de 40mm para áudio premium\n• Microfone integrado para chamadas\n• Design confortável e dobrável\n\nIdeal para uso profissional, estudos ou entretenimento. Acompanha case de transporte e cabo USB-C para carregamento.`,
    specifications: {
      "Conectividade": "Bluetooth 5.0, Cabo P2 3.5mm",
      "Bateria": "30 horas de reprodução",
      "Drivers": "40mm Neodímio",
      "Peso": "250g",
      "Garantia": "12 meses",
      "Cor": "Preto Fosco"
    },
    tags: ["bluetooth", "cancelamento de ruído", "premium", "longa duração"],
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?w=800&h=600&fit=crop',
      'https://images.pixabay.com/photo/2017/08/06/12/06/people-2591874_1280.jpg?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=600&fit=crop'
    ]
  };

  const mockSeller = {
    id: "seller_001",
    name: "Maria Silva",
    businessName: "TechStore SP",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    rating: 4.8,
    reviewCount: 127,
    location: "Vila Madalena, São Paulo - SP",
    distance: "1.2 km",
    verified: true,
    memberSince: "2022-03-15",
    responseTime: "Responde em até 2 horas",
    businessHours: {
      monday: "09:00 - 18:00",
      tuesday: "09:00 - 18:00",
      wednesday: "09:00 - 18:00",
      thursday: "09:00 - 18:00",
      friday: "09:00 - 18:00",
      saturday: "09:00 - 15:00",
      sunday: "Fechado"
    },
    isOnline: true,
    totalProducts: 45,
    completedSales: 89,
    whatsapp: "+55 11 99999-8888",
    coordinates: {
      lat: -23.5505,
      lng: -46.6333
    }
  };

  useEffect(() => {
    // Simulate getting search context from navigation state or URL params
    const contextFromState = location?.state?.searchContext || {};
    setSearchContext({
      query: "fone bluetooth",
      location: "São Paulo, SP",
      radius: "5km",
      category: "Eletrônicos",
      resultCount: 1,
      searchTime: 245,
      ...contextFromState
    });

    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [location]);

  const handleRemoveFilter = (filterType, filterValue) => {
    // Handle filter removal - would typically navigate back to search results
    console.log('Remove filter:', filterType, filterValue);
  };

  const handleClearAllFilters = () => {
    // Handle clearing all filters - would typically navigate back to search results
    console.log('Clear all filters');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Search Context Breadcrumb */}
      <SearchContextBreadcrumb
        searchContext={searchContext}
        onRemoveFilter={handleRemoveFilter}
        onClearAll={handleClearAllFilters}
      />
      <main className="container mx-auto px-4 lg:px-6 py-6">
        {/* Product Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Product Images & Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Product Images */}
            <ProductImageGallery 
              images={mockProduct?.images}
              productName={mockProduct?.name}
            />

            {/* Product Information - Mobile */}
            <div className="lg:hidden">
              <ProductInfo product={mockProduct} />
            </div>

            {/* Delivery Calculator */}
            <DeliveryCalculator 
              productInfo={mockProduct}
              sellerLocation={mockSeller?.location}
            />

            {/* Product Map */}
            <ProductMap 
              sellerLocation={{
                address: mockSeller?.location,
                coordinates: mockSeller?.coordinates,
                businessName: mockSeller?.businessName,
                distance: mockSeller?.distance
              }}
            />
          </div>

          {/* Right Column - Product Info & Actions */}
          <div className="space-y-6">
            {/* Product Information - Desktop */}
            <div className="hidden lg:block">
              <ProductInfo product={mockProduct} />
            </div>

            {/* Seller Information */}
            <SellerInfo seller={mockSeller} />

            {/* Product Actions */}
            <ProductActions 
              product={mockProduct}
              seller={mockSeller}
              selectedDeliveryOption={selectedDeliveryOption}
            />
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <RelatedProducts 
            currentProductId={mockProduct?.id}
            sellerId={mockSeller?.id}
            category={mockProduct?.category}
          />
        </div>
      </main>
      {/* Floating WhatsApp Bridge */}
      <WhatsAppBridge
        productInfo={mockProduct}
        sellerInfo={mockSeller}
        messageType="product_inquiry"
        variant="floating"
      />
    </div>
  );
};

export default ProductDetails;