# Term

- 터미널파일(console terminal file)  
  :프로세스가 만들어지면 기본적으로 생성되는 세 개의 파일(stdin, stdout, stderr)

- File descriptor  
  : OS가 File I/O를 할 때 사용하는 unique한 숫자. (file stream과 file descriptor는 1대1로 mapping됨)

- Syscall 대신 Standard I/O Library 사용하는 이유

  1. convenient (for user)
  2. formatting
  3. library buffering
  4. portability (os마다 c standard library를 해당 syscall로 바꾸는 compiler와 library존재)

- Library Buffering(= user level buffering)

  1. unbuffering

  - 버퍼 사용x 바로 커널로 보냄
  - 미리 갖다두지 않고 요청하는 만큼만 읽음
  - 장점 : 안정성
  - 단점 : 성능 저하(syscall 빈번)
  - ex) stderr(긴급, 바로바로)

  2. full buffering

  - 4kb~8kb의 lib-level buffer 사용
  - 장점 : 성능 개선(syscall 줄임)
  - 단점 : 응답성 저하(그때그때 확인 불가)
  - fflush로 synchronization(응답성 보완)
  - ex) 일반적인 파일들

  3. line buffering

  - 텍스트 입출력 사용
  - 'newline'가 나타나야 I/O
  - 입출력 terminal은 기본적으로 line buffer라 getchar()사용시 제대로 전달 안됨
    - getchar()로 한 byte씩 입력하려면 터미널 'non-canonical'모드로 변경
  - ex) stdin, stdout

- ferror() : 스트림에 어떤 type의 에러가 발생했는지 확인

- feof() : 파일의 끝에 도달했는지 확인

  - 중간에서 부르면 0 리턴
  - 끝(EOF)에 도착하면 1 리턴

- clearerr() : 지금까지 발생한 error 일단 clear

- 중요한 ANSI C 특징들

  1. function prototype
  2. generic pointers
  3. abstract data type

- inode : 한 file의 모든 관리정보를 담당하고 있는 구조체

  - 모든 file은 각자의 inode를 가지고 있음
  - inode는 모두 disk에 위치함
  - 구성요소 :
    1. file 이름 (meta data)
    2. file 타입 (meta data)
    3. file owner id (meta data)
    4. access permission (meta data)
    5. 생성/수정 시간 (meta data)
    6. file 크기 (meta data)
    7. file 테이블 블럭에 대한 주소 테이블 (content)
  - 구조 :
    - block size : 512bytes (= 128개의 pointer가 들어갈 수 있음)
    - pointer size : 4bytes
      - 1 ~ 12 : direct pointer
      - 13 : single indirect pointer
      - 14 : double indirect pointer
      - 15 : triple indirect pointer

- file type

  1. regular - text, binary
  2. directory
  3. FIFO(pipe)
  4. special - block device, character device
  5. symbolic link

- 5 FILE I/O SYSTEM CALL

1. open(2)
2. close(2)
3. read(2)
4. write(2)
5. lseek(2)

- Symbolic link

  - 타겟 파일에 대한 경로명(경로정보)을 담고 있는 또 다른 '파일'
  - ln -s target_file link_name
  - 링크를 따라가지 않는 시스템콜
    1. lchown
    2. lstat
    3. readlink
    4. unlink
    5. remove
    6. rename
  - 링크를 따라가는 시스템콜
    - chown
    - stat
    - fstat
    - access

- Hard link

  - 타겟 파일과 연결되어 있는 i-node로 가는 또 다른 '링크' 생성
  - 하나의 i-node가 두 개 이상의 파일이름(filename)을 갖는 형태
  - ln target_file link_name

- getuid() : 프로세스 안에서 나를 만든 real user id
- getgid() : 내가(caller process) 속해 있는 group id
- geteuid() : effective user id
  - 커널의 dynamic protection system으로 인해 커널에서 사용하는 key와 같음
  - 접근 권한이 필요할 때 나의 uid를 euid로 설정함
