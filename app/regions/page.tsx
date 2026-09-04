import Link from '@/components/site/site-link';
import {Crumb,PageIntro,BottomCTA,GuideCard} from '@/components/site/shared';
import {RegionExplorer} from '@/components/site/interactive';
import {guides} from '@/lib/content';
import {MapPin} from 'lucide-react';
import {pageMeta} from '@/lib/metadata';
export const metadata=pageMeta('지역별 출장 배터리 교체','서울·경기·인천 지역별 배터리 교체 상담 준비와 주차 환경 확인.','/regions');
export default function Page(){return <main id="main"><div className="wrap"><Crumb items={[{label:'지역별 찾기'}]}/><PageIntro eyebrow="FIND YOUR AREA" title="지금 계신 곳부터 알려주세요." description="지역별 안내를 보고 출장 문의를 준비하세요. 실제 운영 지역과 방문 가능 여부는 확정 전입니다."/><div className="region-hub"><div className="region-hub-copy"><MapPin/><h2>주소보다 먼저,<br/>동네와 주차 환경.</h2><p>지하 층수 · 차량 진입 높이 · 출입 제한<br/>현장 조건을 함께 확인해 주세요.</p></div><RegionExplorer/></div><div className="inline-note">목록에 없는 지역은 <Link href="/contact?region=other">지역을 직접 입력해 주세요 ↗</Link></div><section className="section"><h2 className="subsection-title">방문 전 확인하면 좋은 이야기.</h2><div className="guide-grid two">{guides.filter(g=>g.category==='regions'||g.slug==='replacement-cost').map(g=><GuideCard key={g.slug} guide={g}/>)}</div></section></div><BottomCTA/></main>}
