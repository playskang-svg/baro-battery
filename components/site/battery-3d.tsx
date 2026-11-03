'use client';

import React, { useEffect, useRef, useState } from 'react';

// Apple-style Finish Themes
const FINISHES = [
  {
    id: 'space-black',
    name: 'Space Black',
    sub: 'AGM 90Ah Pro',
    bodyColor: '#121316',
    topColor: '#1a1c22',
    accentColor: '#dafa9c',
    glowColor: 'rgba(218, 250, 156, 0.45)',
    labelBg: '#1f222a',
    labelBorder: '#2e3340',
  },
  {
    id: 'sport-lime',
    name: 'Cyber Lime',
    sub: 'High Output Edition',
    bodyColor: '#141a13',
    topColor: '#1d271a',
    accentColor: '#c4ef78',
    glowColor: 'rgba(196, 239, 120, 0.55)',
    labelBg: '#1e2d1a',
    labelBorder: '#344e2b',
  },
  {
    id: 'stealth-titanium',
    name: 'Matte Titanium',
    sub: 'Extreme Durability',
    bodyColor: '#1e2126',
    topColor: '#2b3038',
    accentColor: '#7dd3fc',
    glowColor: 'rgba(125, 211, 252, 0.45)',
    labelBg: '#252b35',
    labelBorder: '#3b4657',
  },
];

