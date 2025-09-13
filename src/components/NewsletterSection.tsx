import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const NewsletterSection: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Newsletter signup:', email);
        setEmail('');
    };

    return (
        <section className="bg-gradient-to-br from-green-50 via-gray-50 to-pink-50 py-16 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-green-300 rounded-full opacity-60 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-pink-500 rounded-full opacity-80"></div>

            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Image */}
                    <div className="order-2 lg:order-1">
                        <img
                            src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt="Shopping woman"
                            className="w-full h-auto rounded-2xl"
                        />
                    </div>

                    {/* Right Content */}
                    <div className="order-1 lg:order-2 text-center lg:text-left">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            Subscribe Now for Monthly Discounts!
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Sign up today and enjoy special discounts on your favorite fashion items every month.
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0">
                            <div className="flex-1 relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className="pl-10 pr-4 py-3 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium"
                            >
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSection;