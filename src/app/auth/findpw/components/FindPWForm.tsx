'use client';

import { useFormValidation } from '@/hooks/useFormValidation';
import { useState } from 'react';
import ResetPWForm from './ResetPWForm';

const FORM_STYLES = {
  container: 'w-full max-w-md space-y-6',
  inputWrapper: 'w-full space-y-1',
  label: 'block text-sm font-medium text-gray-700',
  input:
    'w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-black focus:ring-black',
  button:
    'w-full py-2 text-white bg-[#179653] rounded-md transition-colors hover:bg-gray-800',
  description: 'text-center text-gray-600 text-sm mb-8',
  inputGroup: 'flex gap-2 mt-1',
  verifyButton:
    'px-4 py-2 text-white bg-[#179653] rounded-md hover:bg-gray-600 whitespace-nowrap',
  errorText: `text-red-500 text-xs mt-1 px3`,
} as const;

type VerificationStatus = 'initial' | 'verified';

export default function FindPWForm() {
  const [status, setStatus] = useState<VerificationStatus>('initial');
  const [userData, setUserData] = useState({
    email: '',
    verificationCode: '',
  });
  const [isEmailSent, setIsEmailSent] = useState(false);

  const { formData, errors, handleChange } = useFormValidation(
    {
      email: '',
      verificationCode: '',
    },
    'findPassword',
  );

  const handleEmailVerification = (e: React.MouseEvent) => {
    e.preventDefault();
    // 실제로는 여기서 이메일 인증번호 발송 API 호출
    setIsEmailSent(true);
    alert('인증번호가 발송되었습니다. 이메일을 확인해주세요.');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제로는 여기서 인증번호 확인 API 호출
    setStatus('verified');
  };

  if (status === 'verified') {
    return <ResetPWForm />;
  }

  return (
    <div className={FORM_STYLES.container}>
      <p className={FORM_STYLES.description}>
        가입했던 이메일과 인증번호를 입력후
        <br />
        인증 버튼을 눌러주세요
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className={FORM_STYLES.inputWrapper}>
          <label htmlFor="email" className={FORM_STYLES.label}>
            이메일
          </label>
          <div className={FORM_STYLES.inputGroup}>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="예) example@example.com"
              className={FORM_STYLES.input}
              required
            />
            {errors.email && (
              <p className={FORM_STYLES.errorText}>{errors.email}</p>
            )}
            <button
              onClick={handleEmailVerification}
              className={FORM_STYLES.verifyButton}
              disabled={isEmailSent}
            >
              {isEmailSent ? '발송완료' : '메일로 발송'}
            </button>
          </div>
        </div>

        <div className={FORM_STYLES.inputWrapper}>
          <label htmlFor="verificationCode" className={FORM_STYLES.label}>
            인증번호
          </label>
          <input
            type="text"
            id="verificationCode"
            name="verificationCode"
            value={formData.verificationCode}
            onChange={handleChange}
            placeholder="인증번호 입력"
            className={FORM_STYLES.input}
            required
            disabled={!isEmailSent}
          />
          {errors.verificationCode && (
            <p className={FORM_STYLES.errorText}>{errors.verificationCode}</p>
          )}
        </div>

        <button
          type="submit"
          className={FORM_STYLES.button}
          disabled={!isEmailSent}
        >
          인증
        </button>
      </form>
    </div>
  );
}
