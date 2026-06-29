/* ============================================
   Bloomei & Aura — shared script
   Handles: mobile nav toggle, "Add to Cart" popup,
   and sending the order details by email.
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  /* ---------- Order Modal ---------- */
  const overlay = document.getElementById("orderModal");
  const closeBtn = document.getElementById("orderModalClose");
  const form = document.getElementById("orderForm");
  const productNameField = document.getElementById("orderProductName");
  const modalProductLabel = document.getElementById("modalProductLabel");
  const formView = document.getElementById("orderFormView");
  const successView = document.getElementById("orderSuccessView");

  // Open modal whenever any "Add to Cart" button is clicked.
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productName = btn.getAttribute("data-product") || "Candle";
      if (productNameField) productNameField.value = productName;
      if (modalProductLabel) modalProductLabel.textContent = productName;
      if (formView) formView.style.display = "block";
      if (successView) successView.style.display = "none";
      if (form) form.reset();
      if (productNameField) productNameField.value = productName; // reset() clears it, so re-set
      if (overlay) overlay.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  function closeModal() {
    if (overlay) overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  /* ---------- Order submission ---------- */
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const order = {
        product: document.getElementById("orderProductName").value,
        name: document.getElementById("orderName").value.trim(),
        phone: document.getElementById("orderPhone").value.trim(),
        email: document.getElementById("orderEmail").value.trim(),
        address: document.getElementById("orderAddress").value.trim(),
        city: document.getElementById("orderCity").value.trim(),
        pincode: document.getElementById("orderPincode").value.trim(),
        quantity: document.getElementById("orderQty").value,
        notes: document.getElementById("orderNotes").value.trim(),
      };

      sendOrderByEmail(order);

      // Show success state inside the same modal.
      if (formView) formView.style.display = "none";
      if (successView) successView.style.display = "block";
    });
  }

  /* ----------------------------------------------------------------
     sendOrderByEmail(order)
     ----------------------------------------------------------------
     >>> SHOP OWNER: PUT YOUR RECEIVING EMAIL ADDRESS HERE <<<
     Replace the text inside the quotes below with the email address
     where you want every order to be sent.
  -----------------------------------------------------------------*/
  const SHOP_OWNER_EMAIL = "youremail@example.com"; // <-- PUT YOUR EMAIL HERE

  function sendOrderByEmail(order) {
    const subject = encodeURIComponent(`New Order: ${order.product} (x${order.quantity})`);
    const body = encodeURIComponent(
      `New order received from the Bloomei & Aura website:\n\n` +
      `Product: ${order.product}\n` +
      `Quantity: ${order.quantity}\n\n` +
      `Customer Name: ${order.name}\n` +
      `Phone Number: ${order.phone}\n` +
      `Email: ${order.email}\n\n` +
      `Delivery Address: ${order.address}\n` +
      `City: ${order.city}\n` +
      `Pincode: ${order.pincode}\n\n` +
      `Order Notes: ${order.notes || "None"}\n`
    );

    // This opens the customer's email app with everything pre-filled,
    // so they just have to hit "Send" — no backend/server needed.
    // (For a fully automatic, no-click email send, this line can later
    // be swapped for a backend service like EmailJS, Formspree, or a
    // custom server endpoint — ask your developer to wire that in here.)
    window.location.href = `mailto:${SHOP_OWNER_EMAIL}?subject=${subject}&body=${body}`;
  }
});
