# 라이브러리
- 우리가 많이 사용하는 function들의 집합
- 사용자의 **편의성**을 돕고, **재활용**을 할 수 있도록 제공
- 종류
    - Static Library
        - 모든 function들이 각 실행파일마다 들어있는 형태
        - 제한된 메모리 위에 똑같은 function들이 반복적으로 copy되어있음!
        - 시스템 관리자 입장에서 매우 비효율적
        - embedded system에 적합
        - 확장자명 : ```*.a```

    - Shared Library(= Dynamic Library)
        - 각 function마다 하나의 copy만 메모리 위에 올라옴. 여러개의 프로세스들이 function을 공유해서 사용하는 개념
        - function의 주소는 OS에 의해 런타임(실행시간)에 결정됨 → **dynamic linking(binding)**
        - 이를 위한 심벌테이블이 메모리에 존재 (memory overhead)
        - 중복된 코드를 없앴기 때문에 조금 더 효율적인 방식
        - server system에 적합
        - 확장자명 : ```*.so```, ```*.dll```(windows)

# Standard I/O Library
- <stdio.h>
    - standard I/O Library를 지원하는 function call(=Prototype, API)과 Symbol들 정의

- Standard I/O Library를 이용한 File 입출력
    - ```fopen``` → **file stream 객체**가 생성됨 (우리에게는 file stream Pointer 전달)
    - 생성된 file stream 객체에서 fread/fwrite/fflush/fgetc와 같은 operation들이 발생함

    - 프로세스가 만들어지면 기본적으로 세 개의 **터미널 파일(console terminal)**이 OS에 의해 생성됨
        1. ```stdin```
        2. ```stdout```
        3. ```stderror```
        - OS가 기본적으로 만들어서 그 프로세스에게 제공하는 file
        - 프로그램이 실행될 때 만들어지고, 종료될 때 자동으로 종료되는 file
