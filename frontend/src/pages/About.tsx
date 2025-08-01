import React from 'react';

const About: React.FC = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-text">
          <h1>Biz Kimiz?</h1>
          <p>
            Antalya'da kostüm kiralama denince akla gelen ilk adres olma hedefiyle yola çıktık. Şehrimizdeki sınırlı seçenekleri ve ulaşılması zor alternatifleri gördükçe, herkesin dilediği kostüme kolayca erişebilmesini sağlamak istedik.
          </p>
          <p>
            Kostüm sadece bir giysi değil; bazen bir kahraman olmanın, bazen bir masal dünyasına adım atmanın, bazen de bir anıyı ölümsüzleştirmenin yoludur. Biz de bu duyguyu paylaşan herkes için çeşitli, kaliteli ve özenle seçilmiş kostümleri bir araya getirdik.
          </p>
          <p>
            Günlük kiralama, özel günler, temalı partiler, tiyatro ya da okul etkinlikleri... Hangi amaçla olursa olsun, size en uygun kostümü bulmanız için buradayız.
          </p>
          <p>
            Antalya'da güvenilir, pratik ve şık bir kostüm deneyimi yaşamak isteyen herkesin ilk tercihi olmayı hedefliyoruz.
          </p>
          <p className="highlight">
            Hayal ettiğiniz karaktere bürünmek artık çok kolay!
          </p>
        </div>
        <div className="about-image">
          <img src="/images/bizkimiz.jpg" alt="Kostüm Akademi" />
        </div>
      </div>
    </div>
  );
};

export default About; 