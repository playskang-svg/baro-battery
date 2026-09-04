import {Crumb,PageIntro,ReviewSection,BottomCTA} from '@/components/site/shared';
import {pageMeta} from '@/lib/metadata';
export const metadata=pageMeta('교체 후기 영역','차종과 작업 환경별 교체 경험을 담기 위한 후기 레이아웃.','/reviews');
export default function Page(){return <main id="main"><div className="wrap"><Crumb items={[{label:'교체 후기'}]}/><PageIntro eyebrow="AFTER THE SERVICE" title="경험이 쌓이는 자리를 준비했어요." description="아직 등록된 실제 이용 후기가 없습니다. 동의받은 고객 후기와 확인된 작업 정보가 이곳에 표시됩니다."/></div><ReviewSection/><BottomCTA/></main>}
