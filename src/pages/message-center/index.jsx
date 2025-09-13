import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import ConversationList from './components/ConversationList';
import ConversationView from './components/ConversationView';
import MessageStats from './components/MessageStats';
import MessageFilters from './components/MessageFilters';
import AutomatedTemplates from './components/AutomatedTemplates';

const MessageCenter = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [userRole, setUserRole] = useState('seller');
  const [activeFilters, setActiveFilters] = useState({
    status: 'all',
    timeRange: 'all',
    deliveryType: 'all',
    priority: 'all'
  });
  const [showMobileList, setShowMobileList] = useState(true);

  // Mock conversations data
  const mockConversations = [
    {
      id: 1,
      customerName: "Maria Silva",
      customerAvatar: "https://randomuser.me/api/portraits/women/1.jpg",
      productId: "prod_001",
      productName: "Smartphone Samsung Galaxy A54",
      productDescription: "Smartphone com 128GB, câmera tripla e tela de 6.4 polegadas",
      productPrice: "1.299,00",
      productImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
      productAvailable: true,
      lastMessage: "Olá! Gostaria de saber se este celular ainda está disponível e se vocês fazem entrega na minha região.",
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      unreadCount: 2,
      status: 'pending',
      deliveryType: 'delivery',
      deliveryAddress: "Rua das Flores, 123 - Vila Madalena, São Paulo",
      sellerId: "seller_001",
      sellerName: "TechStore SP",
      sellerWhatsApp: "+5511999887766",
      messages: [
        {
          sender: 'customer',
          content: 'Olá! Gostaria de saber se este celular ainda está disponível e se vocês fazem entrega na minha região.',
          timestamp: new Date(Date.now() - 1800000)
        },
        {
          sender: 'customer',
          content: 'Moro na Vila Madalena. Qual seria o prazo de entrega?',
          timestamp: new Date(Date.now() - 1500000)
        }
      ]
    },
    {
      id: 2,
      customerName: "João Santos",
      customerAvatar: "https://randomuser.me/api/portraits/men/2.jpg",
      productId: "prod_002",
      productName: "Notebook Dell Inspiron 15",
      productDescription: "Notebook com Intel i5, 8GB RAM, SSD 256GB",
      productPrice: "2.899,00",
      productImage: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
      productAvailable: true,
      lastMessage: "Perfeito! Posso retirar na loja hoje à tarde?",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      unreadCount: 0,
      status: 'responded',
      deliveryType: 'pickup',
      scheduledTime: new Date(Date.now() + 7200000), // 2 hours from now
      sellerId: "seller_001",
      sellerName: "TechStore SP",
      sellerWhatsApp: "+5511999887766",
      messages: [
        {
          sender: 'customer',
          content: 'Oi! Tenho interesse neste notebook. Ele ainda está disponível?',
          timestamp: new Date(Date.now() - 7200000)
        },
        {
          sender: 'seller',
          content: 'Olá João! Sim, o notebook está disponível. Você prefere retirar na loja ou fazer entrega?',
          timestamp: new Date(Date.now() - 5400000)
        },
        {
          sender: 'customer',
          content: 'Perfeito! Posso retirar na loja hoje à tarde?',
          timestamp: new Date(Date.now() - 3600000)
        }
      ]
    },
    {
      id: 3,
      customerName: "Ana Costa",
      customerAvatar: "https://randomuser.me/api/portraits/women/3.jpg",
      productId: "prod_003",
      productName: "Smart TV LG 55 4K",
      productDescription: "Smart TV 55 polegadas com resolução 4K e sistema WebOS",
      productPrice: "2.199,00",
      productImage: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
      productAvailable: false,
      lastMessage: "Quando vocês terão este modelo em estoque novamente?",
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      unreadCount: 1,
      status: 'pending',
      deliveryType: 'delivery',
      deliveryAddress: "Av. Paulista, 1000 - Bela Vista, São Paulo",
      sellerId: "seller_001",
      sellerName: "TechStore SP",
      sellerWhatsApp: "+5511999887766",
      messages: [
        {
          sender: 'customer',
          content: 'Olá! Vi que esta TV está em falta. Quando vocês terão este modelo em estoque novamente?',
          timestamp: new Date(Date.now() - 7200000)
        }
      ]
    },
    {
      id: 4,
      customerName: "Carlos Oliveira",
      customerAvatar: "https://randomuser.me/api/portraits/men/4.jpg",
      productId: "prod_004",
      productName: "Fone JBL Tune 510BT",
      productDescription: "Fone de ouvido Bluetooth com cancelamento de ruído",
      productPrice: "199,00",
      productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      productAvailable: true,
      lastMessage: "Obrigado! Já fiz o PIX. Quando posso buscar?",
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      unreadCount: 0,
      status: 'closed',
      deliveryType: 'pickup',
      sellerId: "seller_001",
      sellerName: "TechStore SP",
      sellerWhatsApp: "+5511999887766",
      messages: [
        {
          sender: 'customer',
          content: 'Oi! Quero comprar este fone. Vocês aceitam PIX?',
          timestamp: new Date(Date.now() - 14400000)
        },
        {
          sender: 'seller',
          content: 'Olá Carlos! Sim, aceitamos PIX com 5% de desconto. O valor fica R$ 189,05.',
          timestamp: new Date(Date.now() - 12600000)
        },
        {
          sender: 'customer',
          content: 'Obrigado! Já fiz o PIX. Quando posso buscar?',
          timestamp: new Date(Date.now() - 10800000)
        },
        {
          sender: 'seller',
          content: 'PIX confirmado! Pode buscar a partir das 14h hoje. Obrigado pela compra!',
          timestamp: new Date(Date.now() - 9000000)
        }
      ]
    }
  ];

  const [conversations, setConversations] = useState(mockConversations);

  useEffect(() => {
    // Auto-select first conversation on desktop
    if (window.innerWidth >= 768 && conversations?.length > 0 && !selectedConversation) {
      setSelectedConversation(conversations?.[0]);
    }
  }, [conversations, selectedConversation]);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setShowMobileList(false);
    
    // Mark as read
    if (conversation?.unreadCount > 0) {
      setConversations(prev => 
        prev?.map(c => 
          c?.id === conversation?.id 
            ? { ...c, unreadCount: 0 }
            : c
        )
      );
    }
  };

  const handleUpdateStatus = (conversationId, newStatus) => {
    setConversations(prev =>
      prev?.map(c =>
        c?.id === conversationId
          ? { ...c, status: newStatus }
          : c
      )
    );
  };

  const handleSendMessage = (conversationId, message) => {
    const newMessage = {
      sender: 'seller',
      content: message,
      timestamp: new Date()
    };

    setConversations(prev =>
      prev?.map(c =>
        c?.id === conversationId
          ? {
              ...c,
              messages: [...c?.messages, newMessage],
              lastMessage: message,
              timestamp: new Date(),
              status: 'responded'
            }
          : c
      )
    );
  };

  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters);
  };

  const handleTemplateSelect = (template) => {
    if (selectedConversation) {
      handleSendMessage(selectedConversation?.id, template?.content);
    }
  };

  const filteredConversations = conversations?.filter(conversation => {
    if (activeFilters?.status !== 'all') {
      if (activeFilters?.status === 'unread' && conversation?.unreadCount === 0) return false;
      if (activeFilters?.status !== 'unread' && conversation?.status !== activeFilters?.status) return false;
    }
    
    if (activeFilters?.deliveryType !== 'all' && conversation?.deliveryType !== activeFilters?.deliveryType) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Desktop Layout */}
        <div className="hidden md:flex w-full">
          {/* Left Sidebar - Conversation List */}
          <div className="w-80 flex-shrink-0">
            <ConversationList
              conversations={filteredConversations}
              selectedConversation={selectedConversation}
              onSelectConversation={handleSelectConversation}
              userRole={userRole}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Stats and Filters */}
            <div className="border-b border-border bg-card">
              <div className="p-4">
                <MessageStats conversations={conversations} userRole={userRole} />
              </div>
              <MessageFilters
                onFilterChange={handleFilterChange}
                activeFilters={activeFilters}
              />
            </div>

            {/* Conversation View */}
            <div className="flex-1">
              <ConversationView
                conversation={selectedConversation}
                onUpdateStatus={handleUpdateStatus}
                onSendMessage={handleSendMessage}
                userRole={userRole}
              />
            </div>
          </div>

          {/* Right Sidebar - Templates */}
          <div className="w-80 flex-shrink-0 border-l border-border bg-card p-4">
            <AutomatedTemplates
              onSelectTemplate={handleTemplateSelect}
              userRole={userRole}
            />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden w-full">
          {showMobileList ? (
            <div className="h-full flex flex-col">
              {/* Mobile Header */}
              <div className="p-4 border-b border-border bg-card">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-xl font-heading font-bold text-foreground">Messages</h1>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Icon name="Search" size={16} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="Filter" size={16} />
                    </Button>
                  </div>
                </div>
                <MessageStats conversations={conversations} userRole={userRole} />
              </div>

              {/* Mobile Conversation List */}
              <div className="flex-1 overflow-y-auto">
                <ConversationList
                  conversations={filteredConversations}
                  selectedConversation={selectedConversation}
                  onSelectConversation={handleSelectConversation}
                  userRole={userRole}
                />
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col">
              {/* Mobile Conversation Header */}
              <div className="p-4 border-b border-border bg-card flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMobileList(true)}
                >
                  <Icon name="ArrowLeft" size={16} />
                </Button>
                <h2 className="font-medium text-foreground">
                  {selectedConversation?.customerName}
                </h2>
              </div>

              {/* Mobile Conversation View */}
              <div className="flex-1">
                <ConversationView
                  conversation={selectedConversation}
                  onUpdateStatus={handleUpdateStatus}
                  onSendMessage={handleSendMessage}
                  userRole={userRole}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Quick Navigation - Mobile */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <div className="flex flex-col space-y-2">
          <Button
            className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-warm-lg"
            size="icon"
          >
            <Icon name="Plus" size={20} />
          </Button>
          
          {conversations?.filter(c => c?.unreadCount > 0)?.length > 0 && (
            <Button
              className="w-12 h-12 rounded-full bg-warning hover:bg-warning/90 text-warning-foreground shadow-warm-lg relative"
              size="icon"
              onClick={() => {
                const firstUnread = conversations?.find(c => c?.unreadCount > 0);
                if (firstUnread) {
                  handleSelectConversation(firstUnread);
                }
              }}
            >
              <Icon name="Mail" size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                {conversations?.filter(c => c?.unreadCount > 0)?.length}
              </span>
            </Button>
          )}
        </div>
      </div>
      {/* Navigation Links - Hidden but accessible for routing */}
      <div className="hidden">
        <Link to="/user-registration">User Registration</Link>
        <Link to="/product-search-results">Product Search</Link>
        <Link to="/product-details">Product Details</Link>
        <Link to="/product-management">Product Management</Link>
        <Link to="/seller-storefront">Seller Storefront</Link>
      </div>
    </div>
  );
};

export default MessageCenter;