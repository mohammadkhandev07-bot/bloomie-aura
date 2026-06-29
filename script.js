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
      const termsErrorEl = document.getElementById("termsErrorMsg");
      const termsBoxEl = document.getElementById("termsAgreeBox");
      if (termsErrorEl) termsErrorEl.classList.remove("show");
      if (termsBoxEl) termsBoxEl.classList.remove("error");
      const errorViewEl = document.getElementById("orderErrorView");
      if (errorViewEl) errorViewEl.style.display = "none";
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
  const termsCheckbox = document.getElementById("orderTermsCheckbox");
  const termsAgreeBox = document.getElementById("termsAgreeBox");
  const termsErrorMsg = document.getElementById("termsErrorMsg");

  // Clear the terms error as soon as the box is checked.
  if (termsCheckbox) {
    termsCheckbox.addEventListener("change", () => {
      if (termsCheckbox.checked) {
        if (termsErrorMsg) termsErrorMsg.classList.remove("show");
        if (termsAgreeBox) termsAgreeBox.classList.remove("error");
      }
    });
  }

  /* ---------- Order submission ---------- */
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // ---- Terms & Conditions must be accepted before anything else ----
      if (termsCheckbox && !termsCheckbox.checked) {
        if (termsErrorMsg) termsErrorMsg.classList.add("show");
        if (termsAgreeBox) {
          termsAgreeBox.classList.add("error");
          termsAgreeBox.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return; // stop here — do not send the order
      }
      if (termsErrorMsg) termsErrorMsg.classList.remove("show");
      if (termsAgreeBox) termsAgreeBox.classList.remove("error");

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
      formData.append("Terms Accepted", "Yes — customer confirmed agreement to Terms & Conditions before placing this order.");

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

  /* ----------------------------------------------------------------
     Product Search (fuzzy — never returns a fully empty result)
     ----------------------------------------------------------------
     Matches against each card's name, description, and hidden
     data-search keywords. If nothing matches well, it falls back to
     showing the closest-scoring candles instead of an empty page.
  -----------------------------------------------------------------*/
  const searchInput = document.getElementById("productSearchInput");
  const searchClearBtn = document.getElementById("searchClearBtn");
  const searchResultNote = document.getElementById("searchResultNote");
  const noResultsMsg = document.getElementById("noResultsMsg");
  const productCards = Array.from(document.querySelectorAll(".product-card"));

  if (searchInput && productCards.length) {
    // Pre-build a searchable text blob for every card once.
    const cardData = productCards.map((card) => {
      const name = card.querySelector("h3")?.textContent || "";
      const desc = card.querySelector(".product-desc")?.textContent || "";
      const keywords = card.getAttribute("data-search") || "";
      return {
        card,
        name,
        haystack: `${name} ${desc} ${keywords}`.toLowerCase(),
      };
    });

    // Simple, dependency-free fuzzy score:
    // +heavy weight for direct substring matches (best signal),
    // +partial credit for shared characters/word-fragments (typo tolerance).
    function fuzzyScore(query, text) {
      query = query.trim().toLowerCase();
      if (!query) return 1; // empty query => everything matches equally
      if (text.includes(query)) return 100 + query.length; // strong direct hit

      const words = text.split(/\s+/);
      let best = 0;
      for (const word of words) {
        if (!word) continue;
        if (word.startsWith(query) || query.startsWith(word)) {
          best = Math.max(best, 60);
          continue;
        }
        // Character-overlap closeness (handles typos like "lavendr")
        let shared = 0;
        const wChars = word.split("");
        for (const ch of query) {
          const idx = wChars.indexOf(ch);
          if (idx !== -1) {
            shared++;
            wChars.splice(idx, 1);
          }
        }
        const ratio = shared / Math.max(query.length, word.length, 1);
        best = Math.max(best, ratio * 40);
      }
      return best;
    }

    function runSearch() {
      const query = searchInput.value;
      searchClearBtn.style.display = query ? "flex" : "none";

      if (!query.trim()) {
        productCards.forEach((c) => c.classList.remove("search-hidden"));
        searchResultNote.textContent = "";
        noResultsMsg.style.display = "none";
        return;
      }

      // Score every product against the query.
      const scored = cardData.map((d) => ({
        ...d,
        score: fuzzyScore(query, d.haystack),
      }));

      const DIRECT_THRESHOLD = 15; // "genuine" match cutoff
      const directHits = scored.filter((d) => d.score >= DIRECT_THRESHOLD);

      if (directHits.length > 0) {
        // Show genuine matches, hide the rest.
        const directSet = new Set(directHits.map((d) => d.card));
        cardData.forEach((d) => d.card.classList.toggle("search-hidden", !directSet.has(d.card)));
        noResultsMsg.style.display = "none";
        searchResultNote.innerHTML = `Showing <span class="search-highlight">${directHits.length}</span> candle${directHits.length === 1 ? "" : "s"} matching "<span class="search-highlight">${escapeHtml(query)}</span>"`;
      } else {
        // No genuine match — never show a blank page. Show the
        // closest-scoring candles instead (top 3) with a friendly note.
        const ranked = [...scored].sort((a, b) => b.score - a.score);
        const closest = ranked.slice(0, 3);
        const closestSet = new Set(closest.map((d) => d.card));
        cardData.forEach((d) => d.card.classList.toggle("search-hidden", !closestSet.has(d.card)));
        noResultsMsg.style.display = "block";
        searchResultNote.innerHTML = `No exact match for "<span class="search-highlight">${escapeHtml(query)}</span>" — showing our closest scents instead`;
      }
    }

    function escapeHtml(str) {
      const div = document.createElement("div");
      div.textContent = str;
      return div.innerHTML;
    }

    let searchDebounce;
    searchInput.addEventListener("input", () => {
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(runSearch, 120);
    });

    if (searchClearBtn) {
      searchClearBtn.addEventListener("click", () => {
        searchInput.value = "";
        runSearch();
        searchInput.focus();
      });
    }
  }
});
