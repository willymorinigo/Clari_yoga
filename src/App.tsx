/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InfoSection from './components/InfoSection';
import ServicesPanel from './components/ServicesPanel';
import BookingForm from './components/BookingForm';
import MyReservations from './components/MyReservations';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { SERVICES } from './data';
import { Booking, Service } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'book' | 'my-bookings'>('home');
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | null>(null);
  const [bookingCount, setBookingCount] = useState<number>(0);
  const [refreshFlag, setRefreshFlag] = useState<number>(0);
  
  // Services state and authentication togglers
  const [services, setServices] = useState<Service[]>(SERVICES);
  const [isAdminActive, setIsAdminActive] = useState<boolean>(false);

  // Fetch updated services list from Express JSON backend on startup
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const resp = await fetch('/api/services');
        const data = await resp.json();
        if (data.success && Array.isArray(data.services)) {
          setServices(data.services);
        }
      } catch (err) {
        console.error('Error fetching services from backend. Using system defaults.', err);
      }
    };
    fetchServices();
  }, [refreshFlag]);

  // Sync / count non-cancelled bookings to update the Navbar badges
  const updateBookingCount = () => {
    try {
      const stored = localStorage.getItem('yoga_shiatsu_bookings');
      if (stored) {
        const parsed: Booking[] = JSON.parse(stored);
        const activeOnes = parsed.filter(b => b.status !== 'cancelled');
        setBookingCount(activeOnes.length);
      } else {
        setBookingCount(0);
      }
    } catch (err) {
      console.error('Error counting bookings', err);
    }
  };

  useEffect(() => {
    updateBookingCount();
  }, [refreshFlag]);

  // Handle direct booking click on a particular service from catalog
  const handleSelectServiceDirectly = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    setActiveTab('book');
  };

  // Triggered when booking completes successfully
  const handleBookingSuccess = () => {
    setRefreshFlag(prev => prev + 1);
    setPreselectedServiceId(null); // Clear once processed
  };

  const handleStartPlainBooking = () => {
    setPreselectedServiceId(null);
    setActiveTab('book');
  };

  const handleScrollToServices = () => {
    if (activeTab !== 'home') {
      setActiveTab('home');
      // Wait for tab switch rendering before scrolling
      setTimeout(() => {
        document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="zen-app-root" className="min-h-screen bg-stone-sand flex flex-col justify-between selection:bg-primary/20 selection:text-primary">
      
      {isAdminActive ? (
        <AdminPanel 
          services={services}
          onServicesUpdated={(updated) => setServices(updated)}
          onClose={() => setIsAdminActive(false)}
        />
      ) : (
        <>
          {/* Sticky Top Header section */}
          <Navbar 
            activeTab={activeTab} 
            setActiveTab={(tab) => {
              setActiveTab(tab);
              if (tab !== 'book') setPreselectedServiceId(null); // reset preselect
            }}
            bookingCount={bookingCount}
          />

          {/* Main Dynamic Workspace body */}
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              {activeTab === 'home' && (
                <motion.div
                  key="home-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Hero 
                    onStartBooking={handleStartPlainBooking}
                    onExploreServices={handleScrollToServices}
                  />
                  <InfoSection />
                  <ServicesPanel services={services} onSelectService={handleSelectServiceDirectly} />
                </motion.div>
              )}

              {activeTab === 'book' && (
                <motion.div
                  key="book-view"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="bg-stone-50/50 min-h-[70vh]"
                >
                  <BookingForm 
                    services={services}
                    preselectedServiceId={preselectedServiceId}
                    onBookingSuccess={handleBookingSuccess}
                    onViewReservations={() => setActiveTab('my-bookings')}
                  />
                </motion.div>
              )}

              {activeTab === 'my-bookings' && (
                <motion.div
                  key="my-bookings-view"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="bg-stone-50/50 min-h-[70vh]"
                >
                  <MyReservations 
                    services={services}
                    onStartBooking={handleStartPlainBooking}
                    refreshFlag={refreshFlag}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* Structured Footer / FAQ Panel */}
          <Footer onAdminClick={() => setIsAdminActive(true)} />
        </>
      )}

    </div>
  );
}
