import React from "react";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, clearCart, removeItem } = useCart();

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <main className="container">
      <h2>🛒 Το Καλάθι Μου</h2>
      <div className="products">
        {cart.length === 0 ? (
          <p>Το καλάθι είναι άδειο.</p>
        ) : (
          cart.map((item) => (
            <div className="product-card" key={item.id}>
              <img src={item.image} alt={item.title} />
              <div className="info">
                <h3>{item.title}</h3>
                <p>{item.price.toFixed(2)} €</p>
                <p>Ποσότητα: {item.quantity}</p>
                <p>Σύνολο: {(item.price * item.quantity).toFixed(2)} €</p>

                {/* 🔻 Κουμπί Αφαίρεσης */}
                <button className="remove-btn" onClick={() => removeItem(item.id)}>
                  ❌ Αφαίρεση Προϊόντος
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <>
          <h3>Σύνολο: {getTotal()} €</h3>
          <button onClick={clearCart} className="remove-btn">
            🗑️ Άδειασμα Καλαθιού
          </button>
        </>
      )}
    </main>
  );
}

export default Cart;
