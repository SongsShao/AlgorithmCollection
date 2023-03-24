/**
 * O(n)
 * @param {*} n 
 * @returns 
 */
const On = (n) => {
    let k = 0;
    for(let i = 0; i < n; i++){
        k++;
    }
    return k;
}

/**
 * O(n * n)
 * @param {*} n 
 * @returns 
 */
const On2 = (n) => {
    let k = 0;
    for(let i = 0; i < n; i++){
        for(let j = 0; j < n; j++){
            k++;
        }
    }
    return k;
}

/**
 * O(n log n)
 * @param {*} n 
 * @returns 
 */
const Onlogn = (n) => {
    let k = 0;
    for(let i = 0; i < n; i++){
        for(let j = 1; j < n; j = j * 2){
            k++;
        }
    }
    return k;
}

console.log(On(100));
console.log(On2(100));
console.log(Onlogn(100));


