/**
 *
 * @param s
 * @param t
 * @returns
 */
function isAnagramArray(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  let record = new Array(26).fill(0);
  for (const i of s) record[i.charCodeAt(0) - 97]++;

  for (const i of t) {
    if (!record[i.charCodeAt(0) - 97]) return false;
    record[i.charCodeAt(0) - 97]--;
  }
  return true;
}

/**
 *
 * @param s
 * @param t
 * @returns
 */

function isAnagramMap(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  let record = new Map();
  for (const i of s) record.set(i, (record.get(i) || 0) + 1);

  for (const i of t) {
    if (!record.get(i)) return false;
    record.set(i, (record.get(i) || 0) - 1);
  }
  return true;
}
