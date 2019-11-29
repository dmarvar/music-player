import React from "react";
import styled from "styled-components";
import ListItem from "./listItem";

const Wrapper = styled.div`
  flex: 2;
  overflow-y: scroll;
  max-height: 600px;
  border-left: 1px solid #dedede;
  &::-webkit-scrollbar {
    width: 7px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.8);
  }
  @media screen and (max-width: 720px) {
    flex: 2;
    min-height: 400px;
    border-left: none;
  }
`;

export default function list({ songs, changeTrack }) {
  return (
    <Wrapper>
      {songs.map(i => (
        <div key={i.id} onClick={() => changeTrack(parseInt(i.id) - 1)}>
          <ListItem song={i}></ListItem>
        </div>
      ))}
    </Wrapper>
  );
}
