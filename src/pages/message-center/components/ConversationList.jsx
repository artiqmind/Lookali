import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ConversationList = ({ conversations, selectedConversation, onSelectConversation, userRole }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, unread, responded, pending

  const filteredConversations = conversations?.filter(conversation => {
    const matchesSearch = conversation?.customerName?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         conversation?.productName?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'unread' && conversation?.unreadCount > 0) ||
                         (filterStatus === 'responded' && conversation?.status === 'responded') ||
                         (filterStatus === 'pending' && conversation?.status === 'pending');
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-warning';
      case 'responded': return 'text-success';
      case 'closed': return 'text-muted-foreground';
      default: return 'text-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return 'Clock';
      case 'responded': return 'CheckCircle';
      case 'closed': return 'XCircle';
      default: return 'MessageCircle';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = (now - messageTime) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return messageTime?.toLocaleDateString('pt-BR');
    }
  };

  return (
    <div className="h-full flex flex-col bg-card border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-semibold text-foreground">Messages</h2>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Icon name="Settings" size={16} />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Filters */}
        <div className="flex space-x-1">
          {[
            { value: 'all', label: 'All' },
            { value: 'unread', label: 'Unread' },
            { value: 'pending', label: 'Pending' },
            { value: 'responded', label: 'Responded' }
          ]?.map((filter) => (
            <button
              key={filter?.value}
              onClick={() => setFilterStatus(filter?.value)}
              className={`px-3 py-1 rounded-sm text-xs font-medium transition-colors duration-200 ${
                filterStatus === filter?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {filter?.label}
            </button>
          ))}
        </div>
      </div>
      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations?.length === 0 ? (
          <div className="p-6 text-center">
            <Icon name="MessageCircle" size={48} className="mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {searchQuery ? 'No conversations match your search' : 'No messages yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredConversations?.map((conversation) => (
              <button
                key={conversation?.id}
                onClick={() => onSelectConversation(conversation)}
                className={`w-full p-3 rounded-md text-left transition-colors duration-200 ${
                  selectedConversation?.id === conversation?.id
                    ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted'
                }`}
              >
                <div className="flex items-start space-x-3">
                  {/* Product Image */}
                  <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={conversation?.productImage}
                      alt={conversation?.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-medium text-foreground truncate">
                        {conversation?.customerName}
                      </h3>
                      <div className="flex items-center space-x-1">
                        {conversation?.unreadCount > 0 && (
                          <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                            {conversation?.unreadCount}
                          </span>
                        )}
                        <Icon 
                          name={getStatusIcon(conversation?.status)} 
                          size={12} 
                          className={getStatusColor(conversation?.status)}
                        />
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground mb-1 truncate">
                      {conversation?.productName}
                    </p>

                    <p className="text-sm text-foreground mb-2 line-clamp-2">
                      {conversation?.lastMessage}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(conversation?.timestamp)}
                      </span>
                      
                      {conversation?.deliveryType && (
                        <span className={`text-xs px-2 py-0.5 rounded-sm ${
                          conversation?.deliveryType === 'delivery' ?'bg-accent/10 text-accent' :'bg-secondary/10 text-secondary'
                        }`}>
                          {conversation?.deliveryType === 'delivery' ? 'Delivery' : 'Pickup'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Footer Stats */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-foreground">
              {conversations?.filter(c => c?.unreadCount > 0)?.length}
            </div>
            <div className="text-xs text-muted-foreground">Unread</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">
              {conversations?.filter(c => c?.status === 'pending')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">
              {conversations?.length}
            </div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationList;