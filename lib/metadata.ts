import type {Metadata} from 'next';
import {siteConfig} from './site-config';
export function pageMeta(title:string,description:string,path:string,image?:string):Metadata{return {title,description,alternates:{canonical:path},openGraph:{title,description,url:new URL(path,siteConfig.origin).href,type:'website',locale:'ko_KR',images:image?[{url:new URL(image,siteConfig.origin).href}]:[]},twitter:{card:image?'summary_large_image':'summary',title,description,images:image?[new URL(image,siteConfig.origin).href]:[]}}}
