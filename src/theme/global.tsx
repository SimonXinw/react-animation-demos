"use client";
import { FluidAttr } from "./utils";
import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import { awolDm } from "./fonts";
import { darkTheme } from "./themeColors";

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  html {
    position: relative;
  }
  body {
    padding: 0;
    margin: 0;
    color: white;
    background: ${darkTheme.background};
    -webkit-tap-highlight-color: transparent;
    font-size: 16px;
    line-height: 1.33em;
    font-weight: 500;
    touch-action: pan-x pan-y;
    ${awolDm.style}
    text-rendering: optimizeLegibility;
    letter-spacing: -0.03em;
  }

  *{
    box-sizing: border-box;
  }

  main {
    min-height: 100vh;
  }
  a:link,a:visited, .link {
    color: currentColor;
    text-decoration: none;
    transition: color 0.2s ease;
    svg {
      circle, path {
        stroke: currentColor;
        transition: stroke 0.2s ease;
      }
    }
  }
  a:hover, .link:hover {
    color: ${darkTheme.highlight};
    text-decoration: none;
    svg {
      circle, path {
        stroke: ${darkTheme.highlight};
      }
    }
  }
  h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6, b, strong {
    font-weight: 600;
  }
  h1, h2, h3, h4, h5, h6 { 
    margin-top: 0;
    user-select: none;
    line-height: 1.15em;
    letter-spacing: -0.04em;
    mark {
      background: transparent;
      color: #5CA6D6;
    }
  }

  h1, .h1 {
    ${FluidAttr("font-size", 48, 68, 76)}
  }
  h2, .h2 {
    ${FluidAttr("font-size", 37, 56, 68)}
  }
  h3, .h3 {
    ${FluidAttr("font-size", 26, 40, 56)}
  }
  h4, .h4 {
    ${FluidAttr("font-size", 24, 32, 40)}
  }
  h5, .h5 {
    ${FluidAttr("font-size", 22, 26, 32)}
  }
  h6, .h6 {
    ${FluidAttr("font-size", 20, 20, 24)}
  }

  .label {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }
  small, .small {
    font-size: 13px;
    line-height: 1.2em;
    letter-spacing: 0;
  }

  .tiny {
    font-size: 11px;
    line-height: 1.2em;
  }
  .bodyMedium {
    ${FluidAttr("font-size", 16, 20, 22)}
    line-height: 1.38em;
  }
  .bodyLarge {
    ${FluidAttr("font-size", 18, 24, 26)}
    line-height: 1.38em;
  }
  .muted {
    opacity: 0.4;
  }
  button {
    background: transparent;
    border: 0;
    padding: 0;
    display: inline-block;
    cursor: pointer;
    color: inherit;
  }
  button:disabled,button[disabled] {
    cursor: not-allowed;
  }
  button:focus-visible, a:focus-visible, select:focus-visible, textarea:focus-visible{
    outline: 2px solid ${darkTheme.accent};
  }
  sup {
    font-size: 60%;
    margin: 0 0 0 0.1em;
    font-weight: 600;
  }


`;
