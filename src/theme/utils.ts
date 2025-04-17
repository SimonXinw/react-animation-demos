import { css } from 'styled-components';

/* eslint-disable import/no-unused-modules */
export const displayWide = 1440;
export const displayUltraWide = 3440;
export const displayNarrow = 390;
export const OnlyMobile = `@media (max-aspect-ratio:1000/1001)`;
export const OnlyDesktop = `@media (min-aspect-ratio:1/1)`;
export const OnlyDesktopLarge = `@media (min-width: 1440px)`;
export const OnlyDesktopUltraWide = `@media (min-width: 2560px)`;
export const OnlyTouch = `@media (pointer: coarse)`;
export const OnlyMouse = `@media (pointer: fine)`;

const fix = (arg0: number) => Number(arg0).toFixed(4);

const FluidMath = function (minValue: number, maxValue: number, from: number, to: number) {
  const x = (maxValue - minValue) / (to - from);
  const y = maxValue - to * x;
  return `calc(${fix(x)} * var(--fullWidth, 100vw) + ${fix(y)}px)`;
};

export const FluidAttr = (
  attribute: string,
  minValue: number | null,
  medValue: number,
  maxValue: number | null,
  isImportant?: boolean
) => {
  return `${
    minValue !== null
      ? `
  ${attribute}: ${FluidMath(minValue, medValue, displayNarrow, displayWide)}${
    isImportant ? ' !important' : ''
  };`
      : ''
  }${
    maxValue !== null
      ? `@media (min-width: 1441px) {
      ${attribute}: ${FluidMath(
        medValue,
        maxValue,
        displayWide,
        displayUltraWide
      )}${isImportant ? ' !important' : ''};
  }`
      : ''
  }
  `;
};

export const cornersSmall = css`
  overflow: hidden;
  border-radius: 10px;
`;

export const corners = css`
  overflow: hidden;
  ${FluidAttr('border-radius', 10, 20, 24)}
`;

export const ease = 'cubic-bezier(0.8, 0, 0.2, 1)';
export const easeIn = 'cubic-bezier(0.75, 0, 0.9, 0.23)';
export const easeOut = 'cubic-bezier(0.1, 0.75, 0.3, 1)';
export const easeSpring = 'cubic-bezier(0.7, -1, 0.3, 2)';

export const contentElement = css`
  p {
    margin: 0.1em auto;
    word-wrap: break-word;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0.5em auto;
    word-wrap: break-word;
  }
  p {
    min-height: 1.33em;
  }
  p,
  ol > li,
  ul > li {
    &::after {
      content: '\00A0';
    }
  }
`;
