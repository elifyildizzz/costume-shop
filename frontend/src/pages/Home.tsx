// src/pages/Home.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  // Contact formu için state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Önerilen kostümler için örnek veri
  const featuredCostumes = [
    {
      id: 1,
      name: ' Salyangoz Kostümü',
      price: '₺249',
      image: '../images/kostüm1.jpg'
    },
    {
      id: 2,
      name: 'Peri Kostümü',
      price: '₺199',
      image: '../images/kostüm2.jpg'
    },
    {
      id: 3,
      name: 'Uğur Böceği Kostümü',
      price: '₺349',
      image: '../images/kostüm3.jpg',
    },
    {
      id: 4,
      name: 'Cadı Kostümü',
      price: '₺299',
      image: '../images/kostüm4.jpg',
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form gönderme işlemleri burada yapılacak
    console.log('Form verileri:', formData);
    alert('Mesajınız gönderildi! En kısa sürede size dönüş yapacağız.');
    
    // Formu temizle
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <div className="container">
      {/* Hero Section - Orijinal tasarım */}
      <section
        className="hero"
        style={{
          textAlign: 'center',
          padding: '6rem 0',
          minHeight: '400px',
          backgroundImage: `url(${process.env.PUBLIC_URL}/kostüm.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '10px',
          color: 'white',
          marginBottom: '3rem',
          fontFamily: '"Inter", "Segoe UI", -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        <div style={{ marginTop: '120px' }}>
          <p
            style={{
              fontSize: '1.8rem',
              fontWeight: 300,
              textShadow: '1px 1px 6px rgba(0,0,0,0.5)',
              marginBottom: '12rem',
            }}
          >
            Özel günleriniz için mükemmel kostümler
          </p>

          <Link
            to="/costumes"
            style={{
              fontSize: '1.3rem',
              color: 'white',
              textDecoration: 'underline',
              fontWeight: 500,
              textShadow: '1px 1px 4px rgba(0,0,0,0.4)',
            }}
          >
            Kostümleri Keşfet
          </Link>
        </div>
      </section>

      {/* Yeni bölüm - Sol yazı, sağ kare görsel */}
      <section className="story" style={{ 
        padding: '4rem 0', 
        marginBottom: '4rem',
        fontFamily: '"Inter", "Segoe UI", -apple-system, sans-serif'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', minHeight: '500px', gap: '4rem', paddingRight: '2rem' }}>
          {/* Sol taraf - Yazı içeriği */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingLeft: '8rem' }}>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: '400',
              color: '#000',
              marginBottom: '2rem',
              lineHeight: '1.2',
              textAlign: 'left',
              fontFamily: '"Playfair Display", "Georgia", serif'
            }}>
              Kostümlerin Bir Hikayesi Olur Mu?
            </h1>
            
            <div style={{ 
              marginBottom: '2rem', 
              fontSize: '1.1rem', 
              color: '#555', 
              lineHeight: '1.8',
              textAlign: 'left',
              fontFamily: '"Inter", "Segoe UI", -apple-system, sans-serif'
            }}>
              <p style={{ marginBottom: '1rem' }}>Eğer hayal gücüyle dikildiyse, evet olur…</p>
              <p style={{ marginBottom: '1rem' }}>Size bir masalı hatırlatır, bir oyunu, belki bir kahramanı…</p>
              <p style={{ marginBottom: '1rem' }}>Bazen bir çizgi filmi, bazen bir doğum günü sabahını…</p>
              <p style={{ marginBottom: '2rem' }}>Şimdi bu hayaller, Kostüm Akademi ile yeniden canlanıyor!</p>
            </div>

            <div style={{ textAlign: 'left' }}>
              <Link
                to="/costumes"
                style={{
                  fontSize: '1.1rem',
                  color: '#668A69',
                  textDecoration: 'underline',
                  fontWeight: '400',
                  cursor: 'pointer'
                }}
              >
                Ürünleri Gör
              </Link>
            </div>
          </div>

          {/* Sağ taraf - Kare Görsel */}
          <div style={{ flex: '0 0 400px' }}>
            <div style={{
              width: '700px',
              height: '600px',
              position: 'relative',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              <img 
                src={`${process.env.PUBLIC_URL}/görsel1.png`}
                alt="Kostüm Koleksiyonu"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '15px'
                }}
              />
              {/* Overlay efekti */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, rgba(102, 138, 105, 0.1), rgba(102, 138, 105, 0.15))',
                borderRadius: '15px'
              }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Neden Biz? Bölümü */}
      <section className="why-us" style={{
        padding: '4rem 0',
        marginBottom: '4rem',
        fontFamily: '"Inter", "Segoe UI", -apple-system, sans-serif',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', minHeight: '500px', gap: '4rem', paddingRight: '2rem' }}>
          {/* Sol taraf - Yazı içeriği */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingLeft: '8rem' }}>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: '400',
              color: '#000',
              marginBottom: '2rem',
              lineHeight: '1.2',
              textAlign: 'left',
              fontFamily: '"Playfair Display", "Georgia", serif'
            }}>
              Neden Kostüm Akademi?
            </h1>
            
            <div style={{ 
              marginBottom: '2rem', 
              fontSize: '1.1rem', 
              color: '#555', 
              lineHeight: '1.8',
              textAlign: 'left',
              fontFamily: '"Inter", "Segoe UI", -apple-system, sans-serif'
            }}>
              <p style={{ marginBottom: '1.5rem' }}>
                <strong style={{ color: '#668A69' }}>Antalya'da Tek Adres:</strong> Şehrimizde kaliteli kostüm kiralama seçeneklerinin kısıtlı olduğunu biliyoruz. Bu nedenle size en geniş kostüm koleksiyonunu sunuyoruz.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                <strong style={{ color: '#668A69' }}>Hijyen Garantisi:</strong> Tüm kostümlerimiz her kiralama öncesi özel olarak temizlenir ve dezenfekte edilir.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                <strong style={{ color: '#668A69' }}>Uygun Fiyat:</strong> Satın alma maliyetinin çok altında, kaliteli kostümleri kiralayabilirsiniz.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                <strong style={{ color: '#668A69' }}>Uzman Danışmanlık:</strong> Etkinliğinize ve bedeninize en uygun kostümü seçmenizde size rehberlik ediyoruz.
              </p>
              <p style={{ marginBottom: '2rem' }}>
                <strong style={{ color: '#668A69' }}>Hızlı Teslimat:</strong> Antalya genelinde aynı gün teslimat hizmeti sunuyoruz.
              </p>
            </div>

            <div style={{ textAlign: 'left' }}>
              <Link
                to="/costumes"
                style={{
                  fontSize: '1.1rem',
                  color: '#668A69',
                  textDecoration: 'underline',
                  fontWeight: '400',
                  cursor: 'pointer'
                }}
              >
                Kostüm Koleksiyonumuzu Keşfet
              </Link>
            </div>
          </div>

          {/* Sağ taraf - Sadece İstatistikler */}
          <div style={{ flex: '0 0 500px' }}>
            <div style={{
              width: '600px',
              height: '400px',
              position: 'relative',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              backgroundColor: 'white',
              padding: '3rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '2rem',
              alignItems: 'center'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: '700',
                  color: '#668A69',
                  marginBottom: '1rem',
                  fontFamily: '"Inter", "Segoe UI", -apple-system, sans-serif'
                }}>
                  500+
                </div>
                <div style={{
                  fontSize: '1.1rem',
                  color: '#666',
                  fontWeight: '500'
                }}>
                  Kostüm Çeşidi
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: '700',
                  color: '#668A69',
                  marginBottom: '1rem',
                  fontFamily: '"Inter", "Segoe UI", -apple-system, sans-serif'
                }}>
                  1000+
                </div>
                <div style={{
                  fontSize: '1.1rem',
                  color: '#666',
                  fontWeight: '500'
                }}>
                  Mutlu Müşteri
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: '700',
                  color: '#668A69',
                  marginBottom: '1rem',
                  fontFamily: '"Inter", "Segoe UI", -apple-system, sans-serif'
                }}>
                  3
                </div>
                <div style={{
                  fontSize: '1.1rem',
                  color: '#666',
                  fontWeight: '500'
                }}>
                  Yıl Tecrübe
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: '700',
                  color: '#668A69',
                  marginBottom: '1rem',
                  fontFamily: '"Inter", "Segoe UI", -apple-system, sans-serif'
                }}>
                  24/7
                </div>
                <div style={{
                  fontSize: '1.1rem',
                  color: '#666',
                  fontWeight: '500'
                }}>
                  Destek
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sizin İçin Seçtiklerimiz Bölümü - Güncellenmiş Tasarım */}
      <section className="featured-costumes" style={{
        padding: '4rem 0',
        marginBottom: '4rem',
        fontFamily: '"Inter", "Segoe UI", -apple-system, sans-serif'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', minHeight: '500px', gap: '4rem', paddingLeft: '2rem' }}>
          {/* Sol taraf - Küçültülmüş Kostüm Kartları */}
          <div style={{ flex: '0 0 600px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1.5rem',
              padding: '2rem'
            }}>
              {featuredCostumes.map((costume) => (
                <div key={costume.id} style={{
                  position: 'relative',
                  width: '350px',
                  height: '350px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
                }}
                >
                  {/* Arka plan görseli */}
                  <img 
                    src={`${process.env.PUBLIC_URL}/${costume.image}`}
                    alt={costume.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  
                  {/* Gradient overlay */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.8) 100%)',
                    borderRadius: '20px'
                  }}></div>
                  
                  {/* İçerik */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '1.5rem',
                    color: 'white',
                    textAlign: 'center'
                  }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      marginBottom: '0.8rem',
                      textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
                      fontFamily: '"Playfair Display", "Georgia", serif'
                    }}>
                      {costume.name}
                    </h3>
                    
                    <div style={{
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      marginBottom: '1rem',
                      color: 'white',
                      textShadow: '1px 1px 3px rgba(0,0,0,0.5)'
                    }}>
                      {costume.price}
                    </div>
                    
                    <button style={{
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      color: '#333',
                      border: 'none',
                      padding: '0.6rem 1.5rem',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                    }}
                    onMouseOver={(e) => {
                      (e.target as HTMLButtonElement).style.backgroundColor = '#668A69';
                      (e.target as HTMLButtonElement).style.color = 'white';
                      (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                      (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.9)';
                      (e.target as HTMLButtonElement).style.color = '#333';
                      (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                    }}
                    >
                      İncele
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sağ taraf - Yazı içeriği */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingRight: '8rem' }}>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: '400',
              color: '#000',
              marginBottom: '2rem',
              lineHeight: '1.2',
              textAlign: 'left',
              fontFamily: '"Playfair Display", "Georgia", serif'
            }}>
              Sizin İçin Seçtiklerimiz
            </h1>
            
            <div style={{ 
              marginBottom: '2rem', 
              fontSize: '1.1rem', 
              color: '#555', 
              lineHeight: '1.8',
              textAlign: 'left',
              fontFamily: '"Inter", "Segoe UI", -apple-system, sans-serif'
            }}>
              <p style={{ marginBottom: '1rem' }}>Hayal Gücünüzü Giyin!</p>
              <p style={{ marginBottom: '1rem' }}>Çocuklar için masallardan, yetişkinler için temalı eğlencelere uzanan kostüm seçeneklerimizle her anı özel kılın.</p>
              <p style={{ marginBottom: '2rem' }}>Kaliteli kumaşlar, özenli tasarımlar ve unutulmaz anlar için buradayız!</p>
            </div>

            <div style={{ textAlign: 'left' }}>
              <Link
                to="/costumes"
                style={{
                  fontSize: '1.1rem',
                  color: '#668A69',
                  textDecoration: 'underline',
                  fontWeight: '400',
                  cursor: 'pointer'
                }}
              >
                Tüm Kostümleri Gör
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Yeniden tasarlanmış */}
      <section className="contact" style={{ 
        padding: '4rem 0', 
        marginBottom: '4rem',
        fontFamily: '"Inter", "Segoe UI", -apple-system, sans-serif'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', minHeight: '500px', gap: '4rem', paddingLeft: '2rem' }}>
          {/* Sol taraf - Yazı içeriği */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingLeft: '8rem' }}>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: '400',
              color: '#000',
              marginBottom: '2rem',
              lineHeight: '1.2',
              textAlign: 'left',
              fontFamily: '"Playfair Display", "Georgia", serif'
            }}>
              Nasıl Yardımcı Olabiliriz?
            </h1>
            
            <div style={{ 
              marginBottom: '2rem', 
              fontSize: '1.1rem', 
              color: '#555', 
              lineHeight: '1.8',
              textAlign: 'left',
              fontFamily: '"Inter", "Segoe UI", -apple-system, sans-serif'
            }}>
              <p style={{ marginBottom: '1rem' }}>Size özel kostüm önerilerimiz var…</p>
              <p style={{ marginBottom: '1rem' }}>Hangi etkinlik için kostüm arıyorsunuz?</p>
              <p style={{ marginBottom: '1rem' }}>Beden, renk, tema konusunda tavsiyelere ihtiyacınız mı var?</p>
              <p style={{ marginBottom: '2rem' }}>Kostüm Akademi ekibi olarak, size en uygun seçimi yapmanızda yardımcı olmak için buradayız!</p>
            </div>

            <div style={{ textAlign: 'left' }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                fontSize: '1rem',
                color: '#555',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#668A69' }}>📍</span>
                  <span>Uluç mahallesi 1150. sokak villa ayzade no:22/5 Konyaaltı Antalya</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#668A69' }}>📞</span>
                  <span>+90 537 455 00</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#668A69' }}>✉️</span>
                  <span>info@kostumakademi.com</span>
                </div>
              </div>
              
              <Link
                to="#contact-form"
                style={{
                  fontSize: '1.1rem',
                  color: '#668A69',
                  textDecoration: 'underline',
                  fontWeight: '400',
                  cursor: 'pointer'
                }}
              >
                Şimdi İletişime Geç
              </Link>
            </div>
          </div>

          {/* Sağ taraf - İletişim Formu */}
          <div style={{ flex: '0 0 400px' }}>
            <div id="contact-form" style={{
              width: '700px',
              background: 'white',
              borderRadius: '15px',
              padding: '2rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{
                fontSize: '1.8rem',
                fontWeight: '600',
                color: '#2c3e50',
                marginBottom: '1.5rem',
                fontFamily: '"Inter", "Segoe UI", -apple-system, sans-serif'
              }}>
                İletişime Geçin
              </h3>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#333'
                  }}>
                    İsim
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e9ecef',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#668A69'}
                    onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#333'
                  }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e9ecef',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#668A69'}
                    onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#333'
                  }}>
                    Telefon Numarası
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e9ecef',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#668A69'}
                    onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#333'
                  }}>
                    Mesajınız
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e9ecef',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s ease',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#668A69'}
                    onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    padding: '0.875rem 2rem',
                    backgroundColor: '#668A69',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    alignSelf: 'flex-start'
                  }}
                  onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#567a5a'}
                  onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#668A69'}
                >
                  Şimdi İletişime Geç
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;