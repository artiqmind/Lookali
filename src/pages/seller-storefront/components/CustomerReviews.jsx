import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CustomerReviews = ({ reviews, averageRating, totalReviews }) => {
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState('all');
  const [showAll, setShowAll] = useState(false);

  const sortOptions = [
    { value: 'newest', label: 'Mais recentes' },
    { value: 'oldest', label: 'Mais antigas' },
    { value: 'highest', label: 'Maior avaliação' },
    { value: 'lowest', label: 'Menor avaliação' },
    { value: 'helpful', label: 'Mais úteis' }
  ];

  const ratingDistribution = [5, 4, 3, 2, 1]?.map(rating => {
    const count = reviews?.filter(review => Math.floor(review?.rating) === rating)?.length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { rating, count, percentage };
  });

  const filteredReviews = reviews?.filter(review => 
    filterRating === 'all' || Math.floor(review?.rating) === parseInt(filterRating)
  );

  const sortedReviews = [...filteredReviews]?.sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'highest':
        return b?.rating - a?.rating;
      case 'lowest':
        return a?.rating - b?.rating;
      case 'helpful':
        return b?.helpfulCount - a?.helpfulCount;
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  const displayedReviews = showAll ? sortedReviews : sortedReviews?.slice(0, 6);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const ReviewCard = ({ review }) => (
    <div className="bg-background border border-border rounded-lg p-4">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Image
            src={review?.customerAvatar}
            alt={review?.customerName}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="font-medium text-foreground">{review?.customerName}</h4>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5]?.map((star) => (
                    <Icon
                      key={star}
                      name="Star"
                      size={14}
                      color={star <= review?.rating ? 'var(--color-warning)' : 'var(--color-muted)'}
                      className={star <= review?.rating ? 'fill-current' : ''}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDate(review?.date)}
                </span>
              </div>
            </div>
            
            {review?.verified && (
              <span className="bg-success/10 text-success px-2 py-1 rounded-sm text-xs font-medium">
                Compra verificada
              </span>
            )}
          </div>

          <p className="text-sm text-foreground mb-3 leading-relaxed">
            {review?.comment}
          </p>

          {review?.images && review?.images?.length > 0 && (
            <div className="flex space-x-2 mb-3">
              {review?.images?.map((image, index) => (
                <div key={index} className="w-16 h-16 rounded-md overflow-hidden">
                  <Image
                    src={image}
                    alt={`Review image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-foreground transition-colors duration-150">
                <Icon name="ThumbsUp" size={12} />
                <span>Útil ({review?.helpfulCount})</span>
              </button>
              
              <button className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-150">
                Responder
              </button>
            </div>

            {review?.productName && (
              <span className="text-xs text-muted-foreground">
                Produto: {review?.productName}
              </span>
            )}
          </div>

          {review?.sellerResponse && (
            <div className="mt-3 p-3 bg-muted rounded-md">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Store" size={14} color="var(--color-primary)" />
                <span className="text-xs font-medium text-primary">Resposta do vendedor</span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(review?.sellerResponse?.date)}
                </span>
              </div>
              <p className="text-xs text-foreground">
                {review?.sellerResponse?.message}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-xl font-heading font-bold text-foreground mb-4">
          Avaliações dos Clientes
        </h3>

        {/* Rating Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <span className="text-3xl font-bold text-foreground">
                {averageRating?.toFixed(1)}
              </span>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5]?.map((star) => (
                  <Icon
                    key={star}
                    name="Star"
                    size={20}
                    color={star <= Math.floor(averageRating) ? 'var(--color-warning)' : 'var(--color-muted)'}
                    className={star <= Math.floor(averageRating) ? 'fill-current' : ''}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Baseado em {totalReviews} avaliações
            </p>
          </div>

          <div className="space-y-2">
            {ratingDistribution?.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground w-8">
                  {rating}★
                </span>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-warning rounded-full h-2 transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-8">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Filtrar:</span>
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e?.target?.value)}
                className="bg-input border border-border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">Todas as estrelas</option>
                <option value="5">5 estrelas</option>
                <option value="4">4 estrelas</option>
                <option value="3">3 estrelas</option>
                <option value="2">2 estrelas</option>
                <option value="1">1 estrela</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="bg-input border border-border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {sortOptions?.map(option => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Reviews List */}
      <div className="p-6">
        {displayedReviews?.length > 0 ? (
          <div className="space-y-4">
            {displayedReviews?.map(review => (
              <ReviewCard key={review?.id} review={review} />
            ))}
            
            {!showAll && sortedReviews?.length > 6 && (
              <div className="text-center pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowAll(true)}
                  iconName="ChevronDown"
                  iconPosition="right"
                >
                  Ver mais {sortedReviews?.length - 6} avaliações
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon name="MessageSquare" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">
              Nenhuma avaliação encontrada
            </h4>
            <p className="text-muted-foreground">
              Não há avaliações para os filtros selecionados.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerReviews;