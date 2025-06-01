# SidraDEX Price Tracker

Website ini menampilkan harga token-token di jaringan **SidraChain** berdasarkan pasangan perdagangan terhadap **SDA** (Wrapped SDA / WSDA).

🚀 Dibangun dengan HTML + Web3.js dan mengambil data langsung dari kontrak `getReserves()` di DEX.

## 📂 Struktur Folder

```
sidradex-pricetracker/
├── index.html         ← Halaman utama
├── tokens.json        ← Daftar token + pair address
├── /assets
│   └── logo.png       ← Logo Sidra (opsional)
├── /js
│   └── main.js        ← Script utama (opsional)
├── /css
│   └── style.css      ← Styling terpisah (opsional)
└── README.md          ← File ini
```

## 🔗 Contoh tokens.json

```json
[
  {
    "symbol": "FREEt",
    "pairAddress": "0xABCDEF1234567890abcdef1234567890ABCDEF12"
  },
  {
    "symbol": "SMAF",
    "pairAddress": "0x1234567890ABCDEF1234567890abcdef12345678"
  }
]
```

## 📦 Teknologi
- [Web3.js](https://web3js.readthedocs.io/) – Mengambil data dari smart contract
- HTML + JS – Ringan dan bisa di-*deploy* langsung ke GitHub Pages

## ⚠️ Catatan
- SDA = Wrapped SDA (WSDA) secara teknis, namun ditampilkan sebagai `SDA` demi kemudahan.
- Harga dihitung sebagai: `SDA Reserve / Token Reserve` dari pair DEX.

## 📜 Lisensi
MIT License. Bebas digunakan, di-*fork*, atau dimodifikasi.

---

Jika kamu ingin kontribusi atau menemukan bug, silakan buat *issue* atau *pull request*. 🌱
