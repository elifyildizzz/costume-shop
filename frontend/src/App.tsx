import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './utils/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Costumes from './pages/Costumes';
import NewCostumes from './pages/NewCostumes'; 
import { CostumeDetail } from './pages/CostumeDetail';
import { Cart } from './pages/Cart';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import Accessories from './pages/Accessories';
import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';
import Welcome from './pages/Welcome';
import About from './pages/About';
import BankAccounts from './pages/BankAccounts';
import Terms from './pages/Terms';
import FAQ from './pages/FAQ';

// Geçici placeholder componentler
const Checkout = () => <div>Checkout sayfası - yakında gelecek</div>;
const Profile = () => <div>Profile sayfası - yakında gelecek</div>;
const Orders = () => <div>Orders sayfası - yakında gelecek</div>;
const NotFound = () => <div>404 - Sayfa bulunamadı</div>;

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="App flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/costumes" element={<Costumes />} />
                <Route path="/new-costumes" element={<NewCostumes />} /> {/* Yeni eklenen route */}
                <Route path="/aksesuarlar" element={<Accessories />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/bank" element={<BankAccounts />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/costumes/:id" element={<CostumeDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;