import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileBottomBar from './components/MobileBottomBar';
import MedicineCartDrawer from './components/MedicineCartDrawer';
import LogisticsTrackerModal from './components/LogisticsTrackerModal';
import BookingModal from './components/BookingModal';
import PharmacyOrderModal from './components/PharmacyOrderModal';
import FlyerModal from './components/FlyerModal';
import ServiceDetailModal from './components/ServiceDetailModal';

// Dedicated Separate Pages
import HomePage from './pages/HomePage';
import PharmacyStorePage from './pages/PharmacyStorePage';
import LogisticsPage from './pages/LogisticsPage';
import DoctorsPage from './pages/DoctorsPage';
import DiagnosticsPage from './pages/DiagnosticsPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import AuthPage from './pages/AuthPage';
import LandingPage from './pages/LandingPage';
import AdminPortalPage from './pages/AdminPortalPage';

import { doctors, clinicalServices } from './data/clinicData';
import { medicinesList } from './data/medicinesData';

export default function App() {
  // Page routing helper: 'home' | 'store' | 'logistics' | 'doctors' | 'diagnostics' | 'services' | 'contact' | 'login' | 'signup' | 'admin'
  const getPageFromHash = () => {
    const hash = window.location.hash.replace('#/', '').replace('#', '').trim().toLowerCase();
    if (['store', 'pharmacy'].includes(hash)) return 'store';
    if (['logistics', 'track'].includes(hash)) return 'logistics';
    if (['doctors'].includes(hash)) return 'doctors';
    if (['diagnostics', 'scans'].includes(hash)) return 'diagnostics';
    if (['services', 'procedures'].includes(hash)) return 'services';
    if (['contact', 'location'].includes(hash)) return 'contact';
    if (['login', 'signin', 'auth'].includes(hash)) return 'login';
    if (['signup', 'register'].includes(hash)) return 'signup';
    if (['admin', 'dashboard', 'portal'].includes(hash)) return 'admin';
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState(getPageFromHash);

  // Listen to hash changes (back/forward browser buttons)
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getPageFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('drjerri_auth');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      handleNavigate('admin');
    } else {
      handleNavigate('home');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('drjerri_auth');
    setCurrentUser(null);
    handleNavigate('home');
  };

  // Custom Medicines State (added via Admin Portal)
  const [customMedicines, setCustomMedicines] = useState(() => {
    try {
      const saved = localStorage.getItem('drjerri_custom_medicines');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleAddMedicine = (newMed) => {
    setCustomMedicines((prev) => {
      const updated = [newMed, ...prev];
      try {
        localStorage.setItem('drjerri_custom_medicines', JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const handleDeleteMedicine = (medId) => {
    setCustomMedicines((prev) => {
      const updated = prev.filter((m) => m.id !== medId);
      try {
        localStorage.setItem('drjerri_custom_medicines', JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const handleToggleMedicineStock = (medId) => {
    setCustomMedicines((prev) => {
      const updated = prev.map((m) =>
        m.id === medId ? { ...m, inStock: m.inStock === false ? true : false } : m
      );
      try {
        localStorage.setItem('drjerri_custom_medicines', JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const allMedicines = useMemo(() => {
    return [...customMedicines, ...medicinesList];
  }, [customMedicines]);

  // Modals state
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');
  
  const [pharmacyModalOpen, setPharmacyModalOpen] = useState(false);

  const [flyerModalOpen, setFlyerModalOpen] = useState(false);
  const [flyerData, setFlyerData] = useState(null);

  const [serviceDetailModalOpen, setServiceDetailModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');

  // Shopping Cart State
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

  // Cart actions
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

  // Order Success -> Sets order and redirects to live logistics tracking
  const handleOrderSuccess = (newOrder) => {
    setActiveOrder(newOrder);
    setCart([]);
    setCartDrawerOpen(false);
    handleNavigate('logistics');
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

  // Smooth scroll to doctor
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

  // If user is not authenticated and is NOT requesting the isolated internal staff portal (#/admin),
  // require sign in and render the dedicated Landing Page with integrated Sign In and Sign Up!
  if (!currentUser && currentPage !== 'admin') {
    return (
      <LandingPage
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden text-slate-800 flex flex-col justify-between">
      
      {/* Universal Top Header */}
      <Header
        activePage={currentPage}
        onNavigate={handleNavigate}
        onBookClick={handleOpenBooking}
        cartCount={cartCount}
        onOpenCart={() => setCartDrawerOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Dynamic Dedicated Separate Pages */}
      <main className="flex-1">
        {/* PAGE 1: CLINIC HOME */}
        {currentPage === 'home' && (
          <HomePage
            onBookClick={handleOpenBooking}
            onPharmacyClick={handleOpenPharmacy}
            onDiagnosticsClick={handleOpenDiagnostics}
            onViewFlyer={handleViewFlyer}
            onSelectService={handleSelectService}
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            filteredDoctors={filteredDoctors}
            filteredServices={filteredServices}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onScrollToDoctor={handleScrollToDoctor}
          />
        )}

        {/* PAGE 2: MEDICINE STORE (PROTECTED: REQUIRES LOGIN) */}
        {currentPage === 'store' && (
          <PharmacyStorePage
            medicines={allMedicines}
            cart={cart}
            onAddToCart={handleAddToCart}
            onUpdateQty={handleUpdateQty}
            onOpenCart={() => setCartDrawerOpen(true)}
            onOpenTracker={() => handleNavigate('logistics')}
            onOpenPharmacyModal={handleOpenPharmacy}
            onNavigate={handleNavigate}
            currentUser={currentUser}
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {/* PAGE 3: REALTIME LOGISTICS TRACKER */}
        {currentPage === 'logistics' && (
          <LogisticsPage
            onNavigate={handleNavigate}
          />
        )}

        {/* PAGE 4: SPECIALIST DOCTORS OPD */}
        {currentPage === 'doctors' && (
          <DoctorsPage
            onBookClick={handleOpenBooking}
            onViewFlyer={handleViewFlyer}
            onNavigate={handleNavigate}
          />
        )}

        {/* PAGE 5: DIAGNOSTICS & SCANS */}
        {currentPage === 'diagnostics' && (
          <DiagnosticsPage
            onBookDiagnostics={handleOpenDiagnostics}
            onNavigate={handleNavigate}
          />
        )}

        {/* PAGE 6: CLINICAL SERVICES & PROCEDURES */}
        {currentPage === 'services' && (
          <ServicesPage
            onSelectService={handleSelectService}
            onBookService={handleOpenBooking}
          />
        )}

        {/* PAGE 7: CONTACT & MAP */}
        {currentPage === 'contact' && (
          <ContactPage
            onBookClick={handleOpenBooking}
            onNavigate={handleNavigate}
          />
        )}

        {/* PAGE 8: PATIENT SIGN IN (SEPARATE PAGE, NO ADMIN ACCESS SHOWN) */}
        {currentPage === 'login' && (
          <AuthPage
            initialMode="signin"
            onLoginSuccess={handleLoginSuccess}
            onNavigate={handleNavigate}
            returnPage="store"
          />
        )}

        {/* PAGE 9: PATIENT SIGN UP (SEPARATE PAGE, NO ADMIN ACCESS SHOWN) */}
        {currentPage === 'signup' && (
          <AuthPage
            initialMode="signup"
            onLoginSuccess={handleLoginSuccess}
            onNavigate={handleNavigate}
            returnPage="store"
          />
        )}

        {/* PAGE 10: DEDICATED STAFF & ADMIN PORTAL */}
        {currentPage === 'admin' && (
          <AdminPortalPage
            currentUser={currentUser}
            onLoginSuccess={handleLoginSuccess}
            onLogout={handleLogout}
            onNavigate={handleNavigate}
            customMedicines={customMedicines}
            onAddMedicine={handleAddMedicine}
            onDeleteMedicine={handleDeleteMedicine}
            onToggleMedicineStock={handleToggleMedicineStock}
          />
        )}
      </main>

      {/* Universal Footer */}
      <Footer
        onBookClick={handleOpenBooking}
        onNavigate={handleNavigate}
        onOpenCart={() => setCartDrawerOpen(true)}
      />

      {/* Universal Mobile Bottom Bar */}
      <MobileBottomBar
        activePage={currentPage}
        onNavigate={handleNavigate}
        onBookClick={handleOpenBooking}
        onOpenCart={() => setCartDrawerOpen(true)}
        cartCount={cartCount}
      />

      {/* Shopping Cart & UPI Payment Gateway Drawer (Secured with Login) */}
      <MedicineCartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onOrderSuccess={handleOrderSuccess}
        currentUser={currentUser}
        onNavigate={handleNavigate}
      />

      {/* Realtime Logistics Tracker Modal */}
      <LogisticsTrackerModal
        isOpen={trackerModalOpen}
        onClose={() => setTrackerModalOpen(false)}
        activeOrder={activeOrder}
      />

      {/* Doctor Token Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedService={preselectedService}
      />

      {/* WhatsApp Prescription Order Modal */}
      <PharmacyOrderModal
        isOpen={pharmacyModalOpen}
        onClose={() => setPharmacyModalOpen(false)}
      />

      {/* Doctor Flyer Preview Modal */}
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
