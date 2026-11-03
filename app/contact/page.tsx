import {redirect} from 'next/navigation';
import {pageMeta} from '@/lib/metadata';
export const metadata=pageMeta('출장 배터리 교체 문의','차종과 연식을 입력하고 증상을 체크하면 문자 문의 내용이 자동으로 만들어집니다.','/');
export default async function Page({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){const p=await searchParams;const text=(k:string)=>typeof p[k]==='string'?p[k] as string:'';const q=new URLSearchParams();const v=text('vehicle');const r=text('region');if(v)q.set('vehicle',v);if(r)q.set('region',r);const qs=q.toString();redirect(qs?`/?${qs}#form-card`:'/#form-card');}
