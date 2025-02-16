'use client';

import Image from 'next/image';
import GoogleLogo from '../../../../../public/images/google.png';
import KakaoLogo from '../../../../../public/images/kakao.png';
import NaverLogo from '../../../../../public/images/naver.png';

type OAuthButtonProps = {
  provider: 'kakao' | 'naver' | 'google';
  onClick: () => void;
};

const OAUTH_STYLES = {
  button:
    'w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200',
  kakao: {
    className: 'bg-[#FEE500] text-black hover:bg-[#FDD835]',
  },
  naver: {
    className: 'bg-[#03C75A] text-white hover:bg-[#02B350]',
  },
  google: {
    className: 'bg-white text-black border border-gray-300 hover:bg-gray-100',
  },
} as const;

const providerLogos = {
  kakao: KakaoLogo,
  naver: NaverLogo,
  google: GoogleLogo,
};

const providerNames = {
  kakao: '카카오',
  naver: '네이버',
  google: '구글',
};

export default function OAuthButton({ provider, onClick }: OAuthButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${OAUTH_STYLES.button} ${OAUTH_STYLES[provider].className}`}
    >
      <Image
        src={providerLogos[provider]}
        alt={`${providerNames[provider]} 로고`}
        width={24}
        height={24}
      />
      <span className="font-medium">{providerNames[provider]}로 계속하기</span>
    </button>
  );
}
