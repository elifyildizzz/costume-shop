import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('genel');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqData: FAQItem[] = [
    // Genel Sorular
    {
      question: "Kostüm Akademi'de hangi tür kostümler bulabilirim?",
      answer: "Koleksiyonumuzda tarihi kostümler, karakter kostümleri, parti kostümleri, çocuk kostümleri, aksesuarlar ve daha birçok kategori bulunmaktadır. Sürekli yeni kostümler ekliyoruz.",
      category: "genel"
    },
    {
      question: "Kiralama süresi ne kadar?",
      answer: "Minimum 1 gün, maksimum 30 gün kiralama yapabilirsiniz. Uzun süreli kiralama için özel anlaşma yapılabilir.",
      category: "genel"
    },
    {
      question: "Kostümler temiz mi?",
      answer: "Tüm kostümlerimiz her kiralama sonrası profesyonel olarak temizlenir ve dezenfekte edilir. Hijyen standartlarımız çok yüksektir.",
      category: "genel"
    },
    {
      question: "Kostümlerin bedenleri nasıl?",
      answer: "Kostümlerimiz S, M, L, XL bedenlerinde mevcuttur. Özel beden gereksinimleriniz için bizimle iletişime geçebilirsiniz.",
      category: "genel"
    },

    // Ödeme Soruları
    {
      question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
      answer: "Şu anda banka havalesi ve EFT transfer kabul ediyoruz. Kredi kartı ödemesi yakında eklenecektir.",
      category: "odeme"
    },
    {
      question: "Ödeme ne zaman yapılmalı?",
      answer: "Sipariş onayından sonra 24 saat içinde ödeme yapılmalıdır. Ödeme tamamlanmadan kostüm teslimi yapılmaz.",
      category: "odeme"
    },
    {
      question: "Peşinat ödemesi var mı?",
      answer: "Evet, %50 peşinat ödemesi gereklidir. Kalan tutar kostüm teslimi sırasında ödenir.",
      category: "odeme"
    },
    {
      question: "Fatura alabilir miyim?",
      answer: "Evet, tüm ödemeler için fatura kesiyoruz. Fatura bilgilerinizi ödeme sırasında belirtebilirsiniz.",
      category: "odeme"
    },

    // Kiralama Soruları
    {
      question: "Kostümü nasıl rezerve edebilirim?",
      answer: "Web sitemizden istediğiniz kostümü seçip rezervasyon yapabilirsiniz. En az 3 gün önceden rezervasyon yapmanızı öneririz.",
      category: "kiralama"
    },
    {
      question: "Kostümü ne zaman teslim alabilirim?",
      answer: "Kostümler genellikle kiralama gününün sabahı teslim edilir. Özel durumlar için farklı saatler ayarlanabilir.",
      category: "kiralama"
    },
    {
      question: "Kostümü nasıl iade etmeliyim?",
      answer: "Kostümler belirtilen tarihte, temiz ve hasarsız şekilde iade edilmelidir. İade sırasında kontrol yapılır.",
      category: "kiralama"
    },
    {
      question: "Kiralama süresini uzatabilir miyim?",
      answer: "Evet, müsaitlik durumuna göre kiralama süresini uzatabilirsiniz. Ek günler için ek ücret alınır.",
      category: "kiralama"
    },

    // Hasar ve İade
    {
      question: "Kostüm hasar görürse ne olur?",
      answer: "Hasar durumunda ek ücret alınabilir. Hasar miktarına göre tamir ücreti veya değer tazminatı istenebilir.",
      category: "hasar"
    },
    {
      question: "Kostümü kaybedersem ne olur?",
      answer: "Kayıp durumunda kostümün tam değeri ödenir. Bu durumda sigorta kapsamı devreye girer.",
      category: "hasar"
    },
    {
      question: "Kostümü erken iade edebilir miyim?",
      answer: "Evet, erken iade yapabilirsiniz ancak kiralama ücreti iade edilmez. Sadece temizlik ücreti düşülür.",
      category: "hasar"
    },
    {
      question: "Kostümü kirletirsem ne olur?",
      answer: "Kostümlerin temizlik ücreti dahil değildir. Kirletme durumunda temizlik ücreti alınabilir.",
      category: "hasar"
    },

    // İletişim ve Destek
    {
      question: "Acil kostüm ihtiyacım var, ne yapabilirim?",
      answer: "Acil durumlar için 7/24 telefon hattımız mevcuttur. +90 537 455 00 numarasından ulaşabilirsiniz.",
      category: "iletisim"
    },
    {
      question: "Kostüm önerisi alabilir miyim?",
      answer: "Evet, etkinliğiniz ve bütçenize göre kostüm önerileri sunuyoruz. Müşteri hizmetlerimizle iletişime geçin.",
      category: "iletisim"
    },
    {
      question: "Şikayet ve önerilerimi nasıl iletebilirim?",
      answer: "Şikayet ve önerilerinizi info@kostumakademi.com adresine gönderebilir veya telefonla iletişime geçebilirsiniz.",
      category: "iletisim"
    },
    {
      question: "Çalışma saatleriniz nedir?",
      answer: "Pazartesi-Cuma 09:00-18:00, Cumartesi 10:00-16:00 saatleri arasında hizmet veriyoruz. Pazar günleri kapalıyız.",
      category: "iletisim"
    }
  ];

  const categories = [
    { id: 'genel', name: 'Genel Sorular' },
    { id: 'odeme', name: 'Ödeme' },
    { id: 'kiralama', name: 'Kiralama' },
    { id: 'hasar', name: 'Hasar ve İade' },
    { id: 'iletisim', name: 'İletişim' }
  ];

  const filteredFAQs = faqData.filter(faq => faq.category === activeCategory);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="faq-page-minimal">
      {/* Hero Section */}
      <div className="faq-hero-minimal">
        <div className="faq-hero-content-minimal">
          <h1 className="faq-hero-title-minimal">
            Sıkça Sorulan Sorular
          </h1>
          <p className="faq-hero-subtitle-minimal">
            Kostüm Akademi hakkında merak ettiğiniz her şey burada!
          </p>
        </div>
      </div>

      {/* Ana İçerik */}
      <div className="faq-container-minimal">
        {/* Kategori Filtreleri */}
        <div className="faq-categories-minimal">
          <div className="faq-categories-grid-minimal">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`faq-category-btn-minimal ${
                  activeCategory === category.id ? 'faq-category-btn-active-minimal' : ''
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Listesi */}
        <div className="faq-list-minimal">
          {filteredFAQs.map((faq, index) => (
            <div key={index} className="faq-item-minimal">
              <button
                onClick={() => toggleItem(index)}
                className="faq-question-btn-minimal"
              >
                <h3 className="faq-question-minimal">
                  {faq.question}
                </h3>
                <svg
                  className={`faq-arrow-minimal ${
                    openItems.includes(index) ? 'faq-arrow-open-minimal' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openItems.includes(index) && (
                <div className="faq-answer-minimal">
                  <p className="faq-answer-text-minimal">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ; 