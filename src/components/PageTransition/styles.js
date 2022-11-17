/* eslint-disable security/detect-object-injection */
import styled, { css } from 'styled-components';

const createAnimationStyles = ({ keyframes, delay, duration, timing, fill, origin, onTop }) => css`
  animation-name: ${keyframes};
  animation-delay: ${delay};
  animation-duration: ${duration}ms;
  animation-timing-function: ${timing};
  animation-fill-mode: ${fill};
  transform-origin: ${origin || '50% 50%'};
  ${onTop &&
  css`
    z-index: 1;
  `}
`;

const stateMap = {
  entering: ({ enterAnimation }) => {
    return css`
      ${createAnimationStyles(enterAnimation)};
    `;
  },
  exiting: ({ exitAnimation }) => {
    return css`
      ${createAnimationStyles(exitAnimation)};
    `;
  },
};

export const PageTransitionGroup = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  perspective: 1200px;
  overflow: hidden;
`;

export const PageTransitionWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  transform-style: preserve-3d;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  will-change: tranform;
  ${({ state }) => stateMap[state]};
`;
