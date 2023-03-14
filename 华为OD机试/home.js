function EquivalentPrincipal(init, m, redurce) {
  let sum = 0;
  for (let i = 0; i < m; i++) {
    sum += init - redurce * i;
  }
  //   sum = sum - 3361.11 * m;
  return sum;
}

function EqualPrincipalAndInterest(init, m) {
  let sum = init * m;
  //   for (let i = 0; i < m; i++) {
  //     sum -= 7 * i;
  //   }
  return sum;
}

console.log(EquivalentPrincipal(7495.28, 120, 11.48));
console.log(EqualPrincipalAndInterest(5846.7, 120));
