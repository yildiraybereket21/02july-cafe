// hesabim.js
function girisYap() {
    var kullanici = document.getElementById("kullanici-adi").value;
    var sifre = document.getElementById("sifre").value;

    if (kullanici === "" || sifre === "") {
        alert("Lütfen kullanıcı adı ve şifrenizi girin.");
    } else {
        alert("Giriş yapıldı. Hoş geldin " + kullanici + "!");
    }
}

