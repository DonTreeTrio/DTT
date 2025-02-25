'use client';

import { useFormValidation } from '@/hooks/useFormValidation';
import { useState } from 'react';
import FindIDResult from './FindIDResult';

const FORM_STYLES = {
  container: 'w-full max-w-md space-y-6',
  inputWrapper: 'w-full space-y-1',
  label: 'block text-sm font-medium text-gray-700',
  input:
    'w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-black focus:ring-black',
  button:
    'w-full py-2 text-white bg-black rounded-md transition-colors hover:bg-gray-800',
  description: 'text-center text-gray-600 text-sm mb-8',
  errorText: `text-red-500 text-xs mt-1 px3`,
} as const;

type VerificationStatus = 'initial' | 'verified';

export default function FindIdForm() {
  const [status, setStatus] = useState<VerificationStatus>('initial');
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
  });
  const [verifiedEmail, setVerifiedEmail] = useState('');

  const { formData, errors, handleChange } = useFormValidation(
    {
      name: '',
      phone: '',
    },
    'findId',
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제로는 여기서 본인인증 API 호출
    // 임시로 바로 verified 상태로 변경
    setVerifiedEmail('example***@naver.com');
    setStatus('verified');
  };

  if (status === 'verified') {
    return <FindIDResult name={userData.name} email={verifiedEmail} />;
  }

  return (
    <div className={FORM_STYLES.container}>
      <p className={FORM_STYLES.description}>
        회원가입시 입력한 이름과 전화번호를 입력 후
        <br />
        찾기 버튼을 입력해주세요.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className={FORM_STYLES.inputWrapper}>
          <label htmlFor="name" className={FORM_STYLES.label}>
            이름
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="이름 ex) 김철수"
            className={FORM_STYLES.input}
            required
          />
          {errors.name && (
            <p className={FORM_STYLES.errorText}>{errors.name}</p>
          )}
        </div>

        <div className={FORM_STYLES.inputWrapper}>
          <label htmlFor="phone" className={FORM_STYLES.label}>
            휴대폰
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="' - '를 제외한 11자리"
            className={FORM_STYLES.input}
            required
          />
          {errors.phone && (
            <p className={FORM_STYLES.errorText}>{errors.phone}</p>
          )}
        </div>

        <button type="submit" className={FORM_STYLES.button}>
          본인 인증
        </button>
      </form>
    </div>
  );
}
