import React from "react";
import { useCart } from "../context/CartContext";

function ProductCard({ product, onAdd }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
    if (onAdd) {
      onAdd(); // Αυτό καλεί το toast από το Home
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h4>{product.title}</h4>
      <p>{product.price} €</p>
      <button onClick={handleAdd}>Προσθήκη</button>
    </div>
  );
}

export default ProductCard;
