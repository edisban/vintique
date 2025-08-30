import React, { useState } from "react";

function ProductForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(""); // data URL (Base64)
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setError("");
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Διάλεξε αρχείο εικόνας.");
      return;
    }
    const max = 2 * 1024 * 1024; // 2MB
    if (file.size > max) {
      setError("Η εικόνα είναι πάνω από 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result); // Base64
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !image || !description || price === "" || isNaN(price)) {
      setError("Συμπλήρωσε όλα τα πεδία σωστά.");
      return;
    }

    const newProduct = {
      title: brand ? `${title} (${brand})` : title,
      image, // Base64 ή data URL
      price: parseFloat(price),
      description,
    };

    onAdd(newProduct);
    alert("Προστέθηκε επιτυχώς!");

    // reset
    setTitle("");
    setBrand("");
    setPrice("");
    setImage("");
    setDescription("");
    setError("");
    // καθάρισε και το file input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const fileInputRef = React.useRef(null);

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Τίτλος"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        placeholder="Brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      />
      <input
        placeholder="Τιμή"
        type="number"
        step="0.01"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      {/* ΝΕΟ: file input αντί για URL */}
      <label>
        Εικόνα (αρχείο)
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
      </label>

      {/* Preview */}
      {image && (
        <img
          src={image}
          alt="preview"
          style={{ maxWidth: 180, display: "block", marginTop: 8, borderRadius: 8 }}
        />
      )}

      <textarea
        placeholder="Περιγραφή"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      {error && <p style={{ color: "crimson", marginTop: 8 }}>{error}</p>}

      <button type="submit">Προσθήκη</button>
    </form>
  );
}

export default ProductForm;
