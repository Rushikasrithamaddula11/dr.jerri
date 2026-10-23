import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import DiagnosticsSection from './components/DiagnosticsSection';
import PharmacySection from './components/PharmacySection';
import ServicesSection from './components/ServicesSection';
import ScheduleSection from './components/ScheduleSection';
import DoctorsSection from './components/DoctorsSection';
import ReviewsSection from './components/ReviewsSection';
import FAQSection from './components/FAQSection';
import LocationSection from './components/LocationSection';
import Footer from './components/Footer';
import MobileBottomBar from './components/MobileBottomBar';
import BookingModal from './components/BookingModal';
import PharmacyOrderModal from './components/PharmacyOrderModal';
import FlyerModal from './components/FlyerModal';
import ServiceDetailModal from './components/ServiceDetailModal';
import { doctors, clinicalServices } from './data/clinicData';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');
  
  const [pharmacyModalOpen, setPharmacyModalOpen] = useState(false);

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

  // Diagnostics booking
  const handleOpenDiagnostics = (pkgName = 'Diagnostics / Lab Test') => {
    setPreselectedService(pkgName);
    setBookingModalOpen(true);
  };

  // Pharmacy order handler
  const handleOpenPharmacy = () => {
    setPharmacyModalOpen(true);
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
      el.classList.add('ring-4', 'ring-purple-500');
      setTimeout(() => el.classList.remove('ring-4', 'ring-purple-500'), 2500);
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
    <div className={`min-h-screen bg-purple-950/20 w-full overflow-x-hidden ${viewMode === 'mobile-preview' ? 'py-4 md:py-8' : ''}`}>
      
      {/* Desktop Preview Mode Switcher (Visible on desktop) */}
      <div className="hidden lg:flex justify-between items-center bg-royal-deep text-purple-200 px-6 py-2 text-xs border-b border-purple-900">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-400"></span>
          <span className="font-bold text-white">Drjerrri Poly Clinic, Diagnostics & Pharmacy</span>
          <span className="text-purple-300">| Royal Purple Medical Suite (#3a2081)</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode(viewMode === 'full' ? 'mobile-preview' : 'full')}
            className="flex items-center gap-1.5 bg-royal hover:bg-royal-light text-white px-3.5 py-1 rounded-full transition border border-purple-400/30 text-xs font-semibold"
          >
            <i className={`fa-solid ${viewMode === 'full' ? 'fa-mobile-screen-button' : 'fa-desktop'}`}></i>
            <span>{viewMode === 'full' ? 'Preview Mobile Frame' : 'Full Desktop View'}</span>
          </button>
        </div>
      </div>

      {/* Main App Container */}
      <div
        className={`bg-white transition-all duration-300 w-full overflow-x-hidden ${
          viewMode === 'mobile-preview'
            ? 'max-w-md mx-auto shadow-2xl rounded-3xl border border-purple-300 relative'
            : ''
        }`}
      >
        <Header
          onBookClick={handleOpenBooking}
          onPharmacyClick={handleOpenPharmacy}
          onDiagnosticsClick={handleOpenDiagnostics}
        />
        
        <main>
          <Hero
            onBookClick={handleOpenBooking}
            onPharmacyClick={handleOpenPharmacy}
            onDiagnosticsClick={handleOpenDiagnostics}
            onSearch={setSearchQuery}
            searchQuery={searchQuery}
          />

          {/* Diagnostics Section */}
          <DiagnosticsSection
            onBookDiagnostics={handleOpenDiagnostics}
          />

          {/* Pharmacy Section */}
          <PharmacySection
            onOpenPharmacyOrder={handleOpenPharmacy}
          />

          {/* Clinical Procedures & Services Section */}
          <ServicesSection
            filteredServices={filteredServices}
            onSelectService={handleSelectService}
            onBookService={handleOpenBooking}
          />

          {/* Specialist Doctors Section */}
          <DoctorsSection
            doctors={filteredDoctors}
            onBookClick={handleOpenBooking}
            onViewFlyer={handleViewFlyer}
          />

          {/* Daily OPD Timings Matrix */}
          <ScheduleSection
            onBookClick={handleOpenBooking}
            onScrollToDoctor={handleScrollToDoctor}
          />

          {/* Patient Reviews Section */}
          <ReviewsSection />

          {/* FAQ Section */}
          <FAQSection />

          {/* Location & Contact Section */}
          <LocationSection />
        </main>

        <Footer
          onBookClick={handleOpenBooking}
          onPharmacyClick={handleOpenPharmacy}
          onDiagnosticsClick={handleOpenDiagnostics}
        />

        <MobileBottomBar
          onBookClick={handleOpenBooking}
          onPharmacyClick={handleOpenPharmacy}
        />
      </div>

      {/* Modals */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedService={preselectedService}
      />

      <PharmacyOrderModal
        isOpen={pharmacyModalOpen}
        onClose={() => setPharmacyModalOpen(false)}
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