- getegid() : effective group id

  - 내가 속한 group이 아닌, 커널이 제공하는 임시 group(디렉토리의 gid)의 group정보를 사용하는 경우

- pid : 모든 프로세스가 갖는 unique한 ID

  - 양수, 재발급x

- getpid() : 내 프로세스의 pid값 리턴
- getppid() : 내 부모프로세스의 pid값 리턴

- 프로세스 그룹 id (pgid) : 현재 생성된 프로세스들이 만든 그룹

  - 일반적인 프로세스 그룹 id(pgid)는 자기가 속해 있는 그룹의 리더(세션리더)의 pid임! \*\*\*
  - 일반적으로 세션리더는 shell임

- getpgrp() : 내가(caller process)가 속한 프로세스 그룹 id(pgid)를 리턴
- getpgid(pid_t pid) : 지정한 pid가 속한 프로세스 그룹 id(pgid)를 리턴 => getpgid(getpid())는 결국 getpgrp()와 동일!

- 프로세스 그룹 리더 : 서버에 처음 접속 시 처음 만들어지는 '세션리더 프로세스의 pid'가 그로부터 생성되는 '프로세스 그룹의 id(pgid)'가 된다\*\*\*

  - shell(세션리더)에게 어떤 signal이 전달되면, 그 프로세스 그룹에 있는 모든 프로세스들에게 signal이 전파됨
  - 만약 세션리더가 종료되면 프로세스 그룹의 모든 자식프로세스에게 SIGHUP(hang-up:끊다) 시그널이 전달됨
  - 그것을 전달받은 모든 프로세스들은 강제종료됨
    - 세션리더가 종료된 뒤에도 자식 프로세스가 계속 실행되게 하려면 "nohup" + "background mode(&)" 사용

- setpgid(pid, pgid) : 세션리더 변경

  1. setpgid(0, 0) : 나를 세션리더로 설정
  2. setpgid(0, x) : 프로세스 x의 pid를 나의 프로세스 그룹의 id로 설정 (프로세스 x가 세션리더가 됨)
  3. setpgid(x, 0) : 내가 속해있는 프로세스 그룹 id와 프로세스 x가 속한 프로세스 그룹 id를 같게 만듦 (같은 프로세스 그룹이 됨)

- I/O redirection : 어떤 프로세스의 표준출력 결과를 어떤 파일로 저장하는 것 ($ ./a.out > output)

- atexit (exit handler) == pthread_cleanup_push (thread exit/cancel handler)
- waitpid + WNOHANG (non-blocking call) == pthread_mutex_trylock (non-blocking call)
- waitpid(-1, ,) == wait() : 어느 프로세스라도 종료되어 status값을 리턴하면 바로 깨어남

- fexecve() 사용 예 \*\*\*

1. file descriptor이용
1. vector array이용
1. 프로세스의 환경변수를 envp벡터에 전달

- file descriptor에는 실행할 프로그램의 바이너리가 그 안에 담겨있음. 보안상의 이유로 바이너리를 직접 읽어들인 뒤 바이너리가 변조되었느지 내부적으로 확인한 다음에 실행하고 싶은 경우에 사용!

- 비교연산자(==) 대신 pthrea_equal(t1,t2)를 사용해야 하는 이유

  - t1, t2의 thread ID는 사실 실제 ID가 아니라 ID정보를 가리키는 일종의 key다. 따라서 그 키를 가지고 ID정보를 따라가서 그 안에 있는 thread 구조체 정보들을 확인해 실제 같은 thread인지 아닌지 비교해야 한다. 그것을 해주는 함수가 pthread_eqaul이다!

- times
  - wall clock time(=elapsed time) : 토탈경과시간(cpu time + 대기시간+ I/O시간)
  - user cpu time : user instruction에 사용된 시간
  - system cpu time : os커널이 user process를 위해서 서비스한 시간
  - clock_tick
    - times()의 리턴 값
    - tick counter로 인해 시스템이 부팅되면 clock_tick은 계속해서 증가

