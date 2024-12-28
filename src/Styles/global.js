import { createGlobalStyle } from "styled-components";
import { px2vw } from "./pxvw/pxvw.js";

export const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    font-size: ${px2vw(24)};

    /* النقاط المختلفة للشاشات */
    @media (min-width: 576px) {
      font-size: ${px2vw(20, 576)};
    }

    @media (min-width: 768px) {
      font-size: ${px2vw(18, 768)};
    }

    @media (min-width: 1024px) {
      font-size: ${px2vw(16, 1024)};
    }

    @media (min-width: 1200px) {
      font-size: ${px2vw(14, 1200)};
    }
  }
`;