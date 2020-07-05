const cnvs = document.getElementById('canvas');
const ctx = cnvs.getContext('2d');
const bird = new Image();
const bg = new Image();
const fg = new Image();
const barrierUp = new Image();
const barrierDown = new Image();
let xPos = 5;
let yPos = 200;
let dropSpeed = 1;
const gap = 120;
const pipe = [];
let score = 0;

bird.src = 'img/flappy_bird_bird.png';
bg.src = 'img/flappy_bird_bg.png';
fg.src = 'img/flappy_bird_fg.png';
barrierDown.src = 'img/flappy_bird_pipeBottom.png';
barrierUp.src = 'img/flappy_bird_pipeUp.png';

document.addEventListener('click', moveUp);

function moveUp() {
    yPos -= 35;
}

pipe[0] = {
    x: cnvs.width,
    y: 0
}

function move() {
    ctx.drawImage(bg, 0, 0);

    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(barrierUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(barrierDown, pipe[i].x, pipe[i].y + barrierUp.height + gap);

        pipe[i].x--;

        if (pipe[i].x === 90) {
            pipe.push({
                x: cnvs.width,
                y: Math.floor(Math.random() * barrierUp.height) - barrierUp.height
            });
        }

        if (xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + barrierUp.width &&
            (yPos <= pipe[i].y + barrierUp.height || yPos + bird.height >= pipe[i].y + barrierUp.height + gap) ||
            yPos + bird.height >= cnvs.height - fg.height) {
            location.reload();
        }

        if (pipe[i].x === 5) {
            score++;
        }
    }

    ctx.drawImage(bird, xPos, yPos);
    ctx.drawImage(fg, 0, cnvs.height - fg.height);

    yPos += dropSpeed;

    ctx.fillStyle = '#000';
    ctx.font = '28px Verdana';
    ctx.fillText('Счёт: ' + score, 5, cnvs.height - 15);

    requestAnimationFrame(move);
}

barrierDown.onload = move;