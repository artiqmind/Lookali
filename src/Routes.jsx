import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import MessageCenter from './pages/message-center';
import ProductDetails from './pages/product-details';
import ProductManagement from './pages/product-management';
import SellerStorefront from './pages/seller-storefront';
import ProductSearchResults from './pages/product-search-results';
import UserRegistration from './pages/user-registration';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<MessageCenter />} />
        <Route path="/message-center" element={<MessageCenter />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/product-management" element={<ProductManagement />} />
        <Route path="/seller-storefront" element={<SellerStorefront />} />
        <Route path="/product-search-results" element={<ProductSearchResults />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
