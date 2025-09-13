import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import WhatsAppBridge from '../../../components/ui/WhatsAppBridge';

const ConversationView = ({ conversation, onUpdateStatus, onSendMessage, userRole }) => {
  const [newMessage, setNewMessage] = useState('');
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({
    type: conversation?.deliveryType || 'pickup',
    address: conversation?.deliveryAddress || '',
    scheduledTime: conversation?.scheduledTime || ''
  });

  const quickReplies = [
    "Olá! Obrigado pelo interesse no produto.",
    "O produto ainda está disponível sim!",
    "Posso fazer a entrega hoje mesmo.",
    "Prefere retirar na loja ou fazer entrega?",
    "Vou verificar o estoque e te retorno.",
    "Qual seria o melhor horário para você?"
  ];

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSendMessage = () => {
    if (newMessage?.trim()) {
      onSendMessage(conversation?.id, newMessage);
      setNewMessage('');
    }
  };

  const handleQuickReply = (reply) => {
    setNewMessage(reply);
    setShowQuickReplies(false);
  };

  const handleStatusUpdate = (newStatus) => {
    onUpdateStatus(conversation?.id, newStatus);
  };

  const handleDeliveryUpdate = () => {
    // Update delivery details
    console.log('Updating delivery details:', deliveryDetails);
  };

  if (!conversation) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="text-center">
          <Icon name="MessageCircle" size={64} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium text-foreground mb-2">Select a conversation</h3>
          <p className="text-sm text-muted-foreground">
            Choose a message from the list to start communicating with customers
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
              <Image
                src={conversation?.customerAvatar || `https://api.dicebear.com/7.x/initials/svg?seed=${conversation?.customerName}`}
                alt={conversation?.customerName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium text-foreground">{conversation?.customerName}</h3>
              <p className="text-sm text-muted-foreground">
                Interested in {conversation?.productName}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={conversation?.status}
              onChange={(e) => handleStatusUpdate(e?.target?.value)}
              className="px-3 py-1 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="pending">Pending</option>
              <option value="responded">Responded</option>
              <option value="closed">Closed</option>
            </select>

            <Button variant="ghost" size="sm">
              <Icon name="MoreVertical" size={16} />
            </Button>
          </div>
        </div>
      </div>
      {/* Product Context */}
      <div className="p-4 bg-muted/30 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-16 h-16 rounded-md overflow-hidden bg-card">
            <Image
              src={conversation?.productImage}
              alt={conversation?.productName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-foreground">{conversation?.productName}</h4>
            <p className="text-sm text-muted-foreground mb-1">{conversation?.productDescription}</p>
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold text-primary">R$ {conversation?.productPrice}</span>
              <span className={`text-xs px-2 py-1 rounded-sm ${
                conversation?.productAvailable 
                  ? 'bg-success/10 text-success' :'bg-destructive/10 text-destructive'
              }`}>
                {conversation?.productAvailable ? 'Available' : 'Out of Stock'}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation?.messages?.map((message, index) => (
          <div
            key={index}
            className={`flex ${message?.sender === 'customer' ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              message?.sender === 'customer' ?'bg-card border border-border text-foreground' :'bg-primary text-primary-foreground'
            }`}>
              <p className="text-sm">{message?.content}</p>
              <p className={`text-xs mt-1 ${
                message?.sender === 'customer' ? 'text-muted-foreground' : 'text-primary-foreground/70'
              }`}>
                {formatTimestamp(message?.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Delivery Details */}
      {conversation?.deliveryType && (
        <div className="p-4 bg-muted/30 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-foreground">Delivery Information</h4>
            <Button variant="ghost" size="sm" onClick={handleDeliveryUpdate}>
              <Icon name="Edit" size={14} />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">Type:</span>
              <span className="ml-2 font-medium text-foreground capitalize">
                {conversation?.deliveryType}
              </span>
            </div>
            {conversation?.deliveryAddress && (
              <div>
                <span className="text-muted-foreground">Address:</span>
                <span className="ml-2 font-medium text-foreground">
                  {conversation?.deliveryAddress}
                </span>
              </div>
            )}
            {conversation?.scheduledTime && (
              <div>
                <span className="text-muted-foreground">Scheduled:</span>
                <span className="ml-2 font-medium text-foreground">
                  {formatTimestamp(conversation?.scheduledTime)}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Quick Replies */}
      {showQuickReplies && (
        <div className="p-4 bg-muted/30 border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-foreground">Quick Replies</h4>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowQuickReplies(false)}
            >
              <Icon name="X" size={14} />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {quickReplies?.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(reply)}
                className="text-left p-2 text-sm bg-card hover:bg-muted border border-border rounded-md transition-colors duration-150"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Message Input */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex items-center space-x-2 mb-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowQuickReplies(!showQuickReplies)}
          >
            <Icon name="Zap" size={16} />
            <span className="ml-1">Quick</span>
          </Button>

          <WhatsAppBridge
            variant="button"
            productInfo={{
              id: conversation?.productId,
              name: conversation?.productName,
              price: conversation?.productPrice
            }}
            sellerInfo={{
              id: conversation?.sellerId,
              name: conversation?.sellerName,
              whatsapp: conversation?.sellerWhatsApp
            }}
            messageType="product_inquiry"
            className="ml-auto"
          />
        </div>

        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e?.target?.value)}
              placeholder="Type your message..."
              className="w-full p-3 bg-input border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              rows={2}
              onKeyPress={(e) => {
                if (e?.key === 'Enter' && !e?.shiftKey) {
                  e?.preventDefault();
                  handleSendMessage();
                }
              }}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage?.trim()}
            size="sm"
          >
            <Icon name="Send" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConversationView;