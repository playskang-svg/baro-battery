import {Crumb,PageIntro,GuideCard,BottomCTA} from '@/components/site/shared';
import {guides} from '@/lib/content';
import {pageMeta} from '@/lib/metadata';
export const metadata=pageMeta('배터리 정보 · 방전과 교체 가이드','AGM·EFB 배터리 정보, 방전 증상과 교체 전 확인사항을 쉽게 살펴보세요.','/battery-info');
export default function Page(){return <main id="main"><div className="wrap"><Crumb items={[{label:'배터리 정보'}]}/><PageIntro eyebrow="BATTERY JOURNAL" title="배터리, 알고 바꾸면 더 편해요." description="어려운 용어보다 내 차에 필요한 정보부터. 증상과 교체 준비를 차근차근 살펴보세요."/><div className="guide-grid two">{guides.filter(g=>g.category==='battery-info').map((g,i)=><GuideCard key={g.slug} guide={g} featured={i===0}/>)}</div><section className="section"><h2 className="subsection-title">교체를 준비하고 있다면.</h2><div className="guide-grid two">{guides.filter(g=>g.slug==='replacement-cost'||g.slug==='underground-parking').map(g=><GuideCard key={g.slug} guide={g}/>)}</div></section></div><BottomCTA/></main>}
