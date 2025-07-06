# FSD 아키텍처 기반 폴더 구조 리팩토링 제안

## 🎯 목표

Feature-Sliced Design 아키텍처를 적용하여 코드의 가독성, 유지보수성, 확장성을 개선합니다.

## 📁 제안하는 새로운 구조

```
src/
├── app/                    # 🔥 애플리케이션 진입점
│   ├── providers/          # Context Provider들
│   ├── router/             # 라우팅 설정
│   ├── styles/             # 전역 스타일
│   └── index.tsx           # 앱 진입점
├── pages/                  # 📄 페이지 레이어
│   ├── main/               # 메인 거래 페이지
│   ├── auth/               # 인증 페이지들
│   ├── mypage/             # 마이페이지
│   ├── contest/            # 대회 페이지
│   └── purchase/           # 구매 페이지
├── widgets/                # 🔧 위젯 레이어 (큰 단위 컴포넌트)
│   ├── coin-chart/         # 코인 차트 위젯
│   ├── coin-list/          # 코인 리스트 위젯
│   ├── order-book/         # 호가창 위젯
│   ├── trading-panel/      # 거래 패널 위젯
│   └── header/             # 헤더 위젯
├── features/               # ⚡ 기능 레이어
│   ├── auth/               # 인증 기능
│   │   ├── login/          # 로그인 기능
│   │   ├── signup/         # 회원가입 기능
│   │   └── password-reset/ # 비밀번호 재설정 기능
│   ├── trading/            # 거래 기능
│   │   ├── place-order/    # 주문 기능
│   │   ├── cancel-order/   # 주문 취소 기능
│   │   └── order-history/  # 주문 내역 기능
│   └── profile/            # 프로필 관리 기능
├── entities/               # 🎯 엔터티 레이어
│   ├── user/               # 사용자 엔터티
│   ├── coin/               # 코인 엔터티
│   ├── order/              # 주문 엔터티
│   └── market/             # 마켓 엔터티
└── shared/                 # 🔄 공유 레이어
    ├── api/                # API 관련 공통 코드
    ├── ui/                 # 공통 UI 컴포넌트
    ├── lib/                # 유틸리티 함수
    ├── config/             # 설정 파일
    └── constants/          # 상수 정의
```

## 🔄 마이그레이션 맵핑

### 현재 → 새로운 구조

| 현재 위치                            | 새로운 위치                              | 설명                      |
| ------------------------------------ | ---------------------------------------- | ------------------------- |
| `src/app/layout.tsx`                 | `src/app/providers/`                     | 글로벌 Provider로 이동    |
| `src/app/main/`                      | `src/pages/main/`                        | 메인 페이지로 이동        |
| `src/app/auth/`                      | `src/pages/auth/` + `src/features/auth/` | 페이지와 기능 분리        |
| `src/app/main/components/coinChart/` | `src/widgets/coin-chart/`                | 차트 위젯으로 이동        |
| `src/app/main/components/coinList/`  | `src/widgets/coin-list/`                 | 코인 리스트 위젯으로 이동 |
| `src/app/main/components/orderBook/` | `src/widgets/order-book/`                | 호가창 위젯으로 이동      |
| `src/app/main/components/payment/`   | `src/widgets/trading-panel/`             | 거래 패널 위젯으로 이동   |
| `src/apis/`                          | `src/shared/api/`                        | 공유 API로 이동           |
| `src/common/`                        | `src/shared/lib/`                        | 공유 라이브러리로 이동    |
| `src/components/`                    | `src/shared/ui/`                         | 공유 UI 컴포넌트로 이동   |
| `src/hooks/`                         | `src/shared/lib/hooks/`                  | 공유 훅으로 이동          |

## 📦 세그먼트 구조 예시

각 기능/위젯/엔터티는 다음과 같은 세그먼트로 구성됩니다:

```
features/auth/login/
├── api/            # 로그인 API
├── model/          # 로그인 상태 관리
├── ui/             # 로그인 UI 컴포넌트
└── index.ts        # 공개 API
```

## 🎨 실제 적용 예시

### 1. 코인 차트 위젯

```
widgets/coin-chart/
├── api/
│   └── candle-data.ts
├── model/
│   └── chart-store.ts
├── ui/
│   ├── chart-header.tsx
│   ├── chart-render.tsx
│   └── time-filter.tsx
└── index.ts
```

### 2. 인증 기능

```
features/auth/login/
├── api/
│   └── login.ts
├── model/
│   └── login-form.ts
├── ui/
│   ├── login-form.tsx
│   └── oauth-buttons.tsx
└── index.ts
```

### 3. 코인 엔터티

```
entities/coin/
├── api/
│   └── coin.ts
├── model/
│   └── coin.ts
├── ui/
│   └── coin-card.tsx
└── index.ts
```

## 🚀 구현 단계

### Phase 1: 기본 구조 설정

1. 새로운 폴더 구조 생성
2. `shared/` 레이어 먼저 구성
3. 공통 컴포넌트 및 유틸리티 이동

### Phase 2: 페이지 분리

1. `pages/` 레이어 구성
2. 기존 `app/` 폴더의 페이지들 이동
3. 라우팅 설정 업데이트

### Phase 3: 위젯 분리

1. `widgets/` 레이어 구성
2. 큰 단위 컴포넌트들 위젯으로 이동
3. 위젯 내부 구조 정리

### Phase 4: 기능 분리

1. `features/` 레이어 구성
2. 사용자 행동 기반 기능들 분리
3. 비즈니스 로직 정리

### Phase 5: 엔터티 분리

1. `entities/` 레이어 구성
2. 도메인 모델 정의
3. 데이터 관련 로직 정리

## 💡 FSD 아키텍처의 장점

1. **명확한 책임 분리**: 각 레이어의 역할이 명확
2. **종속성 규칙**: 상위 레이어만이 하위 레이어에 의존
3. **기능 중심 구조**: 비즈니스 로직이 명확히 분리됨
4. **재사용성 향상**: 공통 컴포넌트와 로직의 재사용성 증대
5. **유지보수성**: 변경사항의 영향 범위를 최소화

## 🔧 Next.js 13+ 호환성

Next.js 13+ App Router와 호환되도록 구조를 조정:

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # 인증 관련 페이지들
│   ├── (main)/            # 메인 거래 페이지들
│   ├── layout.tsx         # 전역 레이아웃
│   └── page.tsx           # 홈 페이지
├── pages-layer/           # FSD Pages 레이어 (이름 변경)
├── widgets/
├── features/
├── entities/
└── shared/
```

이렇게 하면 Next.js의 `app/` 폴더는 라우팅 전용으로, 실제 페이지 구성은 `pages-layer/`에서 담당할 수 있습니다.
