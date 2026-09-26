import React from 'react';
import {boil, easeOutElastic, prog, rand} from '../lib/anim';
import {C, popTextStyle} from '../theme';

/** 卡通弹字：SNIP! / SHAKE: MAX */
export const PopText: React.FC<{text: string; x: number; y: number; t: number; dur: number; size: number; fill: string; rot?: number; jitter?: number}> = ({
  text, x, y, t, dur, size, fill, rot = -8, jitter = 0,
}) => {
  if (t < 0 || t > dur) return null;
  const inS = easeOutElastic(prog(t, 0, 14));
  const out = 1 - prog(t, dur - 6, 6);
  const jx = jitter ? boil(t * 4, 31, jitter) : 0;
  const jy = jitter ? boil(t * 4, 32, jitter) : 0;
  return (
    <div style={{position: 'absolute', left: x + jx, top: y + jy, transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${inS * (0.6 + 0.4 * out)})`, opacity: out, ...popTextStyle(size, fill)}}>
      {text}
    </div>
  );
};

const COLORS = [C.yellow, C.teal, '#F2A0B4', '#8E8FE8', C.orange, C.red];

/** 屏幕坐标的彩纸，确定性随机 */
export const Confetti: React.FC<{t: number; n?: number}> = ({t, n = 110}) => {
  if (t < 0) return null;
  return (
    <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
      {Array.from({length: n}, (_, i) => {
        const delay = rand(i + 1) * 20;
        const lt = t - delay;
        if (lt < 0) return null;
        const x0 = rand(i + 101) * 1920;
        const vy = 5 + rand(i + 201) * 6;
        const y = -40 - rand(i + 301) * 200 + lt * vy;
        if (y > 1120) return null;
        const x = x0 + Math.sin(lt * 0.08 + i) * 40;
        const rot = lt * (4 + rand(i + 401) * 8) * (i % 2 ? 1 : -1);
        const flip = Math.abs(Math.cos(lt * 0.15 + i));
        return (
          <rect key={i} x={-6} y={-10} width={12} height={20} rx={2} fill={COLORS[i % COLORS.length]} stroke={C.ink} strokeWidth={1.5}
            transform={`translate(${x} ${y}) rotate(${rot}) scale(${flip} 1)`} />
        );
      })}
    </svg>
  );
};

/** 纸张颗粒 + 暗角，盖在最上层 */
export const PaperGrain: React.FC = () => (
  <>
    <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0, opacity: 0.07, mixBlendMode: 'multiply', pointerEvents: 'none'}}>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="4" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
    <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(60,40,20,0.12) 100%)', pointerEvents: 'none'}} />
  </>
);
