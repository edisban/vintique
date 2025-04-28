// Helper function to save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Retrieve DOM elements
const productGrid = document.querySelector("#product-grid");
const cartCount = document.querySelector("#cart-count");
const toast = document.querySelector("#toast");
const form = document.querySelector("#product-form");
const backToTopBtn = document.createElement("div");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let customProducts = [];

// Initialize cart count
if (cartCount) cartCount.textContent = cart.length;

// Update the cart count and save cart to localStorage
function updateCart() {
  if (cartCount) cartCount.textContent = cart.length;
  saveCart();
}

// Toast notification
function showToast(message) {
  toast.textContent = message;
  toast.classList.remove("hidden");
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hidden");
  }, 2500);
}

// Add product to cart
function addToCart(title, price) {
  cart.push({ title, price });
  updateCart();
  showToast(`Προστέθηκε στο καλάθι: ${title} ✅`);
}

// Create product card
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

  // If it's a custom product, add delete functionality
  if (isCustom) {
    const deleteBtn = div.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      div.remove(); // Remove the product card from the page
      customProducts = customProducts.filter(p => p !== product); // Optionally remove from customProducts array
      showToast("Το προϊόν διαγράφηκε 🗑️");
    });
  }

  return div;
}

// Fetch products from the API
function fetchProducts() {
  fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => {
      data.forEach(product => {
        productGrid.appendChild(createProductCard(product));
      });
    })
    .catch(err => {
      console.error("Σφάλμα κατά τη φόρτωση προϊόντων:", err);
      productGrid.innerHTML = "<p>Αποτυχία φόρτωσης προϊόντων. Παρακαλώ δοκιμάστε ξανά αργότερα.</p>";
    });
}

// Toggle burger menu visibility
function toggleMenu() {
  document.querySelector("nav").classList.toggle("active");
}

// Handle custom product form submission
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const brand = document.querySelector("#brand").value;
    const image = document.querySelector("#image").value;
    const price = parseFloat(document.querySelector("#price").value);
    const description = document.querySelector("#description").value;

    if (title && image && !isNaN(price) && description) {
      const newProduct = {
        title: `${title} (${brand})`,
        image,
        price,
        description
      };
      customProducts.push(newProduct);
      productGrid.prepend(createProductCard(newProduct, true));
      document.querySelector("#modal").classList.add("hidden");
      form.reset();
      showToast("Το προϊόν προστέθηκε ✔️");
    }
  });
}

// Preview image while typing the image URL
document.querySelector("#image")?.addEventListener("input", e => {
  const preview = document.querySelector("#image-preview");
  if (preview) preview.src = e.target.value;
});

// Toggle dark mode
const darkToggle = document.querySelector("#dark-toggle");

function updateDarkIcon() {
  darkToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
}

darkToggle.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  updateDarkIcon();
};

// Apply saved theme from localStorage
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}
updateDarkIcon();

// Back to top button functionality
backToTopBtn.id = "backToTop";
backToTopBtn.innerHTML = "⬆️"; // Custom arrow icon
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
  backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

backToTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

// Fetch products initially
fetchProducts();
