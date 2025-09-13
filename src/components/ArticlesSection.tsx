import React from 'react';
import { ArrowRight } from 'lucide-react';

const articles = [
    {
        id: 1,
        image: 'https://images.pexels.com/photos/4050432/pexels-photo-4050432.jpeg?auto=compress&cs=tinysrgb&w=400',
        readTime: '5 Min to read',
        title: 'Make your desk more neat and beautiful',
        description: 'On my desk, a symphony of organization unfolds with precision and elegance. Each item finds its designated place.',
        date: '23 Dec 2024'
    },
    {
        id: 2,
        image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=400',
        readTime: '5 Min to read',
        title: 'What are the fashion trend in 2024?',
        description: 'Sustainable activewear will see increased demand. Emerging markets will play a vital role in shaping the future of fashion.',
        date: '24 Dec 2024'
    },
    {
        id: 3,
        image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=400',
        readTime: '5 Min to read',
        title: 'Tips for work life balance',
        description: 'Work-life balance is a key part of a healthy and productive work environment. Here are 10 work-life balance tips.',
        date: '26 Dec 2024'
    }
];

const ArticlesSection: React.FC = () => {
    return (
        <section className="bg-gray-50 py-16">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-2xl font-bold text-gray-900">Lenny's Article & News</h2>
                    <button className="text-green-500 hover:text-green-600 font-medium flex items-center gap-2 text-sm">
                        View all articles
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article) => (
                        <div key={article.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                            <div className="aspect-video overflow-hidden">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            <div className="p-6">
                                <div className="text-xs text-gray-500 mb-3 font-medium">{article.readTime}</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                                    {article.description}
                                </p>

                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500 font-medium">{article.date}</span>
                                    <button className="text-green-500 hover:text-green-600 font-medium flex items-center gap-1 text-sm">
                                        Read More
                                        <ArrowRight className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ArticlesSection;