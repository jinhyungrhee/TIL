## idetifier(name)

- \_dummy : 언더스코어로 시작 가능
- 숫자로 시작할 수 없음 (1name->불가)

## Javascript Type

1. Text(=String)
2. Number - int, float, BigInt, Date(long int)
3. Boolean - true/false
4. type없는 값 - null, undefined
5. Object - array, object
6. Function

## string을 split하면 array로 리턴

- string은 곧 character arry이기 때문!
  - string에 대해 index 적용 가능!

## global object

- global constant

  - undefined, Infinity, NaN

- global function
  - isNaN(), parseInt(), eval()

## unicode 나타내는 방법

1. `\x` : \xnn = > nn
2. `\un` : \unnnn => nnn
3. `\u{}` : \u{n} => n

## 선언(declaration)과 할당(assignment) 차이

- 선언(declaration)은 리턴 값이 '없다'!

```js
let p = { x: 2.3, y: -1.2 }
```

- 할당(assignment)는 리턴 값이 '있다'!

```js
let p = {}
p = {'x': 5, 'y':6.0}

=>{'x': 5, 'y':6.0}

```

## Function

1. function definition : 함수 정의 부분
2. function application(=Invocation) : 함수 호출 부분

## conditional operator

- < ? : >

```js
let qq
qq ? qq : 'no qq'
=> 'no qq'
qq = 0
=> 'no qq'
qq = ''
=> 'no qq'
qq = null
=> 'no qq'
qq = undefined
=> 'no qq'
```

## Expression 과 Statement

- Expression

  - 함수를 call하는 것 (function applicatin, Evalutation, Invocation)
  - 반드시 return이 있어야 하므로 return 생략 시 저절로 return 됨
  - arrow function에서 괄호'()'로 사용!
  - expression도 자르면 하나의 statement가 됨

- Statement

  - 단순한 control-flow임
  - return값이 반드시 필요한 게 아니므로 return값을 얻고 싶을 땐 'return' 명시해야 함
  - side-effect 존재 : environment(=context)안의 값을 변경함
  - arrow function에서 중괄호'{}'로 사용!
  - statement가 여러줄로 구성되면 compound statemet가 되고 scope개념 발생
  - 종류
    1. conditional statement : if, else if, switch
    2. Loop : for, while
    3. Jump : break, return, throw-catch
  - 명령적 프로그래밍(imperative programming)에서 flow chart를 짜는 개념에서 나온 것!

## Switch

- case뒤에 숫자 뿐만 아니라 string도 사용 가능!
- 'Direct Jump' , 'Jump Table'이용

## Jump

- continue : 밑에 있는 line은 수행하지 않고 다시 위로 올라감
- break : while loop 밖으로 빠져나감

## Three Basic Control Structure

1. Sequence
2. Decision(=Selection) - true/false
3. Loop (=Iteration) + 'break'

## 4대 반복함수

1. map
2. filter
3. find
4. reduce

- forEach는 return값이 없는 map함수 같은 것. 하지만 side-effect가 있다!

## JavaScript는 전부 Reference(Non-primitive type) Variable이다!

- 모든 variable을 HEAP에 넣어서 사용(storage binding X)
- 'Immutable'인지 'Mutable'인지만 구분한다!

  - Immutable

    1. String
    2. Number
    3. BigInt
    4. Boolean
    5. undefined
    6. null
    7. symbol

  - Mutable
    1. Object
    2. Array
    3. Class

## global variable

- 함수 바깥에 있는 변수
- 함수 안에 있어도 let, const로 정의되어 있지 않으면 global variable
- function이름은 전부 global variable

- `Object.keys(this)` : global namespace 확인
