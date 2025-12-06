'use client';

import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import Image from 'next/image';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black border-t border-white/10 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12">
                                <Image
                                    src='/PA_Logo.png'
                                    alt='PA Catering Logo'
                                    fill
                                    className='object-contain'
                                />
                            </div>
                            <span className="text-2xl font-bold text-white tracking-widest font-small-caps">
                                PA <span className="text-amber-500">Luxe</span>
                            </span>
                        </div>
                        <p className="text-white/60 leading-relaxed">
                            Elevating dining and event experiences in Evander. From exquisite culinary creations to immersive 360° photo memories.
                        </p>
                        <div className="flex gap-4">
                            {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-amber-500 hover:border-amber-500 hover:bg-amber-500/10 transition-all duration-300">
                                    <Icon />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6 font-small-caps tracking-widest">Explore</h4>
                        <ul className="space-y-4">
                            {['Home', 'Menu', 'Gallery', '360° Booth', 'About Us', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link href={item === 'Home' ? '/' : item === '360° Booth' ? '/photo' : `/${item.toLowerCase().replace(' ', '-')}`} className="text-white/60 hover:text-amber-500 transition-colors inline-flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6 font-small-caps tracking-widest">Contact</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-3 text-white/60">
                                <HiLocationMarker className="text-amber-500 text-xl flex-shrink-0" />
                                <span>123Example Street, Evander,<br />Mpumalanga, South Africa</span>
                            </li>
                            <li className="flex items-center gap-3 text-white/60">
                                <HiPhone className="text-amber-500 text-xl flex-shrink-0" />
                                <span>+27 12 345 6789</span>
                            </li>
                            <li className="flex items-center gap-3 text-white/60">
                                <HiMail className="text-amber-500 text-xl flex-shrink-0" />
                                <span>info@pacatering.co.za</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6 font-small-caps tracking-widest">Newsletter</h4>
                        <p className="text-white/60 mb-4">Subscribe for exclusive offers and seasonal menu updates.</p>
                        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-amber-500 transition-colors"
                            />
                            <button className="w-full bg-amber-500 text-black font-bold uppercase tracking-widest py-3 rounded-lg hover:bg-amber-400 transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-white/40 text-sm">
                        &copy; {currentYear} PA Luxe Creation. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-white/40">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
