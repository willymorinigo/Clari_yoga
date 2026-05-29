/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Flower, CalendarDays, UserCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'book' | 'my-bookings';
  setActiveTab: (tab: 'home' | 'book' | 'my-bookings') => void;
  bookingCount: number;
}

export default function Navbar({ activeTab, setActiveTab, bookingCount }: NavbarProps) {
  const navItems = [
    { id: 'home', label: 'Inicio y Filosofía', icon: Flower, badge: undefined },
    { id: 'book', label: 'Reservar Turno', icon: CalendarDays, badge: undefined },
    { id: 'my-bookings', label: 'Mis Turnos', icon: UserCheck, badge: bookingCount > 0 ? bookingCount : undefined },
  ] as const;

  return (
    <header id="main-header" className="sticky top-0 z-50 w-full border-b border-stone-borders bg-stone-sand/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
        
        {/* Brand Logo / Name */}
        <div 
          id="brand-logo"
          onClick={() => setActiveTab('home')} 
          className="flex cursor-pointer items-center gap-3 transition-opacity hover:opacity-95"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-stone-sand">
            <span className="font-serif text-lg font-bold tracking-wider">C</span>
          </div>
          <div>
            <h1 className="font-serif text-xl font-semibold tracking-tight text-stone-charcoal flex items-center gap-1.5 leading-none sm:text-2xl">
              Clara <span className="text-primary italic font-light">Chiaravalli</span>
            </h1>
            <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-stone-400 mt-1">YOGA & SHIATSU</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav id="desktop-nav" className="flex items-center gap-1 sm:gap-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-primary' : 'text-stone-400'}`} />
                <span className="hidden sm:inline">{item.label}</span>
                
                {/* Visual indicator of active tab */}
                {isActive && (
                  <motion.div
                    layoutId="active-nav-indicator"
                    className="absolute inset-0 -z-10 rounded-full bg-primary/5 border border-primary/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Badge indicator */}
                {item.badge !== undefined && (
                  <span className="ml-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-stone-charcoal px-1.5 text-[10px] font-bold text-stone-sand animate-pulse leading-none">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Small CTA Button on Right (re-routes to Booking Wizard) */}
        <div id="header-cta" className="hidden lg:block">
          <button
            id="header-cta-btn"
            onClick={() => setActiveTab('book')}
            className="flex items-center gap-2 rounded-none border border-stone-charcoal px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-charcoal hover:bg-stone-charcoal hover:text-stone-sand shadow-xs transition-all duration-300 active:scale-95 cursor-pointer"
          >
            Reservar Turno
          </button>
        </div>

      </div>
    </header>
  );
}
