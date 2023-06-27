function isHappy(n: number): boolean {
  let isSum = new Set();
  while (1) {
    if (n === 1) return true;
    if (isSum.has(n)) return false;
    isSum.add(n);
    n = getSum(n);
  }
  return false;
}

function isHappy(n: number): boolean {
  let storeSet: Set<number> = new Set();
  while (n !== 1 && !storeSet.has(n)) {
    storeSet.add(n);
    n = getSum(n);
  }
  return n === 1;
}

function getSum(n: number): number {
  let sum = 0;
  while (n) {
    sum += (n % 10) ** 2;
    n = Math.floor(n / 10);
  }
  return sum;
}
