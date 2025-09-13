import React from 'react';
import Icon from '../../../components/AppIcon';

const MessageStats = ({ conversations, userRole }) => {
  const stats = {
    total: conversations?.length,
    unread: conversations?.filter(c => c?.unreadCount > 0)?.length,
    pending: conversations?.filter(c => c?.status === 'pending')?.length,
    responded: conversations?.filter(c => c?.status === 'responded')?.length,
    closed: conversations?.filter(c => c?.status === 'closed')?.length,
    avgResponseTime: '2.5h',
    todayMessages: conversations?.filter(c => {
      const today = new Date();
      const messageDate = new Date(c.timestamp);
      return messageDate?.toDateString() === today?.toDateString();
    })?.length
  };

  const responseRate = stats?.total > 0 ? Math.round((stats?.responded / stats?.total) * 100) : 0;

  const statCards = [
    {
      label: 'Total Messages',
      value: stats?.total,
      icon: 'MessageCircle',
      color: 'text-foreground',
      bgColor: 'bg-card'
    },
    {
      label: 'Unread',
      value: stats?.unread,
      icon: 'Mail',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Pending Response',
      value: stats?.pending,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'Responded',
      value: stats?.responded,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Response Rate',
      value: `${responseRate}%`,
      icon: 'TrendingUp',
      color: responseRate >= 80 ? 'text-success' : responseRate >= 60 ? 'text-warning' : 'text-destructive',
      bgColor: responseRate >= 80 ? 'bg-success/10' : responseRate >= 60 ? 'bg-warning/10' : 'bg-destructive/10'
    },
    {
      label: 'Avg Response Time',
      value: stats?.avgResponseTime,
      icon: 'Timer',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {statCards?.map((stat, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg border border-border ${stat?.bgColor} transition-all duration-200 hover:shadow-warm-sm`}
        >
          <div className="flex items-center justify-between mb-2">
            <Icon name={stat?.icon} size={20} className={stat?.color} />
            {stat?.label === 'Unread' && stats?.unread > 0 && (
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            )}
          </div>
          <div className="space-y-1">
            <div className={`text-2xl font-bold ${stat?.color}`}>
              {stat?.value}
            </div>
            <div className="text-xs text-muted-foreground">
              {stat?.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageStats;