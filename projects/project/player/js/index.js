let videos = [
  {
    songName: "Short Video Clip 1",
    songPath: "media/vid1.mp4",
  },
  {
    songName: "Short Video Clip 2",
    songPath: "media/vid2.mp4",
  },
];

let videoInfo = document.getElementsByClassName("song-info");
let prevBtn = document.querySelector(".prev");
let nextBtn = document.querySelector(".next");

let videoIndex = 0;
let video = document.createElement("video");
video.setAttribute("type", "video/mp4");
video.src = videos[videos.length - 1].songPath;
videoInfo[0].innerText = videos[videos.length - 1].songName;
video.id = videos.length - 1;
let progressBar = document.getElementById("range-slider");

let volume = document.getElementById("volume");
let v_up = document.querySelector(".v-up");
let v_down = document.querySelector(".v-down");
let v_mute = document.querySelector(".v-mute");

let videoSideBarIcon = document.querySelector(".video-info");
let videosSideBar = document.querySelector(".videos");
let cross = document.querySelector(".videos .burger");

let play = document.querySelector(".play");
let pause = document.querySelector(".pause");

let playWindow = document.querySelector(".play-window");

let fullScreenBtn = document.querySelector(".full-screen-btn");
let playBtn = document.querySelector(".play-btn");
let pauseBtn = document.querySelector(".pause-btn");

// types
// video/3gpp
// video/mp4

// Adding present videos to playlist
window.addEventListener("load", () => {
  progressBar.value = 0;
  video.volume = 0.2;
  volume.value = video.volume * 100;

  videos.map((vid, index) => {
    let videoContainer = document.createElement("div");
    videoContainer.classList.add("videoItem");

    let videoData = `
        <video src="${vid.songPath}" alt="Loading..." height="100" id="${index}"></video>
        <p class="song-info">${vid.songName}</p>`;
    videoContainer.insertAdjacentHTML("beforeend", videoData);
    videosSideBar.appendChild(videoContainer);
  });

  // videos list
  setTimeout(() => {
    let videoItem = document.querySelectorAll(".videoItem");

    videoItem.forEach((elm) => {
      elm
        .getElementsByTagName("video")[0]
        .addEventListener("click", (currElm) => {
          videoIndex = currElm.target.id;
          video.src = videos[videoIndex].songPath;
          videosSideBar.classList.remove("active");
          video.currentTime = 0;
          progressBar.value = 0;
          video.play();
          iconChange();
          videoInfo[0].innerText = videos[videoIndex].songName;
          video.id = videoIndex;
        });
      elm.children[0].currentTime = 30;
    });
  }, 0);
});

// next song
nextBtn.addEventListener("click", () => {
  videoIndex = video.id;
  if (videoIndex < videos.length - 1) {
    ++videoIndex;
    video.src = videos[videoIndex].songPath;
    videoInfo[0].innerText = videos[videoIndex].songName;
    video.id = videoIndex;
  } else {
    videoIndex = 0;
    video.src = videos[videoIndex].songPath;
    videoInfo[0].innerText = videos[videoIndex].songName;
    video.id = 0;
  }
  video.play();
  iconChange();
});

// previous song
prevBtn.addEventListener("click", () => {
  if (videoIndex <= 0) {
    videoIndex = videos.length - 1;
    video.src = videos[videoIndex].songPath;
    videoInfo[0].innerText = videos[videoIndex].songName;
    video.id = videos.length - 1;
  } else {
    --videoIndex;
    video.src = videos[videoIndex].songPath;
    videoInfo[0].innerText = videos[videoIndex].songName;
    video.id = videoIndex;
  }
  video.play();
  iconChange();
});

// handle video seekbar
video.addEventListener("timeupdate", (e) => {
  // Video Runing and Total time
  let currTime = Math.floor(e.target.currentTime);
  let totalTime = Math.floor(e.target.duration);

  // Display Currrent Playing Video Time
  let videoHr = document.querySelector(".video-duration .hr");
  let videoMin = document.querySelector(".video-duration .min");
  let videoSec = document.querySelector(".video-duration .sec");

  // Display Current Video Total Duration
  let totalHr = document.querySelector(".total-time .hr");
  let totalMin = document.querySelector(".total-time .min");
  let totalSec = document.querySelector(".total-time .sec");

  let totalVidSec;
  let totalVidMin;
  let totalVidHr;

  let currVidSec;
  let currVidMin;
  let currVidHr;

  // Displaying Durations
  setTimeout(() => {
    totalVidSec = Math.floor(totalTime % 60);
    totalVidMin = Math.floor(totalTime / 60);
    totalVidHr = Math.floor(totalTime / (60 * 60));

    currVidSec = Math.floor(currTime % 60);
    currVidMin = Math.floor(currTime / 60);
    currVidHr = Math.floor(currTime / (60 * 60));

    totalSec.innerText = addZero(totalVidSec) || `00`;
    totalMin.innerText = addZero(totalVidMin) || `00`;
    totalHr.innerText = addZero(totalVidHr) || `00`;

    videoSec.innerText = addZero(currVidSec) || `00`;
    videoMin.innerText = addZero(currVidMin) || `00`;
    videoHr.innerText = addZero(currVidHr) || `00`;
  }, 0);

  // Add a zero before a number less then 10 eg. from 4 to 04
  function addZero(time) {
    if (time < 10) {
      return `0${Math.floor(time)}`;
    } else {
      return Math.floor(time);
    }
  }

  // Video pregress and Seekbar
  let videoProgress = parseInt((video.currentTime / video.duration) * 100);
  progressBar.value = videoProgress;

  if (progressBar.value == 100) {
    if (videoIndex < videos.length - 1) {
      ++videoIndex;
      video.src = videos[videoIndex].songPath;
    } else {
      videoIndex = 0;
      video.src = videos[videoIndex].songPath;
    }

    progressBar.value = 0;
    video.currentTime = 0;
    video.play();
    iconChange();
    videoInfo[0].innerText = videos[videoIndex].songName;
  }
});

