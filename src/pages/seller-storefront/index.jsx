import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import BusinessHeader from './components/BusinessHeader';
import ProductCatalog from './components/ProductCatalog';
import BusinessInfo from './components/BusinessInfo';
import CustomerReviews from './components/CustomerReviews';
import RelatedBusinesses from './components/RelatedBusinesses';

const SellerStorefront = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('products');
  const [isLoading, setIsLoading] = useState(true);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  // Mock business data
  const businessData = {
    id: searchParams?.get('id') || 'padaria-do-joao',
    name: "Padaria do João",
    description: "Padaria tradicional com pães frescos, doces caseiros e café especial. Atendemos a comunidade há mais de 15 anos.",
    fullDescription: `A Padaria do João é um negócio familiar que começou em 2008 com o sonho de oferecer produtos de panificação de alta qualidade para nossa comunidade. Utilizamos ingredientes selecionados e receitas tradicionais passadas de geração em geração.\n\nNossos pães são assados frescos diariamente, e nossos doces são preparados com muito carinho pela nossa equipe. Além disso, servimos café especial de produtores locais e oferecemos opções para café da manhã e lanche da tarde.\n\nEstamos comprometidos em apoiar a economia local e manter os preços acessíveis para todas as famílias do bairro.`,
    logo: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop&crop=center",
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop&crop=center",
    rating: 4.7,
    reviewCount: 234,
    isVerified: true,
    isPremium: true,
    address: "Rua das Flores, 123 - Vila Madalena",
    fullAddress: "Rua das Flores, 123 - Vila Madalena, São Paulo - SP, 05433-000",
    distance: "0.8 km",
    phone: "(11) 99999-8888",
    whatsapp: "(11) 99999-8888",
    email: "contato@padariadojoao.com.br",
    website: "www.padariadojoao.com.br",
    coordinates: {
      lat: -23.5505,
      lng: -46.6333
    },
    productCount: 87,
    yearsInBusiness: 15,
    responseTime: "< 1h",
    deliveryZones: 8,
    operatingHours: [
      { open: "07:00", close: "19:00", closed: false }, // Sunday
      { open: "06:00", close: "20:00", closed: false }, // Monday
      { open: "06:00", close: "20:00", closed: false }, // Tuesday
      { open: "06:00", close: "20:00", closed: false }, // Wednesday
      { open: "06:00", close: "20:00", closed: false }, // Thursday
      { open: "06:00", close: "20:00", closed: false }, // Friday
      { open: "06:00", close: "19:00", closed: false }, // Saturday
    ],
    specialHours: "Durante feriados, funcionamos das 07:00 às 15:00. Consulte nosso WhatsApp para horários especiais.",
    services: [
      "Pães frescos diários",
      "Doces e salgados caseiros",
      "Café especial",
      "Encomendas personalizadas",
      "Bolos de aniversário",
      "Café da manhã completo",
      "Delivery local",
      "Retirada no local"
    ],
    specialties: [
      "Pão francês",
      "Pão de açúcar",
      "Croissants",
      "Brigadeiros gourmet",
      "Café especial",
      "Bolos caseiros"
    ],
    certifications: [
      "Certificado de Boas Práticas - ANVISA",
      "Selo de Qualidade Municipal",
      "Certificação Orgânica - Café"
    ],
    deliveryOptions: [
      {
        type: "pickup",
        name: "Retirada no Local",
        description: "Retire seu pedido diretamente na padaria",
        price: 0
      },
      {
        type: "delivery",
        name: "Entrega Local",
        description: "Entregamos em um raio de 3km",
        price: 5.00
      },
      {
        type: "express",
        name: "Entrega Expressa",
        description: "Entrega em até 30 minutos",
        price: 8.00
      }
    ],
    deliveryZonesList: [
      { area: "Vila Madalena", fee: 0 },
      { area: "Pinheiros", fee: 3.00 },
      { area: "Jardins", fee: 5.00 },
      { area: "Consolação", fee: 5.00 },
      { area: "Perdizes", fee: 6.00 },
      { area: "Barra Funda", fee: 7.00 },
      { area: "Santa Cecília", fee: 8.00 },
      { area: "República", fee: 10.00 }
    ],
    estimatedDeliveryTime: "30-45 minutos para entrega local, 15-30 minutos para retirada"
  };

  // Mock products data
  const products = [
    {
      id: 1,
      name: "Pão Francês Tradicional",
      price: 0.75,
      originalPrice: null,
      images: ["https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=400&fit=crop&crop=center"],
      category: "paes",
      availability: "available",
      featured: true,
      isNew: false,
      discount: 0,
      views: 1250,
      deliveryOptions: ["pickup", "delivery"],
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      name: "Croissant de Chocolate",
      price: 4.50,
      originalPrice: 5.00,
      images: ["https://images.unsplash.com/photo-1555507036-ab794f4ade2a?w=400&h=400&fit=crop&crop=center"],
      category: "doces",
      availability: "available",
      featured: true,
      isNew: true,
      discount: 10,
      views: 890,
      deliveryOptions: ["pickup", "delivery"],
      createdAt: "2024-01-20"
    },
    {
      id: 3,
      name: "Bolo de Chocolate Caseiro",
      price: 35.00,
      originalPrice: null,
      images: ["https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop&crop=center"],
      category: "bolos",
      availability: "limited",
      featured: false,
      isNew: false,
      discount: 0,
      views: 567,
      deliveryOptions: ["pickup", "delivery"],
      createdAt: "2024-01-10"
    },
    {
      id: 4,
      name: "Café Especial - Grão Selecionado",
      price: 12.90,
      originalPrice: null,
      images: ["https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop&crop=center"],
      category: "bebidas",
      availability: "available",
      featured: true,
      isNew: false,
      discount: 0,
      views: 723,
      deliveryOptions: ["pickup", "delivery"],
      createdAt: "2024-01-05"
    },
    {
      id: 5,
      name: "Brigadeiro Gourmet (12 unidades)",
      price: 24.00,
      originalPrice: 28.00,
      images: ["https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop&crop=center"],
      category: "doces",
      availability: "available",
      featured: false,
      isNew: true,
      discount: 15,
      views: 445,
      deliveryOptions: ["pickup", "delivery"],
      createdAt: "2024-01-18"
    },
    {
      id: 6,
      name: "Pão de Açúcar Integral",
      price: 8.50,
      originalPrice: null,
      images: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop&crop=center"],
      category: "paes",
      availability: "available",
      featured: false,
      isNew: false,
      discount: 0,
      views: 334,
      deliveryOptions: ["pickup", "delivery"],
      createdAt: "2024-01-12"
    }
  ];

  // Mock categories
  const categories = [
    { id: "paes", name: "Pães" },
    { id: "doces", name: "Doces" },
    { id: "bolos", name: "Bolos" },
    { id: "bebidas", name: "Bebidas" },
    { id: "salgados", name: "Salgados" }
  ];

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      customerName: "Maria Silva",
      customerAvatar: "https://randomuser.me/api/portraits/women/1.jpg",
      rating: 5,
      comment: "Excelente padaria! Os pães são sempre frescos e o atendimento é muito bom. O croissant de chocolate é o melhor da região. Recomendo muito!",
      date: "2024-01-10",
      verified: true,
      helpfulCount: 12,
      productName: "Croissant de Chocolate",
      images: [],
      sellerResponse: {
        message: "Muito obrigado pelo carinho, Maria! Ficamos felizes em saber que você gosta dos nossos produtos. Esperamos você sempre!",
        date: "2024-01-11"
      }
    },
    {
      id: 2,
      customerName: "João Santos",
      customerAvatar: "https://randomuser.me/api/portraits/men/2.jpg",
      rating: 4,
      comment: "Boa padaria, produtos de qualidade e preços justos. O café é muito bom. Única observação é que às vezes demora um pouco para ser atendido nos horários de pico.",
      date: "2024-01-08",
      verified: true,
      helpfulCount: 8,
      productName: "Café Especial",
      images: []
    },
    {
      id: 3,
      customerName: "Ana Costa",
      customerAvatar: "https://randomuser.me/api/portraits/women/3.jpg",
      rating: 5,
      comment: "Adoro esta padaria! Faço encomendas de bolos para aniversários e sempre fico satisfeita. O bolo de chocolate é divino e o preço é muito bom.",
      date: "2024-01-05",
      verified: true,
      helpfulCount: 15,
      productName: "Bolo de Chocolate Caseiro",
      images: ["https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100&h=100&fit=crop&crop=center"]
    }
  ];

  // Mock related businesses
  const relatedBusinesses = [
    {
      id: "cafeteria-central",
      name: "Cafeteria Central",
      description: "Café especial e lanches rápidos no centro da cidade",
      logo: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=100&h=100&fit=crop&crop=center",
      coverImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=200&fit=crop&crop=center",
      rating: 4.5,
      reviewCount: 156,
      distance: "1.2 km",
      productCount: 45,
      isOpen: true,
      isVerified: true,
      isPremium: false
    },
    {
      id: "doceria-da-vovo",
      name: "Doceria da Vovó",
      description: "Doces tradicionais e bolos caseiros feitos com amor",
      logo: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=100&h=100&fit=crop&crop=center",
      coverImage: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=200&fit=crop&crop=center",
      rating: 4.8,
      reviewCount: 89,
      distance: "0.9 km",
      productCount: 32,
      isOpen: false,
      isVerified: true,
      isPremium: true
    },
    {
      id: "mercadinho-do-bairro",
      name: "Mercadinho do Bairro",
      description: "Produtos frescos e itens essenciais para o dia a dia",
      logo: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&h=100&fit=crop&crop=center",
      coverImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=200&fit=crop&crop=center",
      rating: 4.3,
      reviewCount: 203,
      distance: "1.5 km",
      productCount: 156,
      isOpen: true,
      isVerified: false,
      isPremium: false
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleContactClick = () => {
    setShowWhatsAppModal(true);
  };

  const handleProductClick = (product) => {
    navigate(`/product-details?id=${product?.id}&seller=${businessData?.id}`);
  };

  const handleContactSeller = (product) => {
    const message = `Olá! Tenho interesse no produto "${product?.name}" que vi na sua loja no Lookali. Poderia me dar mais informações?`;
    const whatsappURL = `https://wa.me/5511999998888?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  const sections = [
    { id: 'products', label: 'Produtos', icon: 'Package' },
    { id: 'about', label: 'Sobre', icon: 'Info' },
    { id: 'reviews', label: 'Avaliações', icon: 'Star' },
    { id: 'related', label: 'Relacionados', icon: 'Store' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando loja...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Business Header */}
      <BusinessHeader 
        businessData={businessData}
        onContactClick={handleContactClick}
      />
      {/* Navigation Tabs */}
      <div className="sticky top-16 z-40 bg-background border-b border-border">
        <div className="px-4 lg:px-6">
          <div className="flex overflow-x-auto">
            {sections?.map(section => (
              <button
                key={section?.id}
                onClick={() => setActiveSection(section?.id)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-150 border-b-2 ${
                  activeSection === section?.id
                    ? 'text-primary border-primary' :'text-muted-foreground border-transparent hover:text-foreground'
                }`}
              >
                <Icon name={section?.icon} size={16} />
                <span>{section?.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="py-6">
        {activeSection === 'products' && (
          <ProductCatalog
            products={products}
            categories={categories}
            onProductClick={handleProductClick}
            onContactSeller={handleContactSeller}
          />
        )}

        {activeSection === 'about' && (
          <div className="px-4 lg:px-6">
            <BusinessInfo businessData={businessData} />
          </div>
        )}

        {activeSection === 'reviews' && (
          <div className="px-4 lg:px-6">
            <CustomerReviews
              reviews={reviews}
              averageRating={businessData?.rating}
              totalReviews={businessData?.reviewCount}
            />
          </div>
        )}

        {activeSection === 'related' && (
          <div className="px-4 lg:px-6">
            <RelatedBusinesses
              businesses={relatedBusinesses}
              currentBusinessId={businessData?.id}
            />
          </div>
        )}
      </div>
      {/* WhatsApp Contact Modal */}
      {showWhatsAppModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-popover border border-border rounded-lg shadow-warm-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Icon name="MessageCircle" size={20} color="var(--color-success)" />
                  <span className="font-medium text-foreground">Contatar via WhatsApp</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowWhatsAppModal(false)}
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>

              <div className="mb-4 p-3 bg-muted rounded-md">
                <div className="text-sm font-medium text-foreground">{businessData?.name}</div>
                <div className="text-xs text-muted-foreground">{businessData?.whatsapp}</div>
              </div>

              <div className="space-y-3">
                <Button
                  variant="default"
                  fullWidth
                  iconName="MessageCircle"
                  iconPosition="left"
                  onClick={() => {
                    const message = "Olá! Vi sua loja no Lookali e gostaria de saber mais informações sobre seus produtos.";
                    const whatsappURL = `https://wa.me/5511999998888?text=${encodeURIComponent(message)}`;
                    window.open(whatsappURL, '_blank');
                    setShowWhatsAppModal(false);
                  }}
                >
                  Enviar Mensagem Geral
                </Button>

                <Button
                  variant="outline"
                  fullWidth
                  iconName="Package"
                  iconPosition="left"
                  onClick={() => {
                    const message = "Olá! Gostaria de fazer um pedido. Quais produtos vocês têm disponíveis hoje?";
                    const whatsappURL = `https://wa.me/5511999998888?text=${encodeURIComponent(message)}`;
                    window.open(whatsappURL, '_blank');
                    setShowWhatsAppModal(false);
                  }}
                >
                  Fazer Pedido
                </Button>

                <Button
                  variant="ghost"
                  fullWidth
                  iconName="MapPin"
                  iconPosition="left"
                  onClick={() => {
                    const message = "Olá! Gostaria de confirmar o endereço e horário de funcionamento para uma visita.";
                    const whatsappURL = `https://wa.me/5511999998888?text=${encodeURIComponent(message)}`;
                    window.open(whatsappURL, '_blank');
                    setShowWhatsAppModal(false);
                  }}
                >
                  Informações da Loja
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Floating Action Button - Mobile */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <Button
          onClick={handleContactClick}
          className="w-14 h-14 rounded-full bg-success hover:bg-success/90 text-success-foreground shadow-warm-lg"
          size="icon"
        >
          <Icon name="MessageCircle" size={24} />
        </Button>
      </div>
    </div>
  );
};

export default SellerStorefront;