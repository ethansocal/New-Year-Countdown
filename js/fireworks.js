let fireworks = false;

function startFireworks() {
  if (fireworks !== true) {
    fireworks = true;
    canvas = document.getElementById("fireworks");
    ctx = canvas.getContext("2d");
    resizeCanvas();
    if (particles.length < 1) {
      window.requestAnimationFrame(updateWorld);
    }
  }
}

function stopFireworks() {
  fireworks = false;
}

// Fireworks Canvas
window.addEventListener("resize", resizeCanvas, false);
window.addEventListener("DOMContentLoaded", resizeCanvas, false);
window.addEventListener(
  "click",
  (e) => {
    if (fireworks) {
      createFirework(e.x, e.y);
    }
  },
  false
);

window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

let canvas,
  ctx,
  w,
  h,
  particles = [],
  probability = 0.2,
  xPoint,
  yPoint;

function resizeCanvas() {
  if (!!canvas) {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
}

function updateWorld() {
  update();
  paint();
  if (fireworks || particles.length > 0) {
    window.requestAnimationFrame(updateWorld);
  }
}

function update() {
  if (particles.length < 1000 && Math.random() < probability && fireworks) {
    createFirework();
  }
  let alive = [];
  for (let i = 0; i < particles.length; i++) {
    if (particles[i].move()) {
      alive.push(particles[i]);
    }
  }

  particles = alive;
}

function paint() {
  // ctx.fillStyle = "rgba" + getComputedStyle(document.body).backgroundColor.slice(3, -1) + ", 0.2)";
  ctx.clearRect(0, 0, w, h);
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < particles.length; i++) {
    particles[i].draw(ctx);
  }
}

function createFirework(xLocation = undefined, yLocation = undefined) {
  xPoint = xLocation || Math.random() * (w - 200) + 100;
  yPoint = yLocation || Math.random() * (h - 200) + 100;
  let nFire = Math.random() * 50 + 100;
  let c =
    "rgb(" +
    ~~(Math.random() * 200 + 55) +
    "," +
    ~~(Math.random() * 200 + 55) +
    "," +
    ~~(Math.random() * 200 + 55) +
    ")";
  for (let i = 0; i < nFire; i++) {
    let particle = new Particle();
    particle.color = c;
    let vy = Math.sqrt(25 - particle.vx * particle.vx);
    if (Math.abs(particle.vy) > vy) {
      particle.vy = particle.vy > 0 ? vy : -vy;
    }
    particles.push(particle);
  }
}

function Particle() {
  this.w = this.h = Math.random() * 4 + 1;

  this.x = xPoint - this.w / 2;
  this.y = yPoint - this.h / 2;

  this.vx = (Math.random() - 0.5) * 10;
  this.vy = (Math.random() - 0.5) * 10;

  this.alpha = Math.random() * 0.5 + 0.5;

  this.color;
}

Particle.prototype = {
  gravity: 0.05,
  move: function () {
    this.x += this.vx;
    this.vy += this.gravity;
    this.y += this.vy;
    this.alpha -= 0.01;
    if (
      this.x <= -this.w ||
      this.x >= screen.width ||
      this.y >= screen.height ||
      this.alpha <= 0
    ) {
      return false;
    }
    return true;
  },
  draw: function (c) {
    c.save();
    c.beginPath();

    c.translate(this.x + this.w / 2, this.y + this.h / 2);
    c.arc(0, 0, this.w, 0, Math.PI * 2);
    c.fillStyle = this.color;
    c.globalAlpha = this.alpha;

    c.closePath();
    c.fill();
    c.restore();
  },
};
