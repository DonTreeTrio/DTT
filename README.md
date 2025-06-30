# ₿ DTT - Don Tree Trio

## 📝 프로젝트 소개

## 👥 팀 구성

| 분야     | 이름   | GitHub         |
| -------- | ------ | -------------- |
| Frontend | 이인우 | [@dpftlel21]() |
| Frontend | 윤지연 | [@]()          |
| Backend  | 이주희 | [@]()          |

### 🔗 프로젝트 링크.

- **[서비스 링크]()**
- **[백엔드 Repository]()**

### 📚 프로젝트 기획 및 설계 자료

- **[피그마]()**
- **[API 명세서]()**
- **[컨플루언스 & Jira]()**

---

## 🛠 Technical Stack

### Frontend

<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white"/> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=Tailwind CSS&logoColor=white"/>

### Communication

<img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white"> <img src="https://img.shields.io/badge/Confluence-172B4D?style=for-the-badge&logo=Confluence&logoColor=white">

### DevOps

<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white">

---

## ✔️ Git Commit Message Convention

프로젝트의 커밋 메시지를 일관성 있고 명확하게 작성하기 위해 아래와 같은 구조로 커밋 메시지를 작성합니다. 이 Convention은 각각의 커밋이 어떤 작업을 수행하는지를 명확히 전달하여 협업과 버전 관리를 원활하게 합니다.

### 1. 구조

- `[타입]: 제목 (필수)`

- `[본문]: 변경 내용 (옵션)`

### 2. 타입 및 Emoji

| 타입     | emoji | 코드                      | 설명                                                                      |
| -------- | ----- | ------------------------- | ------------------------------------------------------------------------- |
| feat     | ✨    | `:sparkles:`              | 새로운 기능 추가                                                          |
| fix      | 🐛    | `:bug:`                   | 버그 수정                                                                 |
| design   | 📱    | `:iphone:`                | 사용자 UI 디자인 변경                                                     |
| style    | 🎨    | `:art:`                   | 코드 포맷 변경, 세미 콜론 누락, 코드 수정 없음                            |
| comment  | 💡    | `:bulb:`                  | 주석 추가 및 변경                                                         |
| docs     | ♻️    | `:recycle:`               | 프로덕션 코드 리팩토링                                                    |
| refactor | 📝    | `:memo:`                  | 문서 수정                                                                 |
| test     | ✅    | `:white_check_mark:`      | 테스트 추가 또는 리팩토링                                                 |
| rename   | 🚚    | `:truck:`                 | 파일이나 폴더명 변경, 이동 작업만                                         |
| remove   | ➖    | `:heavy_minus_sign:`      | 파일 삭제 작업만                                                          |
| chore    | 🏗️    | `:building_construction:` | 빌드 테스트 업데이트, 패키지 매니저를 설정하는 경우(프로덕션 코드 변경 X) |

### 커밋 예시

✨ feat: 검색 기능 추가 #1(이슈 번호 작성)

- 변경 사항 1
- 변경 사항 2 // 본문은 필요에 따라 작성

### 주의사항

- 커밋 메시지는 명료하고 간결하게 작성하는 것이 좋습니다.

- 커밋 타입과 내용을 일광성 있게 작성하여 프로젝트의 커밋 로그를 쉽게 읽을 수 있도록 합니다.

- 이슈를 참조하는 경우 이슈 번호를 커밋 메시지에 포함시키는 것이 유용합니다. 이를 통해 이슈와 관련되 커밋을 추적할 수 있습니다.

---

### 1. Git 브랜치

프로젝트의 팀원들은 아래와 같은 Git 브랜치명 규칙을 따라 브랜치를 관리합니다. 이 규칙은 팀원들이 브랜치를 일관성 있게 생성하고 관리하여 협업을 원할하게 하도록 도와줍니다.

### 2. 기본 브랜치

- 메인 브랜치 : 'main'

- 개발 브랜치 : 'dev'

### 3. 개발 브랜치

#### 1. fork 한 팀원

```
# 브랜치 명
forked-repo/main
└── forked-repo/dev
    ├── feat/teammate-task
    └── fix/teammate-bug
```

```
# 새 기능 개발
git checkout -b feature/signup

# 작업 후
git add .
git commit -m "[git 이모지]feat: 회원가입 구현 #이슈번호"
git push origin feature/signup

# PR
feat/signup -> dev
```

---

## 📝 CSS 컨벤션

### 1. 스타일은 상수로 선언 후 사용

```tsx
const HEADER_STYLES = {
  container: 'w-full h-[5rem] flex justify-around items-center shadow-md',
  logo: 'rounded-sm',
  link: 'text-gray-600 hover:text-gray-800',
  button: 'bg-[#179653] text-white px-4 py-2 rounded-md hover:bg-[#179653]/80',
};

export default function Header() {
  return (
    <header className={HEADER_STYLES.container}>
      <Link href="/">
        <Image src="/images/logo.png" alt="logo" width={100} height={100} />
      </Link>
    </header>
  );
}
```

### 2. 스타일 순서

```
absolute top-0 left-0    /* Position */
flex items-center        /* Display & Flex */
w-full h-16              /* Width & Height */
px-4 py-2                /* Padding */
mx-auto                  /* Margin */
border rounded-lg        /* Border & Border Radius */
text-sm font-medium      /* Typography */
bg-white text-gray-800   /* Colors */
shadow-md                /* Effects */
hover:bg-gray-50         /* Interactive */
```

### 3. 좌우 여백

```
mx-auto
```


---

## 💡 주요 기능 및 기술적 도전

### 1. 기능 1

- 상세 설명

### 2. 기능 2

- 상세 설명

### 3. 기능 3

- 상세 설명

---

### 컨벤션

## ⏰ 개발 기간

**2025.01 ~**
