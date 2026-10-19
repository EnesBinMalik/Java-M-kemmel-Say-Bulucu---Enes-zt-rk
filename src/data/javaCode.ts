export interface JavaCodeSnippet {
  id: string;
  title: string;
  shortDesc: string;
  complexity: string;
  code: string;
}

export const JAVA_SNIPPETS: JavaCodeSnippet[] = [
  {
    id: 'standard',
    title: 'Standart Çözüm (For Döngüsü)',
    shortDesc: 'Ödev ve sınav formatında tam istenen klasik çözüm.',
    complexity: 'Zaman Karmaşıklığı: O(N) | Alan: O(1)',
    code: `import java.util.Scanner;

/**
 * ========================================================
 * Program: Mükemmel Sayı Bulucu (Perfect Number Checker)
 * Yazar   : Enes Öztürk
 * Açıklama: Klavyeden girilen bir sayının kendisi hariç
 *           pozitif tam sayı bölenlerinin toplamı kendisine
 *           eşitse ekrana "mükemmel sayıdır", değilse
 *           "mükemmel sayı değildir." yazar.
 * ========================================================
 */
public class MukemmelSayi {

    public static void main(String[] args) {
        // Klavyeden veri almak için Scanner nesnesi oluşturulur
        Scanner scanner = new Scanner(System.in);

        // Kullanıcıdan sayı girişi istenir
        System.out.print("Bir sayı giriniz: ");
        int sayi = scanner.nextInt();

        int toplam = 0;

        // 1'den sayının kendisine kadar olan (kendisi hariç)
        // pozitif tam bölenleri bulup topluyoruz
        for (int i = 1; i < sayi; i++) {
            if (sayi % i == 0) {
                toplam += i; // i sayısı 'sayi'yı kalansız bölüyorsa toplama ekle
            }
        }

        // Sayı pozitif olmalı ve bölenleri toplamı kendisine eşit olmalıdır
        if (sayi > 0 && toplam == sayi) {
            System.out.println(sayi + " Mükemmel sayıdır");
        } else {
            System.out.println(sayi + " Mükemmel sayı değildir.");
        }

        // Programcı İmzası
        System.out.println("--------------------------------");
        System.out.println("Geliştirici: Enes Öztürk");

        // Kaynak sızıntısını önlemek için scanner kapatılır
        scanner.close();
    }
}`,
  },
  {
    id: 'optimized',
    title: 'Optimize Çözüm (O(√N) Matematiksel Hızlandırma)',
    shortDesc: 'Büyük sayılar (örneğin 33550336) için karekök limitli bölen eşleme algoritması.',
    complexity: 'Zaman Karmaşıklığı: O(√N) | Alan: O(1)',
    code: `import java.util.Scanner;

/**
 * Mükemmel Sayı Bulucu - Optimize Versiyon
 * Geliştirici: Enes Öztürk
 *
 * O(√N) karmaşıklığı ile bölenleri çiftler halinde toplar.
 */
public class MukemmelSayiHizli {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Bir sayı giriniz: ");
        long sayi = scanner.nextLong();

        if (sayi <= 1) {
            System.out.println(sayi + " Mükemmel sayı değildir.");
            System.out.println("İmza: Enes Öztürk");
            scanner.close();
            return;
        }

        long toplam = 1; // 1 her pozitif tam sayının öz bölenidir (sayı > 1 için)

        // Sadece √sayi değerine kadar döngü kurarak bölen çiftlerini toplarız
        for (long i = 2; i * i <= sayi; i++) {
            if (sayi % i == 0) {
                toplam += i;
                // Eğer bölen tam kare değilse eşleniğini de ekle (örn: 28 / 2 = 14)
                if (i * i != sayi) {
                    toplam += (sayi / i);
                }
            }
        }

        if (toplam == sayi) {
            System.out.println(sayi + " Mükemmel sayıdır");
        } else {
            System.out.println(sayi + " Mükemmel sayı değildir.");
        }

        System.out.println("--------------------------------");
        System.out.println("Enes Öztürk İmzalıdır.");
        scanner.close();
    }
}`,
  },
  {
    id: 'methods',
    title: 'Metotlu / Modüler Çözüm (OOP Yaklaşımı)',
    shortDesc: 'Temiz kod ve fonksiyonel ayrıştırma prensipleriyle hazırlanmış Java sınıfı.',
    complexity: 'Zaman Karmaşıklığı: O(N) | Alan: O(1)',
    code: `import java.util.Scanner;

/**
 * Modüler Java Mükemmel Sayı Algoritması
 * Yazar: Enes Öztürk
 */
public class MukemmelSayiMetotlu {

    /**
     * Verilen bir sayının mükemmel sayı olup olmadığını test eder.
     * @param sayi Test edilecek tam sayı
     * @return mükemmel ise true, değilse false
     */
    public static boolean isMukemmelSayi(int sayi) {
        if (sayi <= 1) return false;

        int toplam = 0;
        for (int i = 1; i <= sayi / 2; i++) {
            if (sayi % i == 0) {
                toplam += i;
            }
        }
        return toplam == sayi;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Bir sayı giriniz: ");
        int sayi = scanner.nextInt();

        if (isMukemmelSayi(sayi)) {
            System.out.println(sayi + " Mükemmel sayıdır");
        } else {
            System.out.println(sayi + " Mükemmel sayı değildir.");
        }

        System.out.println("\\nHazırlayan: Enes Öztürk");
        scanner.close();
    }
}`,
  },
];
