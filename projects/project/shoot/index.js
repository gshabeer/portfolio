/** @type {HTMLCanvasElement} */

const navBtn = document.querySelector(".onScreenBtnz");
const mainMenu = document.querySelector(".menu");
const settings = document.querySelector(".settings");
const locationSec = document.querySelector(".location");
const difficultySec = document.querySelector(".difficulty");
const volumeSec = document.querySelector(".volume");
const resetHighScoreSec = document.querySelector(".reset_high_score .confirm");
const instructionsSec = document.querySelector(".instructions");
const gameOverSec = document.querySelector(".game_over");
const playGameBtn = document.getElementById("play_game");
const btnzForBackgrounds = document.querySelectorAll(".loc_menu ul .btn");
const difficultyBtnz = document.querySelectorAll(".difficulty .btn");
const menuBtnz = document.querySelectorAll("button");
const previewImg = document.querySelector(".previewImg img");

const cursor = document.getElementById("cursor");
const musicVol = document.getElementById("music_volume");
const sfxVol = document.getElementById("sfx_volume");

let game_data_arr = [
  {
    difficulty: "easy",
    high_score: 0,
    background: "background/forest.jpg",
    instructions: true,
  },
];

let boomSound = "";
let clickSound = "";
let sfxVolume = 0.8;

let startGame = false;
let difficulty_level = "easy";

let backgroundSrc = "background/forest.jpg";

function difficultyCheck(dl) {
  difficulty_level = dl;

  let localData = JSON.parse(localStorage.getItem("game_data"));
  if (localData) {
    game_data_arr[0] = { ...localData[0], difficulty: dl };
    localStorage.setItem("game_data", JSON.stringify(game_data_arr));
  }

  document
    .querySelectorAll(".active")
    .forEach((act) => act.classList.remove("active"));

  document.getElementById("difficulty_text").innerText = dl;

  if (dl === "easy") {
    difficultyBtnz[0].classList.add("active");
  } else if (dl === "hard") {
    difficultyBtnz[1].classList.add("active");
  }
}

function toggleClass(elm, method) {
  method === "add"
    ? elm.classList.add("animate")
    : elm.classList.remove("animate");
}

btnzForBackgrounds.forEach((btn) => {
  btn.addEventListener("click", () => {
    clickSound.play();
    // previouse active buttons
    let allActive = document.querySelectorAll(".active");
    allActive.forEach((active) => {
      if (active) active.classList.remove("active");
    });

    // set background location to localstorage
    let localData2 = JSON.parse(localStorage.getItem("game_data"));
    if (localData2) {
      game_data_arr[0] = { ...localData2[0], background: btn.dataset.imgsrc };
      localStorage.setItem("game_data", JSON.stringify(game_data_arr));
    }

    btn.classList.add("active");

    // get data from localstorage and change background locations
    let localData = JSON.parse(localStorage.getItem("game_data"));
    if (localData) {
      previewImg.src = localData[0].background;
      backgroundSrc = localData[0].background;
    }
  });
});

difficultyBtnz[0].addEventListener("click", () => difficultyCheck("easy"));
difficultyBtnz[1].addEventListener("click", () => difficultyCheck("hard"));
difficultyBtnz[2].addEventListener("click", () => {
  toggleClass(difficultySec, "remove");
  toggleClass(settings, "add");
});

menuBtnz.forEach((btn) => {
  btn.addEventListener("click", () => {
    clickSound.play();

    if (btn.id === "settings") {
      toggleClass(settings, "add");
      toggleClass(mainMenu, "add");

      // location button
    } else if (btn.id === "location") {
      toggleClass(settings, "remove");
      toggleClass(locationSec, "add");

      // location done button
    } else if (btn.id === "location_done") {
      document.body.style.setProperty("--bg", `url(${backgroundSrc})`);
      toggleClass(settings, "add");
      toggleClass(locationSec, "remove");

      // game start button
    } else if (btn.id === "start") {
      startGame = true;
      score = 0;

      mainMenu.classList.add("hide");
      navBtn.classList.remove("hide");
      playGameBtn.classList.add("hide");
      playGameBtn.previousElementSibling.classList.remove("hide");

      animate(0);

      // back button
    } else if (btn.id === "settings_done") {
      toggleClass(settings, "remove");
      toggleClass(mainMenu, "remove");

      // pause running game
    } else if (btn.id === "pause_game") {
      startGame = false;

      btn.classList.add("hide");
      btn.nextElementSibling.classList.remove("hide");

      // play running game
    } else if (btn.id === "play_game") {
      startGame = true;
      animate(0);
      btn.classList.add("hide");
      btn.previousElementSibling.classList.remove("hide");

      // go back home
    } else if (btn.id === "go_home") {
      btn.nextElementSibling.classList.add("active");
      startGame = false;
      if (score > highScore) highScore = score;
      document.getElementById("high_score").innerText = highScore;

      let localData = JSON.parse(localStorage.getItem("game_data"));
      if (localData) {
        game_data_arr[0] = { ...localData[0], high_score: highScore };
        localStorage.setItem("game_data", JSON.stringify(game_data_arr));
      }

      // confirm want to go back
    } else if (btn.id === "confirm_yes") {
      ravens = [];
      particles = [];
      explosions = [];
      animate(0);
      btn.parentElement.parentElement.classList.remove("active");
      navBtn.classList.add("hide");
      mainMenu.classList.remove("hide");

      // confirm don't want to go back
    } else if (btn.id === "confirm_no") {
      btn.parentElement.parentElement.classList.remove("active");

      if (!playGameBtn.classList.contains("hide")) {
        startGame = false;
      } else {
        startGame = true;
        animate(0);
      }

      // change difficulty level
    } else if (btn.id === "difficulty") {
      toggleClass(difficultySec, "add");
      toggleClass(settings, "remove");

      let localData = JSON.parse(localStorage.getItem("game_data"));
      if (localData) {
        difficulty_level = localData[0].difficulty;

        if (localData[0].difficulty === "easy") {
          difficultyBtnz[0].classList.add("active");
        } else if (localData[0].difficulty === "hard") {
          difficultyBtnz[1].classList.add("active");
        }
      }

      // go back to home button if game over
    } else if (btn.id === "gameOver_home") {
      gameOver = false;
      gameOverSec.classList.add("hide");
      mainMenu.classList.remove("hide");
      document.getElementById("high_score").innerText = highScore;
      ravens = [];
      particles = [];
      explosions = [];
      animate(0);

      // retry game
    } else if (btn.id === "retry_game") {
      gameOverSec.classList.add("hide");
      navBtn.classList.remove("hide");
      gameOver = false;
      startGame = true;
      ravens = [];
      particles = [];
      explosions = [];
      animate(0);

      // adjust game sounds
    } else if (btn.id === "volume") {
      toggleClass(volumeSec, "add");
      toggleClass(settings, "remove");

      // from volume menu back to settings button
    } else if (btn.id === "volume_done") {
      toggleClass(volumeSec, "remove");
      toggleClass(settings, "add");

      // reset high score confirm
    } else if (btn.id === "reset_score") {
      toggleClass(settings, "remove");
      resetHighScoreSec.classList.add("active");

      // reset high score confirm yes button
    } else if (btn.id === "reset_yes") {
      highScore = 0;

      let localData = JSON.parse(localStorage.getItem("game_data"));
      if (localData) {
        game_data_arr[0] = { ...localData[0], high_score: highScore };
        localStorage.setItem("game_data", JSON.stringify(game_data_arr));
      }

      document.getElementById("high_score").innerText = highScore;

      toggleClass(settings, "add");
      resetHighScoreSec.classList.remove("active");

      // reset high score confirm no button
    } else if (btn.id === "reset_no") {
      resetHighScoreSec.classList.remove("active");
      toggleClass(settings, "add");

      // instruction
    } else if (btn.id === "instructions") {
      toggleClass(mainMenu, "add");
      toggleClass(instructionsSec, "add");

      // instructions back button
    } else if (btn.id === "instructions_back") {
      toggleClass(instructionsSec, "remove");
      toggleClass(mainMenu, "remove");

      // anchor for hard mode
    } else if (btn.id === "hard_mode") {
      toggleClass(mainMenu, "add");
      toggleClass(difficultySec, "add");
      toggleClass(instructionsSec, "remove");

      // anchor for locations
    } else if (btn.id === "inst_loc") {
      toggleClass(locationSec, "add");
      toggleClass(instructionsSec, "remove");
    }
  });
});

