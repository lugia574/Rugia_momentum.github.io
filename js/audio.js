const audio = document.querySelector("audio");
const play = document.getElementById("play");
const timeline = document.getElementById("timeline");
const muteBtn = document.getElementById("mute");

const PALYCLASS = "fa-play-circle";
const PAUSECLASS = "fa-pause-circle";

const handlePlayClick = () => {
  if (audio.paused) {
    play.classList.remove(PALYCLASS);
    play.classList.add(PAUSECLASS);
    audio.play();
  } else {
    play.classList.remove(PAUSECLASS);
    play.classList.add(PALYCLASS);
    audio.pause();
  }
};

const handleMute = () => {
  if (audio.muted) {
    audio.muted = false;
  } else {
    audio.muted = true;
  }
  muteBtn.classList = audio.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
};

const handleLoadedMetadata = () => {
  timeline.max = Math.floor(audio.duration);
};

const handleTimeUpdate = () => {
  timeline.value = Math.floor(audio.currentTime);
};

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;

  audio.currentTime = value;
};

audio.addEventListener("loadeddata", handleLoadedMetadata);
play.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
audio.addEventListener("timeupdate", handleTimeUpdate);
timeline.addEventListener("input", handleTimelineChange);
if (audio.readyState == 4) {
  handleLoadedMetadata();
}
