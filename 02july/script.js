// Lightbox - fotoğrafa basınca büyütme
const CART_KEY = "cartItems";

document.addEventListener("DOMContentLoaded", () => {
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const closeBtn = document.getElementById("lbClose");

  function openLightbox(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || "";
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    lbImg.src = "";
    document.body.style.overflow = "";
  }

  // Sadece .click-zoom olan img'ler
  document.querySelectorAll("img.click-zoom").forEach(img => {
    img.addEventListener("click", () => openLightbox(img.src, img.alt));
  });

  // Kapatma: X'e bas, arka plana bas, ESC
  closeBtn.addEventListener("click", closeLightbox);

  lb.addEventListener("click", (e) => {
    if (e.target === lb || e.target === lbImg) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lb.classList.contains("open")) closeLightbox();
  });

  // Footer yılı (sende vardı, burada da çalışsın)
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
});



document.addEventListener("DOMContentLoaded", () => {

  /* 
     YORUM GÖNDER / TEMİZLE
  */
  const yorumMetni = document.getElementById("yorumMetni");
  const gonderBtn = document.getElementById("yorumGonder");
  const temizleBtn = document.getElementById("yorumTemizle");

  if (yorumMetni && gonderBtn && temizleBtn) {

    // Gönder butonu
    gonderBtn.addEventListener("click", () => {
      const yorum = yorumMetni.value.trim();

      if (yorum === "") {
        alert("Lütfen yorumunuzu yazın.");
        return;
      }

      alert("Yorumunuz için teşekkür ederiz ☕");
      yorumMetni.value = "";
    });

    // Temizle butonu
    temizleBtn.addEventListener("click", () => {
      if (yorumMetni.value.trim() !== "") {
        const onay = confirm("Yazdığınız yorumu silmek istiyor musunuz?");
        if (onay) {
          yorumMetni.value = "";
        }
      }
    });
  }

  /* =========================
     FOOTER YIL
  ========================== */
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});
 


//sepet

document.addEventListener("DOMContentLoaded", () => {
  const CART_KEY = "cartItems";

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
      return [];
    }
  }

 function updateCartBadge() {
  const badge = document.getElementById("sepetSayac");
  if (!badge) return;

  const cart = getCart(); // CART_KEY'den okuyan fonksiyonun
  const totalQty = cart.reduce((sum, item) => sum + (item.qty || 0), 0);

  if (totalQty > 0) {
    badge.textContent = totalQty;
    badge.style.display = "inline-block";
  } else {
    badge.style.display = "none";
  }
}function updateCartBadge() {
  const badge = document.getElementById("sepetSayac");
  if (!badge) return;

  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    cart = [];
  }

  const totalQty = cart.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);

  if (totalQty > 0) {
    badge.textContent = totalQty;
    badge.style.display = "inline-flex";
  } else {
    badge.textContent = "0";
    badge.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", updateCartBadge);
window.addEventListener("pageshow", updateCartBadge);


function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  updateCartBadge();
}

// Sayfa açılınca da güncellensin
document.addEventListener("DOMContentLoaded", updateCartBadge);

  function addToCart(item) {
    const cart = getCart();
    const existing = cart.find(x => x.name === item.name && x.img === item.img && x.price === item.price);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...item, qty: 1 });
    }
    saveCart(cart);
  }

  function formatTL(n) {
    return `${n} TL`;
  }

  // ✅ MENU.HTML: "Sepete Ekle" butonlarını dinle
  document.querySelectorAll(".sepet-ekle").forEach(btn => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.name || "Ürün";
      const price = Number(btn.dataset.price || 0);
      const img = btn.dataset.img || "";

      addToCart({ name, price, img });

      // mini bildirim (alert yerine daha tatlı)
      btn.textContent = "Eklendi ✓";
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = "Sepete Ekle";
        btn.disabled = false;
      }, 900);
    });
  });

  // ✅ SEPET.HTML: Sepeti render et
  const sepetListe = document.getElementById("sepetListe");
  const sepetToplam = document.getElementById("sepetToplam");
  const sepetBos = document.getElementById("sepetBos");
  const sepetTemizle = document.getElementById("sepetTemizle");
  const odemeYap = document.getElementById("odemeYap");

  function renderCart() {
    if (!sepetListe || !sepetToplam) return;

    const cart = getCart();

    if (cart.length === 0) {
      sepetListe.innerHTML = "";
      sepetToplam.textContent = formatTL(0);
      if (sepetBos) sepetBos.style.display = "block";
      return;
    }
    if (sepetBos) sepetBos.style.display = "none";

    let total = 0;

    sepetListe.innerHTML = cart.map((item, i) => {
      const line = item.price * item.qty;
      total += line;

      return `
        <div class="sepet-item" data-index="${i}">
          <div class="sepet-item-img">
            <img src="${item.img}" alt="${item.name}">
          </div>

          <div class="sepet-item-info">
            <div class="sepet-item-baslik">
              <h3>${item.name}</h3>
              <button type="button" class="sepet-sil" data-action="remove">Sil</button>
            </div>

            <div class="sepet-item-alt">
              <span class="sepet-fiyat">${formatTL(item.price)}</span>

              <div class="adet-kontrol">
                <button type="button" class="adet-btn" data-action="dec">−</button>
                <span class="adet-sayi">${item.qty}</span>
                <button type="button" class="adet-btn" data-action="inc">+</button>
              </div>

              <strong class="sepet-satir-toplam">${formatTL(line)}</strong>
            </div>
          </div>
        </div>
      `;
    }).join("");

    sepetToplam.textContent = formatTL(total);
  }

  function updateQty(index, delta) {
    const cart = getCart();
    if (!cart[index]) return;

    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
    saveCart(cart);
    renderCart();
  }

  function removeItem(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
  }

  if (sepetListe) {
    sepetListe.addEventListener("click", (e) => {
      const wrap = e.target.closest(".sepet-item");
      if (!wrap) return;

      const index = Number(wrap.dataset.index);
      const action = e.target.dataset.action;

      if (action === "inc") updateQty(index, +1);
      if (action === "dec") updateQty(index, -1);
      if (action === "remove") removeItem(index);
    });

    renderCart();
  }

  if (sepetTemizle) {
    sepetTemizle.addEventListener("click", () => {
      const ok = confirm("Sepeti tamamen temizlemek istiyor musun?");
      if (!ok) return;
      saveCart([]);
      renderCart();
    });
  }

  if (odemeYap) {
    odemeYap.addEventListener("click", () => {
      const cart = getCart();
      if (cart.length === 0) {
        alert("Sepet boş 🙂");
        return;
      }
      alert("Ödeme şu an demo 🙂 (ileride gerçek ödeme ekleriz)");
    });
  }

  // ✅ footer yılı (her sayfada çalışır)
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
});

