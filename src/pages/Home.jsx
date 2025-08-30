import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import AddProductModal from "../components/AddProductModal";
import SkeletonCard from "../components/SkeletonCard";

function Home({ showToast }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  // controls
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("name"); // 'name' | 'price-asc' | 'price-desc'

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        const local = JSON.parse(localStorage.getItem("customProducts")) || [];
        // προτιμώ τα τοπικά πρώτα
        setProducts([...local, ...data]);
      } catch (err) {
        console.error("API fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = (newProduct) => {
    const productWithId = { ...newProduct, id: `local-${Date.now()}` };
    setProducts((prev) => {
      const updated = [productWithId, ...prev];
      const custom = updated.filter((p) => p.id?.toString().startsWith("local-"));
      localStorage.setItem("customProducts", JSON.stringify(custom));
      return updated;
    });
    showToast?.("🆕 Προστέθηκε νέο προϊόν!");
  };

  // filter + sort
  const view = products
    .filter((p) => p.title?.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => {
      if (sort === "price-asc") return (a.price ?? 0) - (b.price ?? 0);
      if (sort === "price-desc") return (b.price ?? 0) - (a.price ?? 0);
      return (a.title ?? "").localeCompare(b.title ?? "");
    });

  return (
    <main className="container">
      <h2>👜 Τα Προϊόντα μας</h2>

      {/* Controls bar */}
      <div className="controls">
        <input
          className="control-input"
          type="search"
          placeholder="Αναζήτηση προϊόντος..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="control-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Ταξινόμηση"
        >
          <option value="name">Αλφαβητικά</option>
          <option value="price-asc">Τιμή ↑</option>
          <option value="price-desc">Τιμή ↓</option>
        </select>

        {/* αν θέλεις κουμπί και εδώ, ξεκλείδωσέ το:
        <button onClick={() => setShowModal(true)}>➕ Νέο Προϊόν</button>
        */}
      </div>

      <div className="products">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : view.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={() => showToast?.("✅ Προστέθηκε στο καλάθι!")}
              />
            ))}
      </div>

      {showModal && (
        <AddProductModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddProduct}
        />
      )}
    </main>
  );
}

export default Home;
