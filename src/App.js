import React from "react";
import Media from "./components/media";
import styled from "styled-components";

const MediaWrapper = styled.div`
  background: rgb(4, 158, 153);
  background: linear-gradient(
    90deg,
    rgba(4, 158, 153, 1) 0%,
    rgba(2, 120, 204, 1) 50%,
    rgba(0, 187, 255, 1) 100%
  );
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <MediaWrapper>
      <Media></Media>
    </MediaWrapper>
  );
}

export default App;
