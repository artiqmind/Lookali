import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductImageGallery = ({ images = [], productName = '' }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const mockImages = images?.length > 0 ? images : [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
    'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?w=800&h=600&fit=crop',
    'https://images.pixabay.com/photo/2017/08/06/12/06/people-2591874_1280.jpg?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=600&fit=crop'
  ];

  const handlePrevious = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? mockImages?.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex(prev => 
      prev === mockImages?.length - 1 ? 0 : prev + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative bg-card rounded-lg overflow-hidden shadow-warm-md">
        <div className="aspect-square relative group">
          <Image
            src={mockImages?.[currentImageIndex]}
            alt={`${productName} - Image ${currentImageIndex + 1}`}
            className={`w-full h-full object-cover transition-transform duration-300 cursor-zoom-in ${
              isZoomed ? 'scale-150' : 'scale-100'
            }`}
            onClick={toggleZoom}
          />
          
          {/* Navigation Arrows */}
          {mockImages?.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                onClick={handlePrevious}
              >
                <Icon name="ChevronLeft" size={20} />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                onClick={handleNext}
              >
                <Icon name="ChevronRight" size={20} />
              </Button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded-sm text-xs font-data">
            {currentImageIndex + 1} / {mockImages?.length}
          </div>

          {/* Zoom Indicator */}
          <div className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Icon name={isZoomed ? "ZoomOut" : "ZoomIn"} size={16} />
          </div>
        </div>
      </div>
      {/* Thumbnail Navigation */}
      {mockImages?.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {mockImages?.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                index === currentImageIndex
                  ? 'border-primary shadow-warm-sm'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
      {/* Mobile Swipe Indicators */}
      <div className="md:hidden flex justify-center space-x-1">
        {mockImages?.map((_, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentImageIndex
                ? 'bg-primary' :'bg-border hover:bg-primary/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;