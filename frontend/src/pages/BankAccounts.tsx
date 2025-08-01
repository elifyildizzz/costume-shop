import React from 'react';

const BankAccounts: React.FC = () => {
  return (
    <div className="bank-page-minimal">
      {/* Hero Section */}
      <div className="bank-hero-minimal">
        <div className="bank-hero-content-minimal">
          <h1 className="bank-hero-title-minimal">
            Banka Hesapları
          </h1>
          <p className="bank-hero-subtitle-minimal">
            Güvenli ödeme seçenekleri ile hizmetinizdeyiz. Aşağıdaki banka hesaplarımızdan herhangi birine ödeme yapabilirsiniz.
          </p>
        </div>
      </div>

      {/* Ana İçerik */}
      <div className="bank-container-minimal">
        {/* Güvenlik Uyarısı */}
        <div className="bank-warning-minimal">
          <svg className="bank-warning-icon-minimal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="bank-warning-content-minimal">
            <h3 className="bank-warning-title-minimal">Güvenlik Uyarısı</h3>
            <p className="bank-warning-text-minimal">
              Ödeme yaparken lütfen hesap sahibi adının "KOSTÜM AKADEMİ" olduğunu kontrol edin. 
              Farklı hesap sahibi adlarına ödeme yapmayın. Şüpheli durumlarda bizimle iletişime geçin.
            </p>
          </div>
        </div>

        {/* Banka Hesapları */}
        <div className="bank-accounts-grid-minimal">
          {/* Garanti BBVA */}
          <div className="bank-account-card-minimal">
            <div className="bank-account-header-minimal">
              <div>
                <h3 className="bank-account-title-minimal">Garanti BBVA</h3>
                <p className="bank-account-subtitle-minimal">TL Hesabı</p>
              </div>
              <div className="bank-account-badge-minimal">
                Önerilen
              </div>
            </div>
            <div className="bank-account-content-minimal">
              <div className="bank-account-info-minimal">
                <h4 className="bank-action-title-minimal">Hesap Bilgileri</h4>
                <div className="bank-info-item-minimal">
                  <span className="bank-info-label-minimal">Hesap Sahibi:</span>
                  <span className="bank-info-value-minimal">KOSTÜM AKADEMİ</span>
                </div>
                <div className="bank-info-item-minimal">
                  <span className="bank-info-label-minimal">IBAN:</span>
                  <span className="bank-info-value-minimal">TR12 0006 2000 0000 0000 0000 00</span>
                </div>
                <div className="bank-info-item-minimal">
                  <span className="bank-info-label-minimal">Banka Kodu:</span>
                  <span className="bank-info-value-minimal">0006</span>
                </div>
                <div className="bank-info-item-minimal">
                  <span className="bank-info-label-minimal">Şube Kodu:</span>
                  <span className="bank-info-value-minimal">0000</span>
                </div>
              </div>
              <div className="bank-account-actions-minimal">
                <h4 className="bank-action-title-minimal">Açıklama</h4>
                <p className="bank-action-text-minimal">
                  Ödeme yaparken açıklama kısmına sipariş numaranızı yazmayı unutmayın.
                </p>
                <button 
                  className="bank-copy-button-minimal"
                  onClick={() => navigator.clipboard.writeText('TR12 0006 2000 0000 0000 0000 00')}
                >
                  IBAN'ı Kopyala
                </button>
              </div>
            </div>
          </div>

          {/* İş Bankası */}
          <div className="bank-account-card-minimal">
            <div className="bank-account-header-minimal">
              <div>
                <h3 className="bank-account-title-minimal">İş Bankası</h3>
                <p className="bank-account-subtitle-minimal">TL Hesabı</p>
              </div>
            </div>
            <div className="bank-account-content-minimal">
              <div className="bank-account-info-minimal">
                <h4 className="bank-action-title-minimal">Hesap Bilgileri</h4>
                <div className="bank-info-item-minimal">
                  <span className="bank-info-label-minimal">Hesap Sahibi:</span>
                  <span className="bank-info-value-minimal">KOSTÜM AKADEMİ</span>
                </div>
                <div className="bank-info-item-minimal">
                  <span className="bank-info-label-minimal">IBAN:</span>
                  <span className="bank-info-value-minimal">TR64 0006 4000 0000 0000 0000 00</span>
                </div>
                <div className="bank-info-item-minimal">
                  <span className="bank-info-label-minimal">Banka Kodu:</span>
                  <span className="bank-info-value-minimal">0006</span>
                </div>
                <div className="bank-info-item-minimal">
                  <span className="bank-info-label-minimal">Şube Kodu:</span>
                  <span className="bank-info-value-minimal">4000</span>
                </div>
              </div>
              <div className="bank-account-actions-minimal">
                <h4 className="bank-action-title-minimal">Açıklama</h4>
                <p className="bank-action-text-minimal">
                  Ödeme yaparken açıklama kısmına sipariş numaranızı yazmayı unutmayın.
                </p>
                <button 
                  className="bank-copy-button-minimal"
                  onClick={() => navigator.clipboard.writeText('TR64 0006 4000 0000 0000 0000 00')}
                >
                  IBAN'ı Kopyala
                </button>
              </div>
            </div>
          </div>

          {/* Ziraat Bankası */}
          <div className="bank-account-card-minimal">
            <div className="bank-account-header-minimal">
              <div>
                <h3 className="bank-account-title-minimal">Ziraat Bankası</h3>
                <p className="bank-account-subtitle-minimal">TL Hesabı</p>
              </div>
            </div>
            <div className="bank-account-content-minimal">
              <div className="bank-account-info-minimal">
                <h4 className="bank-action-title-minimal">Hesap Bilgileri</h4>
                <div className="bank-info-item-minimal">
                  <span className="bank-info-label-minimal">Hesap Sahibi:</span>
                  <span className="bank-info-value-minimal">KOSTÜM AKADEMİ</span>
                </div>
                <div className="bank-info-item-minimal">
                  <span className="bank-info-label-minimal">IBAN:</span>
                  <span className="bank-info-value-minimal">TR12 0001 0000 0000 0000 0000 00</span>
                </div>
                <div className="bank-info-item-minimal">
                  <span className="bank-info-label-minimal">Banka Kodu:</span>
                  <span className="bank-info-value-minimal">0001</span>
                </div>
                <div className="bank-info-item-minimal">
                  <span className="bank-info-label-minimal">Şube Kodu:</span>
                  <span className="bank-info-value-minimal">0000</span>
                </div>
              </div>
              <div className="bank-account-actions-minimal">
                <h4 className="bank-action-title-minimal">Açıklama</h4>
                <p className="bank-action-text-minimal">
                  Ödeme yaparken açıklama kısmına sipariş numaranızı yazmayı unutmayın.
                </p>
                <button 
                  className="bank-copy-button-minimal"
                  onClick={() => navigator.clipboard.writeText('TR12 0001 0000 0000 0000 0000 00')}
                >
                  IBAN'ı Kopyala
                </button>
              </div>
            </div>
          </div>

          {/* Yapı Kredi Bankası */}
          <div className="bank-account-card-minimal">
            <div className="bank-account-header-minimal">
              <div>
                <h3 className="bank-account-title-minimal">Yapı Kredi Bankası</h3>
                <p className="bank-account-subtitle-minimal">TL Hesabı</p>
              </div>
            </div>
            <div className="bank-account-content-minimal">
              <div className="bank-account-info-minimal">
                <h4 className="bank-action-title-minimal">Hesap Bilgileri</h4>
                <div className="bank-info-item-minimal">
                  <span className="bank-info-label-minimal">Hesap Sahibi:</span>
                  <span className="bank-info-value-minimal">KOSTÜM AKADEMİ</span>
                </div>
                <div className="bank-info-item-minimal">
                  <span className="bank-info-label-minimal">IBAN:</span>
                  <span className="bank-info-value-minimal">TR12 0006 7000 0000 0000 0000 00</span>
                </div>
                <div className="bank-info-item-minimal">
                  <span className="bank-info-label-minimal">Banka Kodu:</span>
                  <span className="bank-info-value-minimal">0006</span>
                </div>
                <div className="bank-info-item-minimal">
                  <span className="bank-info-label-minimal">Şube Kodu:</span>
                  <span className="bank-info-value-minimal">7000</span>
                </div>
              </div>
              <div className="bank-account-actions-minimal">
                <h4 className="bank-action-title-minimal">Açıklama</h4>
                <p className="bank-action-text-minimal">
                  Ödeme yaparken açıklama kısmına sipariş numaranızı yazmayı unutmayın.
                </p>
                <button 
                  className="bank-copy-button-minimal"
                  onClick={() => navigator.clipboard.writeText('TR12 0006 7000 0000 0000 0000 00')}
                >
                  IBAN'ı Kopyala
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankAccounts; 