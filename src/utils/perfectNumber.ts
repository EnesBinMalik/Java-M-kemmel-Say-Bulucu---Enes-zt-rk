import { PerfectNumberResult, CalculationStep } from '../types';

/**
 * Calculates whether a number is a perfect number and collects all proper divisors.
 * Kendisi hariç pozitif tam sayı bölenlerinin toplamı kendisine eşit olan sayı.
 */
export function analyzeNumber(num: number, maxSteps: number = 100): PerfectNumberResult {
  const start = performance.now();
  const n = Math.floor(num);

  if (n <= 0) {
    return {
      number: n,
      isPerfect: false,
      properDivisors: [],
      sumOfDivisors: 0,
      difference: -n,
      formulaString: 'Pozitif tam sayılar için geçerlidir.',
      steps: [],
      executionTimeMs: performance.now() - start,
    };
  }

  // 1 has no proper divisors less than 1, so sum is 0
  if (n === 1) {
    return {
      number: 1,
      isPerfect: false,
      properDivisors: [],
      sumOfDivisors: 0,
      difference: -1,
      formulaString: '1 sayısının kendisinden küçük pozitif böleni yoktur (Toplam = 0).',
      steps: [
        {
          step: 1,
          i: 1,
          isDivisor: false,
          remainder: 0,
          currentSum: 0,
          note: '1 sayısı döngüye girmez (i < 1 sağlanmaz), toplam = 0 kalır.',
        },
      ],
      executionTimeMs: performance.now() - start,
    };
  }

  const properDivisors: number[] = [];
  let sum = 0;
  const steps: CalculationStep[] = [];

  // Generate steps (limit to maxSteps for UI performance if n is large)
  const stepLimit = Math.min(n, maxSteps);
  for (let i = 1; i < n; i++) {
    const isDiv = n % i === 0;
    if (isDiv) {
      properDivisors.push(i);
      sum += i;
    }

    if (i <= stepLimit) {
      steps.push({
        step: i,
        i,
        isDivisor: isDiv,
        remainder: n % i,
        currentSum: sum,
        note: isDiv
          ? `${n} % ${i} == 0 (Tam bölen! Toplam: ${sum})`
          : `${n} % ${i} == ${n % i} (Bölen değil)`,
      });
    }
  }

  const isPerfect = sum === n;
  const formulaString = properDivisors.length > 0
    ? `${properDivisors.join(' + ')} = ${sum}`
    : '0';

  const end = performance.now();

  return {
    number: n,
    isPerfect,
    properDivisors,
    sumOfDivisors: sum,
    difference: sum - n,
    formulaString,
    steps,
    executionTimeMs: Math.max(0.01, +(end - start).toFixed(2)),
  };
}

/**
 * Known first few perfect numbers for reference
 */
export const KNOWN_PERFECT_NUMBERS = [
  {
    n: 6,
    p: 2,
    divisors: [1, 2, 3],
    formula: '2^(2-1) * (2^2 - 1) = 2 * 3 = 6',
    history: 'İlk mükemmel sayı (Antik Yunan ve Pisagorcular tarafından bilinen)',
  },
  {
    n: 28,
    p: 3,
    divisors: [1, 2, 4, 7, 14],
    formula: '2^(3-1) * (2^3 - 1) = 4 * 7 = 28',
    history: 'Ay takvimi döngüsüyle de ilişkilendirilen ikinci mükemmel sayı',
  },
  {
    n: 496,
    p: 5,
    divisors: [1, 2, 4, 8, 16, 31, 62, 124, 248],
    formula: '2^(5-1) * (2^5 - 1) = 16 * 31 = 496',
    history: 'Üçüncü mükemmel sayı (Öklid geometrisi referansı)',
  },
  {
    n: 8128,
    p: 7,
    divisors: [1, 2, 4, 8, 16, 32, 64, 127, 254, 508, 1016, 2032, 4064],
    formula: '2^(7-1) * (2^7 - 1) = 64 * 127 = 8128',
    history: 'Dördüncü mükemmel sayı (Nikomakhos tarafından M.S. 100 civarında keşfedildi)',
  },
];
