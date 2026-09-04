import {Crumb,PageIntro} from '@/components/site/shared';
import {ContactForm} from '@/components/site/interactive';
import {pageMeta} from '@/lib/metadata';
export const metadata=pageMeta('출장 배터리 교체 문의','차종과 연식을 입력하고 증상을 체크하면 문자 문의 내용이 자동으로 만들어집니다.','/contact');
export default async function Page({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){const p=await searchParams;const text=(k:string)=>typeof p[k]==='string'?p[k] as string:'';return <main id="main" className="wrap contact-page"><Crumb items={[{label:'교체 문의'}]}/><PageIntro eyebrow="LET’S TALK" title="내 차 정보, 간단하게 알려주세요." description="차종·연식은 필수, 사진은 문자 앱에서 첨부해 주세요. 출장 전에 작업자가 먼저 확인합니다."/><ContactForm initialVehicle={text('vehicle')} initialRegion={text('region')} area={text('area')} channel={text('channel')}/></main>}
