import React from 'react';
import { ArrowRight, ShoppingCart, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

const HeroSection: React.FC = () => {
    const slides = [
        {
            id: 1,
            title: "Upgrade Wardrobe",
            subtitle: "By Our New Collection",
            description: "Explore our vast selection of high-quality products, ranging from fashion and electronics to home essentials and beyond",
            image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800",
            primaryBtn: "Bye Products",
            secondaryBtn: "View Details",
            offer: "30% OFF",
            offerDesc: "15 Amazing Products",
            badges: [
                { icon: ShoppingCart, color: "bg-primary", position: "top-20 -right-4" },
                { icon: "😊", color: "bg-yellow-400", position: "bottom-10 -left-4", isEmoji: true },
                { text: "Best Signup Offers", color: "bg-white border", position: "bottom-4 -right-4" }
            ]
        },
        {
            id: 2,
            title: "Tech Innovation",
            subtitle: "Latest Gadgets & Electronics",
            description: "Discover cutting-edge technology and smart devices that will transform your daily life with premium quality and design",
            image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=800",
            primaryBtn: "Shop Tech",
            secondaryBtn: "Learn More",
            offer: "25% OFF",
            offerDesc: "Tech Essentials",
            badges: [
                { icon: Star, color: "bg-primary", position: "top-20 -right-4" },
                { icon: "🚀", color: "bg-blue-400", position: "bottom-10 -left-4", isEmoji: true },
                { text: "Premium Quality", color: "bg-white border", position: "bottom-4 -right-4" }
            ]
        },
        {
            id: 3,
            title: "Home & Living",
            subtitle: "Transform Your Space",
            description: "Create your perfect sanctuary with our curated collection of home decor, furniture, and lifestyle essentials",
            image: "https://images.pexels.com/photos/6707628/pexels-photo-6707628.jpeg?auto=compress&cs=tinysrgb&w=800",
            primaryBtn: "Shop Home",
            secondaryBtn: "Get Inspired",
            offer: "40% OFF",
            offerDesc: "Home Collection",
            badges: [
                { icon: Heart, color: "bg-pink-500", position: "top-20 -right-4" },
                { icon: "🏡", color: "bg-green-400", position: "bottom-10 -left-4", isEmoji: true },
                { text: "Free Shipping", color: "bg-white border", position: "bottom-4 -right-4" }
            ]
        }
    ];

    return (
        <section className="py-16 lg:py-24">
            <div className="max-w-8xl mx-auto px-4 sm:px-8 xl:px-0">
                <Carousel className="w-full relative">
                    <CarouselContent className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden">
                        {slides.map((slide) => (
                            <CarouselItem key={slide.id}>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 lg:p-16">
                                    {/* Left Content */}
                                    <div className="space-y-8">
                                        <div className="space-y-4">
                                            <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                                                {slide.title}
                                                <br />
                                                <span className="text-primary">{slide.subtitle}</span>
                                            </h1>
                                            <p className="text-lg text-gray-600 max-w-md">
                                                {slide.description}
                                            </p>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <Button variant="default" className="hover:bg-accent font-medium flex items-center gap-2 text-sm">
                                                {slide.primaryBtn}
                                            </Button>
                                            <Button variant="outline" className="border-primary text-primary hover:bg-secondary px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105">
                                                {slide.secondaryBtn}
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Right Content - Image with Floating Elements */}
                                    <div className="relative">
                                        <div className="relative overflow-hidden rounded-2xl group">
                                            <img
                                                src={slide.image}
                                                alt="Hero image"
                                                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>

                                        {/* Floating Offer Badge */}
                                        <div className="absolute -top-4 -left-4 bg-pink-500 text-white px-4 py-3 rounded-xl shadow-lg">
                                            <div className="text-xs font-medium">Offer</div>
                                            <div className="text-xl font-bold">{slide.offer}</div>
                                            <div className="text-xs">{slide.offerDesc}</div>
                                        </div>

                                        {/* Dynamic Floating Badges */}
                                        {slide.badges.map((badge, index) => (
                                            <div key={index} className={`absolute ${badge.position} ${badge.color} p-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-110`}>
                                                {badge.isEmoji ? (
                                                    <span className="text-2xl">{badge.icon}</span>
                                                ) : badge.text ? (
                                                    <div>
                                                        <div className="text-xs text-gray-600 font-medium">
                                                            {badge.text.split(' ').slice(0, -1).join(' ')}
                                                        </div>
                                                        <div className="text-sm font-semibold text-gray-900">
                                                            {badge.text.split(' ').slice(-1)}
                                                        </div>
                                                        <div className="w-4 h-4 bg-primary rounded-full mt-1"></div>
                                                    </div>
                                                ) : (
                                                    React.createElement(badge.icon as any, { className: "w-6 h-6 text-white" })
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="-left-16" />
                    <CarouselNext className="-right-16" />
                </Carousel>
            </div>
        </section>
    );
};

export default HeroSection;