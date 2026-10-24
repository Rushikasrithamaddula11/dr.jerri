import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MedicineStoreSection from './components/MedicineStoreSection';
import MedicineCartDrawer from './components/MedicineCartDrawer';
import LogisticsTrackerModal from './components/LogisticsTrackerModal';
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

  // E-Commerce Cart State
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('drjerri_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  // Realtime Logistics Tracker State
  const [trackerModalOpen, setTrackerModalOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(() => {
    try {
      const orders = JSON.parse(localStorage.getItem('drjerri_orders') || '[]');
      return orders.length > 0 ? orders[0] : null;
    } catch {
      return null;
    }
  });

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('drjerri_cart', JSON.stringify(cart));
    } catch {
      // Ignore
    }
  }, [cart]);

  // Cart Handlers
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleUpdateQty = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, qty: newQty } : item))
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Order Success Handler -> Launches Realtime Logistics Tracking
  const handleOrderSuccess = (newOrder) => {
    setActiveOrder(newOrder);
    setCart([]);
    setCartDrawerOpen(false);
    setTrackerModalOpen(true);
  };

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

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden text-slate-800">
      <Header
        onBookClick={handleOpenBooking}
        onPharmacyClick={handleOpenPharmacy}
        onDiagnosticsClick={handleOpenDiagnostics}
        cartCount={cartCount}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenTracker={() => setTrackerModalOpen(true)}
      />
      
      <main className="pb-16 lg:pb-0">
        <Hero
          onBookClick={handleOpenBooking}
          onPharmacyClick={handleOpenPharmacy}
          onDiagnosticsClick={handleOpenDiagnostics}
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
        />

        {/* Online Medicine Store & E-Commerce with UPI Payment Gateway */}
        <MedicineStoreSection
          cart={cart}
          onAddToCart={handleAddToCart}
          onUpdateQty={handleUpdateQty}
          onOpenCart={() => setCartDrawerOpen(true)}
          onOpenTracker={() => setTrackerModalOpen(true)}
          onOpenPharmacyModal={handleOpenPharmacy}
        />

        {/* Diagnostics & Lab Scans Section */}
        <DiagnosticsSection
          onBookDiagnostics={handleOpenDiagnostics}
        />

        {/* 24/7 In-House Pharmacy Overview Section */}
        <PharmacySection
          onOpenPharmacyOrder={handleOpenPharmacy}
        />

        {/* Specialist Doctors Section (Featuring Dr. Supriya Recommended Maternity & Prenatal Care) */}
        <DoctorsSection
          doctors={filteredDoctors}
          onBookClick={handleOpenBooking}
          onViewFlyer={handleViewFlyer}
        />

        {/* Clinical Procedures & Services Section (Saline, Injections, First Aid) */}
        <ServicesSection
          filteredServices={filteredServices}
          onSelectService={handleSelectService}
          onBookService={handleOpenBooking}
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
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenTracker={() => setTrackerModalOpen(true)}
      />

      <MobileBottomBar
        onBookClick={handleOpenBooking}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenTracker={() => setTrackerModalOpen(true)}
      />

      {/* Shopping Cart & UPI Payment Gateway Drawer */}
      <MedicineCartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Realtime Logistics Tracking Screen */}
      <LogisticsTrackerModal
        isOpen={trackerModalOpen}
        onClose={() => setTrackerModalOpen(false)}
        activeOrder={activeOrder}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedService={preselectedService}
      />

      {/* WhatsApp Pharmacy Order Modal */}
      <PharmacyOrderModal
        isOpen={pharmacyModalOpen}
        onClose={() => setPharmacyModalOpen(false)}
      />

      {/* Doctor Poster Flyer Modal */}
      <FlyerModal
        isOpen={flyerModalOpen}
        onClose={() => setFlyerModalOpen(false)}
        flyerData={flyerData}
      />

      {/* Service Detail Modal */}
      <ServiceDetailModal
        isOpen={serviceDetailModalOpen}
        onClose={() => setServiceDetailModalOpen(false)}
        service={selectedService}
        onBookService={handleOpenBooking}
      />

    </div>
  );
}
