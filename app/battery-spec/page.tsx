import Link from '@/components/site/site-link';
import { Crumb, PageIntro, BottomCTA } from '@/components/site/shared';
import { vehicles } from '@/lib/content';
import { specModels } from '@/lib/spec-table';
import { pageMeta } from '@/lib/metadata';
import { contactHref } from '@/lib/site-config';
import { specFieldPhoto } from '@/lib/field-photos';
import { FieldPhotos } from '@/components/site/field-photos';

export const metadata = pageMeta(
  '자동차 배터리 규격 조견표: 국산차 27차종',
  '그랜저·K7·싼타페·스타렉스·K5·쏘나타 등 국산 27차종의 배터리 규격 코드를 한눈에 정리했습니다. 실제 차량 라벨을 우선 확인하세요.',
  '/battery-spec',
);

const BRANDS = ['현대', '기아', '제네시스', '르노삼성', '쉐보레'];

export default function Page() {
  const published = new Set(vehicles.map((v) => v.slug));
  return (
    <main id="main">
      <div className="wrap">
        <Crumb items={[{ label: '규격 조견표' }]} />
        <PageIntro
          title="자동차 배터리 규격 조견표"
          description="국산차 27차종의 배터리 규격 코드를 브랜드별로 정리했습니다."
        />
        <div className="inline-note">
          현장 기준이며 실제 차량 라벨을 우선 확인하세요. 델코·아트라스는 같은
          크기 이름으로 대응됩니다(예: GB80L=BX80L=DF80L).
        </div>
        {BRANDS.map((brand) => {
          const models = specModels.filter((m) => m.brand === brand);
          if (!models.length) return null;
          return (
            <section className="section spec-table-section" key={brand}>
              <h2 className="subsection-title">{brand}</h2>
              <div className="spec-table-scroll">
                <table className="spec-table">
                  <thead>
                    <tr>
                      <th scope="col">차종</th>
                      <th scope="col">세대·조건</th>
                      <th scope="col">규격 코드</th>
                    </tr>
                  </thead>
                  <tbody>
                    {models.flatMap((m) =>
                      m.rows.map((r, i) => (
                        <tr key={`${m.slug}-${i}`} id={i === 0 ? m.slug : undefined}>
                          <th scope="row">
                            {i === 0 ? (
                              published.has(m.slug) ? (
                                <Link href={`/vehicles/${m.slug}`}>{m.name}</Link>
                              ) : (
                                m.name
                              )
                            ) : null}
                          </th>
                          <td>{r.label}</td>
                          <td>{r.battery}</td>
                        </tr>
                      )),
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}
        <section className="section">
          <FieldPhotos photos={[specFieldPhoto]} />
          <div className="inline-note" style={{ marginTop: 16 }}>
            표에서 찾기 어려우면 지금 달린 배터리 라벨 사진과 차종을{' '}
            <Link href={contactHref('inquiry')}>문의로 보내 주세요</Link>. 고르는 기준은{' '}
            <Link href="/guides/car-battery-choice-checklist">자동차 배터리 고르는 법</Link>에
            정리했습니다.
          </div>
        </section>
      </div>
      <BottomCTA />
    </main>
  );
}
