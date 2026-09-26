import React from 'react';
import {Composition} from 'remotion';
import {Demo} from './Demo';
import {DURATION, FPS, H, W} from './lib/timeline';

export const Root: React.FC = () => (
  <Composition id="Demo" component={Demo} durationInFrames={DURATION} fps={FPS} width={W} height={H} />
);
