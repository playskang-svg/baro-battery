'use client';
import Link from '@/components/site/site-link';
import {useEffect,useState} from 'react';
import {ArrowUpRight,CarFront,Menu,X,Search,Copy,MessageCircle,Camera} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {NativeSelect} from '@/components/ui/native-select';
import {Input} from '@/components/ui/input';
import {Accordion,AccordionItem,AccordionTrigger,AccordionContent} from '@/components/ui/accordion';
import {Tabs,TabsList,TabsTrigger,TabsContent} from '@/components/ui/tabs';
import {vehicles,regions,faqs} from '@/lib/content';
import {siteConfig,smsHref} from '@/lib/site-config';
export function MobileMenu(){const [open,setOpen]=useState(false);return <><Button aria-label={open?'메뉴 닫기':'메뉴 열기'} aria-expanded={open} aria-controls="mobile-nav" variant="ghost" className="mobile-menu-button" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</Button>{open?<nav id="mobile-nav" className="mobile-nav">{[['/vehicles','차종별 찾기'],['/regions','지역별 찾기'],['/battery-info','배터리 정보'],['/service','출장교체 · 비용'],['/contact','문의 내용 작성하기']].map(([href,label])=><Link key={href} href={href} onClick={()=>setOpen(false)}>{label}<ArrowUpRight size={17}/></Link>)}</nav>:null}</>}
export function VehicleExplorer({full=false}:{full?:boolean}){const [query,setQuery]=useState('');return <div className="vehicle-explorer">{full?<label htmlFor="vehicle-search" className="search-field"><Search/><Input id="vehicle-search" aria-label="제조사 또는 차종 검색" placeholder="제조사 또는 차종 검색" value={query} onChange={e=>setQuery(e.target.value)}/></label>:null}<Tabs defaultValue="전체"><TabsList variant="line" className="brand-tabs">{['전체','현대','기아','제네시스','수입차'].map(x=><TabsTrigger key={x} value={x}>{x}</TabsTrigger>)}</TabsList>{['전체','현대','기아','제네시스','수입차'].map(brand=>{const found=vehicles.filter(v=>(brand==='전체'||v.brand===brand)&&`${v.brand} ${v.name}`.includes(query.trim()));return <TabsContent key={brand} value={brand}><div className="vehicle-grid">{found.map(v=><Link className="vehicle-card" href={`/vehicles/${v.slug}`} key={v.slug}><div className="car-card-top"><span>{v.brand}</span><ArrowUpRight size={18}/></div><CarFront className="car-icon" aria-hidden="true"/><h3>{v.name}</h3><p>{v.type}<span>{v.note}</span></p></Link>)}</div>{!found.length?<div className="empty-state"><Search/><h3>검색한 차종이 아직 없어요</h3><p>다른 검색어를 입력하거나 차종을 직접 적어 문의를 준비하세요.</p><Link href="/contact" className="text-link">체크하고 문자 보내기 <ArrowUpRight size={16}/></Link></div>:null}</TabsContent>})}</Tabs></div>}
export function RegionExplorer(){return <Tabs defaultValue="seoul" className="region-explorer"><TabsList className="region-tabs">{regions.map(r=><TabsTrigger value={r.slug} key={r.slug}>{r.name}</TabsTrigger>)}</TabsList>{regions.map(r=><TabsContent key={r.slug} value={r.slug}><div className="region-links">{r.areas.map(area=><Link key={area} href={`/regions/${r.slug}?area=${encodeURIComponent(area)}`}>{area}<ArrowUpRight size={13}/></Link>)}</div><p className="muted-note">{r.note}</p><Link className="text-link" href={`/regions/${r.slug}`}>{r.name} 출장 안내 보기 <ArrowUpRight size={16}/></Link></TabsContent>)}</Tabs>}
export function FAQ({items=faqs}:{items?:typeof faqs}){return <Accordion className="faq-list">{items.map((item,i)=><AccordionItem key={item.q} value={String(i)}><AccordionTrigger>{item.q}</AccordionTrigger><AccordionContent><p>{item.a}</p></AccordionContent></AccordionItem>)}</Accordion>}
export function ContactForm({initialVehicle='',initialRegion='',area='',channel='inquiry',initialSymptoms=[]}:{initialVehicle?:string;initialRegion?:string;area?:string;channel?:string;initialSymptoms?:string[]}) {
  const [vehicle,setVehicle]=useState(vehicles.some(v=>v.slug===initialVehicle)?initialVehicle:initialVehicle==='other'?'other':'');
  const [year,setYear]=useState('');
  const [otherVehicle,setOtherVehicle]=useState('');
  const [location,setLocation]=useState([regions.find(r=>r.slug===initialRegion)?.name,area.slice(0,100)].filter(Boolean).join(' '));
  const [symptoms,setSymptoms]=useState<string[]>(initialSymptoms);
  const [photos,setPhotos]=useState<string[]>([]);
  const [status,setStatus]=useState('');
  const carName=vehicle==='other'?otherVehicle:vehicles.find(v=>v.slug===vehicle)?.name;
  const summary=`[문의] 출장 배터리 교체
차종: ${carName||'(차종 입력)'}
연식: ${year?year+'년':'(연식 입력)'}
증상: ${symptoms.join(', ')||'상담 시 확인'}${location?'\n출장 지역: '+location:''}

출장 전 차량 확인과 제품·총비용 안내를 부탁드립니다.${photos.length?'\n※ 문자 앱에서 첨부할 사진: '+photos.join(', '):''}`;
  useEffect(()=>{const doc=document as Document & {modelContext?:{registerTool:(tool:unknown,options:unknown)=>void|Promise<void>}};if(!doc.modelContext)return;const lifecycle=new AbortController();try{void Promise.resolve(doc.modelContext.registerTool({name:'stage_battery_inquiry',title:'배터리 문자 문의 준비',description:'차종과 지역을 문의 화면에 채웁니다. 문자를 보내거나 예약하지 않습니다.',inputSchema:{type:'object',properties:{vehicle:{type:'string',enum:vehicles.map(v=>v.slug)},region:{type:'string',enum:regions.map(r=>r.slug)}},required:['vehicle','region'],additionalProperties:false},annotations:{readOnlyHint:false},execute:(input:unknown)=>{const data=input as {vehicle?:string;region?:string};if(!data||!vehicles.some(v=>v.slug===data.vehicle)||!regions.some(r=>r.slug===data.region))throw new Error('지원하는 차종과 지역을 선택하세요.');setVehicle(data.vehicle!);setLocation(regions.find(r=>r.slug===data.region)!.name);setStatus('');return new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve({status:'staged',vehicle:data.vehicle,region:data.region,sent:false}))));}},{signal:lifecycle.signal})).catch(()=>{});}catch{}return ()=>lifecycle.abort();},[]);
  function toggleSymptom(value:string){setSymptoms(current=>current.includes(value)?current.filter(x=>x!==value):value==='잘 모르겠어요'?[value]:[...current.filter(x=>x!=='잘 모르겠어요'),value]);}
  async function copy(){try{await navigator.clipboard.writeText(summary);setStatus('문의 내용을 복사했어요. 문자 앱에 붙여 넣어 사진을 첨부해 주세요.');}catch{setStatus('자동 복사를 사용할 수 없어요. 미리보기 내용을 직접 선택해 복사해 주세요.');}}
  async function send(){if(!siteConfig.phone){await copy();return;}window.location.href=smsHref(summary,navigator.userAgent);setStatus('문자 앱에서 사진을 첨부하고 전송해 주세요. 앱이 열리지 않으면 내용을 복사해 주세요.');}
  return <form id="sms-inquiry" className="sms-form" onSubmit={e=>{e.preventDefault();send();}} onChange={()=>setStatus('')}>
    <div className="sms-heading"><span className="eyebrow">간단한 출장 교체 문의</span><h2>차량 정보를 알려주세요.</h2><p>필수 항목만 작성하면 문의 내용이 자동으로 완성됩니다.<br/>사진은 문자 앱에서 바로 첨부할 수 있어요.</p></div>
    {channel==='phone'||channel==='kakao'?<p className="sms-channel-note">{channel==='phone'?'전화':'카카오'} 상담 연결 준비 중입니다. 아래에서 문자 내용을 먼저 작성할 수 있어요.</p>:null}
    <div className="sms-fields">
      <label htmlFor="inquiry-vehicle">차종 <span className="required">필수</span><NativeSelect id="inquiry-vehicle" required value={vehicle} onChange={e=>setVehicle(e.target.value)}><option value="">차종 선택</option>{vehicles.map(v=><option key={v.slug} value={v.slug}>{v.brand} {v.name}</option>)}<option value="other">직접 입력</option></NativeSelect></label>
      <label htmlFor="inquiry-year">연식 <span className="required">필수</span><Input id="inquiry-year" required inputMode="numeric" maxLength={4} pattern="(19|20)[0-9]{2}" title="연식을 네 자리 숫자로 입력해 주세요. 예: 2021" placeholder="예: 2021" value={year} onChange={e=>setYear(e.target.value)}/></label>
      {vehicle==='other'?<label className="sms-wide" htmlFor="inquiry-other-vehicle">차종명 <span className="required">필수</span><Input id="inquiry-other-vehicle" required maxLength={60} placeholder="예: 현대 싼타페" value={otherVehicle} onChange={e=>setOtherVehicle(e.target.value)}/></label>:null}
    </div>
    <fieldset className="sms-fieldset"><legend>증상 키워드 <span>선택된 증상</span></legend><div className="check-chips">{[{val:'시동이 안 걸려요',tag:'#긴급시동불가'},{val:'방전이 반복돼요',tag:'#반복방전'},{val:'경고등이 켜졌어요',tag:'#경고등점등'},{val:'미리 교체하고 싶어요',tag:'#사전예방교체'},{val:'잘 모르겠어요',tag:'#상담요청'}].map(s=><label key={s.val} className={symptoms.includes(s.val)?'selected':''}><input type="checkbox" checked={symptoms.includes(s.val)} onChange={()=>toggleSymptom(s.val)}/><span>{s.tag} ({s.val})</span></label>)}</div></fieldset>
    <label className="sms-location" htmlFor="inquiry-location">출장 지역 <span className="optional">선택</span><Input id="inquiry-location" maxLength={100} placeholder="예: 서울 강남구 역삼동" value={location} onChange={e=>setLocation(e.target.value)}/></label>
    <fieldset className="sms-fieldset photo-checks"><legend><Camera size={19}/> 함께 보낼 사진 <span>선택</span></legend><p>준비할 사진을 체크하고, 문자 앱에서 직접 첨부해 주세요.</p><div className="check-chips">{['현재 장착된 배터리 사진','차량 경고등 사진'].map(photo=><label key={photo} className={photos.includes(photo)?'selected':''}><input type="checkbox" checked={photos.includes(photo)} onChange={()=>setPhotos(current=>current.includes(photo)?current.filter(x=>x!==photo):[...current,photo])}/><span>{photo}</span></label>)}</div></fieldset>
    <div className="sms-preview"><h3>문자 미리보기</h3><pre aria-live="polite" aria-atomic="true">{summary}</pre></div>
    <Button type="submit" className="btn sms-send full"><MessageCircle size={20}/>{siteConfig.phone?'이 내용으로 문자 앱 열기':'문의 내용 복사하기'}</Button>
    <div className="sms-after"><p>작업자가 출장 전에 차량 정보와 사진을 확인한 뒤<br/>제품·총비용·방문 일정을 안내합니다.</p><Button type="button" variant="ghost" onClick={copy}><Copy size={15}/>문자 내용 복사</Button></div>
    <output className="sms-status" aria-live="polite">{status||(!siteConfig.phone?'현재는 연락 채널 연결 전 시안입니다. 작성한 내용을 복사해 상담 채널에 붙여 넣을 수 있어요.':'문자 앱에서 직접 전송해야 문의가 전달됩니다.')}</output>
  </form>;
}
