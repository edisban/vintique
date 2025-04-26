
const cartItemsContainer = document.getElementById("cart-items");
const totalEl = document.getElementById("cart-total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="https://via.placeholder.com/200" alt="product">
      <h3>${item.title}</h3>
      <strong>${item.price.toFixed(2)} €</strong>
      <br><br>
      <button onclick="removeItem(${index})">❌ Αφαίρεση</button>
    `;
    cartItemsContainer.appendChild(div);
    total += item.price;
  });

  totalEl.textContent = `Σύνολο: ${total.toFixed(2)} €`;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function clearCart() {
  localStorage.removeItem("cart");
  cart = [];
  renderCart();
}

renderCart();
