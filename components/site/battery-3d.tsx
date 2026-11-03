'use client';

import React, { useEffect, useRef, useState } from 'react';

export function Battery3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotY, setRotY] = useState(-25);
  const [rotX, setRotX] = useState(15);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [statusText, setStatusText] = useState('12.8V 정상 전압');

  const dragStart = useRef({ x: 0, y: 0, rotY: -25, rotX: 15 });
  const animFrame = useRef<number | null>(null);

  // 자동 유휴 회전 (Auto-idle spin like Apple product page)
  useEffect(() => {
    if (!autoRotate || isDragging) return;

    let lastTime = performance.now();
    const spin = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;
      setRotY((prev) => (prev + delta * 20) % 360);
      animFrame.current = requestAnimationFrame(spin);
    };

    animFrame.current = requestAnimationFrame(spin);
    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [autoRotate, isDragging]);

  // 마우스 및 터치 드래그 인터랙션
  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      rotY,
      rotX,
    };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;

    setRotY((dragStart.current.rotY + dx * 0.45) % 360);
    // 상하 틸트는 -35도 ~ 45도 사이로 절제하여 뒤집히지 않도록
    const newX = Math.max(-35, Math.min(45, dragStart.current.rotX - dy * 0.35));
    setRotX(newX);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    // 드래그 종료 후 4초 뒤 다시 부드러운 자동 회전 시작
    setTimeout(() => {
      setAutoRotate(true);
    }, 4000);
  };

  // 배터리 3D 모델 치수 (가로 260px, 세로 170px, 깊이 180px)
  const W = 260;
  const H = 170;
  const D = 170;

  return (
    <div className="battery-3d-scene" ref={containerRef}>
      {/* 3D 상단 인터랙티브 안내 태그 */}
      <div className="b3d-badge-bar">
        <span className="b3d-live-tag">
          <span className="b3d-dot" /> 3D 인터랙티브
        </span>
        <span className="b3d-hint">드래그하여 360° 회전</span>
      </div>

      {/* 3D 뷰포트 영역 */}
      <div
        className="b3d-viewport"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div
          className="b3d-object"
          style={{
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          }}
        >
          {/* 바닥 부드러운 3D 앰비언트 그림자 */}
          <div className="b3d-shadow" />

          {/* 1. FRONT (전면부: 프리미엄 AGM 라벨 및 상태창) */}
          <div
            className="b3d-face b3d-front"
            style={{
              width: `${W}px`,
              height: `${H}px`,
              transform: `translate3d(-${W / 2}px, -${H / 2}px, ${D / 2}px)`,
            }}
          >
            <div className="b3d-label-card">
              <div className="b3d-brand">
                <span className="b3d-logo">BATTERYCALL</span>
                <span className="b3d-agm">AGM PREMIUM</span>
              </div>
              <div className="b3d-specs">
                <div className="b3d-spec-col">
                  <strong>12V 90Ah</strong>
                  <small>정격 전압·용량</small>
                </div>
                <div className="b3d-spec-col">
                  <strong>900 CCA</strong>
                  <small>저온 시동능력</small>
                </div>
              </div>
              <div className="b3d-indicator">
                <span className="b3d-eye" />
                <span>{statusText}</span>
              </div>
            </div>
            <div className="b3d-ribs-bottom" />
          </div>

          {/* 2. BACK (후면부) */}
          <div
            className="b3d-face b3d-back"
            style={{
              width: `${W}px`,
              height: `${H}px`,
              transform: `translate3d(-${W / 2}px, -${H / 2}px, -${D / 2}px) rotateY(180deg)`,
            }}
          >
            <div className="b3d-back-spec">
              <span className="b3d-cert">KS / ISO9001 정품 인증</span>
              <p>출장 교체 시 차량 연식 규격 1:1 맞춤 세팅</p>
              <div className="b3d-barcode" />
            </div>
            <div className="b3d-ribs-bottom" />
          </div>

          {/* 3. LEFT (좌측면) */}
          <div
            className="b3d-face b3d-left"
            style={{
              width: `${D}px`,
              height: `${H}px`,
              transform: `translate3d(-${D / 2}px, -${H / 2}px, 0px) rotateY(-90deg) translateZ(${W / 2}px)`,
            }}
          >
            <div className="b3d-side-ribs" />
            <div className="b3d-side-handle-recess" />
          </div>

          {/* 4. RIGHT (우측면) */}
          <div
            className="b3d-face b3d-right"
            style={{
              width: `${D}px`,
              height: `${H}px`,
              transform: `translate3d(-${D / 2}px, -${H / 2}px, 0px) rotateY(90deg) translateZ(${W / 2}px)`,
            }}
          >
            <div className="b3d-side-ribs" />
            <div className="b3d-side-handle-recess" />
          </div>

          {/* 5. TOP (상단 덮개 & 터미널 단자) */}
          <div
            className="b3d-face b3d-top"
            style={{
              width: `${W}px`,
              height: `${D}px`,
              transform: `translate3d(-${W / 2}px, -${D / 2}px, 0px) rotateX(90deg) translateZ(${H / 2}px)`,
            }}
          >
            {/* 상단 손잡이 (Handle) */}
            <div className="b3d-handle" />

            {/* 양극 (+) 단자 터미널 */}
            <div className="b3d-post b3d-post-pos">
              <span className="b3d-terminal-ring pos" />
              <div className="b3d-cylinder pos" />
              <span className="b3d-sign">+</span>
            </div>

            {/* 음극 (-) 단자 터미널 */}
            <div className="b3d-post b3d-post-neg">
              <span className="b3d-terminal-ring neg" />
              <div className="b3d-cylinder neg" />
              <span className="b3d-sign">-</span>
            </div>

            {/* 6개 셀 통기 캡 */}
            <div className="b3d-cell-caps">
              {[...Array(6)].map((_, i) => (
                <span key={i} className="b3d-cap" />
              ))}
            </div>
          </div>

          {/* 6. BOTTOM (바닥면) */}
          <div
            className="b3d-face b3d-bottom"
            style={{
              width: `${W}px`,
              height: `${D}px`,
              transform: `translate3d(-${W / 2}px, -${D / 2}px, 0px) rotateX(-90deg) translateZ(${H / 2}px)`,
            }}
          />
        </div>
      </div>

      {/* 하단 3D 컨트롤 피처 칩 */}
      <div className="b3d-chips">
        <button
          type="button"
          className="b3d-chip"
          onClick={() => {
            setRotX(15);
            setRotY(-25);
            setStatusText('12.8V 정상 전압');
          }}
        >
          기본 뷰
        </button>
        <button
          type="button"
          className="b3d-chip"
          onClick={() => {
            setRotX(35);
            setRotY(0);
            setStatusText('터미널 단자 점검 모드');
          }}
        >
          단자 보기 (+) (-)
        </button>
        <button
          type="button"
          className="b3d-chip"
          onClick={() => {
            setRotX(10);
            setRotY(180);
            setStatusText('정품 인증 마크');
          }}
        >
          스펙 보기
        </button>
      </div>
    </div>
  );
}

