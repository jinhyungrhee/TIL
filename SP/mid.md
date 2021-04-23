# pthread가 종료되는 방법

1. 할당되었던 start_routine(function)으로부터 return하면 종료됨
2. pthread_exit()을 호출하면 종료됨
3. 한 thread가 다른 thread를 지정하여 pthread_cancel()을 호출하면 지명된 thread 종료
4. main함수가 종료되어 exit() 호출되면 전체 thread 종료

# setpgid(pid_t pid, pid_t pgid);

1. setpgid(0, 0) : 내 자신(caller process)이 '그룹 리더'가 되도록 설정
2. setpgid(0, x) : 프로세스x(pid)를 나의 pgid로 설정 (process x가 '그룹 리더'가 되도록)
3. setpgid(x, 0) : 프로세스x의 pgid를 나의 pgid로 설정 (process x가 속한 프로세스 그룹과 내가 속한 프로세스 그룹을 같게 만듦)

# Implicit Sharing

- 암묵적 변수 공유

# Mutex Attribute

1. protocol - priority inversion protocol

- 우선순위가 높은 것과 낮은 것 사이의 실행순서가 역전되는 현상(priority inversion)을 방지하기 위한 protocol
- 낮은 priority 때문에 높은 priority의 지연시간이 길어지는 문제 발생

2. prioceiling

- mutex를 잡는 순간 priority가 갑자기 상승하는 문제 해결

3. process-shared

- 서로 다른 프로세스간에도 mutex를 공유하고 싶을 때 사용

# Advisory Locking vs Mandatory Locking

- Advisory Locking

  - 프로그래머에 의한 locking

- Mandatory Locking
  - OS에 의한 locking

# thread에게 주소값을 인자로 전달하는 경우

- implicit sharing 문제 발생

  - 여러 thread가 주소값을 인자로 주고받다가 주소값 안에 있는 변수를 공유해 변수의 값이 모르는 사이에 변경되는 문제
  - 최대한 주소값을 인자로 보내지 말아야 함

- 불가피하게 주소값을 전달해야 하는 경우

  - 전달해야 할 인자가 여러개일 때 구조체를 만들어서 구조체에 값을 채우고 그 구조체의 주소를 전달하는 경우

  - 이 경우에도 서로 다른 thread에게 서로 다른 구조체 개체를 사용하는 것이 바람직함

## mutex

- 서로 다른 thread들 간에 공유 변수(또는 file, data)가 있을 때 이것에 대해 안정적이고 정확한 결과를 가져오도록 보호하는 장치

## Advisory Locking

- lock/unlock이 서로 짝을 이루지 않고 unlock이 생략된 경우, 다른 thread들이 lock을 시도하면 전부 block된다
- 이는 전적으로 프로그래머 책임이다
- Mandatory locking의 반대(OS책임)

## condition variable

- lock을 쥔 채로 무작정 기다리는 상황을 방지하기 위해 대기 Queue를 만들어주는 것
