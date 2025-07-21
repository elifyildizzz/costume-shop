import React, { useState, useRef } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const formRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mesajınız gönderildi! En kısa sürede size dönüş yapacağız.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="contact-container">
      <div className="contact-grid">
        {/* Sol: Metin ve Bilgiler */}
        <div className="contact-left">
          <h1>Nasıl Yardımcı Olabiliriz?</h1>
          <div style={{ marginBottom: '2rem' }}>
            <p>Size özel kostüm önerilerimiz var…</p>
            <p>Hangi etkinlik için kostüm arıyorsunuz?</p>
            <p>Beden, renk, tema konusunda tavsiyelere ihtiyacınız mı var?</p>
            <p>Kostüm Akademi ekibi olarak, size en uygun seçimi yapmanızda yardımcı olmak için buradayız!</p>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <div className="contact-info-row"><span style={{ color: '#668A69' }}>📍</span> Uluç mahallesi 1150. sokak villa ayzade no:22/5 Konyaaltı Antalya</div>
            <div className="contact-info-row"><span>📞</span> +90 537 455 00</div>
            <div className="contact-info-row"><span>✉️</span> info@kostumakademi.com</div>
          </div>
          <button className="contact-link-btn" onClick={() => {
            if (formRef.current) {
              formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            setTimeout(() => {
              nameInputRef.current?.focus();
            }, 400);
          }}>
            Şimdi İletişime Geç
          </button>
        </div>
        {/* Sağ: Form */}
        <div className="contact-form-box" ref={formRef}>
          <h2>İletişime Geçin</h2>
          <form onSubmit={handleSubmit}>
            <label>İsim</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              ref={nameInputRef}
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <label>Telefon Numarası</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <label>Mesajınız</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              required
            />
            <button type="submit">Şimdi İletişime Geç</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact; 