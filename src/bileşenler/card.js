import axios from "axios";

const Card = (makale) => {
  // GÖREV 5
  // ---------------------
  // Aşağıda gördüğünüz işaretlemeyi döndürmesi gereken bu fonksiyonu uygulayın.
  // Tek argümanı olarak "anabaslik", "yazarFoto" ve "yazarAdı" özelliklerine sahip bir "makale" nesnesi alır.
  // Kullanılan etiketler, öğelerin hiyerarşisi ve öznitelikleri sağlanan işaretlemeyle tam olarak eşleşmelidir!
  // Öğelerin içindeki metin, "textContent" özelliği kullanılarak ayarlanacaktır ("innerText" DEĞİL).
  // Bir kullanıcı bir kartı tıkladığında makalenin başlığının konsola kaydedilmesi için click event dinleyicisi ekleyin.
  //
  // <div class="card">
  //   <div class="headline">{ anabaslik }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ yazarFoto }>
  //     </div>
  //     <span>{ yazarAdı } tarafından</span>
  //   </div>
  // </div>
  //
  const card = document.createElement("div");
  card.classList.add("card");

  const headline = document.createElement("div");
  headline.classList.add("headline");
  headline.textContent = makale.anabaslik;

  const author = document.createElement("div");
  author.classList.add("author");

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");

  const image = document.createElement("img")
  image.setAttribute("src", makale.yazarFoto)

  const yazar = document.createElement("span");
  yazar.textContent = makale.yazarAdi + " tarafından"

  card.addEventListener("click", (e) => {
    console.log(headline.textContent);
  })

  card.append(headline, author)
  author.append(imgContainer, yazar)
  imgContainer.append(image)

  return card;
}
export const filtrele = (category) => {
  if (category == "all") {
    cardEkleyici(".cards-container")
  } else {
    const veriler = axios.get("http://localhost:5001/api/makaleler");
    veriler.then(veri => {

      let gelenVeri = veri.data.makaleler[category];
      document.querySelector(".cards-container").textContent = "";
      for (let key of gelenVeri) {
        document.querySelector(".cards-container").append(Card(key))
      }
    })
  }

}
const cardEkleyici = (secici) => {
  // GÖREV 6
  // ---------------------
  // Tek bağımsız değişkeni olarak bir css seçici alan bu fonksiyonu uygulayın.
  // Makaleleri bu uç noktadan almalıdır: `http://localhost:5001/api/makaleler` (console.log ile test edin!!).
  // Bununla birlikte, makaleler tek bir düzenli dizi halinde organize edilmemiştir. Yanıtı yakından inceleyin!
  // Card bileşenini kullanarak yanıttaki her makale nesnesinden bir kart oluşturun.
  // Her cardı, fonksiyona iletilen seçiciyle eşleşen DOM'daki öğeye ekleyin.
  //
  const veriler = axios.get("http://localhost:5001/api/makaleler");
  veriler.then(veri => {

    let gelenVeri = veri.data.makaleler;
    for (let konu in gelenVeri) {
      for (let key of gelenVeri[konu]) {
        key.kategori = konu
        document.querySelector(secici).append(Card(key))
      }
    }

  })


}

export { Card, cardEkleyici }
