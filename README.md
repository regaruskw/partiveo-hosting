# GameHost Pro - Oyun Sunucusu Kiralama Website

Modern ve profesyonel oyun sunucusu kiralama hizmeti sunan responsive web sitesi.

## 🚀 Özellikler

### Ana Özellikler
- **Modern Tasarım**: Glassmorphism ve gradient efektleri ile modern görünüm
- **Responsive**: Tüm cihazlarda mükemmel görünüm (mobil, tablet, desktop)
- **Türkçe Dil Desteği**: Tamamen Türkçe içerik
- **Performans Odaklı**: Hızlı yükleme ve smooth animasyonlar

### Desteklenen Oyunlar
- Minecraft (Java & Bedrock)
- Counter-Strike (CS:GO & CS2)
- ARK: Survival Evolved
- GTA V (FiveM & SA-MP)
- Rust
- Valheim
- Ve daha fazlası...

### Fiyat Planları
- **Başlangıç**: ₺29/ay - 2GB RAM, 20GB SSD, 10 slot
- **Profesyonel**: ₺59/ay - 4GB RAM, 50GB SSD, 25 slot
- **Enterprise**: ₺119/ay - 8GB RAM, 100GB SSD, 50 slot
- **Özel Plan**: İhtiyaçlarınıza göre özelleştirilebilir

### Teknik Özellikler
- HTML5, CSS3, JavaScript ile geliştirildi
- Font Awesome ikonlar
- CSS Grid ve Flexbox layout
- Smooth scroll navigation
- Modal popup'lar
- Form validasyonu
- Loading animasyonları
- Gizli admin paneli (Ctrl+Shift+A)

## 📦 Kurulum

### Gereksinimler
- Python 3.x (basit HTTP server için)
- Modern web tarayıcısı

### Çalıştırma
```bash
# Projeyi klonlayın
git clone https://github.com/gamehostpro/website.git
cd website

# HTTP server başlatın
python -m http.server 8000

# Tarayıcınızda açın
http://localhost:8000
```

### Alternatif Çalıştırma Yöntemleri
```bash
# Port 3000'de çalıştırmak için
npm run dev

# Veya basit HTTP server
npm start
```

## 🎨 Tasarım Sistemi

### Renk Paleti
- **Primary**: #00f5ff (Cyan)
- **Secondary**: #0080ff (Blue)
- **Background**: #0a0a0a (Dark)
- **Surface**: #111 (Dark Gray)
- **Text**: #fff (White)

### Tipografi
- **Font Family**: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Heading Sizes**: 2rem - 3.5rem
- **Body Text**: 1rem - 1.2rem

### Animasyonlar
- Hover efektleri
- Scroll-based animasyonlar
- Loading spinners
- Smooth transitions

## 🛠️ Özelleştirme

### Renkleri Değiştirme
CSS dosyasında aşağıdaki değişkenleri düzenleyin:
```css
:root {
  --primary-color: #00f5ff;
  --secondary-color: #0080ff;
  --background-color: #0a0a0a;
}
```

### Fiyatları Güncelleme
`index.html` dosyasında pricing section'ı düzenleyin veya `script.js` dosyasında dinamik hesaplama fonksiyonunu kullanın.

### Yeni Oyun Ekleme
Services section'a yeni game-card ekleyin:
```html
<div class="game-card">
    <div class="game-icon">🎮</div>
    <h3>Oyun Adı</h3>
    <p>Açıklama</p>
</div>
```

## 🔧 Fonksiyonaliteler

### Ödeme Sistemi
- Modal popup ile ödeme formu
- Kart numarası formatlaması
- Güvenli görünümlü form validasyonu
- Simüle edilmiş ödeme işlemi

### Admin Paneli
- Gizli erişim: `Ctrl + Shift + A`
- Sunucu istatistikleri
- Müşteri sayıları
- Gelir takibi

### İletişim Formu
- AJAX benzeri form gönderimi
- Loading states
- Başarı mesajları
- Form validasyonu

### Responsive Tasarım
- Mobile-first approach
- Hamburger menü
- Esnek grid sistemler
- Touch-friendly butonlar

## 📱 Mobil Uyumluluk

- iOS Safari uyumlu
- Android Chrome uyumlu
- Tablet optimizasyonu
- Touch gesture desteği
- Viewport meta tag'i

## 🎯 SEO Optimizasyonu

- Semantic HTML5 struktur
- Meta descriptions
- Alt text'ler
- Structured data hazır
- Fast loading times

## 🚀 Dağıtım

### Netlify
```bash
# Build komutu
npm run build

# Deploy klasörü
./
```

### Vercel
```bash
# Static site olarak deploy
vercel --prod
```

### GitHub Pages
```bash
# gh-pages branch'ine push
git subtree push --prefix . origin gh-pages
```

## 📊 Analytics Entegrasyonu

Google Analytics eklemek için:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🔐 Güvenlik

- XSS koruması
- CSRF token'lar (backend gerekli)
- Input sanitization
- HTTPS zorunluluğu
- Content Security Policy hazır

## 🧪 Test Edilenler

- Chrome 120+
- Firefox 115+
- Safari 17+
- Edge 120+
- Mobile browsers

## 📞 Destek

Herhangi bir sorun için:
- Email: info@gamehostpro.com
- GitHub Issues
- Documentation wiki

## 📄 Lisans

MIT License - Ticari kullanım için uygundur.

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Push edin (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📈 Roadmap

- [ ] Backend API entegrasyonu
- [ ] Kullanıcı dashboard'u
- [ ] Gerçek ödeme sistemi entegrasyonu
- [ ] Çoklu dil desteği
- [ ] PWA (Progressive Web App) özelliği
- [ ] Dark/Light mode toggle
- [ ] Chatbot entegrasyonu

---

**GameHost Pro** - Profesyonel oyun sunucusu kiralama hizmeti