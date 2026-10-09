import {siteConfig} from '@/lib/site-config';

// Next 의 robots.ts(MetadataRoute.Robots)는 # 주석 줄을 출력하지 못해, 다음(Daum) 소유 확인 줄을 넣으려고 텍스트를 직접 만든다.
const DAUM_ROBOTS_COMMENT = '#DaumWebMasterTool:d104fd9eeda53aa043534cb3faaef6053f8fe246290cc5bbf606a3e2b90d6708:0hLs22uXuQEdQ5MT1Nx0Pw==';

export function GET(): Response {
  const body = [
    'User-Agent: *',
    `Disallow: ${siteConfig.isPreview ? '/' : '/contact'}`,
    '',
    `Sitemap: ${siteConfig.origin}/sitemap.xml`,
    '',
    DAUM_ROBOTS_COMMENT,
    '',
  ].join('\n');
  return new Response(body, {headers: {'content-type': 'text/plain; charset=utf-8'}});
}
