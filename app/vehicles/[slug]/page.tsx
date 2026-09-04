import Link from '@/components/site/site-link';
import {notFound} from 'next/navigation';
import {vehicles,guides} from '@/lib/content';
import {Crumb,PageIntro,BottomCTA,GuideCard,Trust} from '@/components/site/shared';
import {ArrowUpRight,CarFront} from 'lucide-react';
import {contactHref} from '@/lib/site-config';
import {pageMeta} from '@/lib/metadata';
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const v=vehicles.find(v=>v.slug===slug);return v?pageMeta(`${v.name} 출장 배터리 교체`,`${v.name} 배터리 교체 전 차량 사양과 비용 확인 항목.`,`/vehicles/${slug}`):{};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const v=vehicles.find(v=>v.slug===slug);if(!v)notFound();return <main id="main"><div className="wrap"><Crumb items={[{label:'차종별',href:'/vehicles'},{label:v.name}]}/><div className="detail-hero"><div><PageIntro eyebrow={`${v.brand} / ${v.type}`} title={`${v.name} 출장 배터리 교체`} description={`${v.name}의 연식과 증상만 알려주세요. 필요한 배터리는 작업자가 출장 전에 확인합니다.`}/><Link className="btn dark" href={contactHref('inquiry',v.slug)}>체크하고 문자 보내기 <ArrowUpRight size={18}/></Link></div><div className="spec-panel"><CarFront/><h2>차종·연식부터 알려주세요.</h2><ul><li>차종과 연식 입력 (필수)</li><li>해당하는 증상 체크</li><li>배터리·경고등 사진 첨부 (선택)</li></ul><p>배터리 규격과 제품·총비용은 작업자가 확인 후 안내합니다.</p></div></div><Trust/><section className="section"><h2 className="subsection-title">{v.name}, 교체 전에 읽어보세요.</h2><div className="guide-grid two">{guides.filter(g=>g.vehicle===v.slug||g.slug==='replacement-cost').map(g=><GuideCard key={g.slug} guide={g}/>)}</div></section><div className="inline-note"><Link href="/vehicles">다른 차종도 살펴보기 ↗</Link></div></div><BottomCTA vehicle={v.slug}/></main>}