// change video current time on seekbar change/forward video
progressBar.addEventListener("change", () => {
  video.currentTime = (progressBar.value * video.duration) / 100;
});

// volume icons
function volumeChange() {
  if (volume.value <= 0) {
    v_up.classList.add("hide");
    v_down.classList.add("hide");
    v_mute.classList.remove("hide");
  } else if (volume.value <= 50) {
    v_up.classList.add("hide");
    v_down.classList.remove("hide");
    v_mute.classList.add("hide");
  } else if (volume.value > 50) {
    v_up.classList.remove("hide");
    v_down.classList.add("hide");
    v_mute.classList.add("hide");
  }

  // change volume according to volume seekbar
  video.volume = volume.value / 100;
}

// play/pause icons
function iconChange() {
  if (!video.paused) {
    play.classList.add("hide");
    playBtn.classList.add("hide");
    pause.classList.remove("hide");
    pauseBtn.classList.remove("hide");
  } else {
    play.classList.remove("hide");
    playBtn.classList.remove("hide");
    pause.classList.add("hide");
    pauseBtn.classList.add("hide");
  }
}

// click on screen play/pause btn
playBtn.addEventListener("click", () => {
  if (!video.paused) {
    video.pause();
  } else {
    video.play();
  }
  iconChange();
});

pauseBtn.addEventListener("click", () => {
  if (!video.paused) {
    video.pause();
  } else {
    video.play();
  }
  iconChange();
});

// Full Screen toggle button
fullScreenBtn.addEventListener("click", () => {
  if (!video.paused) {
    video.play();
  } else {
    video.pause();
  }

  playWindow.classList.toggle("full-screen");
});

// handle volume change
volume.addEventListener("change", volumeChange);

// open sidebar
videoSideBarIcon.addEventListener("click", () => {
  videosSideBar.classList.add("active");
});

// close sidebar
cross.addEventListener("click", () => {
  videosSideBar.classList.remove("active");
});

// add video to player
playWindow.appendChild(video);

// play button
play.addEventListener("click", () => {
  video.play();
  iconChange();
});

// pause button
pause.addEventListener("click", () => {
  video.pause();
  iconChange();
});

// control via keyboard
window.addEventListener("keydown", (e) => {
  if (e.code == "Space" || e.key == " ") {
    if (!video.paused) {
      video.pause();
    } else {
      video.play();
    }
    iconChange();
  }

  if (e.key == "ArrowUp") {
    volume.value -= -8;
    volumeChange();
  }

  if (e.key == "ArrowDown") {
    volume.value -= 8;
    volumeChange();
  }

  if (e.key == "ArrowRight") {
    video.currentTime -= -10;
  }

  if (e.key == "ArrowLeft") {
    video.currentTime -= 10;
  }

  if (e.key == "m" || e.key == "M") {
    volume.value = 0;
    volumeChange();
  }

  if (e.key == "n" || e.key == "N") {
    if (videoIndex < videos.length - 1) {
      ++videoIndex;
      video.src = videos[videoIndex].songPath;
    } else {
      videoIndex = 0;
      video.src = videos[videoIndex].songPath;
    }

    progressBar.value = 0;
    video.currentTime = 0;
    video.play();
    iconChange();
    videoInfo[0].innerText = videos[videoIndex].songName;
  }

  if (e.key == "p" || e.key == "P") {
    if (videoIndex <= 0) {
      videoIndex = videos.length - 1;
      video.src = videos[videoIndex].songPath;
    } else {
      --videoIndex;
      video.src = videos[videoIndex].songPath;
    }

    progressBar.value = 0;
    video.currentTime = 0;
    video.play();
    iconChange();
    videoInfo[0].innerText = videos[videoIndex].songName;
  }
});

// nav bar
let burger = document.querySelector(".burger");
let nav = document.querySelector("nav");
burger.addEventListener("click", () => {
  setTimeout(() => {
    nav.classList.toggle("active");
  }, 300);
});
