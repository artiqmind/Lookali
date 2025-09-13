import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Share, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Product {
    id: number;
    image: string;
    brand: string;
    title: string;
    originalPrice: number;
    currentPrice: number;
    rating: number;
    sold: string;
    vendor: string;
    vendorAvatar: string;
    vendorDistance: number; // em km
    discount?: number;
    unit?: string;
}

const products: Product[] = [
    {
        id: 1,
        image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=300',
        brand: 'North Purwokerto',
        title: 'Airpod Pro 2024',
        originalPrice: 380,
        currentPrice: 315,
        rating: 4.8,
        sold: '1,238 Sold',
        vendor: 'Lenny Store',
        vendorAvatar: 'https://i.pravatar.cc/40?img=1',
        vendorDistance: 2.3,
        unit: 'un',
    },
    {
        id: 2,
        image: 'https://images.pexels.com/photos/8721342/pexels-photo-8721342.jpeg?auto=compress&cs=tinysrgb&w=300',
        brand: 'North Purwokerto',
        title: 'VR Headset',
        originalPrice: 400,
        currentPrice: 320,
        rating: 4.7,
        sold: '870 Sold',
        vendor: 'TechZone',
        vendorAvatar: 'https://i.pravatar.cc/40?img=2',
        vendorDistance: 4.5,
        discount: 20,
        unit: 'un',
    },
];

const categories = [
    'All', 'Gadgets', 'Fashion', 'Beauty', 'Fitness', 'Furniture', 'Tech', 'Kids', 'Sports', 'Accessories',
];

const formatPrice = (price: number) => `R$ ${price.toFixed(2).replace('.', ',')}`;

const PopularProducts: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [favorites, setFavorites] = useState<number[]>([2]);

    const toggleFavorite = (productId: number, e: React.MouseEvent) => {
        e.stopPropagation(); // Impede a navegação para a página do produto
        setFavorites((prev) =>
            prev.includes(productId)
                ? prev.filter((id) => id !== productId)
                : [...prev, productId]
        );
    };

    const handleShare = (product: Product, e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (navigator.share) {
            navigator.share({
                title: product.title,
                text: `Confira este produto: ${product.title}`,
                url: window.location.origin + `/product/${product.id}`,
            });
        } else {
            alert('Compartilhamento não suportado neste navegador.');
        }
    };

    const handleWhatsapp = (product: Product, e: React.MouseEvent) => {
        e.stopPropagation();
        const message = `Olá, estou interessado no produto: ${product.title}.`;
        window.open(`https://wa.me/55${product.vendorAvatar}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <section className="overflow-hidden mt-8 bg-white">
            <div className="max-w-8xl mx-auto px-4 sm:px-8 xl:px-0">
                {/* Header */}
                <div className="flex items-center justify-between mb-7">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground">Popular Product on Lenny</h2>
                        <p className="text-md mt-2 text-gray-400">Start browsing now to discover the perfect items.</p>
                    </div>
                    <Button variant="outline" className="text-primary hover:text-accent font-medium flex items-center gap-2 text-sm">
                        View all products
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-3 mb-8">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            variant="outline"
                            className={`px-4 py-2 rounded-full text-sm font-medium ${activeCategory === category ? 'bg-primary text-white border-ring hover:bg-primary hover:text-white' : ''
                                }`}
                        >
                            {category}
                        </Button>
                    ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="group cursor-pointer bg-white rounded-md duration-200 relative overflow-hidden"
                        >
                            {/* Imagem */}
                            <div className="relative w-full overflow-hidden bg-muted mb-3">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                {/* Botão WhatsApp */}
                                <div className="absolute bottom-2 right-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-10 w-10 rounded-full bg-primary text-white hover:bg-accent p-0"
                                        onClick={(e) => handleWhatsapp(product, e)}
                                    >
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-6 h-6" />
                                    </Button>
                                </div>

                                {/* Ações: Favoritar e Compartilhar */}
                                <div className="absolute top-2 right-2 flex flex-col items-center gap-1">
                                    {/* Botão de favoritar - sempre visível se favoritado, senão aparece no hover */}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className={`h-8 w-8 rounded-full p-0 transition-all duration-200 ${favorites.includes(product.id)
                                            ? 'bg-primary text-white opacity-100'
                                            : 'bg-white/70 text-foreground hover:bg-primary opacity-0 group-hover:opacity-100'
                                            }`}
                                        onClick={(e) => toggleFavorite(product.id, e)}
                                    >
                                        <Heart size={16} className={favorites.includes(product.id) ? "fill-current" : ""} />
                                    </Button>

                                    {/* Botão de compartilhar - só aparece no hover */}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 rounded-full bg-white/70 text-foreground hover:bg-primary p-0 opacity-0 group-hover:opacity-100 transition-all duration-200"
                                        onClick={(e) => handleShare(product, e)}
                                    >
                                        <Share size={16} />
                                    </Button>
                                </div>
                            </div>

                            {/* Conteúdo - com padding */}
                            <div className="p-4 pt-0">
                                <Link to={`/product/${product.id}`} className="block">
                                    <div>
                                        {/* Nome do produto */}
                                        <h3 className="font-semibold text-foreground text-md duration-200 hover:text-primary mb-1 line-clamp-1">
                                            {product.title}
                                        </h3>

                                        {/* Vendedor */}
                                        <div className="flex items-center gap-2 mb-5">
                                            <Avatar className="h-5 w-5">
                                                <AvatarImage src={product.vendorAvatar} alt={product.vendor} />
                                                <AvatarFallback className="text-[8px]">{product.vendor.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex items-center gap-1 min-w-0 flex-1">
                                                <span className="text-xs text-gray-500 line-clamp-1 font-semibold duration-200 hover:text-primary cursor-pointer">
                                                    {product.vendor}
                                                </span>
                                                <span className="text-xs text-gray-400">•</span>
                                                <span className="text-xs text-primary bg-secondary px-1 py-0.5 rounded-sm">
                                                    <span className="font-bold text-primary">
                                                        {product.vendorDistance.toFixed(1)}km
                                                    </span> de você
                                                </span>
                                            </div>
                                        </div>

                                        {/* Avaliação */}
                                        <div className="flex items-center mb-5 gap-1">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-xs font-medium text-foreground">
                                                {product.rating.toFixed(1)}
                                            </span>
                                        </div>

                                        {/* Preço */}
                                        <div className="flex flex-col">
                                            {product.originalPrice !== product.currentPrice && (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-gray-400 line-through">
                                                        De: {formatPrice(product.originalPrice)}
                                                    </span>
                                                    {product.discount && (
                                                        <span className="text-[10px] text-primary font-bold bg-secondary px-1 py-0.5 rounded-sm">
                                                            -{product.discount}%
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                            <div className="flex items-center">
                                                <span className="text-lg font-bold text-gray-900">{formatPrice(product.currentPrice)}</span>
                                                <span className="text-sm text-gray-500">/{product.unit}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularProducts;