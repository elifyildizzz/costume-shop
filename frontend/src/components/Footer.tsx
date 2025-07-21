import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-black py-12 font-sans">
      <div className="w-full flex flex-col items-center text-center space-y-8">
        {/* Logo ve Slogan */}
        <div className="space-y-3">
          <h3 className="text-4xl font-bold text-black tracking-wide" style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif' }}>
            Kostüm Akademi
          </h3>
          <p className="text-lg text-gray-700 font-medium">
            En kaliteli kostümler, en uygun fiyatlarla!
          </p>
        </div>

        {/* Hakkımızda ve Yardım - Yan Yana */}
        <div className="flex flex-row justify-center items-start gap-12 md:gap-20 w-full max-w-2xl">
          <div className="text-center flex-1">
            <h4 className="text-xl font-bold mb-4 text-black">Hakkımızda</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about"
                  className="text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium"
                >
                  Biz Kimiz?
                </a>
              </li>
              <li>
                <a
                  href="/bank"
                  className="text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium"
                >
                  Banka Hesapları
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center flex-1">
            <h4 className="text-xl font-bold mb-4 text-black">Yardım</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/terms"
                  className="text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium"
                >
                  Kullanıcı Sözleşmesi
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium"
                >
                  Sıkça Sorulan Sorular
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Sosyal Medya İkonları */}
        <div className="flex justify-center space-x-6">
          {[
            { Icon: FaFacebook, href: "#" },
            { Icon: FaInstagram, href: "#" },
            { Icon: FaTwitter, href: "#" },
            { Icon: FaYoutube, href: "#" }
          ].map(({ Icon, href }, idx) => (
            <a
              key={idx}
              href={href}
              className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {Icon({ size: 22 })}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-gray-200 w-full max-w-md">
          <p className="text-sm text-gray-600 font-medium">
            © 2025 Kostüm Akademi. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;