import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const categories = [
    {
        iconUrl: "https://cdn.simpleicons.org/apple/3bc5f6",
        name: 'Devices',
        count: '82k products',
    },
    {
        iconUrl: "https://cdn.simpleicons.org/nike/111111",
        name: 'Fashions',
        count: '82k products',
    },
    {
        iconUrl: "https://cdn.simpleicons.org/airbnb/FF5A5F",
        name: 'Action Figure',
        count: '82k products',
    },
    {
        iconUrl: "https://cdn.simpleicons.org/xbox/107C10",
        name: 'Gaming',
        count: '82k products',
    },
    {
        iconUrl: "https://cdn.simpleicons.org/samsung/1428A0",
        name: 'Electronics',
        count: '82k products',
    },
    {
        iconUrl: "https://cdn.simpleicons.org/googlebooks/4285F4",
        name: 'E-Books',
        count: '82k products',
    },
];

const FeaturedCategories: React.FC = () => {
    return (
        <section className="bg-white py-16">
            <div className="max-w-8xl mx-auto px-4 sm:px-8 xl:px-0">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-2xl font-bold text-gray-900">Featured Category</h2>
                    <Button
                        variant="outline"
                        className="text-primary hover:text-accent font-medium flex items-center gap-2 text-sm"
                    >
                        View all categories
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {categories.map((category, index) => (
                        <div key={index} className="group cursor-pointer">
                            <div className="bg-muted rounded-md p-4 text-center transition-colors hover:bg-gray-100">

                                <div className="bg-white rounded-md py-10 px-4 mb-4 flex items-center justify-center">
                                    <img src={category.iconUrl} alt={category.name} className="w-12 h-12" />
                                </div>

                                <h3 className="font-semibold text-gray-900 text-sm">{category.name}</h3>
                                <p className="text-xs text-gray-500">{category.count}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCategories;
