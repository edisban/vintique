// src/components/AddProductModal.jsx
import React, { useEffect, useRef, useState } from "react";
import "../styles/modal.css";

function AddProductModal({ onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageData, setImageData] = useState(""); // data URL (Base64)
  const [error, setError] = useState("");

  const fileRef = useRef(null);
  const firstFieldRef = useRef(null);
  const modalRef = useRef(null);

  // ESC για κλείσιμο, αρχικό focus & απλός focus-trap
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        // keep focus inside the modal
        const focusables = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    // αρχικό focus
    firstFieldRef.current?.focus();

    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleOverlayClick = () => onClose();

  const handleFile = (e) => {
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
    reader.onload = () => setImageData(reader.result); // Base64
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || price === "" || isNaN(price)) {
      setError("Συμπλήρωσε σωστά τίτλο και τιμή.");
      return;
    }
    if (!imageData) {
      setError("Πρόσθεσε εικόνα.");
      return;
    }

    const newProduct = {
      id: "local-" + Date.now(),
      title,
      price: parseFloat(price),
      description,
      image: imageData,
    };

    onAdd(newProduct);
    onClose();

    // καθάρισμα
    setTitle("");
    setPrice("");
    setDescription("");
    setImageData("");
    setError("");
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="addProductTitle"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        <h2 id="addProductTitle">➕ Προσθήκη Προϊόντος</h2>

        <form onSubmit={handleSubmit}>
          <input
            ref={firstFieldRef}
            placeholder="Όνομα Προϊόντος"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="number"
            step="0.01"
            placeholder="Τιμή (€)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <textarea
            placeholder="Σχόλιο"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label className="file">
            Εικόνα (αρχείο)
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              ref={fileRef}
            />
          </label>

          {imageData && (
            <img
              src={imageData}
              alt="preview"
              style={{ maxWidth: 200, marginTop: 8, borderRadius: 8 }}
            />
          )}

          {error && (
            <p style={{ color: "crimson", margin: "8px 0 0" }}>{error}</p>
          )}

          <div className="modal-actions">
            <button type="submit">✅ Προσθήκη</button>
            <button type="button" onClick={onClose}>
              ❌ Άκυρο
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductModal;
