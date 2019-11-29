import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 0% 10%;
`;
const Tracker = styled.div`
  width: 100%;
  height: 6px;
  margin: 15px auto;
  background: #001624;
  border-radius: 3px;
  box-shadow: inset 0 0 5px #000;
  cursor: pointer;
`;
const ProgressInTracker = styled.div.attrs(p => ({
  style: {
    width: p.elapsedTime + "%"
  }
}))`
  height: 100%;
  background: #03e2a9;
  border-radius: 3px;
`;

export default function progressBar(props) {
  const { currentTime, duration, handleClickBar } = props;
  let elapsedTime = (currentTime / duration) * 100;
  return (
    <Wrapper>
      <Tracker onClick={handleClickBar}>
        <ProgressInTracker
          elapsedTime={elapsedTime}
          id="innerBar"
        ></ProgressInTracker>
      </Tracker>
    </Wrapper>
  );
}
