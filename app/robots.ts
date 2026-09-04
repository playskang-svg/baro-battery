import type {MetadataRoute} from 'next';
import {siteConfig} from '@/lib/site-config';
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',disallow:siteConfig.isPreview?'/':'/contact'},sitemap:`${siteConfig.origin}/sitemap.xml`};}
