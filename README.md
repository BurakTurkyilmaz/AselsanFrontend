Vending Machine Uygulaması Kullanım Kılavuzu ve Dokümantasyonu
Bu kılavuz ve dokümantasyon, Vending Machine uygulamasını başlatma, kullanma ve yönetme süreçleri hakkında bilgiler içerir.
İçindekiler
Genel Bakış
Kurulum
Ana Sayfa (App.js)
Para Ekleme
Ürün Satın Alma
Makineyi Sıfırlama
Admin Sayfası
Makineyi Sıfırlama Yetkisi
Scam Protection
Uyarı Mesajları
Uygulama Yapısı
Redux State Yapısı
userSlice. tsx
authSlice. tsx
AutoCloseAlert Komponenti
Redux Slices
userSlice. tsx
authSlice. tsx
Sayfalar
LoginPage. tsx
AdminPage. tsx
LoginPage.tsx
Genel Bakış
Vending Machine uygulaması, kullanıcıların sanal bir otomat makinesi üzerinde çeşitli işlemler gerçekleştirmelerine olanak tanır. Kullanıcılar para ekleyebilir, ürün satın alabilir ve makineyi sıfırlayabilirler. Admin kullanıcıları, özel bir sayfa aracılığıyla makineyi sıfırlama yetkisine sahiptir. Admin kullanicisi ozel admin panelinden urunlere ekleme yapabilir ve sicakliklarini değiştirebilir. Bunun yani sira Vending machine energy efficent calisir. Admin sadece 2  adet vending machine ozelligini ayni anda acik bırakabilir. Bunun yani sira vending machine in sanal bir isiklandirma sistemi vardir ve gun içerisinde aksam 18.00 ile sabah 06.00 arasi lights are on yazarken 06.00 ile 18.00 arasi lights are off yazisi bulunur.
Kurulum
Bu projeyi bilgisayarınıza klonlayın veya indirin.
Proje dizinine gidin ve terminal veya komut istemcisinde npm install komutunu çalıştırarak bağımlılıkları yükleyin.
npm start komutunu kullanarak uygulamayı başlatın.
Tarayıcınızda http://localhost:3000 adresine giderek uygulamayı görüntüleyin.
Npm test komutu kullanılarak testler koşulabilir.
Ana Sayfa (App.js)
Para Ekleme
"Add 1 Unit of Money", "Add 5 Unit of Money", "Add 10 Unit of Money", "Add 20 Unit of Money" butonları ile istediğiniz miktarlarda para ekleyebilirsiniz.
Eklediğiniz para miktarı "Your Total Money" bölümünde görüntülenir.
Ürün Satın Alma
Her ürün için bir buton bulunmaktadır (örneğin, "Waters available: 5").
Ürünü satın almak için ilgili butona tıklayın.
Satın alma işlemi başarılı olduğunda bakiyenizden ürün fiyatı düşer.
Makineyi Sıfırlama
"Reset Machine and Collect Money" butonuna tıklayarak makineyi sıfırlayabilir ve toplamak üzere paranızı alabilirsiniz.
"Cancel Action" butonu ile herhangi bir işlemi iptal edebilirsiniz.
Admin Sayfası
Makineyi Sıfırlama Yetkisi
"Go to Admin Page" butonuna tıklayarak admin sayfasına gidin.
Admin kullanıcı adı "admin" ve şifre "12345" ile giriş yapın.
"Reset Machine" butonuna tıklayarak makineyi sıfırlayabilirsiniz.
Scam Protection
Para ekledikten sonra "Checking for Scamming" uyarı mesajı belirli bir süre görüntülenir.
Bu işlem kullanıcının sisteme yüklediği paranın scam olup olmadığını kontrol eder.
Uyarı Mesajları
İşlem sırasında kullanıcıya uyarı mesajları gösterilebilir.
Örneğin, ürün stokta yoksa veya bakiye yetersizse uygun uyarı mesajları görüntülenir.
Uyarı mesajları belirli bir süre sonra otomatik olarak kaybolur.
Uygulama Yapısı
Uygulama, bir dizi React bileşenini ve Redux kullanarak yönetilen bir state'i içerir. Temel bileşenler App.js, AdminPage.js, ve LoginPage.js'dir.
Redux State Yapısı
Uygulama durumu (state), iki ana parçadan oluşur: kullanıcı durumu (userSlice.js) ve yetkilendirme durumu (authSlice.js).
userSlice. tsx
Bu dosya, ürün miktarları, sıcaklıklar ve bakiye gibi kullanıcıya özgü durumları yönetir.
authSlice. tsx
Bu dosya, kullanıcının giriş durumu ve yetkilerini yönetir.
AutoCloseAlert Komponenti
AutoCloseAlert.js dosyasında bulunan bu bileşen, belirli bir süre sonra otomatik olarak kapanan uyarı mesajları oluşturur.
Sayfalar
LoginPage. tsx
Bu sayfa, kullanıcı girişi için kullanılır. Admin kullanıcı adı ve şifresi ile giriş yaparak admin sayfasına yönlendirilir.
AdminPage. tsx
Bu sayfa, sadece admin kullanıcıları için görünür ve makineyi sıfırlama yetkisine sahiptir. "Reset Machine" butonu ile makine sıfırlanabilir.
LoginPage.tsx
Bu sayfa, admin kullanicisi için kullanici adi ve sifre yazarak admin sayfasına yönlendirme yapar.
