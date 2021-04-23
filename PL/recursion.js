//Recursive Function
function factorial(n) {
  if (n === 0) return 1
  else return n * factorial(n-1)
}

function sigma(n) {
  if (n === 0) return 0
  else return n + sigma(n-1)
}

function rsum(list) {
  if (list.length === 0) return 0
  else {
    const [head, ...rest] = list
    return head + rsum(rest)
  }
}

// Tail Recursion
function afact(a, n) {
  if (n === 0) return a
  else return afact(a*n, n-1)
}
function fact(n) {
  return afact(1, n)
}

// Fiboncacci - recursion(bad), loop(better), tail recursion(better), memoization(best)

function rfib(n) { // recursion
  if (n === 0 || n === 1) return 1
  else return rfib(n-1) + rfib(n-2)
}

function lfib(n) { // loop
  let fold1 = 1;
  let fold2 = 1;
  let fnew;
  for (let i=2; i <= n; i++) {
    fnew = fold1 + fold2
    fold2 = fold1
    fold1 = fnew
  }
  return fnew
}

function tailfib(n, prev, curr) {
  if (n === 0 || n === 1) return curr
  return tailfib(n-1, curr, prev+curr)
}
function tfib(n) {
  return tailfib(n, 1, 1)
}

// Memoization (Best)
let memo =[]
function mfib(n) {
  if (memo[n]) return memo[n]

  if (n === 0 || n === 1) {
    memo[n] = 1
  }
  else {
    memo[n] = mfib(n-1) + mfib(n-2)
  }
  return memo[n] // memo라는 리스트를 만들고 거기에 계산한 값을 추가 (중복 계산 최소화)
}


/*
x = [1,5,6,20,3]
console.log(rsum(x))
console.log(factorial(7))
console.log(sigma(7))
*/

//console.log(fact(7))
//console.log(rfib(8))
//console.log(lfib(8))
//console.log(tfib(8))
//console.log(mfib(8))