// Main Game
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = document.body.clientWidth);
const CANVAS_HEIGHT = (canvas.height = document.body.clientHeight);

const collisionCanvas = document.getElementById("collisionCanvas");
const ctx2 = collisionCanvas.getContext("2d");
collisionCanvas.width = document.body.clientWidth;
collisionCanvas.height = document.body.clientHeight;

let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;
let gameOver = false;

let score = 0;
let highScore = 0;
ctx.font = "4rem Impact";

let ravens = [];

class Raven {
  constructor(width, height, imgSrc) {
    this.spriteWidth = width;
    this.spriteHeight = height;
    imgSrc === "enemy/enemy_fly.png"
      ? (this.sizeModifier = Math.random() * 0.8 + 1.2)
      : (this.sizeModifier = Math.random() * 0.3 + 0.3);
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.x = CANVAS_WIDTH;
    this.y = Math.random() * (CANVAS_HEIGHT - this.height);
    this.directionX = Math.random() * 5 + 3;
    this.directionY = Math.random() * 5 - 2.5;
    this.isDeleted = false;
    this.img = new Image();
    this.img.src = imgSrc;
    this.frames = 0;
    this.maxFrames = 4;
    this.timeSinceFlap = 0;
    this.flapInterval = Math.random() * 50 + 50;
    this.randomColors = [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
    ];
    this.color = `rgb(${this.randomColors[0]},${this.randomColors[1]},${this.randomColors[2]})`;
    this.hasTrail = Math.random() > 0.9;
  }

  update(deltaTime) {
    if (this.y < 0 || this.y > CANVAS_HEIGHT - this.height) {
      this.directionY = this.directionY * -1;
    }

    this.x -= this.directionX;
    this.y += this.directionY;

    if (difficulty_level === "hard") {
      if (this.x < 0 - this.width) {
        this.isDeleted = true;
        gameOver = true;
        startGame = false;
      }
    }

    this.timeSinceFlap += deltaTime;
    if (this.timeSinceFlap > this.flapInterval) {
      this.frames > this.maxFrames ? (this.frames = 0) : this.frames++;
      this.timeSinceFlap = 0;
      if (this.hasTrail) {
        for (let i = 0; i < 5; ++i) {
          particles.push(new Particle(this.x, this.y, this.width, this.color));
        }
      }
    }
  }

