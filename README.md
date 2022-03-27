Merhabalar,
Rehber Uygulaması;
Birden farklı kullanıcının kendi rehberlerini yönetecekleri bir REST servistir.
Kullanıcıların sadece kendi rehberlerini görebildikleri, kullanıcıların mysql veritabanında tutulduğu bir servistir.
Program çalıştığında tablolar ve demo veriler migration ile otomatik olarak oluşmaktadır.
Kullanıcıların login işlemi JWT Middleware ile Token alarak ekleme, silme, güncelleme,listeleme işlemlerini gerçekleştirebilirsiniz.


Kullanılan Teknolojiler

nodeJS
express
Sequelize
MySQL
JSON Web Tokens


Programın çalıştırılması

Programı çalıştırmadan önce mysql veritabanında, config dosyasındaki veritabanı ismi ile aynı isimde bir veritabanı oluşturuyoruz.

Ardından,

komut satırına: npm run start 
komutu ile oto migration işlemi gerçekleşir ve program çalışmaya başlar 
