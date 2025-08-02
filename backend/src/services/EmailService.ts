import nodemailer from 'nodemailer';

export class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    // Environment variables kontrol et
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
    } else {
      console.warn('Email servisi için EMAIL_USER ve EMAIL_PASS environment variables gerekli');
    }
  }

  // Email formatını kontrol et
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Hoş geldin emaili gönder
  async sendWelcomeEmail(userEmail: string, userName: string): Promise<void> {
    // Email servisi yapılandırılmamışsa sessizce çık
    if (!this.transporter) {
      console.log('Email servisi yapılandırılmamış, email gönderilmedi');
      return;
    }

    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: 'Kostüm Akademi\'ye Hoş Geldiniz!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #668A69;">Kostüm Akademi'ye Hoş Geldiniz!</h2>
            <p>Merhaba ${userName},</p>
            <p>Kostüm Akademi'ye üye olduğunuz için teşekkür ederiz!</p>
            <p>Artık tüm kostüm koleksiyonumuza erişebilir ve favorilerinizi yönetebilirsiniz.</p>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #668A69;">Hızlı Bağlantılar:</h3>
              <ul>
                <li><a href="http://localhost:3000/costumes">Kostümler</a></li>
                <li><a href="http://localhost:3000/aksesuarlar">Aksesuarlar</a></li>
                <li><a href="http://localhost:3000/wishlist">Favorilerim</a></li>
              </ul>
            </div>
            <p>Herhangi bir sorunuz varsa bizimle iletişime geçebilirsiniz.</p>
            <p>İyi günler,<br>Kostüm Akademi Ekibi</p>
          </div>
        `
      };

      await this.transporter.sendMail(mailOptions);
      console.log('Hoş geldin emaili gönderildi:', userEmail);
    } catch (error) {
      console.error('Email gönderme hatası:', error);
      // Email hatası kullanıcı kaydını engellemez
      throw new Error('Email gönderilemedi');
    }
  }
} 