'use client';

import { useState } from 'react';

const STYLES = {
  container: 'w-full max-w-md space-y-8',
  title: 'text-2xl text-black font-bold text-center mb-8',
  description: 'text-center text-gray-600 text-sm mb-8',
  inputWrapper: 'w-full space-y-1',
  label: 'block text-sm font-medium text-gray-700',
  input:
    'w-full px-3 py-2 mt-1 border-b border-gray-300 focus:outline-none focus:border-black',
  inputGroup: 'flex gap-2 mt-1',
  verifyButton:
    'px-4 py-2 text-white bg-[#179653] rounded-md hover:bg-[#179653]/80 whitespace-nowrap',
  button:
    'w-full py-3 text-white bg-[#179653] rounded-md transition-colors hover:bg-[#179653]/80 mt-8',
} as const;

interface EmailVerificationProps {
  onVerificationComplete: (email: string) => void;
}

export default function EmailVerification({
  onVerificationComplete,
}: EmailVerificationProps) {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

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
        <div className={STYLES.inputWrapper}>
          <label htmlFor="email" className={STYLES.label}>
            이메일
          </label>
          <div className={STYLES.inputGroup}>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="예) example@example.com"
              className={STYLES.input}
              required
            />
            <button
              onClick={handleEmailVerification}
              className={STYLES.verifyButton}
              disabled={isEmailSent}
              type="button"
            >
              {isEmailSent ? '발송완료' : '인증하기'}
            </button>
          </div>
        </div>

        {isEmailSent && (
          <div className={STYLES.inputWrapper}>
            <label htmlFor="verificationCode" className={STYLES.label}>
              인증번호
            </label>
            <input
              type="text"
              id="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="인증번호 6자리 입력"
              className={STYLES.input}
              required
            />
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
