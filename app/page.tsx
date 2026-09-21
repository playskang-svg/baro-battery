'use client';

import Link from '@/components/site/site-link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  BatteryCharging,
  BookOpen,
  CarFront,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  MapPin,
  Newspaper,
  ReceiptText,
  ShieldCheck,
} from 'lucide-react';
import { VehicleExplorer, RegionExplorer } from '@/components/site/interactive';
import { InquiryJourney } from '@/components/site/home-experience';
import {
  BottomCTA,
  FAQSection,
  GuideCard,
  ReviewSection,
  SectionHeading,
  Steps,
  Trust,
} from '@/components/site/shared';
import { guides } from '@/lib/content';

const slides = [
  { src: '/images/batterycall_1.webp', alt: '자동차 배터리 교체 작업 현장', title: '다시 출발할 준비', text: '배터리 점검부터 교체 안내까지' },
  { src: '/images/batterycall_2.webp', alt: '배터리 교체 작업 장면', title: '빠르게 확인하고 시작', text: '차량 상태에 맞춘 배터리 상담' },
  { src: '/images/batterycall_3.webp', alt: '엔진룸 배터리 점검', title: '차종에 맞게 정확하게', text: '차량 정보와 증상을 먼저 확인' },
  { src: '/images/batterycall_4.webp', alt: '출장 배터리 교체 서비스 현장', title: '멈춘 일상에 다시 시동을', text: '내 차가 있는 곳에서 시작하세요' },
];

function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 5000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const current = slides[active];

  return (
    <div className="hero-visual hero-carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <Image key={current.src} className="hero-carousel-image" unoptimized src={current.src} alt={current.alt} width={1536} height={1024} priority />
      <div className="hero-carousel-shade" aria-hidden="true" />
      <div className="hero-carousel-controls" aria-label="메인 이미지 슬라이드 제어">
        <button type="button" aria-label="이전 이미지" onClick={() => setActive((current) => (current - 1 + slides.length) % slides.length)}><ChevronLeft size={18} /></button>
        <div className="hero-carousel-dots">
          {slides.map((slide, index) => <button key={slide.src} type="button" className={index === active ? 'is-active' : ''} onClick={() => setActive(index)} aria-label={`${index + 1}번 이미지 보기`} aria-current={index === active ? 'true' : undefined} />)}
        </div>
        <button type="button" aria-label="다음 이미지" onClick={() => setActive((current) => (current + 1) % slides.length)}><ChevronRight size={18} /></button>
      </div>
      <div className="image-label">
        <BatteryCharging aria-hidden="true" />
        <span>{current.title}<small>{current.text}</small></span>
        <ArrowUpRight size={19} aria-hidden="true" />
      </div>
      <p className="photo-note" style={{ left: '50%', right: 'auto', width: '100%', transform: 'translateX(-50%)', textAlign: 'center' }}>
        실제 배터리 현장 장면 · {active + 1}/{slides.length}
      </p>
    </div>
  );
}

const shortcuts = [
  { href: '/vehicles', icon: CarFront, title: '차종별 찾기', text: '내 차에 맞는 교체 정보' },
  { href: '/regions', icon: MapPin, title: '지역별 찾기', text: '내 동네 출장 안내' },
  { href: '/battery-info', icon: BookOpen, title: '배터리/차량 정보', text: '방전·차종·교체비용 포스팅' },
  { href: '/service', icon: ReceiptText, title: '교체 안내 · 비용', text: '과정과 포함 항목 확인' },
  { href: '/battery-info/blog', icon: Newspaper, title: '블로그', text: '관리 팁과 현장 이야기' },
];

