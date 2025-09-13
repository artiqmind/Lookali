import * as React from 'react';
import { useState } from 'react'; // Importação faltante do useState
import { Link, useParams } from 'react-router-dom';
import Icon from '@/components/AppIcon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

// Your product data
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

// Mock data (you should get this from an API or a data source)
const productsData: Product[] = [
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

const productImages = [
    'https://images.pexels.com/photos/8721342/pexels-photo-8721342.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/8721342/pexels-photo-8721342.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/8721342/pexels-photo-8721342.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/8721342/pexels-photo-8721342.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/8721342/pexels-photo-8721342.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/8721342/pexels-photo-8721342.jpeg?auto=compress&cs=tinysrgb&w=600',
];

const colorVariants = [
    { name: 'White', color: 'bg-white border-2 border-gray-300' },
    { name: 'Black', color: 'bg-black' },
    { name: 'Blue', color: 'bg-blue-500' },
    { name: 'Cyan', color: 'bg-cyan-400' },
    { name: 'Green', color: 'bg-green-500' },
    { name: 'Light Blue', color: 'bg-blue-300' },
];

const relatedProducts = [
    {
        id: 1,
        image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=300',
        brand: 'North Purwokerto',
        title: 'Smartwatch screen',
        originalPrice: 380,
        currentPrice: 315,
        rating: 4.8,
        sold: '1,238 Sold',
        vendor: 'TechZone',
        vendorAvatar: 'https://i.pravatar.cc/40?img=1',
        vendorDistance: 2.3,
        unit: 'un',
    },
    {
        id: 2,
        image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=300',
        brand: 'North Purwokerto',
        title: 'Airpod Device',
        originalPrice: 380,
        currentPrice: 315,
        rating: 4.8,
        sold: '1,238 Sold',
        vendor: 'TechZone',
        vendorAvatar: 'https://i.pravatar.cc/40?img=2',
        vendorDistance: 4.5,
        unit: 'un',
    },
    {
        id: 3,
        image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=300',
        brand: 'North Purwokerto',
        title: 'Toilet bag',
        originalPrice: 380,
        currentPrice: 15,
        rating: 4.8,
        sold: '1,238 Sold',
        vendor: 'TechZone',
        vendorAvatar: 'https://i.pravatar.cc/40?img=3',
        vendorDistance: 1.8,
        unit: 'un',
    },
    {
        id: 4,
        image: 'https://images.pexels.com/photos/8721342/pexels-photo-8721342.jpeg?auto=compress&cs=tinysrgb&w=300',
        brand: 'North Purwokerto',
        title: 'Virtual reality headset',
        originalPrice: 380,
        currentPrice: 315,
        rating: 4.8,
        sold: '1,238 Sold',
        vendor: 'TechZone',
        vendorAvatar: 'https://i.pravatar.cc/40?img=4',
        vendorDistance: 5.1,
        unit: 'un',
    },
];

const formatPrice = (price: number) => `$${price.toFixed(2)}`;

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Tipagem corrigida
    const [selectedColor, setSelectedColor] = useState('White');
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false); // Variável declarada mas não usada - você pode implementar a funcionalidade

    // Buscar produto baseado no ID
    const product = productsData.find(p => p.id === parseInt(id || '0')) || productsData[0];

    const incrementQuantity = () => setQuantity((prev) => prev + 1);
    const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <nav className="flex items-center space-x-2 text-sm text-gray-600 font-medium mb-8">
                    <Link to="/" className="hover:text-gray-900">
                        Home
                    </Link>
                    <span>/</span>
                    <Link to="#" className="hover:text-gray-900">
                        Electronic
                    </Link>
                    <span>/</span>
                    <Link to="#" className="hover:text-gray-900">
                        Headphones
                    </Link>
                    <span>/</span>
                    <span className="text-gray-900">{product.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="relative rounded-xl p-8 aspect-square bg-gray-50">
                            <Carousel className="w-full h-full">
                                <CarouselContent>
                                    {productImages.map((image, index) => (
                                        <CarouselItem key={index}>
                                            <Card className="border-0">
                                                <CardContent className="flex aspect-square items-center justify-center p-0">
                                                    <img
                                                        src={image}
                                                        alt={`Product ${index + 1}`}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </CardContent>
                                            </Card>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2" />
                                <CarouselNext className="right-4 top-1/2 -translate-y-1/2" />
                            </Carousel>
                        </div>
                        {/* The thumbnail part of the image is not implemented here. You'll have to add it yourself. */}
                        <div className="hidden lg:flex space-x-2 overflow-x-auto">
                            {/* Thumbnails can be added here, similar to your original code, but controlled by the carousel state */}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                {product.title}
                            </h1>
                            <p className="text-gray-400 leading-relaxed">
                                Virtual reality headset is the latest addition to legendary G502
                                lineage. Featuring our first-ever LIGHTFORCE hybrid
                                optical-mechanical switches and updated LIGHTSPEED wireless
                                protocol with 68% faster response rate.
                            </p>
                        </div>

                        {/* Rating and Reviews */}
                        <div className="flex items-center gap-4 pb-8 border-b">
                            <div className="flex items-center gap-1">
                                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                <span className="font-semibold">{product.rating}</span>
                                <span className="text-gray-500">238 Reviews</span>
                            </div>
                            <div className="text-gray-500">{product.sold}</div>
                        </div>

                        {/* Price */}
                        <div className="space-y-2 pb-8 border-b">
                            <div className="text-3xl font-bold text-gray-900">
                                {formatPrice(product.currentPrice)} <span className="text-lg text-gray-500">or 19.59/month</span>
                            </div>
                            <p className="text-sm text-gray-500">
                                Suggested payments with 6 months special financing
                            </p>
                        </div>

                        {/* Product Options */}
                        <div className="space-y-6">
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Type
                                    </label>
                                    <Select defaultValue="wireless">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="wireless">Wireless</SelectItem>
                                            <SelectItem value="wired">Wired</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Color
                                    </label>
                                    <Select
                                        value={selectedColor}
                                        onValueChange={setSelectedColor}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="White">White</SelectItem>
                                            <SelectItem value="Black">Black</SelectItem>
                                            <SelectItem value="Blue">Blue</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Quantity
                                    </label>
                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                        <button
                                            onClick={decrementQuantity}
                                            className="p-2 hover:bg-gray-100 transition-colors"
                                        >
                                            <Icon name="Minus" className="w-4 h-4" />
                                        </button>
                                        <span className="px-4 py-2 font-medium">{quantity}</span>
                                        <button
                                            onClick={incrementQuantity}
                                            className="p-2 hover:bg-gray-100 transition-colors"
                                        >
                                            <Icon name="Plus" className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium">
                                Buy Now
                            </Button>
                            <Button
                                variant="outline"
                                className="flex-1 border-green-500 text-green-500 hover:bg-green-50 py-3 rounded-lg font-medium"
                            >
                                <Icon name="ShoppingCart01" className="w-4 h-4 mr-2" />
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Product Details Tabs - Alinhado com a imagem */}
                <div className="bg-white rounded-2xl mb-16">
                    <Tabs defaultValue="details" className="w-full">
                        <TabsList className="grid w-full grid-cols-4 mb-8 border-b rounded-none bg-transparent p-0">
                            <TabsTrigger value="details" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none">
                                Detail Product
                            </TabsTrigger>
                            <TabsTrigger value="merchant" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none">
                                Merchant
                            </TabsTrigger>
                            <TabsTrigger value="reviews" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none">
                                Reviews
                            </TabsTrigger>
                            <TabsTrigger value="related" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none">
                                Related Product
                            </TabsTrigger>
                        </TabsList>

                        {/* Tabs Content */}
                        <TabsContent value="details" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">
                                        Specification
                                    </h4>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Brand</span>
                                            <span className="font-medium">Logitech</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Model</span>
                                            <span className="font-medium">VR-2024</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Weight</span>
                                            <span className="font-medium">580g</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">In The Box</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span>UG502 X LIGHTSPEED Wireless Gaming Mouse</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span>DPI-Shift button cover</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">
                                        System Required
                                    </h4>
                                    <div className="space-y-2 text-sm text-gray-600">
                                        <div>• USB port</div>
                                        <div>• Internet access for optional software download</div>
                                        <div>• Windows 10</div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="merchant">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Merchant Information</h3>
                                <p className="text-gray-600">Merchant details will be displayed here.</p>
                            </div>
                        </TabsContent>
                        <TabsContent value="reviews">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Customer Reviews</h3>
                                <p className="text-gray-600">Reviews will be displayed here.</p>
                            </div>
                        </TabsContent>
                        <TabsContent value="related">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Related Products</h3>
                                <p className="text-gray-600">Related products will be displayed here.</p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Related Products Section */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
                        <Link
                            to="/"
                            className="text-green-500 hover:text-green-600 font-medium flex items-center gap-2 text-sm"
                        >
                            View all products
                            <Icon name="ChevronRight" className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
                        {relatedProducts.map((product) => (
                            <div
                                key={product.id}
                                className="group cursor-pointer bg-white rounded-md border hover:shadow-md duration-200 relative overflow-hidden"
                            >
                                {/* Imagem */}
                                <div className="relative w-full h-48 overflow-hidden bg-gray-50 mb-3">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                {/* Conteúdo - com padding */}
                                <div className="p-4 pt-0">
                                    <Link to={`/product/${product.id}`} className="block">
                                        <div>
                                            {/* Nome do produto */}
                                            <h3 className="font-semibold text-gray-900 text-md duration-200 hover:text-blue-600 mb-1 line-clamp-1">
                                                {product.title}
                                            </h3>
                                            {/* Vendedor */}
                                            <div className="flex items-center gap-2 mb-5">
                                                <Avatar className="h-5 w-5">
                                                    <AvatarImage src={product.vendorAvatar} alt={product.vendor} />
                                                    <AvatarFallback className="text-[8px]">{product.vendor.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex items-center gap-1 min-w-0 flex-1">
                                                    <span className="text-xs text-gray-500 line-clamp-1 font-semibold duration-200 hover:text-blue-600 cursor-pointer">
                                                        {product.vendor}
                                                    </span>
                                                    <span className="text-xs text-gray-400">•</span>
                                                    <span className="text-xs text-blue-600 bg-blue-50 px-1 py-0.5 rounded-sm">
                                                        <span className="font-bold text-blue-600">
                                                            {product.vendorDistance.toFixed(1)}km
                                                        </span>{' '}
                                                        de você
                                                    </span>
                                                </div>
                                            </div>
                                            {/* Avaliação */}
                                            <div className="flex items-center mb-5 gap-1">
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-xs font-medium text-gray-900">
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
                                                            <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-1 py-0.5 rounded-sm">
                                                                -{product.discount}%
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                                <div className="flex items-center">
                                                    <span className="text-lg font-bold text-gray-900">
                                                        {formatPrice(product.currentPrice)}
                                                    </span>
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
            </div>
        </div>
    );
};

export default ProductDetail;