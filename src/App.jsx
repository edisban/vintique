import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Layout from "./components/Layout";
import BackToTop from "./components/BackToTop";
import AddProductModal from "./components/AddProductModal"; // 🔹 ΝΕΟ

// Pages
import Home from "./pages/Home";
import Cart from "./pages/Cart";

// Context
import { CartProvider } from "./context/CartContext";

function App() {
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [showModal, setShowModal] = useState(false); // 🔹 ΝΕΟ

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  const handleAddProduct = (newProduct) => {
    const updated = [
      ...(JSON.parse(localStorage.getItem("customProducts")) || []),
      { ...newProduct, id: `local-${Date.now()}` }
    ];
    localStorage.setItem("customProducts", JSON.stringify(updated));
    showToast("🆕 Προστέθηκε νέο προϊόν!");
    setShowModal(false);
  };

  return (
    <CartProvider>
      <Router>
        <Layout
          toastMessage={toastMessage}
          toastVisible={toastVisible}
          onAddClick={() => setShowModal(true)} // 👈
        >
          <Routes>
            <Route path="/" element={<Home showToast={showToast} />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>

          {showModal && (
            <AddProductModal
              onClose={() => setShowModal(false)}
              onAdd={handleAddProduct}
            />
          )}

          <BackToTop />
        </Layout>
      </Router>
    </CartProvider>
  );
}

export default App;
