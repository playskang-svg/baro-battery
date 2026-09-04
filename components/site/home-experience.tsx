'use client';

import { useState } from 'react';
import { Zap, RotateCcw, AlertTriangle, CalendarCheck, HelpCircle, ShieldCheck } from 'lucide-react';
import { ContactForm } from './interactive';

type SymptomKeyword = {
  keyword: string;
  symptomValue: string;
  icon: typeof Zap;
};

const symptomKeywords: SymptomKeyword[] = [
  { keyword: '#긴급시동불가', symptomValue: '시동이 안 걸려요', icon: Zap },
  { keyword: '#반복방전', symptomValue: '방전이 반복돼요', icon: RotateCcw },
  { keyword: '#경고등점등', symptomValue: '경고등이 켜졌어요', icon: AlertTriangle },
  { keyword: '#사전예방교체', symptomValue: '미리 교체하고 싶어요', icon: CalendarCheck },
  { keyword: '#상담요청', symptomValue: '잘 모르겠어요', icon: HelpCircle },
];

export function InquiryJourney() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  function toggleKeyword(symptomValue: string) {
    setSelectedSymptoms((current) => {
      const next = current.includes(symptomValue)
        ? current.filter((x) => x !== symptomValue)
        : symptomValue === '잘 모르겠어요'
        ? [symptomValue]
        : [...current.filter((x) => x !== '잘 모르겠어요'), symptomValue];
      return next;
    });

    window.setTimeout(() => {
      document.querySelector('#sms-inquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  }

  return (
    <section className="inquiry-journey" aria-labelledby="journey-title">
      <div className="journey-intro">
        <div>
          <span className="eyebrow">QUICK INQUIRY</span>
          <h2 id="journey-title">현재 증상 키워드를 선택하세요.</h2>
          <p>상황에 맞는 키워드를 누르면 문의 양식에 즉시 반영됩니다.</p>
        </div>
        <div className="journey-assurance">
          <ShieldCheck aria-hidden="true" />
          <p><strong>결제나 예약 없이</strong><br />차량 상태와 견적을 먼저 확인하는 단계입니다.</p>
        </div>
      </div>

      <div className="keyword-chip-bar" role="group" aria-label="증상 키워드 빠른 선택">
        {symptomKeywords.map(({ keyword, symptomValue, icon: Icon }) => {
          const isSelected = selectedSymptoms.includes(symptomValue);
          return (
            <button
              type="button"
              key={keyword}
              className={isSelected ? 'symptom-chip is-selected' : 'symptom-chip'}
              aria-pressed={isSelected}
              onClick={() => toggleKeyword(symptomValue)}
            >
              <Icon size={16} aria-hidden="true" />
              <span>{keyword}</span>
            </button>
          );
        })}
      </div>

      <div className="journey-progress" aria-label="문의 작성 단계">
        <span className="is-active"><b>01</b>키워드 선택</span>
        <i aria-hidden="true" />
        <span><b>02</b>차량 정보 작성</span>
        <i aria-hidden="true" />
        <span><b>03</b>문자 내용 확인</span>
      </div>

      <ContactForm
        key={selectedSymptoms.join(',') || 'empty'}
        initialSymptoms={selectedSymptoms}
      />
    </section>
  );
}
