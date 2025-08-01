import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif' }}>
            Kullanıcı Sözleşmesi
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Kostüm Akademi platformunu kullanarak aşağıdaki şartları kabul etmiş sayılırsınız.
          </p>
        </div>
      </div>

      {/* Ana İçerik */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg max-w-none">
          {/* Giriş */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">1. Genel Hükümler</h2>
            <p className="text-gray-700 mb-4">
              Bu kullanıcı sözleşmesi ("Sözleşme"), Kostüm Akademi ("Şirket") ile platformu kullanan kişiler ("Kullanıcı") arasında geçerli olacaktır. 
              Platformu kullanarak bu sözleşmenin şartlarını kabul etmiş sayılırsınız.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Son güncelleme tarihi:</strong> 1 Ocak 2025
            </p>
          </div>

          {/* Hizmet Tanımı */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">2. Hizmet Tanımı</h2>
            <p className="text-gray-700 mb-4">
              Kostüm Akademi, kullanıcılarına kostüm kiralama hizmeti sunan bir platformdur. Hizmetlerimiz şunları içerir:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Kostüm katalog tarama ve seçim</li>
              <li>Online sipariş verme</li>
              <li>Ödeme işlemleri</li>
              <li>Kostüm teslimi ve iadesi</li>
              <li>Müşteri hizmetleri desteği</li>
            </ul>
          </div>

          {/* Kullanıcı Sorumlulukları */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">3. Kullanıcı Sorumlulukları</h2>
            <p className="text-gray-700 mb-4">Kullanıcılar aşağıdaki sorumluluklara sahiptir:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Doğru ve güncel bilgi sağlamak</li>
              <li>Platform güvenliğini tehlikeye atmamak</li>
              <li>Kiralanan kostümleri özenle kullanmak</li>
              <li>Ödeme yükümlülüklerini zamanında yerine getirmek</li>
              <li>Kiralama sürelerine uymak</li>
              <li>Kostümleri hasar vermeden iade etmek</li>
            </ul>
          </div>

          {/* Ödeme Şartları */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">4. Ödeme Şartları</h2>
            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ödeme Yöntemleri</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Banka havalesi</li>
                <li>EFT transfer</li>
                <li>Kredi kartı (yakında)</li>
              </ul>
            </div>
            <p className="text-gray-700 mb-4">
              <strong>Önemli:</strong> Ödeme tamamlanmadan kostüm teslimi yapılmaz. 
              Ödeme onayı genellikle 1-2 iş günü içinde tamamlanır.
            </p>
          </div>

          {/* Kiralama Şartları */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">5. Kiralama Şartları</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Minimum Kiralama</h3>
                <ul className="text-gray-700">
                  <li>• 1 gün minimum kiralama süresi</li>
                  <li>• Önceden rezervasyon gerekli</li>
                  <li>• %50 peşinat ödemesi</li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Maksimum Kiralama</h3>
                <ul className="text-gray-700">
                  <li>• 30 gün maksimum kiralama süresi</li>
                  <li>• Uzun süreli kiralama için özel anlaşma</li>
                  <li>• Ek günler için ek ücret</li>
                </ul>
              </div>
            </div>
          </div>

          {/* İade ve İptal */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">6. İade ve İptal Politikası</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-bold text-yellow-900 mb-4">İptal Koşulları</h3>
              <ul className="text-yellow-800">
                <li>• 7 gün öncesine kadar: %100 iade</li>
                <li>• 3-7 gün öncesi: %50 iade</li>
                <li>• 3 günden az: İade yok</li>
                <li>• Acil durumlar için özel değerlendirme</li>
              </ul>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-green-900 mb-4">İade Koşulları</h3>
              <ul className="text-green-800">
                <li>• Kostümler belirtilen tarihte iade edilmelidir</li>
                <li>• Hasar durumunda ek ücret alınabilir</li>
                <li>• Kayıp durumunda tam değer ödenir</li>
                <li>• Temizlik ücreti dahil değildir</li>
              </ul>
            </div>
          </div>

          {/* Gizlilik */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">7. Gizlilik Politikası</h2>
            <p className="text-gray-700 mb-4">
              Kişisel bilgileriniz KVKK kapsamında korunmaktadır. Toplanan bilgiler:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Ad, soyad, iletişim bilgileri</li>
              <li>Ödeme bilgileri (güvenli şekilde saklanır)</li>
              <li>Kiralama geçmişi</li>
              <li>İletişim kayıtları</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Bilgileriniz üçüncü taraflarla paylaşılmaz ve sadece hizmet kalitesini artırmak için kullanılır.
            </p>
          </div>

          {/* Sorumluluk Sınırları */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">8. Sorumluluk Sınırları</h2>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-red-900 mb-4">Şirket Sorumluluğu</h3>
              <ul className="text-red-800 mb-4">
                <li>• Kostüm kalitesi ve uygunluğu</li>
                <li>• Zamanında teslimat</li>
                <li>• Müşteri hizmetleri desteği</li>
                <li>• Güvenli ödeme işlemleri</li>
              </ul>
              <h3 className="text-xl font-bold text-red-900 mb-4">Kullanıcı Sorumluluğu</h3>
              <ul className="text-red-800">
                <li>• Kostümlerin özenle kullanılması</li>
                <li>• Zamanında iade</li>
                <li>• Hasar durumunda bildirim</li>
                <li>• Ödeme yükümlülüklerinin yerine getirilmesi</li>
              </ul>
            </div>
          </div>

          {/* Uyuşmazlık Çözümü */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">9. Uyuşmazlık Çözümü</h2>
            <p className="text-gray-700 mb-4">
              Bu sözleşmeden doğacak uyuşmazlıklar öncelikle müzakere yoluyla çözülmeye çalışılacaktır. 
              Anlaşma sağlanamazsa İstanbul Mahkemeleri ve İcra Müdürlükleri yetkilidir.
            </p>
          </div>

          {/* İletişim */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">10. İletişim</h2>
            <div className="bg-gray-50 rounded-2xl p-6">
              <p className="text-gray-700 mb-4">
                Bu sözleşme ile ilgili sorularınız için:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Yasal İşler</h3>
                  <p className="text-gray-700">legal@kostumakademi.com</p>
                  <p className="text-gray-700">+90 (212) 555 0124</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Müşteri Hizmetleri</h3>
                  <p className="text-gray-700">destek@kostumakademi.com</p>
                  <p className="text-gray-700">+90 (212) 555 0123</p>
                </div>
              </div>
            </div>
          </div>

          {/* Kabul */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Sözleşme Kabulü</h2>
            <p className="text-blue-800 mb-4">
              Platformu kullanarak bu sözleşmenin tüm şartlarını kabul etmiş sayılırsınız. 
              Sözleşme şartlarında değişiklik yapılması durumunda kullanıcılar bilgilendirilecektir.
            </p>
            <p className="text-blue-800">
              <strong>Son güncelleme:</strong> 1 Ocak 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms; 