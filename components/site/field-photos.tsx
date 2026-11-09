import type { FieldPhoto } from '@/lib/field-photos';

export function FieldPhotos({ photos }: { photos: FieldPhoto[] }) {
  if (!photos.length) return null;
  return (
    <div className={photos.length === 1 ? 'field-photos single' : 'field-photos'}>
      {photos.map((p) => (
        <figure key={p.src}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.src} alt={p.alt} width={p.width} height={p.height} loading="lazy" />
          <figcaption>{p.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
