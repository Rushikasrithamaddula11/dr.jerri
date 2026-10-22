import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import ScheduleSection from './components/ScheduleSection';
import DoctorsSection from './components/DoctorsSection';
import ReviewsSection from './components/ReviewsSection';
import FAQSection from './components/FAQSection';
import LocationSection from './components/LocationSection';
import Footer from './components/Footer';
import MobileBottomBar from './components/MobileBottomBar';
import BookingModal from './components/BookingModal';
import FlyerModal from './components/FlyerModal';
import ServiceDetailModal from './components/ServiceDetailModal';
import { doctors, clinicalServices } from './data/clinicData';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');
  
  const [flyerModalOpen, setFlyerModalOpen] = useState(false);
  const [flyerData, setFlyerData] = useState(null);

  const [serviceDetailModalOpen, setServiceDetailModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('full'); // 'full' or 'mobile-preview'

  // Booking action handler
  const handleOpenBooking = (serviceName = 'General Consultation') => {
    setPreselectedService(serviceName);
    setBookingModalOpen(true);
  };

  // Flyer preview handler
  const handleViewFlyer = (image, title) => {
    setFlyerData({ image, title });
    setFlyerModalOpen(true);
  };

  // Service details handler
  const handleSelectService = (service) => {
    setSelectedService(service);
    setServiceDetailModalOpen(true);
  };

  // Smooth scroll to a doctor
  const handleScrollToDoctor = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-4', 'ring-teal-500');
      setTimeout(() => el.classList.remove('ring-4', 'ring-teal-500'), 2500);
    }
  };

  // Filtered lists based on search query
  const filteredDoctors = useMemo(() => {
    if (!searchQuery.trim()) return doctors;
    const q = searchQuery.toLowerCase().trim();
    return doctors.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q) ||
        d.keywords.toLowerCase().includes(q) ||
        d.treatments.some((t) => t.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return clinicalServices;
    const q = searchQuery.toLowerCase().trim();
    return clinicalServices.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.shortDesc.toLowerCase().includes(q) ||
        s.keywords.toLowerCase().includes(q) ||
        s.highlights.some((h) => h.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  return (
    <div className={`min-h-screen bg-slate-100 ${viewMode === 'mobile-preview' ? 'py-4 md:py-8' : ''}`}>
      
      {/* Desktop Preview Mode Switcher (Visible on desktop) */}
      <div className="hidden lg:flex justify-between items-center bg-slate-900 text-slate-300 px-6 py-2 text-xs border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="font-semibold text-white">Drjerrri Poly Clinic React Application</span>
          <span className="text-slate-400">| Fully responsive for both Desktop & Mobile</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode(viewMode === 'full' ? 'mobile-preview' : 'full')}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white px-3 py-1 rounded-full transition border border-slate-700 text-xs font-medium"
          >
            <i className={`fa-solid ${viewMode === 'full' ? 'fa-mobile-screen-button' : 'fa-desktop'}`}></i>
            <span>{viewMode === 'full' ? 'Preview Mobile Frame' : 'Full Desktop View'}</span>
          </button>
        </div>
      </div>

      {/* Main App Container */}
      <div
        className={`bg-white transition-all duration-300 ${
          viewMode === 'mobile-preview'
            ? 'max-w-md mx-auto shadow-2xl rounded-3xl border border-slate-300 overflow-hidden relative'
            : 'w-full'
        }`}
      >
        <Header onBookClick={handleOpenBooking} />
        
        <main>
          <Hero
            onBookClick={handleOpenBooking}
            onSearch={setSearchQuery}
            searchQuery={searchQuery}
          />

          <ServicesSection
            filteredServices={filteredServices}
            onSelectService={handleSelectService}
            onBookService={handleOpenBooking}
          />

          <DoctorsSection
            doctors={filteredDoctors}
            onBookClick={handleOpenBooking}
            onViewFlyer={handleViewFlyer}
          />

          <ScheduleSection
            onBookClick={handleOpenBooking}
            onScrollToDoctor={handleScrollToDoctor}
          />

          <ReviewsSection />

          <FAQSection />

          <LocationSection />
        </main>

        <Footer onBookClick={handleOpenBooking} />

        <MobileBottomBar onBookClick={handleOpenBooking} />
      </div>

      {/* Modals */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedService={preselectedService}
      />

      <FlyerModal
        isOpen={flyerModalOpen}
        onClose={() => setFlyerModalOpen(false)}
        flyerData={flyerData}
      />

      <ServiceDetailModal
        isOpen={serviceDetailModalOpen}
        onClose={() => setServiceDetailModalOpen(false)}
        service={selectedService}
        onBookService={handleOpenBooking}
      />

    </div>
  );
}
