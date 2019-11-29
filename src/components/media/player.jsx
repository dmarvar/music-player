import React, { Component } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faUndo,
  faStepForward,
  faStepBackward,
  faRandom,
  faPause
} from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "../_common/progressBar";

const Wrapper = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 720px) {
    flex: 2;
  }
`;
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  img {
    width: 250px;
    height: 250px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.8);
  }
`;
const PlayerControl = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 40px;
  min-height: 40px;
  color: #013e63;
`;
const SongDetail = styled.div`
  text-align: center;
  color: white;
`;
const Icon = styled(FontAwesomeIcon)`
  margin: 20px;
  &:hover {
    color: #001624;
    cursor: pointer;
  }
`;
const Play = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: 6px solid #012136;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #012136;
  &:hover {
    border: 6px solid #00131f;
    cursor: pointer;
    path {
      color: #00131f;
    }
  }
`;
class Player extends Component {
  constructor() {
    super();
    this.state = {
      track: {},
      audioPlayer: new Audio(),
      duration: 0,
      currentTime: 0,
      playing: false,
      repeat: false,
      shuffle: false
    };
    this.playPause = this.playPause.bind(this);
    this.handleClickBar = this.handleClickBar.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.repeat = this.repeat.bind(this);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.track !== prevState.track) {
      let { audioPlayer, playing } = { ...prevState };
      audioPlayer.src = nextProps.track.file;
      if (prevState.duration !== 0) {
        audioPlayer.play();
        playing = true;
      }
      return { track: nextProps.track, audioPlayer, playing };
    }
    return null;
  }
  componentDidMount() {
    const { audioPlayer } = this.state;
    audioPlayer.addEventListener("timeupdate", e => {
      let { currentTime } = e.target;
      this.setState({ currentTime });
    });
    audioPlayer.addEventListener("durationchange", e => {
      let { duration } = e.target;
      this.setState({ duration });
    });
    audioPlayer.addEventListener("ended", e => {
      const { track, repeat, shuffle } = this.state;
      this.props.changeTrack(parseInt(track.id), repeat, shuffle);
    });
  }
  componentWillUnmount() {
    const { audioPlayer } = this.state;
    audioPlayer.removeEventListener("timeupdate");
    audioPlayer.removeEventListener("durationchange");
    audioPlayer.removeEventListener("ended");
  }
  playPause() {
    const { audioPlayer, playing } = { ...this.state };
    playing ? audioPlayer.pause() : audioPlayer.play();
    this.setState({ playing: !playing });
  }
  handleClickBar(e) {
    const target = e.target.id ? e.target.parentElement : e.target;
    const { audioPlayer, duration } = { ...this.state };
    // Getting X Coordinates
    const barLeftX = target.getBoundingClientRect().left;
    const barWidth = target.getBoundingClientRect().width;
    const elapsedDistanceX = e.clientX - barLeftX;
    // Translating coordinates to elapsedTime
    const newTime = (elapsedDistanceX * duration) / barWidth;
    // Updating currentTime
    audioPlayer.currentTime = newTime;
    this.setState({ audioPlayer });
  }
  changeVisibiliy(a) {
    if (a) return { display: "flex" };
    return { display: "none" };
  }
  changeFontColor(a) {
    if (a) return { color: "black" };
    return {};
  }
  repeat() {
    const { repeat } = this.state;
    this.setState({ repeat: !repeat });
  }
  shuffle() {
    const { shuffle } = this.state;
    this.setState({ shuffle: !shuffle });
  }
  resetTime() {
    this.setState({ currentTime: 0 });
  }
  render() {
    const {
      track,
      currentTime,
      duration,
      playing,
      shuffle,
      repeat
    } = this.state;
    const { changeTrack } = this.props;
    return (
      <Wrapper>
        <ImageContainer>
          <img src={track.albumCover} alt="" />
        </ImageContainer>
        <ProgressBar
          duration={duration}
          currentTime={currentTime}
          handleClickBar={this.handleClickBar}
        ></ProgressBar>
        <PlayerControl>
          <Icon
            onClick={this.shuffle}
            icon={faRandom}
            size="lg"
            style={this.changeFontColor(shuffle)}
          />
          <Icon
            onClick={() => changeTrack(parseInt(track.id) - 2, repeat, shuffle)}
            icon={faStepBackward}
            size="lg"
          />
          <Play onClick={this.playPause} style={this.changeVisibiliy(!playing)}>
            <Icon icon={faPlay} size="lg" />
          </Play>
          <Play onClick={this.playPause} style={this.changeVisibiliy(playing)}>
            <Icon icon={faPause} size="lg" />
          </Play>
          <Icon
            onClick={() => changeTrack(parseInt(track.id), repeat, shuffle)}
            icon={faStepForward}
            size="lg"
          />
          <Icon
            onClick={this.repeat}
            icon={faUndo}
            size="lg"
            style={this.changeFontColor(repeat)}
          />
        </PlayerControl>
        <SongDetail>
          <h1>{track.track || "Track Title"}</h1>
          <p>{track.artist || "Artist Name"}</p>
        </SongDetail>
      </Wrapper>
    );
  }
}

export default Player;
