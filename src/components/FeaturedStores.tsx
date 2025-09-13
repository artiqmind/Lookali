import React from 'react';
import { Button } from '@/components/ui/button';

const stores = [
    {
        id: 1,
        name: "Crush grocery",
        deliveryTime: "Delivery In 12 minute",
        bgColor: "bg-orange-400",
        logoUrl: "https://seeklogo.com/images/C/crush-logo-12B4F26110-seeklogo.com.png",
    },
    {
        id: 2,
        name: "Delivery market",
        deliveryTime: "Delivery In 12 minute",
        bgColor: "bg-blue-600",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/38/Now_Delivery_Logo.png",
    },
    {
        id: 3,
        name: "Quality product",
        deliveryTime: "Delivery In 12 minute",
        bgColor: "bg-teal-400",
        logoUrl: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
    },
];

const FeaturedStores: React.FC = () => {
    return (
        <section className="bg-white py-16">
            <div className="max-w-8xl mx-auto px-4 sm:px-8 xl:px-0">
                {/* Título e botão */}
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-2xl font-bold text-gray-900">Featured store</h2>
                    <Button variant="outline" className="text-primary hover:text-accent font-medium flex items-center gap-2 text-sm">
                        Visit all stores
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </Button>
                </div>

                {/* Grid dos stores */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {stores.map((store) => (
                        <div
                            key={store.id}
                            className="rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                        >
                            {/* Parte colorida superior */}
                            <div className={`${store.bgColor} h-24 relative rounded-t-2xl flex items-center justify-center`}>
                                <div className="bg-white rounded-full p-2 absolute -bottom-8 shadow-md">
                                    <img
                                        src={store.logoUrl}
                                        alt={`${store.name} logo`}
                                        className="w-14 h-14 object-contain"
                                    />
                                </div>
                            </div>

                            {/* Parte branca inferior */}
                            <div className="bg-white pt-14 pb-6 px-6 rounded-b-2xl">
                                <h3 className="font-semibold text-gray-900 mb-1">{store.name}</h3>
                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                    <svg
                                        className="w-4 h-4 text-yellow-400 flex-shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                    </svg>
                                    {store.deliveryTime}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedStores;
