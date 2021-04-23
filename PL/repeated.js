//Array constructor
let a = new Array(10)
console.log(a) // [<10 empty itmes]
a[0] = 10
console.log(a) // [10, <9 empty itmes>]

// Array Copy - 1)spread operator 2)array.from()
copy1 = [...a] 
console.log(copy1)

copy2 = Array.from(a)
console.log(copy2)

//------------------------<원소 값 증가>---------------------------------

// FOREACH |  MAP, FILTER(= findAll), FIND, REDUCE (4대 반복함수)

let arr = [1,2,3,4,5]
let arr1 = Array.from(arr)
console.log(arr1) // [<5 empty itmes>]

for (let i=0; i<arr.length; i+=1) {
  arr1[i] = arr1[i] + 1
}
console.log(arr1)

//for Each - return없는 map (side-effect : 실제 값 변함)
arr1.forEach(function(x,i){arr1[i]=x+1}) // i=0일때 x=1, i=1일때 x=2, i=2일때 x=3....
//console.log(arr1) // 3,4,5,6,7
arr1.forEach(function(_,i){arr1[i]+=1})
//console.log(arr1) // 4,5,6,7,8
arr1.forEach((_,i)=>{arr1[i]+=1}) //arrow function
//console.log(arr1) // 5,6,7,8,9


//map - 모든 원소x에 대해 func적용
arr1 = arr.map(x=>x+1) //arr가지고 다시 array만들어 arr1에 ref
console.log(arr1) // 2,3,4,5,6
arr1 = arr1.map(function(x){return x+1}) // {}는 statement
console.log(arr1) // 3,4,5,6,7
arr1 = arr1.map(x=>{
  console.log(`x=${x}`) // x = 3,4,5,6,7
  return x+1
})
console.log(arr1) // 4,5,6,7,8

//---------------------<원소 값 찾기>----------------------------------

let arr2 = []
for (let i=0; i<arr.length; i+=1) {
  if (arr[i] % 2 !== 0) arr2.push(arr[i])
}
console.log(arr2)

//forEach (모든 원소x에 대해 func적용 but 리턴값 없음)
arr2 = []
arr.forEach(x=>{
  if(x%2 !== 0) arr2.push(x)
})
console.log(arr2)

//filter
arr2 = []
arr2 = arr.filter(x=>x%2 !== 0)
console.log(arr2)

arr2 = []
arr2 = arr.filter(x=>x>2)
console.log(arr2)

//find (첫번째 값만 return)
arr2 = []
arr2 = arr.find(x=>x%2 !== 0)
console.log(arr2)

arr2 = []
arr2 = arr.find(x=>x>2)
console.log(arr2)

arr2 = []
arr2 = arr.findIndex(x=>x>2) // Index 리턴
console.log(arr2)

//--------------------<원소 합계>---------------------------
let sum = 0
for (let i=0; i<arr.length; i+=1) {
  sum += arr[i]
}
console.log(sum)

// reduce
redsum = arr.reduce((acc,cur)=>acc+cur)
console.log(redsum)

arrE = [] // 빈 리스트 (원소 값 x)
//sumE = arrE.reduce((acc,cur)=>acc+cur) //error
//console.log(sumE) // error
sumNoE =arrE.reduce((acc,cur)=>acc+cur,0) //초기acc값 = 0
console.log(sumNoE)
sumNoE2 =arrE.reduce((acc,cur)=>acc+cur,3) //초기acc값 = 3
console.log(sumNoE2) // 3+0 - (3+0)+0 - ...