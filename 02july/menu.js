// menu.js
function kategoriGoster(kategoriId) {
    var tumListeler = document.getElementsByClassName("urunler");

    // Tüm kategorileri gizle
    for (var i = 0; i < tumListeler.length; i++) {
        tumListeler[i].style.display = "none";
    }

    // Seçilen kategoriyi göster
    var secilen = document.getElementById(kategoriId);
    if (secilen) {
        secilen.style.display = "flex";
    }
}

// Sayfa açıldığında varsayılan kategori
window.onload = function () {
    kategoriGoster("sicak-kahveler");
};

