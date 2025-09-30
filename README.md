# Game Server Rental Website

Basit bir oyun sunucusu kiralama web sitesi (Express + EJS).

## Kurulum

1. Depoyu indirin veya kodu kopyalayın.
2. Ortam değişkenlerini ayarlayın:

```
cp .env.example .env
# .env içindeki ADMIN_TOKEN değerini değiştirin
```

3. Bağımlılıkları yükleyin ve çalıştırın:

```
npm install
npm run dev
# veya
npm start
```

Tarayıcı: http://localhost:3000

## Özellikler

- Plan listesi ve sipariş formu
- JSON dosyaya sipariş kaydı (data/orders.json)
- Admin paneli (token ile korumalı)
- Basit fiyat hesaplama (slot sayısına göre)

## Admin

Admin paneli için `ADMIN_TOKEN` kullanılır.

- Panel: `/admin?token=TOKENINIZ`
- Durum güncelleme, siparişlerin listelenmesi

## Dağıtım

Herhangi bir Node.js barındırma ortamında çalıştırabilirsiniz. `PORT` ve `BASE_URL` değerlerini `.env` ile ayarlayın.

# partiveo-hosting
hosting website scripting
