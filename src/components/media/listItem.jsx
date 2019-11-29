import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 15px 10px;
  margin: 0px 10px;
  display: flex;
  border-bottom: 1px solid #dedede;
  align-items: center;
  color: white;
  img {
    width: 75px;
    height: 75px;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.8);
    margin-right: 10px;
  }
  h3 {
    margin: 0;
  }
  p {
    margin: 10px 0px;
  }
  div {
    margin: 20px 0px;
  }
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export default function listItem({ song }) {
  return (
    <Wrapper>
      <img src={song.albumCover} alt="" />
      <div>
        <h3>{song.track}</h3>
        <p>{song.artist}</p>
      </div>
    </Wrapper>
  );
}
