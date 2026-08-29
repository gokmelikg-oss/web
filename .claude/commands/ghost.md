---
description: Görünmez sorunları avla - kimsenin fark etmediği bozuklukları bul
---

Bu kodda/sayfada **sessizce yanlış çalışan** ne var? Hata vermeyen ama yanlış olan şeyleri ara:

- Sessizce yutulan hatalar (boş catch, .catch(() => {}))
- Hiç çalışmayan kod yolu (ölü dal, ulaşılamayan koşul)
- Yanlış ama makul görünen varsayılan değerler
- Kopyala-yapıştırdan kalmış, artık geçersiz mantık
- Testi olmayan kritik yol
- Sadece mutlu senaryoda doğru olan hesap

Her bulgu için: nerede, neden yanlış, ne zaman patlar. Bulgu yoksa temiz de.
