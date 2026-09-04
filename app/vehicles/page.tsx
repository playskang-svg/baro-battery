import Link from '@/components/site/site-link';
import {VehicleExplorer} from '@/components/site/interactive';
import {Crumb,PageIntro,BottomCTA,GuideCard} from '@/components/site/shared';
import {guides} from '@/lib/content';
import {pageMeta} from '@/lib/metadata';
export const metadata=pageMeta('차종별 출장 배터리 교체','제조사·차종별 배터리 교체 전 확인 정보와 상담 준비.','/vehicles');
export default function Page(){return <main id="main"><div className="wrap"><Crumb items={[{label:'차종별 찾기'}]}/><PageIntro eyebrow="FIND YOUR CAR" title="내 차에 맞는 배터리부터." description="제조사와 차종을 선택하세요. 연식과 사양에 따라 확인할 정보를 모았습니다."/><VehicleExplorer full/><div className="inline-note">목록에 없는 차종도 <Link href="/contact?vehicle=other">직접 입력해 문의를 준비할 수 있어요 ↗</Link></div><section className="section"><h2 className="subsection-title">차종별로 먼저 읽어보세요.</h2><div className="guide-grid">{guides.filter(g=>g.category==='vehicles').slice(0,3).map(g=><GuideCard guide={g} key={g.slug}/>)}</div></section></div><BottomCTA/></main>}