export function Battery3D() {
  const [selectedFinish, setSelectedFinish] = useState(0);
  const [rotY, setRotY] = useState(-28);
  const [rotX, setRotX] = useState(14);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0, rotY: -28, rotX: 14 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0, time: 0 });
  const animFrame = useRef<number | null>(null);

  const finish = FINISHES[selectedFinish];

  // Auto-spin with inertia physics
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (!isDragging) {
        if (autoRotate) {
          setRotY((prev) => (prev + dt * 18) % 360);
        } else if (Math.abs(velocity.current.x) > 0.05) {
          // Inertia deceleration
          setRotY((prev) => (prev + velocity.current.x) % 360);
          velocity.current.x *= 0.94;
          if (Math.abs(velocity.current.x) < 0.05) {
            velocity.current.x = 0;
            // Resume gentle auto-rotate after delay
            setTimeout(() => setAutoRotate(true), 1500);
          }
        }
      }

      animFrame.current = requestAnimationFrame(loop);
    };

    animFrame.current = requestAnimationFrame(loop);
    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [autoRotate, isDragging]);

  // Pointer interactions (Mouse / Touch)
  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    velocity.current = { x: 0, y: 0 };
    dragStart.current = { x: e.clientX, y: e.clientY, rotY, rotX };
    lastMousePos.current = { x: e.clientX, y: e.clientY, time: performance.now() };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const now = performance.now();
    const dt = Math.max((now - lastMousePos.current.time) / 1000, 0.016);
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;

    const instantVx = (e.clientX - lastMousePos.current.x) / dt * 0.012;
    velocity.current.x = instantVx;
    lastMousePos.current = { x: e.clientX, y: e.clientY, time: now };

    setRotY((dragStart.current.rotY + dx * 0.45) % 360);
    const newX = Math.max(-30, Math.min(38, dragStart.current.rotX - dy * 0.3));
    setRotX(newX);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  // Dimensions of battery
  const W = 280; // Width (mm proportional)
  const H = 175; // Height
  const D = 160; // Depth

  // Dynamic specular lighting angle based on rotation
  const radY = (rotY * Math.PI) / 180;
  const lightIntensity = Math.max(0.2, (Math.cos(radY) + 1) / 2);

  return (
    <div className="apple-showcase-wrap">
      {/* Top Floating Badge */}
      <div className="apple-badge-row">
        <span className="apple-pill-tag">
          <span className="apple-pulse-dot" style={{ background: finish.accentColor }} />
          360° INTERACTIVE 3D
        </span>
        <span className="apple-hint-text">드래그하여 3D 배터리 회전</span>
      </div>

      {/* 3D Stage Viewport */}
      <div
        ref={containerRef}
        className="apple-stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        aria-label="자동차 배터리 3D 인터랙티브 모델"
      >
        {/* Soft Drop Shadow under Battery */}
        <div
          className="apple-ambient-shadow"
          style={{
            transform: `rotateX(90deg) rotateZ(${rotY}deg) scale(${1 + Math.sin(radY) * 0.08})`,
            boxShadow: `0 40px 60px rgba(0, 0, 0, 0.75), 0 10px 30px ${finish.glowColor}`,
          }}
        />

        {/* 3D Object Group */}
        <div
          className="apple-cube"
          style={{
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          }}
        >
          {/* 1. FRONT FACE */}
          <div
            className="bface bfront"
            style={{
              width: `${W}px`,
              height: `${H}px`,
              backgroundColor: finish.bodyColor,
              borderColor: finish.labelBorder,
              transform: `translate3d(-${W / 2}px, -${H / 2}px, ${D / 2}px)`,
            }}
          >
            {/* Glossy specular light sheen */}
            <div
              className="bspecular-sheen"
              style={{ opacity: lightIntensity * 0.4 }}
            />

            {/* Front Label Plate */}
            <div
              className="blabel-plate"
              style={{
                backgroundColor: finish.labelBg,
                borderColor: finish.labelBorder,
              }}
            >
              <div className="blabel-top">
                <span className="bbrand-logo">BATTERYCALL</span>
                <span
                  className="bmodel-badge"
                  style={{
                    color: finish.accentColor,
                    borderColor: finish.accentColor,
                  }}
                >
                  {finish.sub}
                </span>
              </div>

              <div className="bspec-numbers">
                <div className="bspec-item">
                  <span className="bspec-val">12V 90Ah</span>
                  <span className="bspec-sub">AGM 정격 용량</span>
                </div>
                <div className="bspec-item">
                  <span className="bspec-val">900 CCA</span>
                  <span className="bspec-sub">저온 시동 출력</span>
                </div>
              </div>

              {/* Status Glow Bar */}
              <div className="bstatus-pill">
                <span
                  className="bstatus-led"
                  style={{ backgroundColor: finish.accentColor }}
                />
                <span className="bstatus-txt">12.8V 정상 전압 보증</span>
              </div>
            </div>

            {/* Bottom reinforcement ribs */}
            <div className="bribs-bottom">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="brib" />
              ))}
            </div>
          </div>

          {/* 2. BACK FACE */}
          <div
            className="bface bback"
            style={{
              width: `${W}px`,
              height: `${H}px`,
              backgroundColor: finish.bodyColor,
              borderColor: finish.labelBorder,
              transform: `translate3d(-${W / 2}px, -${H / 2}px, -${D / 2}px) rotateY(180deg)`,
            }}
          >
            <div className="bback-plate">
              <span className="bback-cert">KS · ISO 9001 정품 인증</span>
              <p className="bback-desc">출장 교체 시 차량 연식 규격 1:1 세팅</p>
              <div className="bbarcode" />
            </div>
            <div className="bribs-bottom">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="brib" />
              ))}
            </div>
          </div>

          {/* 3. LEFT FACE */}
          <div
            className="bface bside"
            style={{
              width: `${D}px`,
              height: `${H}px`,
              backgroundColor: finish.bodyColor,
              borderColor: finish.labelBorder,
              transform: `translate3d(-${D / 2}px, -${H / 2}px, 0px) rotateY(-90deg) translateZ(${W / 2}px)`,
            }}
          >
            <div className="bhandle-recess" />
            <div className="bside-ribs">
              {[...Array(4)].map((_, i) => (
                <span key={i} className="bsrib" />
              ))}
            </div>
          </div>

          {/* 4. RIGHT FACE */}
          <div
            className="bface bside"
            style={{
              width: `${D}px`,
              height: `${H}px`,
              backgroundColor: finish.bodyColor,
              borderColor: finish.labelBorder,
              transform: `translate3d(-${D / 2}px, -${H / 2}px, 0px) rotateY(90deg) translateZ(${W / 2}px)`,
            }}
          >
            <div className="bhandle-recess" />
            <div className="bside-ribs">
              {[...Array(4)].map((_, i) => (
                <span key={i} className="bsrib" />
              ))}
            </div>
          </div>

          {/* 5. TOP COVER & TERMINALS */}
          <div
            className="bface btop"
            style={{
              width: `${W}px`,
              height: `${D}px`,
              backgroundColor: finish.topColor,
              borderColor: finish.labelBorder,
              transform: `translate3d(-${W / 2}px, -${D / 2}px, 0px) rotateX(90deg) translateZ(${H / 2}px)`,
            }}
          >
            {/* Top Grip Handle */}
            <div className="btop-handle" />

            {/* Positive (+) Terminal Post with Red Ring */}
            <div className="bterminal bpos">
              <span className="bring-pos" />
              <div className="bpost-metal" />
              <span className="bsign">+</span>
            </div>

            {/* Negative (-) Terminal Post with Blue/Black Ring */}
            <div className="bterminal bneg">
              <span className="bring-neg" />
              <div className="bpost-metal" />
              <span className="bsign">-</span>
            </div>

            {/* 6 Cell Pressure Relief Valves */}
            <div className="bcell-vents">
              {[...Array(6)].map((_, i) => (
                <span key={i} className="bvent" />
              ))}
            </div>
          </div>

          {/* 6. BOTTOM FACE */}
          <div
            className="bface bbottom"
            style={{
              width: `${W}px`,
              height: `${D}px`,
              backgroundColor: '#0a0b0d',
              transform: `translate3d(-${W / 2}px, -${D / 2}px, 0px) rotateX(-90deg) translateZ(${H / 2}px)`,
            }}
          />
        </div>
      </div>

      {/* Apple-Style Finish Selector */}
      <div className="apple-finish-panel">
        <span className="apple-finish-label">
          <strong>{finish.name}</strong> · {finish.sub}
        </span>
        <div className="apple-finish-chips">
          {FINISHES.map((f, idx) => (
            <button
              key={f.id}
              type="button"
              className={`apple-color-dot ${idx === selectedFinish ? 'is-active' : ''}`}
              style={{
                backgroundColor: f.accentColor,
                boxShadow: idx === selectedFinish ? `0 0 14px ${f.glowColor}` : 'none',
              }}
              onClick={() => {
                setSelectedFinish(idx);
                setAutoRotate(false);
                setTimeout(() => setAutoRotate(true), 2500);
              }}
              aria-label={f.name}
              title={f.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
