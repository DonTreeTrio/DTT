'use client';

import Link from 'next/link';
import OAuthButton from './OauthButton';

const LOGINFORM_STYLES = {
  container: 'w-full flex flex-col space-y-6',
  inputWrapper: 'w-full space-y-1',
  label: 'block font-medium text-sm text-gray-700',
  input:
    'w-full block px-3 py-2 mt-1 border-b border-gray-300 rounded-md focus:outline-none focus:border-black focus:ring-black',
  loginButton:
    'w-full py-2 text-white bg-black rounded-md transition-colors hover:bg-gray-800',
  linkContainer: 'flex justify-start mb-6 space-x-4',
  link: 'text-sm text-gray-600 hover:text-gray-900',
  divider: {
    wrapper: 'relative my-6',
    line: 'absolute inset-0 flex items-center',
    innerLine: 'w-full border-t border-gray-300',
    textWrapper: 'relative flex justify-center',
    text: 'px-2 text-sm text-gray-500 bg-white',
  },
  oauthContainer: 'w-full space-y-3',
} as const;

export default function LoginForm() {
  const handleOAuthLogin = (provider: 'kakao' | 'naver' | 'google') => {
    console.log(`${provider} 로그인 시도`);
  };

  return (
    <div className={LOGINFORM_STYLES.container}>
      {/* 로그인 폼 */}
      <form className="space-y-6">
        <div className={LOGINFORM_STYLES.inputWrapper}>
          <label htmlFor="email" className={LOGINFORM_STYLES.label}>
            이메일
          </label>
          <input
            type="email"
            id="email"
            placeholder="예) coin@coin.net"
            className={LOGINFORM_STYLES.input}
          />
        </div>
        <div className={LOGINFORM_STYLES.inputWrapper}>
          <label htmlFor="password" className={LOGINFORM_STYLES.label}>
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            placeholder="영문, 숫자, 특수문자 조합 8자리 이상"
            className={LOGINFORM_STYLES.input}
          />
        </div>
        <button type="submit" className={LOGINFORM_STYLES.loginButton}>
          로그인
        </button>
      </form>

      {/* 아이디/비밀번호 찾기, 회원가입 링크 */}
      <div className={LOGINFORM_STYLES.linkContainer}>
        <Link href="/auth/findid" className={LOGINFORM_STYLES.link}>
          아이디 찾기
        </Link>
        <Link href="/auth/findpw" className={LOGINFORM_STYLES.link}>
          비밀번호 찾기
        </Link>
        <Link href="/auth/signup" className={LOGINFORM_STYLES.link}>
          회원가입
        </Link>
      </div>

      {/* 구분선 */}
      <div className={LOGINFORM_STYLES.divider.wrapper}>
        <div className={LOGINFORM_STYLES.divider.line}>
          <div className={LOGINFORM_STYLES.divider.innerLine} />
        </div>
        <div className={LOGINFORM_STYLES.divider.textWrapper}>
          <span className={LOGINFORM_STYLES.divider.text}>또는</span>
        </div>
      </div>

      {/* OAuth 버튼들 */}
      <div className={LOGINFORM_STYLES.oauthContainer}>
        <OAuthButton
          provider="kakao"
          onClick={() => handleOAuthLogin('kakao')}
        />
        <OAuthButton
          provider="naver"
          onClick={() => handleOAuthLogin('naver')}
        />
        <OAuthButton
          provider="google"
          onClick={() => handleOAuthLogin('google')}
        />
      </div>
    </div>
  );
}
