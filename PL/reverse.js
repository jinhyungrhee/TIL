// String reverse

//recursion
function reverseStr(str) {
  if(str.length <= 1) return str
  return reverseStr(str.substring(1))+ str[0]
}

//console.log(reverseStr('hello'))
// ello + h → llo + e + h → lo + l + e + h → o + l + l + e + h 

//tail recursion
function revStr(str1, str2) {
  if(str2.length === 0) return str1
  return revStr(str2[0]+str1, str2.substring(1))
}
function tailRevStr(str) {
  return revStr('', str)
}


// Array Reverse
//recursion
let arr = [1,2,3,4,5]
function reverseArr(arr) {
  if(arr.length <= 1) return arr
  const [head, ...tail] = arr // destructuring + spread operator
  return [...reverseArr(tail), head] // recursion
} 
//console.log(reverseArr(arr))

//tail recursion
function revArr(arr1, arr2) { 
  if (arr2.length === 0) return arr1
  const [head, ...tail] = arr2
  return revArr([head, ...arr1], tail)
}
function tailRevArr(arr) {
  return revArr([], arr)
}
//console.log(tailRevArr(arr))

// Indirect Recursion
function even(n) {
  if (n===0) return true
  else if (n===1) return false
  else return odd(n-1)
}
function odd(n) {
  if (n===0) return false
  else if (n===1) return true
  else return even(n-1)
}
for (let i=0; i<10; ++i) {
  if (even(i))
    console.log(`${i} is even!`)
  else
    console.log(`${i} is odd!`)
}



// <substring() === slice()>
//x = 'hello'
//console.log(x.substring(1)) // 'ello'
//console.log(x[0]) // 'h'
//console.log(x.slice(1)) // 'ello'