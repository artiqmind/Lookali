import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturedCategories from './components/FeaturedCategories';
import FeaturedStores from './components/FeaturedStores';
import PopularProducts from './components/PopularProducts';
import DiscountSection from './components/DiscountSection';
import ArticlesSection from './components/ArticlesSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';

function App() {
    const [cartItems, setCartItems] = useState(1);

    const addToCart = () => {
        setCartItems(prev => prev + 1);
    };

    return (
        <Router>
            <div className="min-h-screen">
                <Header cartItems={cartItems} />
                <Routes>
                    <Route path="/" element={
                        <>
                            <HeroSection />
                            <FeaturedCategories />
                            <PopularProducts />
                            <FeaturedStores />
                            <DiscountSection />
                            <ArticlesSection />
                            <NewsletterSection />
                        </>
                    } />
                    <Route path="/product/:id" element={<ProductDetail onAddToCart={addToCart} />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;