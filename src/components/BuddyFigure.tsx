import React from 'react';
import {C} from '../theme';
import type {Eyes} from '../lib/buddy';

export interface FigureProps {
  eyes: Eyes;
  walk?: number;
  lookX?: number;
  armsUp?: number;
  blush?: boolean;
  stroke?: number;
}

const LEGS = [-68, -38, 24, 54];

/**
 * 橙色方块小人，SVG 组，原点在脚底中心，身体 184×112。
 * 只画身体本身；伸长的手臂、剪刀由外层按世界坐标画。
 */
export const BuddyFigure: React.FC<FigureProps> = ({eyes, walk = 0, lookX = 0, armsUp = 0, blush = false, stroke = 3.5}) => {
  const ex = lookX * 8;
  const nubH = 26 + armsUp * 52;
  return (
    <g strokeLinejoin="round">
      <defs>
        <pattern id="hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <line x1="0" y1="0" x2="0" y2="7" stroke={C.orangeDark} strokeWidth="1" opacity="0.28" />
        </pattern>
      </defs>
      {LEGS.map((lx, i) => {
        const lift = walk ? Math.max(0, Math.sin(walk + (i % 2) * Math.PI)) * 12 : 0;
        return <rect key={i} x={lx} y={-47 - lift} width={14} height={47} fill={C.orange} stroke={C.ink} strokeWidth={stroke} />;
      })}
      {/* 两侧小方块，欢呼时竖起来 */}
      <g transform={`rotate(${-armsUp * 14} -92 -100)`}>
        <rect x={-114} y={-100 - nubH * (0.5 + armsUp * 0.5)} width={24} height={nubH} fill={C.orange} stroke={C.ink} strokeWidth={stroke} />
      </g>
      <g transform={`rotate(${armsUp * 14} 92 -100)`}>
        <rect x={90} y={-100 - nubH * (0.5 + armsUp * 0.5)} width={24} height={nubH} fill={C.orange} stroke={C.ink} strokeWidth={stroke} />
      </g>
      <rect x={-92} y={-157} width={184} height={112} rx={4} fill={C.orange} stroke={C.ink} strokeWidth={stroke} />
      <rect x={-92} y={-157} width={184} height={112} rx={4} fill="url(#hatch)" />
      {blush && (
        <>
          <ellipse cx={-58 + ex} cy={-88} rx={12} ry={6} fill="#F08A8A" opacity={0.6} />
          <ellipse cx={58 + ex} cy={-88} rx={12} ry={6} fill="#F08A8A" opacity={0.6} />
        </>
      )}
      {[-36, 36].map((dx) => (
        <Eye key={dx} x={dx + ex} y={-108} kind={eyes} />
      ))}
    </g>
  );
};

const Eye: React.FC<{x: number; y: number; kind: Eyes}> = ({x, y, kind}) => {
  switch (kind) {
    case 'happy':
      return <path d={`M ${x - 11} ${y + 5} Q ${x} ${y - 9} ${x + 11} ${y + 5}`} fill="none" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />;
    case 'closed':
      return <path d={`M ${x - 10} ${y + 2} Q ${x} ${y + 7} ${x + 10} ${y + 2}`} fill="none" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />;
    case 'flat':
      return <rect x={x - 11} y={y - 1} width={22} height={7} rx={3} fill={C.ink} />;
    case 'wide':
      return (
        <g>
          <rect x={x - 9} y={y - 14} width={18} height={26} rx={8} fill={C.white} stroke={C.ink} strokeWidth={3} />
          <circle cx={x} cy={y} r={4.5} fill={C.ink} />
        </g>
      );
    default:
      return (
        <g>
          <rect x={x - 6} y={y - 10} width={12} height={20} rx={5.5} fill={C.ink} />
          <circle cx={x - 1.5} cy={y - 5} r={2.2} fill={C.white} />
        </g>
      );
  }
};