export default function Home() {
  return (
    <main id="main" className="home-v2">
      <section className="hero wrap">
        <div className="hero-copy">
          <span className="eyebrow">BATTERY CARE, WHERE YOU ARE</span>
          <h1>출장 배터리 교체</h1>
          <p className="hero-tagline">멈춘 일상에,<br />다시 <span>시동을.</span></p>
          <p className="hero-description">갑작스러운 방전부터 미리 준비하는 교체까지.<br />차종과 현재 상황을 먼저 정리해 보세요.</p>
          <div className="hero-actions"><Link className="btn lime" href="#quick-inquiry">상황 선택하고 시작하기 <ArrowUpRight size={20} /></Link><Link className="hero-text-link" href="/service">교체 과정 먼저 보기</Link></div>
          <div className="hero-assurances" aria-label="서비스 이용 전 안내"><span><Check aria-hidden="true" />예약·결제 없이 정보부터 확인</span><span><Check aria-hidden="true" />차종·연식만으로 시작</span></div>
        </div>
        <HeroCarousel />
      </section>
      <section className="wrap service-overview" aria-label="출장 교체 상담 안내">
        <div className="overview-lead"><ShieldCheck aria-hidden="true" /><span><strong>복잡한 규격은 작업자와 확인해요.</strong><small>차량 정보와 증상을 먼저 남기면 됩니다.</small></span></div>
        <div className="overview-item"><b>01</b><span>현재 상황<br /><strong>한 가지 선택</strong></span></div>
        <div className="overview-item"><b>02</b><span>차종·연식<br /><strong>간단히 작성</strong></span></div>
        <div className="overview-item"><b>03</b><span>문의 내용<br /><strong>직접 확인</strong></span></div>
      </section>
      <section id="quick-inquiry" className="wrap home-inquiry"><InquiryJourney /></section>
      <nav className="wrap category-shortcuts" aria-label="주요 서비스 탐색">{shortcuts.map(({ href, icon: Icon, title, text }) => <Link href={href} key={href}><Icon aria-hidden="true" /><div><strong>{title}</strong><span>{text}</span></div><ArrowUpRight className="shortcut-arrow" aria-hidden="true" /></Link>)}</nav>
      <section className="section wrap vehicle-section"><SectionHeading eyebrow="FIND YOUR CAR" title="차는 달라도, 시작은 간단하게." description="차종별 안내를 살펴보거나, 바로 차량 정보를 작성하세요." href="/vehicles" linkText="차종 전체 보기" /><VehicleExplorer /></section>
      <section className="region-section"><div className="wrap region-layout"><div><span className="eyebrow">CLOSE TO YOU</span><h2>내가 있는 곳에서,<br />다음 출발을 준비해요.</h2><p>내 지역을 선택해 출장 안내를 확인하세요.<br />방문 가능 여부와 일정은 상담을 통해 확인합니다.</p><Link className="text-link" href="/regions">지역별 안내 모두 보기 <ArrowUpRight size={17} /></Link></div><RegionExplorer /></div></section>
      <section className="section wrap confidence-section"><SectionHeading eyebrow="A CLEARER CHOICE" title="안심되는 교체의 기준." description="무엇을 준비하고, 무엇을 확인하는지 한눈에 보이도록 정리했습니다." /><Trust /><div className="service-heading"><h3><CircleCheck aria-hidden="true" />상담부터 교체까지, 이렇게 진행해요.</h3><Link className="text-link" href="/service">과정과 비용 보기 <ArrowUpRight size={16} /></Link></div><Steps /></section>
      <section className="journal-section"><div className="wrap"><SectionHeading eyebrow="BATTERY JOURNAL" title="배터리, 알고 바꾸면 더 편해요." description="내 차의 증상부터 교체 비용까지, 필요한 정보만 차근차근 확인하세요." href="/battery-info" linkText="정보 더 보기" /><div className="guide-grid">{[guides[7], guides[8], guides[9]].map((guide, index) => <GuideCard key={guide.slug} guide={guide} featured={index === 0} />)}</div></div></section>
      <ReviewSection /><FAQSection /><BottomCTA />
    </main>
  );
}
