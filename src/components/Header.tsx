import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Bell, Mail, ChevronDown, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
    cartItems: number;
}

const Header: React.FC<HeaderProps> = ({ cartItems }) => {
    return (
        <header className="bg-white border-b border-gray-100">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-1">
                            <ShoppingCart className="w-6 h-6 text-green-500" />
                            <span className="text-xl font-bold text-gray-900">lexty.</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 cursor-pointer">
                                <span className="text-sm">All Categories</span>
                                <ChevronDown className="w-4 h-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Electronics</DropdownMenuItem>
                                <DropdownMenuItem>Fashion</DropdownMenuItem>
                                <DropdownMenuItem>Gaming</DropdownMenuItem>
                                <DropdownMenuItem>Beauty</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">About Us</a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Blog</a>
                        <div className="relative">
                            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Fashion</a>
                            <Badge className="absolute -top-2 -right-6 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-md border-0">
                                New
                            </Badge>
                        </div>
                    </nav>

                    {/* Search Bar */}
                    <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search your product here..."
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-0 rounded-full focus:ring-2 focus:ring-green-500 focus:bg-white text-sm placeholder:text-gray-500"
                            />
                        </div>
                    </div>

                    {/* Right Side Icons */}
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <ShoppingCart className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer" />
                            {cartItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                                    {cartItems}
                                </span>
                            )}
                        </div>
                        <Bell className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer" />
                        <Mail className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer" />
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center space-x-2 cursor-pointer">
                                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                    <User className="w-4 h-4 text-gray-600" />
                                </div>
                                <div className="hidden md:flex items-center space-x-1">
                                    <span className="text-sm text-gray-700">Jason Statham</span>
                                    <ChevronDown className="w-4 h-4 text-gray-600" />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Orders</DropdownMenuItem>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to="/login">Login</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;