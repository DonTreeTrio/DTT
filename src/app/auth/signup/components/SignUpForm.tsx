'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const FORM_STYLES = {
  container: 'w-full max-w-md space-y-8',
  title: 'text-2xl font-bold text-center mb-8',
  inputWrapper: 'w-full space-y-1',
  label: 'block text-sm font-medium text-gray-700',
  input:
    'w-full px-3 py-2 mt-1 border-b border-gray-300 focus:outline-none focus:border-black',
  button:
    'w-full py-3 text-white bg-[#179653] rounded-md transition-colors hover:bg-[#179653]/80 mt-8',
  description: 'text-center text-gray-600 text-sm mb-8',
  inputGroup: 'flex gap-2 mt-1',
  birthGroup: 'grid grid-cols-3 gap-4',
  select:
    'w-full px-3 py-2 mt-1 border-b border-gray-300 focus:outline-none focus:border-black text-center appearance-none bg-transparent',
} as const;

interface SignUpFormProps {
  verifiedEmail: string;
}

export default function SignUpForm({ verifiedEmail }: SignUpFormProps) {
  const router = useRouter();
  const [userData, setUserData] = useState({
    password: '',
    confirmPassword: '',
    name: '',
    nickname: '',
    phone: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
  });

  // 년도 옵션 생성 (현재 년도부터 100년 전까지)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  // 월 옵션 생성 (1-12월)
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // 일 옵션 생성 (1-31일)
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제로는 여기서 회원가입 API 호출
    router.push('/auth/login');
  };

  return (
    <div className={FORM_STYLES.container}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 이메일 (읽기 전용) */}
        <div className={FORM_STYLES.inputWrapper}>
          <label htmlFor="email" className={FORM_STYLES.label}>
            이메일
          </label>
          <input
            type="email"
            id="email"
            value={verifiedEmail}
            className={`${FORM_STYLES.input} bg-gray-50`}
            readOnly
          />
        </div>

        {/* 비밀번호 */}
        <div className={FORM_STYLES.inputWrapper}>
          <label htmlFor="password" className={FORM_STYLES.label}>
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            placeholder="영문, 숫자, 특수문자 조합 8자리 이상"
            className={FORM_STYLES.input}
            required
          />
        </div>

        {/* 비밀번호 확인 */}
        <div className={FORM_STYLES.inputWrapper}>
          <label htmlFor="confirmPassword" className={FORM_STYLES.label}>
            비밀번호 확인
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={userData.confirmPassword}
            onChange={(e) =>
              setUserData({ ...userData, confirmPassword: e.target.value })
            }
            placeholder="비밀번호를 한번 더 입력해주세요"
            className={FORM_STYLES.input}
            required
          />
        </div>

        {/* 이름 */}
        <div className={FORM_STYLES.inputWrapper}>
          <label htmlFor="name" className={FORM_STYLES.label}>
            이름
          </label>
          <input
            type="text"
            id="name"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            placeholder="이름을 입력해주세요"
            className={FORM_STYLES.input}
            required
          />
        </div>

        {/* 닉네임 */}
        <div className={FORM_STYLES.inputWrapper}>
          <label htmlFor="nickname" className={FORM_STYLES.label}>
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            value={userData.nickname}
            onChange={(e) =>
              setUserData({ ...userData, nickname: e.target.value })
            }
            placeholder="닉네임을 입력해주세요"
            className={FORM_STYLES.input}
            required
          />
        </div>

        {/* 휴대폰 */}
        <div className={FORM_STYLES.inputWrapper}>
          <label htmlFor="phone" className={FORM_STYLES.label}>
            휴대폰
          </label>
          <input
            type="tel"
            id="phone"
            value={userData.phone}
            onChange={(e) =>
              setUserData({ ...userData, phone: e.target.value })
            }
            placeholder="'-' 없이 숫자만 입력해주세요"
            className={FORM_STYLES.input}
            required
          />
        </div>

        {/* 생년월일 */}
        <div className={FORM_STYLES.inputWrapper}>
          <label className={FORM_STYLES.label}>생년월일</label>
          <div className={FORM_STYLES.birthGroup}>
            <select
              value={userData.birthYear}
              onChange={(e) =>
                setUserData({ ...userData, birthYear: e.target.value })
              }
              className={FORM_STYLES.select}
              required
            >
              <option value="">년도</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}년
                </option>
              ))}
            </select>

            <select
              value={userData.birthMonth}
              onChange={(e) =>
                setUserData({ ...userData, birthMonth: e.target.value })
              }
              className={FORM_STYLES.select}
              required
            >
              <option value="">월</option>
              {months.map((month) => (
                <option key={month} value={month.toString().padStart(2, '0')}>
                  {month}월
                </option>
              ))}
            </select>

            <select
              value={userData.birthDay}
              onChange={(e) =>
                setUserData({ ...userData, birthDay: e.target.value })
              }
              className={FORM_STYLES.select}
              required
            >
              <option value="">일</option>
              {days.map((day) => (
                <option key={day} value={day.toString().padStart(2, '0')}>
                  {day}일
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className={FORM_STYLES.button}>
          회원가입
        </button>
      </form>
    </div>
  );
}
