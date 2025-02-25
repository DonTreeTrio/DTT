'use client';

import { useFormValidation } from '@/hooks/useFormValidation';
import { useState } from 'react';

const STYLES = {
  container: 'w-full max-w-md space-y-8',
  title: 'text-2xl text-black font-bold text-center mb-8',
  description: 'text-center text-gray-600 text-sm mb-8',
  inputWrapper: 'w-full space-y-1',
  label: 'block text-sm font-medium text-gray-700',
  input:
    'w-full px-3 py-2 mt-1 border-b border-gray-300 focus:outline-none focus:border-black',
  inputGroup: 'flex flex-col gap-2 mt-1',
  verifyButton:
    'h-[50px] px-4 py-2 text-white bg-[#179653] rounded-md hover:bg-[#179653]/80 whitespace-nowrap',
  button:
    'w-full py-3 text-white bg-[#179653] rounded-md transition-colors hover:bg-[#179653]/80 mt-8',
  errorText: `text-red-500 text-xs mt-1 px3`,
} as const;

interface EmailVerificationProps {
  onVerificationComplete: (email: string) => void;
}

export default function EmailVerification({
  onVerificationComplete,
}: EmailVerificationProps) {
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  const { formData, errors, handleChange } = useFormValidation(
    {
      email: '',
      verificationCode: '',
    },
    'signup',
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
    onVerificationComplete(email);
  };

  return (
    <div className={STYLES.container}>
      <h1 className={STYLES.title}>
        DTT(DonTreeTrio)에 오신 것을 환영합니다!!
      </h1>
      <p className={STYLES.description}>
        이메일 인증 후 회원가입을 진행해주세요.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="w-full flex items-center gap-2">
          <div className={STYLES.inputWrapper}>
            <label htmlFor="email" className={STYLES.label}>
              이메일
            </label>
            <div className={STYLES.inputGroup}>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="예) example@example.com"
                className={STYLES.input}
                required
              />
              {errors.email && (
                <p className={STYLES.errorText}>{errors.email}</p>
              )}
            </div>
          </div>
          <button
            onClick={handleEmailVerification}
            className={STYLES.verifyButton}
            disabled={isEmailSent}
            type="button"
          >
            {isEmailSent ? '발송완료' : '인증하기'}
          </button>
        </div>

        {isEmailSent && (
          <div className={STYLES.inputWrapper}>
            <label htmlFor="verificationCode" className={STYLES.label}>
              인증번호
            </label>
            <input
              type="text"
              id="verificationCode"
              name="verificationCode"
              value={formData.verificationCode}
              onChange={handleChange}
              placeholder="인증번호 6자리 입력"
              className={STYLES.input}
              required
            />
            {errors.verificationCode && (
              <p className={STYLES.errorText}>{errors.verificationCode}</p>
            )}
          </div>
        )}

        {isEmailSent && (
          <button type="submit" className={STYLES.button}>
            인증 완료
          </button>
        )}
      </form>
    </div>
  );
}
