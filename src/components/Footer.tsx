import React from 'react';
import { Instagram, Facebook, Twitter, Linkedin, Phone, Mail, MapPin, ShoppingCart } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white py-16">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    {/* Company Info */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-1 mb-4">
                            <ShoppingCart className="w-6 h-6 text-green-500" />
                            <span className="text-xl font-bold">lexty.</span>
                        </div>
                        <p className="text-gray-400 mb-6 max-w-sm text-sm leading-relaxed">
                            The biggest marketplace managed by ideologist corp,
                            which provides various kinds of daily needs and hobbies.
                        </p>

                        {/* Social Media */}
                        <div className="flex space-x-3">
                            <div className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 cursor-pointer transition-colors">
                                <Instagram className="w-4 h-4" />
                            </div>
                            <div className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 cursor-pointer transition-colors">
                                <Facebook className="w-4 h-4" />
                            </div>
                            <div className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 cursor-pointer transition-colors">
                                <Twitter className="w-4 h-4" />
                            </div>
                            <div className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 cursor-pointer transition-colors">
                                <Linkedin className="w-4 h-4" />
                            </div>
                        </div>
                    </div>

                    {/* About Lenny */}
                    <div>
                        <h3 className="font-semibold mb-4 text-sm">ABOUT LENNY</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Information</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Store Locator</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Bulk Purchase</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Alteration Services</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Gift Delivery Service</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Live Station</a></li>
                        </ul>
                    </div>

                    {/* About Lenny 2 */}
                    <div>
                        <h3 className="font-semibold mb-4 text-sm">ABOUT LENNY</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Return Policy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Accessibility</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Account & Contact */}
                    <div>
                        <h3 className="font-semibold mb-4 text-sm">ACCOUNT</h3>
                        <ul className="space-y-2 text-gray-400 text-sm mb-6">
                            <li><a href="#" className="hover:text-white transition-colors">Membership</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Address</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Cupons</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Cupons</a></li>
                        </ul>

                        <h3 className="font-semibold mb-4 text-sm">CONTACT US</h3>
                        <div className="space-y-3 text-gray-400 text-xs">
                            <div className="flex items-start gap-2">
                                <Mail className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                <div>
                                    <div className="font-medium">For Lexty Consumer</div>
                                    <div className="text-gray-500">Complaint Service which services for all</div>
                                </div>
                            </div>
                            <div className="text-gray-300">lexty.support@example.com</div>

                            <div className="flex items-start gap-2 mt-4">
                                <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                <div>
                                    <div className="font-medium">Customers Complaint Service</div>
                                    <div className="text-gray-500">Directorate General of the Republic of Bangladesh</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-3 h-3" />
                                <span className="text-gray-300">(480) 555-0103</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-gray-400 text-sm">
                            ©UI Expertz 2024
                        </div>

                        <div className="flex items-center space-x-6 text-gray-400 text-sm">
                            <a href="#" className="hover:text-white transition-colors">Terms of use</a>
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        </div>

                        {/* Payment Methods */}
                        <div className="flex items-center space-x-2">
                            <div className="bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-bold">PayPal</div>
                            <div className="bg-blue-800 text-white px-3 py-1.5 rounded text-xs font-bold">VISA</div>
                            <div className="bg-red-600 text-white px-3 py-1.5 rounded text-xs font-bold">mc</div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;