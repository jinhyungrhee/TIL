let timestamp = Date.now() // 날짜 객체 생성(1) (=Date.getTime())
console.log(timestamp) // 1618972977503

let now = new Date() // 날짜 객체 생성(2)
console.log(now) // 2021-04-21T02:42:57.521Z

iso = now.toISOString().replace('T',' ').replace('Z', ' ')
console.log(iso) // 2021-04-21 02:42:57.521

iso2 = now.toISOString().split('T')[0]
console.log(iso2) // 2021-04-21

//-------------------------------------------------------------

str = 'my.photo.png'
console.log(str.lastIndexOf('.')) // 8
console.log(str.indexOf('.')) // 2
console.log(str.length) // 12

x = str.substring(str.lastIndexOf('.')+1, str.length) //str.substring(9,12) = 9(p), 10(n), 11(g)
console.log(x) //png

//-------------------------------------------------------------

let greeting = 'welcome'

// index가 하나면 '자른 나머지' 리턴

console.log(greeting.substring(1)) //왼쪽 1글자만 자른 나머지
console.log(greeting.substring(0)) //왼쪽 0글자만 자른 나머지
console.log(greeting.substring(2)) //왼쪽 2글자만 자른 나머지

console.log(greeting.slice(2)) //왼쪽 2글자만 자른 나머지

// index가 두개면 '해당 범위 string' 리턴

console.log(greeting.substring(0, 1)) //0포함~1포함x 
console.log(greeting.substring(0, 2)) //0포함~2포함x

console.log(greeting.slice(0, 2)) //0포함~2포함x