# Macro

## setvbuf()

- 버퍼링 type

1. \_IOFBF
2. \_IOLBF
3. \_IONBF

## fseek() / lseek()

- SEEK options

1. SEEK_SET : file의 맨 처음 기준
2. SEEK_CUR : 현재의 offset 기준
3. SEEK_END : file의 맨 끝 기준 (offset 음수!)

## open() - system call

- open flag option

1. O_RDONLY
2. O_WRONLY
3. O_RDWR

4. O_CREAT : 파일 없으면 생성, 있으면 아무일도 발생x
5. O_EXCL : O_CREAT과 함께 사용. 파일 이미 있으면 error 발생!
6. O_TRUNC : file 이미 존재하면 empty만들고 시작
7. O_APPEND : file의 끝(EOF)에서 write 시작
8. O_SYNC : wirte할 때마다 바로 disk로 synchronization

- file permission mode

1. S_ISUID : set user id - 설정시 프로세스의 uid는 나의 uid가 아니라 '파일 소유주'의 uid가 됨 : -rwsrw-rw- (chmod u+s)
2. S_ISGID : set group id - 설정시 프로세스의 gid는 나의 gid가 아니라 그 '디렉토리'의 gid가 됨 : -rw-rws-rw- (chmod g+s)
3. s_IVTX : set sticky bit - 사람들이 설정한 디렉토리에 파일을 올릴 수 있지만 수정 권한은 파일 소유자와 supervisor에게만 있음 (chmod o+t)
4. S_IRWXU : user R/W/X
5. S_IRUSR : user R only
6. S_IwUSR : user w only
7. S_IxUSR : user x only
8. S_IRWXG : group R/W/X
9. S_IRGRP : group R only
10. S_IWGRP : group w only
11. S_IXGRP : group x only
12. S_IRWXO : other R/W/X
13. S_IROTH : other R only
14. S_IwOTH : other w only
15. S_IXOTH : other x only

## stat() / lstat() / fstat()

- struct stat fields

  - st_dev : 어떤 디바이스 사용
  - st_ino : inode number
  - st_mode : access mode \*\*\*
  - st_nlink : hard link의 개수
  - st_uid : 유저 id \*\*\*
  - st_gid : 그룹 id
  - st_rdev : device type
  - st_size : 파일 크기 \*\*\*

- st_mode와 함께 사용하는 함수
  - S_ISREG(st_mode) : regular면 true
  - S_ISDIR(st_mode) : dir이면 true
  - S_ISCHR(st_mode) : character device
  - S_ISBLK(st_mode) : block device
  - S_ISFIFO(st_mode) : fifo(pipe)
  - S_ISLNK(st_mode) : symbolic link
  - S_ISSOCK(st_mode) : socket file

## access()

- amode
  - R_OK : read가능?
  - w_OK : write가능?
  - X_Ok : execute 가능?
  - F_OK : file 있음?

## waitpid()

- pid값에 -1 : 불특정한 child프로세스 지정 (어느 하나라도 종료되면 waitpid()에서 돌아옴)
- options
  - 0 : 무한정 기다리겠다는 의미
  - WNOHANG : non-blocking call. 해당되는 사건이 일어나지 않으면 바로 반환. parent가 중요한 일 할 때 사용!
- exit()에서 전달받은 status값 확인 함수
  - WEXITSTATUS(status) : exit코드만 분리
  - WIFEXITED(status) : 정상종료인지 확인
  - WIFSIGNALED(status) : 비정상종료인지 확인
  - WIFSTOPPED(status) : 현재 멈춰 서 있는 상태인지 확인
  - WTERMSIG(status) : 어떤 signal을 받고 종료했는지 확인
  - WCOREDUMP(status) : 작업중이던 메모리 상태기록(CORE FILE)이 있는지 확인
