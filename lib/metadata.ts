import type {Metadata} from 'next';
import {siteConfig} from './site-config';
export const DEFAULT_OG_IMAGE='/og.png';
export function pageMeta(title:string,description:string,path:string,image?:string):Metadata{const imageUrl=new URL(image||DEFAULT_OG_IMAGE,siteConfig.origin).href;return {title,description,alternates:{canonical:path},openGraph:{title,description,url:new URL(path,siteConfig.origin).href,type:'website',locale:'ko_KR',images:[{url:imageUrl}]},twitter:{card:'summary_large_image',title,description,images:[imageUrl]}}}