document.addEventListener("DOMContentLoaded", () => {
  const CART_KEY = "cartItems";
  const COUPON_KEY = "cartCoupon"; // kaydetmek için

  function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch { return []; }
  }

  function getCoupon() {
    return (localStorage.getItem(COUPON_KEY) || "").trim();
  }

  function setCoupon(code) {
    localStorage.setItem(COUPON_KEY, code.trim());
  }

  function clearCoupon() {
    localStorage.removeItem(COUPON_KEY);
  }

  function calcSubtotal(cart) {
    return cart.reduce((sum, it) => sum + (Number(it.price) || 0) * (Number(it.qty) || 0), 0);
  }

  function getDiscountRate(code) {
    const c = (code || "").trim().toUpperCase();
    if (c === "ENVER10") return 0.10;
    return 0;
  }

  function fmtTL(n) {
    const x = Math.round((Number(n) || 0) * 100) / 100;
    return `${x} TL`;
  }

  // sepet sayfası elemanları varsa çalış
  const araToplamEl = document.getElementById("araToplam");
  const indirimEl = document.getElementById("indirimTutar");
  const genelToplamEl = document.getElementById("sepetToplam");

  const kuponInput = document.getElementById("kuponKodu");
  const kuponUygula = document.getElementById("kuponUygula");
  const kuponIptal = document.getElementById("kuponIptal");
  const kuponMesaj = document.getElementById("kuponMesaj");

  if (!araToplamEl || !indirimEl || !genelToplamEl) return;

  function updateTotals() {
    const cart = getCart();
    const sub = calcSubtotal(cart);

    const code = getCoupon();
    const rate = getDiscountRate(code);
    const discount = sub * rate;
    const total = sub - discount;

    araToplamEl.textContent = fmtTL(sub);
    indirimEl.textContent = fmtTL(discount);
    genelToplamEl.textContent = fmtTL(total);

    if (kuponInput) kuponInput.value = code;

    if (kuponIptal) kuponIptal.style.display = rate > 0 ? "inline-block" : "none";
    if (kuponMesaj) {
      if (!code) kuponMesaj.textContent = "";
      else if (rate > 0) kuponMesaj.textContent = `Kupon uygulandı: ${code.toUpperCase()} (%10 indirim)`;
      else kuponMesaj.textContent = "Kupon geçersiz.";
    }
  }

  // Kupon uygula
  if (kuponUygula && kuponInput) {
    kuponUygula.addEventListener("click", () => {
      const entered = (kuponInput.value || "").trim();
      const rate = getDiscountRate(entered);

      if (!entered) {
        if (kuponMesaj) kuponMesaj.textContent = "Kupon kodu gir.";
        return;
      }

      if (rate > 0) {
        setCoupon(entered.toUpperCase());
      } else {
        setCoupon(entered); // yazılanı tutalım, mesaj “geçersiz” göstersin
      }
      updateTotals();
    });

    // Enter ile uygula
    kuponInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") kuponUygula.click();
    });
  }

  // Kupon iptal
  if (kuponIptal) {
    kuponIptal.addEventListener("click", () => {
      clearCoupon();
      if (kuponInput) kuponInput.value = "";
      updateTotals();
    });
  }

  // Sepet değişince toplamlar da güncellensin diye:
  // renderCart çağrılan yerlerde bu event’i tetikle
  window.addEventListener("cart:updated", updateTotals);

  // İlk açılış
  updateTotals();
});
function sepetSayisiniGuncelle() {
    let sepet = JSON.parse(localStorage.getItem("sepet")) || [];
    let adet = 0;

    sepet.forEach(urun => {
        adet += urun.adet;
    });

    const sayac = document.getElementById("sepetSayac");

    if (sayac) {
        if (adet > 0) {
            sayac.innerText = adet;
            sayac.style.display = "inline-block";
        } else {
            sayac.style.display = "none";
        }
    }
}

sepetSayisiniGuncelle();
document.addEventListener("DOMContentLoaded", updateCartBadge);
function updateCartBadge() {
  const badge = document.getElementById("sepetSayac");
  if (!badge) return;

  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    cart = [];
  }

  const totalQty = cart.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);

  if (totalQty > 0) {
    badge.textContent = totalQty;
    badge.style.display = "inline-flex";
  } else {
    badge.textContent = "0";
    badge.style.display = "none";
  }
}

// Hem DOM yüklenince, hem sayfa tamamen yüklenince çalıştır
document.addEventListener("DOMContentLoaded", updateCartBadge);
window.addEventListener("load", updateCartBadge);
