# Team 10

**2022.08.25**

```
추가될 내용이 있을 경우 내용을 추가하도록 합니다.
```

## Code Formatting

> ESLint를 활용하여 검사하면 좋겠지만 프리티어 셋팅을 검사합니다.
>
> 세미콜론 사용
>
> Tab width: 2
>
> String의 경우 ""(Double quote)를 사용합니다.

## Programming Rule

1. 변수

- 이름

  Example

  ```js
  // 나쁜 예.
  const a = false;

  // 좋은 예.
  const isValid = false;
  ```

- 불변성 유지

  - Scope를 파악하기 힘든 var는 사용하지 않도록 합니다.

  - 되도록이면 let을 사용하기 보다 const를 사용하도록 합니다.

  - 변수의 Scope 짧게 가져가도록 합니다.

2. 함수

- 이름

  - 함수의 이름을 보고 어떠한 역할을 하는 함수인지 알 수 있도록 작성합니다.

  Example

  ```js
  // 나쁜 예.
  function a(a, b) {
    return a + b;
  }

  // 좋은 예.
  function sum(a, b) {
    return a + b;
  }
  ```

- Side effect

  - 함수의 input과 output이 동일하게 합니다.

  Example

  ```js
  // 나쁜 예
  // 바깥의 a 변수에 의해 함수의 output이 달라집니다.
  let a = 1;
  function sum(b) {
    return a + b;
  }

  // 좋은 예
  function sum(a, b) {
    return a + b;
  }
  ```

- 재사용될 가능성이 있는 함수

  - 해당 함수가 어떠한 역할을 하는지 주석을 작성합니다.

  ```js
  // Example
  // 두 수를 더하는 함수
  function sum(a, b) {
    return a + b;
  }
  ```

3. 협업

- Pull

  - 생각이 날 때마다 git pull origin dev를 실시합니다.

- Branch

  - Branch의 주기는 최대한 짧게 가져가도록 합니다.

  - Branch의 commit은 기능 단위로 꾸준히 버전을 관리하도록 합니다.

- Merge Request

  - Merge request 생성 시 설명 부분에 각자의 Code review를 작성하도록 합니다.

  Example

  ```
  Title: Feat: AwardAddForm 추가

  Description: AwardAddForm의 Validation을 추가하고 API와 연동을 했습니다.

  ...

  Code block

  ex) const AwardAddForm = () => {

      ...

  }
  ```

  - Merge 이후 remote branch를 삭제하고 local branch도 삭제한 후 추후에 작업할 branch를 새롭게 생성합니다.

    - git checkout dev
    - git pull origin dev
    - git push origin -d "branch name"
    - git branch -d "branch name"
    - git checkout -b "branch name"

4. React

   - 함수

   - 이벤트 핸들러를 받는 prop의 이름은 on~~으로 명명합니다.

   - 이벤트 함수의 이름은 handle~~으로 명명합니다.

- Props

  - Props로 전달되는 함수는 메모이제이션을 활용해 불필요한 함수 생성이 반복되지 않도록 useCallback을 사용하도록 합니다.

- memo

  - memo로 감싸진 컴포넌트(순수 컴포넌트)의 경우 필시적으로 메모이제이션을 활용하도록 합니다.

- Custom Hook

  - Custom Hook의 경우 이름은 use~~으로 명명합니다.
