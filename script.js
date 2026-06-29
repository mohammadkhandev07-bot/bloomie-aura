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

  const submitBtn = form ? form.querySelector(".modal-submit") : null;
  const errorView = document.getElementById("orderErrorView");

  /* ---------- Order submission ---------- */
  if (form) {
    form.addEventListener("submit", async (e) => {
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

      // Show a "sending..." state on the button.
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending Order...";
      }
      if (errorView) errorView.style.display = "none";

      const sent = await sendOrderToOwner(order);

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Order Now";
      }

      if (sent) {
        // Order reached the owner's inbox automatically — show success.
        if (formView) formView.style.display = "none";
        if (successView) successView.style.display = "block";
      } else {
        // Something went wrong (no internet, Formspree not set up yet, etc.)
        if (errorView) errorView.style.display = "block";
      }
    });
  }

  /* ----------------------------------------------------------------
     sendOrderToOwner(order)
     ----------------------------------------------------------------
     >>> SHOP OWNER / DEVELOPER: SET UP YOUR FORMSPREE ENDPOINT HERE <<<

     This sends the order straight to the owner's email inbox
     automatically — the customer does NOT need to do anything else
     after clicking "Order Now". No server of your own required.

     Setup (one-time, takes 2 minutes):
       1. Go to https://formspree.io and sign up (free).
       2. Create a new form and enter the email address where you
          want to receive orders (e.g. bloomeiandaura@gmail.com).
       3. Formspree will give you an endpoint URL that looks like:
            https://formspree.io/f/abc12345
       4. Paste that URL below, replacing "YOUR_FORMSPREE_ENDPOINT".
       5. Formspree will also send a one-time confirmation email to
          that inbox — open it and click "Confirm" or orders won't
          be delivered yet.

     That's it — every order placed on the website will now land
     directly in that inbox automatically.
  -----------------------------------------------------------------*/
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqevlpjq";

  async function sendOrderToOwner(order) {
    try {
      const formData = new FormData();
      formData.append("_subject", `New Order: ${order.product} (x${order.quantity})`);
      formData.append("_replyto", order.email);
      formData.append("Product", order.product);
      formData.append("Quantity", order.quantity);
      formData.append("Customer Name", order.name);
      formData.append("Phone Number", order.phone);
      formData.append("Email", order.email);
      formData.append("Delivery Address", order.address);
      formData.append("City", order.city);
      formData.append("Pincode", order.pincode);
      formData.append("Order Notes", order.notes || "None");

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: formData,
      });
      return response.ok;
    } catch (err) {
      console.error("Order could not be sent:", err);
      return false;
    }
  }
});