  draw() {
    ctx2.fillStyle = this.color;
    ctx2.fillRect(this.x, this.y, this.width, this.height);

    ctx.drawImage(
      this.img,
      this.frames * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

let explosions = [];

class Explosion {
  constructor(x, y, size) {
    this.img = new Image();
    this.img.src = "img/boom.png";
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.size = size;
    this.x = x;
    this.y = y;
    this.frame = 0;
    this.sound = boomSound;
    this.timeSinceLastFrame = 0;
    this.frameInterval = 100;
    this.isDeleted = false;
  }

  update(deltaTime) {
    this.sound.volume = sfxVolume;
    if (this.frame === 0) this.sound.play();

    this.timeSinceLastFrame += deltaTime;

    if (this.timeSinceLastFrame > this.frameInterval) {
      this.frame++;
      this.timeSinceLastFrame = 0;
      if (this.frame > 5) this.isDeleted = true;
    }
  }

  draw() {
    ctx.drawImage(
      this.img,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y - this.size * 0.4,
      this.size,
      this.size
    );
  }
}

let particles = [];

class Particle {
  constructor(x, y, size, color) {
    this.size = size;
    this.x = x + size / 2 + Math.random() * 50 - 25;
    this.y = y + size / 3 + Math.random() * 50 - 25;
    this.radius = (Math.random() * this.size) / 10;
    this.maxRadius = Math.random() * 20 + 35;
    this.isDeleted = false;
    this.speedX = Math.random() * 1 + 0.5;
    this.color = color;
  }

  update() {
    this.x += this.speedX;
    this.radius += 0.9;
    if (this.radius > this.maxRadius - 5) this.isDeleted = true;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = 1 - this.radius / this.maxRadius;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawScore() {
  ctx.fillStyle = "#000";
  ctx.fillText("SCORE : " + score, 52, 77);
  ctx.fillStyle = "#fff";
  ctx.fillText("SCORE : " + score, 55, 80);
}

function drawGameOver() {
  if (score > highScore) highScore = score;
  navBtn.classList.add("hide");
  gameOverSec.classList.remove("hide");
  gameOverSec.querySelector("span").innerHTML = " " + score;
  gameOverSec.querySelector(".highScores").firstElementChild.innerText =
    highScore;

  let localData = JSON.parse(localStorage.getItem("game_data"));

  if (localData) {
    game_data_arr[0] = { ...localData[0], high_score: highScore };
    localStorage.setItem("game_data", JSON.stringify(game_data_arr));
  }
}

sfxVol.addEventListener("change", (e) => {
  sfxVolume = Number(e.target.value);
  boomSound.volume = sfxVolume;
  boomSound.play();
});

window.addEventListener("click", (e) => {
  const detectedColor = ctx2.getImageData(e.x, e.y, 1, 1);
  const dColor = detectedColor.data;
  if (startGame) {
    ravens.forEach((obj) => {
      if (
        obj.randomColors[0] === dColor[0] &&
        obj.randomColors[1] === dColor[1] &&
        obj.randomColors[2] === dColor[2]
      ) {
        // collision detected
        obj.isDeleted = true;
        obj.hasTrail ? (score += 3) : score++;

        explosions.push(new Explosion(obj.x, obj.y, obj.width));
      }
    });
  }
});

window.addEventListener("load", () => {
  btnzForBackgrounds.forEach((btn) => {
    let localData = JSON.parse(localStorage.getItem("game_data"));
    if (localData) {
      game_data_arr[0] = { ...localData[0], background: backgroundSrc };

      localData
        ? (previewImg.src = localData[0].background)
        : localStorage.setItem("game_data", JSON.stringify(game_data_arr));

      if (localData[0].background === btn.dataset.imgsrc) {
        btn.classList.add("active");
      }

      backgroundSrc = localData[0].background;
      document.body.style.setProperty("--bg", `url(${backgroundSrc})`);
    }
  });

  let localData = JSON.parse(localStorage.getItem("game_data"));
  if (localData) {
    difficulty_level = localData[0].difficulty;
    document.getElementById("difficulty_text").innerText =
      localData[0].difficulty;

    if (localData[0].difficulty === "easy") {
      difficultyBtnz[0].classList.add("active");
    } else if (localData[0].difficulty === "hard") {
      difficultyBtnz[1].classList.add("active");
    }

    document.getElementById("high_score").innerText = localData[0].high_score;
    highScore = localData[0].high_score;

    if (localData[0].instructions === true) {
      instructionsSec.classList.add("animate");
      mainMenu.classList.add("animate");

      instructionsSec.querySelector(".btn").onclick = () => {
        let localData = JSON.parse(localStorage.getItem("game_data"));
        if (localData) {
          game_data_arr[0] = { ...localData[0], instructions: false };
          localStorage.setItem("game_data", JSON.stringify(game_data_arr));
        }
      };
    }
  } else {
    localStorage.setItem("game_data", JSON.stringify(game_data_arr));
    btnzForBackgrounds.forEach((btn) => {
      let localData = JSON.parse(localStorage.getItem("game_data"));
      if (localData) {
        game_data_arr[0] = { ...localData[0], background: backgroundSrc };

        localData
          ? (previewImg.src = localData[0].background)
          : localStorage.setItem("game_data", JSON.stringify(game_data_arr));

        if (localData[0].background === btn.dataset.imgsrc) {
          btn.classList.add("active");
        }

        backgroundSrc = localData[0].background;
        document.body.style.setProperty("--bg", `url(${backgroundSrc})`);
      console.log(document.body.style.getProperty("--bg"));
}
    });

    let localData = JSON.parse(localStorage.getItem("game_data"));
    if (localData) {
      difficulty_level = localData[0].difficulty;
      document.getElementById("difficulty_text").innerText =
        localData[0].difficulty;

      if (localData[0].difficulty === "easy") {
        difficultyBtnz[0].classList.add("active");
      } else if (localData[0].difficulty === "hard") {
        difficultyBtnz[1].classList.add("active");
      }

      document.getElementById("high_score").innerText = localData[0].high_score;
      highScore = localData[0].high_score;

      if (localData[0].instructions === true) {
        instructionsSec.classList.add("animate");
        mainMenu.classList.add("animate");

        instructionsSec.querySelector(".btn").onclick = () => {
          let localData = JSON.parse(localStorage.getItem("game_data"));
          if (localData) {
            game_data_arr[0] = { ...localData[0], instructions: false };
            localStorage.setItem("game_data", JSON.stringify(game_data_arr));
          }
        };
      }
    }
  }

  boomSound = new Audio("sound/sound.wav");
  clickSound = new Audio("sound/click.mp3");
});

window.addEventListener("mousemove", (e) => {
  cursor.style.top = e.pageY + "px";
  cursor.style.left = e.pageX + "px";

  let elm = e.target;
  if (e.sourceCapabilities.firesTouchEvents !== true) {
    if (elm.id !== "canvas1") {
      cursor.classList.add("hide");
    } else if (elm.id === "canvas1") {
      cursor.classList.remove("hide");
    }
  }
});

["touchstart", "touchmove", "touchend"].map((touchEvent) =>
  window.addEventListener(touchEvent, () => {
    cursor.classList.add("hide");
  })
);

function animate(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx2.clearRect(0, 0, canvas.width, canvas.height);
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  timeToNextRaven += deltaTime;
  if (timeToNextRaven > ravenInterval) {
    if (backgroundSrc === "background/forest.jpg") {
      enemyImgSrc = "enemy/enemy_raven.png";
      enemyWidth = 271;
      enemyHeight = 194;
    } else if (backgroundSrc === "background/city.webp") {
      enemyImgSrc = "enemy/enemy_bat.png";
      enemyWidth = 266;
      enemyHeight = 188;
    } else if (backgroundSrc === "background/sky.webp") {
      enemyImgSrc = "enemy/enemy_fly.png";
      enemyWidth = 60;
      enemyHeight = 44;
    } else if (backgroundSrc === "background/landscape.webp") {
      enemyImgSrc = "enemy/enemy_ghost.png";
      enemyWidth = 261;
      enemyHeight = 209;
    }

    ravens.push(new Raven(enemyWidth, enemyHeight, enemyImgSrc));
    timeToNextRaven = 0;
    ravens.sort((a, b) => a.width - b.width);
  }

  drawScore();

  [...particles, ...ravens, ...explosions].forEach((obj) =>
    obj.update(deltaTime)
  );
  [...particles, ...ravens, ...explosions].forEach((obj) => obj.draw());
  ravens = ravens.filter((obj) => !obj.isDeleted);
  explosions = explosions.filter((obj) => !obj.isDeleted);
  particles = particles.filter((obj) => !obj.isDeleted);

  if (gameOver === false && startGame === true) requestAnimationFrame(animate);

  if (gameOver) drawGameOver();
}

animate(0);
