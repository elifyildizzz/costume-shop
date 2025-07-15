import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Costumes from './pages/Costumes';
import { CostumeDetail } from './pages/CostumeDetail';
import { Cart } from './pages/Cart';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import NewCostumes from './pages/NewCostumes';

// Geçici placeholder componentler
const Checkout = () => <div>Checkout sayfası - yakında gelecek</div>;
const Profile = () => <div>Profile sayfası - yakında gelecek</div>;
const Orders = () => <div>Orders sayfası - yakında gelecek</div>;
const NotFound = () => <div>404 - Sayfa bulunamadı</div>;

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/costumes" element={<Costumes />} />
                <Route path="/costumes/:id" element={<CostumeDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/new-costumes" element={<NewCostumes />} />
                {/* 404 route'u HER ZAMAN en son olmalı */}
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