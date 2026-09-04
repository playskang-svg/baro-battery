'use client';

import { useState } from 'react';
import { ArrowDown, BatteryWarning, CalendarClock, CircleHelp, Gauge, ShieldCheck } from 'lucide-react';
import { ContactForm } from './interactive';

type Scenario = {
  label: string;
  description: string;
  icon: typeof BatteryWarning;
};

const scenarios: Scenario[] = [
  { label: '시동이 안 걸려요', description: '지금 차량 상태를 알려주세요.', icon: BatteryWarning },
  { label: '방전이 반복돼요', description: '최근 사용 이력을 함께 확인해요.', icon: Gauge },
  { label: '미리 교체하고 싶어요', description: '내 차에 맞는 규격부터 알아봐요.', icon: CalendarClock },
  { label: '잘 모르겠어요', description: '증상을 적어주시면 안내해 드려요.', icon: CircleHelp },
];

export function InquiryJourney() {
  const [selectedScenario, setSelectedScenario] = useState('');

  function selectScenario(label: string) {
    setSelectedScenario(label);
    window.setTimeout(() => {
      document.querySelector('#sms-inquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }

  return (
    <section className="inquiry-journey" aria-labelledby="journey-title">
      <div className="journey-intro">
        <div>
          <span className="eyebrow">A QUICKER START</span>
          <h2 id="journey-title">지금 상황에 맞춰,<br />더 빠르게 시작하세요.</h2>
          <p>가장 가까운 항목을 하나 고르면, 문의 내용에 바로 반영됩니다.</p>
        </div>
        <div className="journey-assurance">
          <ShieldCheck aria-hidden="true" />
          <p><strong>결제나 예약은 진행되지 않아요.</strong><br />차량 정보와 현재 상황을 정리하는 단계입니다.</p>
        </div>
      </div>

      <div className="scenario-grid" role="list" aria-label="현재 차량 상황 선택">
        {scenarios.map(({ label, description, icon: Icon }) => (
          <button
            type="button"
            key={label}
            className={selectedScenario === label ? 'scenario-card is-selected' : 'scenario-card'}
            aria-pressed={selectedScenario === label}
            onClick={() => selectScenario(label)}
          >
            <Icon aria-hidden="true" />
            <span><strong>{label}</strong><small>{description}</small></span>
            <ArrowDown className="scenario-arrow" aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="journey-progress" aria-label="문의 작성 단계">
        <span className="is-active"><b>01</b>현재 상황 선택</span>
        <i aria-hidden="true" />
        <span><b>02</b>차량 정보 작성</span>
        <i aria-hidden="true" />
        <span><b>03</b>문자 내용 확인</span>
      </div>

      <ContactForm key={selectedScenario || 'empty'} initialSymptoms={selectedScenario ? [selectedScenario] : []} />
    </section>
  );
}
