# GameHost - Oyun Sunucusu Kiralama Platformu

Modern, kullanıcı dostu bir oyun sunucusu kiralama web sitesi. Minecraft, CS:GO, FiveM, Rust, ARK ve Discord bot hosting hizmetleri sunar.

## 🎮 Özellikler

- **Modern Tasarım**: Karanlık tema ve gradient renklerle çarpıcı görünüm
- **Responsive**: Mobil, tablet ve masaüstü cihazlarda mükemmel çalışır
- **Çoklu Oyun Desteği**: 
  - Minecraft (Java & Bedrock)
  - Counter-Strike: GO
  - FiveM (GTA V RP)
  - Rust
  - ARK: Survival Evolved
  - Discord Bot Hosting

- **Paket Seçenekleri**: Başlangıç, Profesyonel ve Kurumsal paketler
- **Küresel Veri Merkezleri**: İstanbul, Frankfurt, Londra, New York
- **Otomatik Özellikler**:
  - DDoS koruması
  - Otomatik yedekleme
  - 7/24 teknik destek
  - Anında kurulum (60 saniye)

## 🚀 Kurulum

### Gereksinimler
- Node.js (v14 veya üzeri)
- npm veya yarn

### Adımlar

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Sunucuyu başlatın:
```bash
npm start
```

3. Geliştirme modunda çalıştırma (otomatik yenileme):
```bash
npm run dev
```

4. Tarayıcınızda açın:
```
http://localhost:3000
```

## 📁 Dosya Yapısı

```
gamehost/
├── index.html          # Ana HTML dosyası
├── style.css           # Tüm stiller
├── script.js           # Frontend JavaScript
├── server.js           # Backend API sunucusu
├── package.json        # Proje bağımlılıkları
└── README.md          # Bu dosya
```

## 🔧 API Endpoints

### Kullanıcı İşlemleri
- `POST /api/register` - Yeni kullanıcı kaydı
- `POST /api/login` - Kullanıcı girişi

### Sipariş İşlemleri
- `POST /api/orders` - Yeni sipariş oluştur
- `GET /api/orders/:userId` - Kullanıcının siparişleri

### Sunucu İşlemleri
- `GET /api/servers/:userId` - Kullanıcının sunucuları
- `GET /api/server/:serverId` - Sunucu detayları
- `POST /api/server/:serverId/start` - Sunucuyu başlat
- `POST /api/server/:serverId/stop` - Sunucuyu durdur
- `POST /api/server/:serverId/restart` - Sunucuyu yeniden başlat

### Genel
- `GET /api/games` - Mevcut oyunlar
- `GET /api/plans` - Fiyatlandırma paketleri
- `POST /api/contact` - İletişim formu

## 🎨 Özelleştirme

### Renkleri Değiştirme
`style.css` dosyasındaki CSS değişkenlerini düzenleyin:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --dark-bg: #0f172a;
    /* ... diğer renkler */
}
```

### Fiyatları Güncelleme
`index.html` dosyasındaki pricing section kısmını düzenleyin.

### Oyun Ekleme/Çıkarma
`index.html` dosyasındaki servers section'ı ve `server.js` dosyasındaki games array'ini güncelleyin.

## 🔒 Güvenlik Notları

⚠️ **ÖNEMLİ**: Bu demo sürüm için oluşturulmuştur. Canlı kullanım için:

1. **Şifreleri hash'leyin**: bcrypt veya argon2 kullanın
2. **JWT token kullanın**: Oturum yönetimi için
3. **HTTPS kullanın**: SSL sertifikası ekleyin
4. **Veritabanı ekleyin**: MongoDB, PostgreSQL veya MySQL
5. **Ödeme sistemi**: Stripe, PayPal veya Iyzico entegrasyonu
6. **E-posta servisi**: Onay ve bildirimler için
7. **Rate limiting**: API abuse'i önlemek için
8. **Input validation**: XSS ve SQL injection koruması

## 📦 Üretim Dağıtımı

### Vercel/Netlify
```bash
npm run build
```

### Docker
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### PM2 ile Çalıştırma
```bash
npm install -g pm2
pm2 start server.js --name gamehost
pm2 save
pm2 startup
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Lisans

MIT License - Detaylar için LICENSE dosyasına bakın.

## 💡 Geliştirme Önerileri

- [ ] Gerçek veritabanı entegrasyonu (MongoDB/PostgreSQL)
- [ ] Ödeme gateway entegrasyonu
- [ ] E-posta bildirimleri
- [ ] Admin paneli
- [ ] Sunucu performans metrikleri
- [ ] Canlı sohbet desteği
- [ ] Çok dilli destek
- [ ] Bağlı kuruluş programı
- [ ] Blog/Haberler sistemi
- [ ] Forum/Topluluk sistemi

## 📞 Destek

Sorularınız için:
- E-posta: destek@gamehost.com
- Discord: discord.gg/gamehost
- Telefon: +90 (212) 555 0123

---

**GameHost** ile oyun deneyiminizi zirveye taşıyın! 🎮🚀