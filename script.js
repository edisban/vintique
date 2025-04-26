
const productGrid = document.getElementById("product-grid");
const cartCount = document.getElementById("cart-count");
const toast = document.getElementById("toast");
const form = document.getElementById("product-form");
const backToTopBtn = document.createElement("div");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let customProducts = [];

if (cartCount) cartCount.textContent = cart.length;

// Ενημέρωση καλαθιού
function updateCart() {
  if (cartCount) cartCount.textContent = cart.length;
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Toast ειδοποίηση
function showToast(message) {
  toast.textContent = message;
  toast.classList.remove("hidden");
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hidden");
  }, 2500);
}

// Προσθήκη στο καλάθι
function addToCart(title, price) {
  cart.push({ title, price });
  updateCart();
  showToast(`Προστέθηκε στο καλάθι: ${title} ✅`);
}

// Δημιουργία κάρτας προϊόντος
function createProductCard(product, isCustom = false) {
  const div = document.createElement("div");
  div.className = "product";

  div.innerHTML = `
    <img src="${product.image}" alt="${product.title}">
    <h3>${product.title}</h3>
    <p>${product.description.substring(0, 60)}...</p>
    <strong>${product.price.toFixed(2)} €</strong>
    <br><br>
    <button onclick="addToCart('${product.title}', ${product.price})">Προσθήκη στο καλάθι</button>
    ${isCustom ? '<button class="delete-btn">🗑️ Διαγραφή</button>' : ""}
  `;

  // Αν είναι custom προϊόν, πρόσθεσε δυνατότητα διαγραφής
  if (isCustom) {
    const deleteBtn = div.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      div.remove(); // Αφαιρεί την κάρτα από τη σελίδα
      customProducts = customProducts.filter(p => p !== product); // Προαιρετικά καθαρίζει και από array
      showToast("Το προϊόν διαγράφηκε 🗑️");
    });
  }

  return div;
}


// Φόρτωση API προϊόντων
fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(data => {
    data.forEach(product => {
      productGrid.appendChild(createProductCard(product));
    });
  })
  .catch(err => {
    console.error("Σφάλμα κατά τη φόρτωση προϊόντων:", err);
  });

// Burger menu toggle
function toggleMenu() {
  document.querySelector("nav").classList.toggle("active");
}

// Submit custom product
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const brand = document.getElementById("brand").value;
    const image = document.getElementById("image").value;
    const price = parseFloat(document.getElementById("price").value);
    const description = document.getElementById("description").value;

    if (title && image && !isNaN(price) && description) {
      const newProduct = {
        title: `${title} (${brand})`,
        image,
        price,
        description
      };
      customProducts.push(newProduct);
      productGrid.prepend(createProductCard(newProduct, true));
      document.getElementById("modal").classList.add("hidden");
      form.reset();
      showToast("Το προϊόν προστέθηκε ✔️");
    }
  });
}

// Preview εικόνας κατά την πληκτρολόγηση (αν θέλεις: δες html πλευρά)
document.getElementById("image")?.addEventListener("input", e => {
  const preview = document.getElementById("image-preview");
  if (preview) preview.src = e.target.value;
});

// Dark mode toggle
const darkToggle = document.getElementById("dark-toggle");

function updateDarkIcon() {
  darkToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
}

darkToggle.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  updateDarkIcon();
};

// Εφαρμογή από localStorage
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}
updateDarkIcon();


// Back to top
backToTopBtn.id = "backToTop";
backToTopBtn.innerHTML = "↑";
document.body.appendChild(backToTopBtn);

window.onscroll = () => {
  backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
};

backToTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
