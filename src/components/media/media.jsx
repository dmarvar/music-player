import React, { Component } from "react";
import styled from "styled-components";
import Player from "./player";
import List from "./list";
import axios from "axios";

const PlayerWrapper = styled.div`
  background: #006488;
  box-shadow: 5px 5px 19px 3px rgba(0, 0, 0, 0.93);
  width: 80%;
  min-height: 600px;
  border-radius: 10px;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 720px) {
    width: 100%;
    flex-direction: column;
    height: 100%;
    overflow: scroll;
  }
`;

export default class Media extends Component {
  constructor() {
    super();
    this.state = {
      songs: [],
      track: {}
    };
    this.changeTrack = this.changeTrack.bind(this);
  }
  componentDidMount() {
    axios
      .get(`https://5dd1894f15bbc2001448d28e.mockapi.io/playlist`)
      .then(res => {
        const songs = res.data;
        this.setState({ songs });
        this.changeTrack(0);
      });
  }
  changeTrack(id, repeat = false, shuffle = false) {
    const { songs, track: currentTrack } = this.state;
    let track = songs[id] || songs[0];
    let random = Math.floor(Math.random() * songs.length);
    if (shuffle) track = songs[random];
    if (repeat) track = songs[parseInt(currentTrack.id) - 1];
    this.setState({ track });
  }
  render() {
    return (
      <PlayerWrapper>
        <Player
          track={this.state.track}
          changeTrack={this.changeTrack}
        ></Player>
        <List songs={this.state.songs} changeTrack={this.changeTrack}></List>
      </PlayerWrapper>
    );
  }
}
