function serach(arr, target) {
   let left =  0, right = arr.length - 1;
   while(left <= right){
        let middle = left + Math.floor((right - left) / 2);

        if(arr[middle] > target) {
            right = middle - 1;
        } else if(arr[middle] < target){
            left = middle + 1;
        } else {
            return middle;
        }
   }
   return -1;
}

console.log(serach([1, 2, 3, 4, 7, 9, 10], 2));
console.log(serach([1, 2, 3, 4, 7, 9, 10], 9));

/**
 *   target = 2
 *   [1, 2, 3, 4, 7, 9, 10]
 *    L=0      M=3         R=7          M = L + (R - L) / 2;
 *  
 *   [1,   2,   3,  4]
 *    L=0   M=1   R=3
 */

function serach2 (arr, target) {
    let left = 0, right = arr.length;
    while(left < right){
        let middle = left + ((right - left) >> 1);
        if(arr[middle] > target){
            right = middle;
        } else if(arr[middle] < target){
            left = middle + 1;
        } else {
            return middle;
        }
    }
    return -1;
}

console.log(serach2([1, 2, 3, 4, 7, 9, 10], 2));
console.log(serach2([1, 2, 3, 4, 7, 9, 10], 9));