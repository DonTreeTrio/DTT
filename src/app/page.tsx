'use client';

import Image from 'next/image';

const HOME_STYLES = {
  container: 'w-full min-h-screen flex items-center',
  leftSection: 'w-[40%] h-[100dvh] flex flex-col justify-center items-center',
  rightSection: 'w-[60%] h-[100dvh] flex flex-col justify-around items-center',
  title: 'text-4xl font-bold leading-tight',
  description: 'text-gray-600 text-lg leading-relaxed',
  imageContainer: 'w-[60%] h-full flex flex-col justify-around items-center',
  image: 'transition-transform duration-300 hover:scale-105',
} as const;

export default function Home() {
  return (
    <main className={HOME_STYLES.container}>
      {/* 왼쪽: 텍스트 영역 */}
      <section className={HOME_STYLES.leftSection}>
        <h1 className={HOME_STYLES.title}>
          "가상의 투자로 실전 트레이딩 경험을!"
        </h1>
        <p className={HOME_STYLES.description}>
          "DTT에서 리스크 없이 엣지있게 트레이딩을 연습해보세요. 실제 시장
          데이터를 기반으로 한 모의 투자로 당신의 투자 전략을 테스트하고, 거래
          실력을 향상시킬 수 있습니다. 초보자부터 전문가까지, 안전하게 투자
          경험을 쌓아보세요."
        </p>
      </section>
      {/* 오른쪽: 이미지 영역 */}
      <section className={HOME_STYLES.rightSection}>
        <div className={HOME_STYLES.imageContainer}>
          {/* 첫 번째 줄 */}
          <div
            className="relative right-[18rem] top-[18rem] transform -rotate-12 translate-y-10"
            style={{ transform: 'rotate3d(1, 1, 1, 15deg)' }}
          >
            <Image
              src="/images/introduce.png"
              alt="Introduce"
              width={350}
              height={200}
              className={HOME_STYLES.image}
            />
          </div>

          {/* 메인 차트 */}
          <div
            className="relative right-[9rem] top-[5rem] transform -rotate-6 translate-y-20"
            style={{ transform: 'rotate3d(0, 1, 1, 10deg)' }}
          >
            <Image
              src="/images/main.png"
              alt="Main"
              width={600}
              height={400}
              className={HOME_STYLES.image}
              priority
            />
          </div>

          {/* 구매 이미지 */}
          <div
            className="absolute right-[15rem] top-[11rem] transform rotate-12 translate-y-32"
            style={{ transform: 'rotate3d(2.5, 1, 1, 20deg)' }}
          >
            <Image
              src="/images/purchase.png"
              alt="Purchase"
              width={450}
              height={200}
              className={HOME_STYLES.image}
            />
          </div>

          {/* 콘테스트 이미지 */}
          <div
            className="absolute right-[1rem] top-[7rem] transform rotate-6 translate-y-40"
            style={{ transform: 'rotate3d(1, 4, 1, 25deg)' }}
          >
            <Image
              src="/images/contest.png"
              alt="Contest"
              width={350}
              height={180}
              className={HOME_STYLES.image}
            />
          </div>

          {/* 개발자 이미지 */}
          <div
            className="relative left-[10rem] bottom-[6rem] transform rotate-6 translate-y-40"
            style={{ transform: 'rotate3d(1, 3, 1, 25deg)' }}
          >
            <Image
              src="/images/developer.png"
              alt="Developer"
              width={350}
              height={200}
              className={HOME_STYLES.image}
            />
          </div>

          {/* 마이페이지 이미지 */}
          <div
            className="absolute right-[4rem] bottom-[14rem] transform rotate-12"
            style={{ transform: 'rotate3d(1, 3, 1, 20deg)' }}
          >
            <Image
              src="/images/mypage.png"
              alt="MyPage"
              width={250}
              height={180}
              className={HOME_STYLES.image}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
