//Dynamic seek Bar
var rangeSlider = document.getElementById("myProgressBar");
rangeSlider.addEventListener("input", function () {
  var value =
    (rangeSlider.value - rangeSlider.min) / (rangeSlider.max - rangeSlider.min);
  rangeSlider.style.background =
    "linear-gradient(to right, #1db954 " +
    value * 100 +
    "%, #b3b3b3 " +
    value * 100 +
    "%)";
});

//Playing song Section
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songs = [
  { songName: "Do you", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
  { songName: "Hello", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
  { songName: "Sorry", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
  { songName: "Do U Know", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
  { songName: "Angel", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
];

//changing name and covers for every song
songItems.forEach((Element, i) => {
  Element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  Element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

//Main play button working
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime == 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
    makeAllPlay();
  }
});

//Song time changing with dynamic seek bar clicking
audioElement.addEventListener("timeupdate", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  rangeSlider.value = progress;
});

rangeSlider.addEventListener("change", () => {
  audioElement.currentTime = (rangeSlider.value * audioElement.duration) / 100;
});

//Small Playbutton working near every song
const makeAllPlay = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (Element) => {
      console.log("hello");
      Element.classList.remove("fa-circle-pause");
      Element.classList.add("fa-circle-play");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (Element) => {
    Element.addEventListener("click", (e) => {
      makeAllPlay();
      e.target.classList.remove("fa-circle-play");
      e.target.classList.add("fa-circle-pause");
      songIndex = parseInt(e.target.id);
      audioElement.src = `songs/${songIndex}.mp3`;
      masterSongName.innerText = songs[songIndex - 1].songName;
      gif.style.opacity = 1;
      audioElement.currentTime = 0;
      audioElement.play();
      masterPlay.classList.remove("fa-cirle-play");
      masterPlay.classList.add("fa-circle-pause");
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 5) {
    songIndex = 1;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex}.mp3`;
  masterSongName.innerText = songs[songIndex - 1].songName;
  gif.style.opacity = 1;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-cirle-play");
  masterPlay.classList.add("fa-circle-pause");
});
document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 1) {
    songIndex = 1;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex}.mp3`;
  masterSongName.innerText = songs[songIndex - 1].songName;
  gif.style.opacity = 1;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-cirle-play");
  masterPlay.classList.add("fa-circle-pause");
});
