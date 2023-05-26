import axios from "axios";
import {filtrele} from "./card.js"

const Tablar = (konu) => {
  // GÖREV 3
  // ---------------------
  // Tek argümanı bir dizi ("konu") olan bu fonksiyonu uygulayın.
  // Örnek olarak, konu dizisi şu şekilde deklare edilmişse ['javascript', 'bootstrap', 'teknoloji']
  // fonksiyon aşağıdaki şekilde bir DOM öğesi döndürecek.
  // Kullanılan etiketler, öğelerin hiyerarşisi ve öznitelikleri sağlanan işaretlemeyle eşleşmelidir!
  // Öğelerin içindeki metin, "textContent" özelliği kullanılarak ayarlanacaktır ("innerText" DEĞİL).
  //
  // <div class="topics">
  //   <div class="tab">javascript</div>
  //   <div class="tab">bootstrap</div>
  //   <div class="tab">teknoloji</div>
  // </div>
  //
  const topics = document.createElement("div");
  topics.classList.add("topics");

  for (let tab of konu) {
    let yeniKonu = document.createElement("div");
    yeniKonu.classList.add("tab");
    yeniKonu.textContent = tab;
    topics.append(yeniKonu)
    yeniKonu.addEventListener("click", (e) => {
      filtrele(e.target.textContent)
      document.querySelectorAll(".tab").forEach((k)=>{
        if(k.classList.contains = "active-tab"){
           k.classList.remove("active-tab")
        }
       
      })
     e.target.classList.add("active-tab");

    });
  }
  
  return topics;
}

const tabEkleyici = (secici) => {
  // GÖREV 4
  // ---------------------
  // Tek argümanı olarak bir css seçici alan bu işlevi uygulayın.
  // Konuları bu uç noktadan almalıdır: `http://localhost:5001/api/konular` (console.log ile test edin!).
  // Yanıtın içindeki konu dizisini bulun ve Tablar bileşenini kullanarak tabları oluşturun.
  // Tabları, fonksiyona iletilen seçiciyle eşleşen DOM'daki öğeye ekleyin.
  //
  let veri = axios.get("http://localhost:5001/api/konular");
  veri.then(result => {
    document.querySelector(secici).append(Tablar(result.data.konular))
  })


}

export { Tablar, tabEkleyici }
