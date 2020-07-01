import styled from "styled-components";
import { Box } from "@material-ui/core";
import { FlexCenter } from "./Layout";

export const BasixAni = styled(Box)`
  @keyframes example {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  animation-name: example;
  animation-duration: 0.2s;
  animation-timing-function: ease-out;
`;

export const FlexCenterWithAni = styled(FlexCenter)`
  @keyframes opacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  animation-name: opacity;
  animation-duration: 0.2s;
  animation-timing-function: ease-out;
`;
