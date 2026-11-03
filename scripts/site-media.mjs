// MonoGPT에서 받은 원본(PNG·MP4)을 사이트용으로 줄인다 → public/media/
//   node scripts/site-media.mjs <원본 폴더>
// sharp는 bizhelp 저장소 것을 빌려 쓰고, 영상은 ffmpeg(PATH)로 줄인다.
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';

const sharp = createRequire('C:/Window_DEV/github/bizhelp/package.json')('sharp');
const SRC = process.argv[2];
if (!SRC) throw new Error('원본 폴더를 넘겨 주세요');
const OUT = path.resolve(import.meta.dirname, '..', 'public', 'media');
await fs.mkdir(OUT, { recursive: true });

// [원본 이름, 가로, 세로, 품질] — 업스케일본(-4k)이 있으면 그것을 쓴다
const IMAGES = { caller: [2000, 1500, 78], terminal: [1600, 1067, 78], warning: [2000, 1125, 76], tech: [2000, 1500, 78] };
for (const [name, [w, h, q]] of Object.entries(IMAGES)) {
  const src = [path.join(SRC, `${name}-4k.png`), path.join(SRC, `${name}.png`)].find((p) => existsSync(p));
  if (!src) { console.log('없음:', name); continue; }
  const info = await sharp(src).resize(w, h, { fit: 'cover' }).webp({ quality: q }).toFile(path.join(OUT, `${name}.webp`));
  console.log(name, path.basename(src), `${w}×${h}`, Math.round(info.size / 1024) + 'KB');
}
// 첫 화면 포스터: 업스케일한 첫 프레임이 있으면 그것, 없으면 ffmpeg 프레임
const poster = [path.join(SRC, 'hero-poster-2k.png'), path.join(SRC, 'hero-frame.jpg')].find((p) => existsSync(p));
if (poster) {
  const info = await sharp(poster).resize(1920, 1080, { fit: 'cover' }).webp({ quality: 74 }).toFile(path.join(OUT, 'hero-poster.webp'));
  console.log('hero-poster', path.basename(poster), '1920×1080', Math.round(info.size / 1024) + 'KB');
}
const mp4 = path.join(SRC, 'hero.mp4');
if (existsSync(mp4)) {
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', mp4, '-an', '-vf', 'scale=1280:-2', '-c:v', 'libx264', '-preset', 'slow', '-crf', '26', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', path.join(OUT, 'hero.mp4')]);
  console.log('hero.mp4', Math.round((await fs.stat(path.join(OUT, 'hero.mp4'))).size / 1024) + 'KB');
}
