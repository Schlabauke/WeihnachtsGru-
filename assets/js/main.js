console.log('Utinni')
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let particlesOnScreen = 295
let particleArray = []
let w, h;
w = canvas.width = window.innerWidth;
h = canvas.height = window.innerHeight;

function randomSnow(min, max) {
    return min = Math.random() * (max - min + 1);
};
function clientResize(ev) {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
};
window.addEventListener('resize', clientResize)

function createSnowFlakes() {
    for (let i = 0; i < particlesOnScreen; i++) {
        particleArray.push({
            x: Math.random() * w,
            y: Math.random() * h,
            opacity: Math.random(),
            speedX: randomSnow(-11, 11),
            speedY: randomSnow(7, 15),
            radius: randomSnow(0.5, 4.2)
        })
    }
};

function drawSnowFlakes() {
    for (let i = 0; i < particleArray.length; i++) {
        let gradient = ctx.createRadialGradient(
            particleArray[i].x,
            particleArray[i].y,
            0,
            particleArray[i].x,
            particleArray[i].y,
            particleArray[i].radius
        );
        gradient.addColorStop(0, 'rgba(255,255,255,' + particleArray[i].opacity + ')'); //white
        gradient.addColorStop(0, 'rgba(210,236,242,' + particleArray[i].opacity + ')'); //bluish
        gradient.addColorStop(0, 'rgba(237,247,249,' + particleArray[i].opacity + ')'); //lighter bluish

        ctx.beginPath();
        ctx.arc(
            particleArray[i].x,
            particleArray[i].y,
            particleArray[i].radius,
            0,
            Math.PI * 2,
            false
        );
        ctx.fillStyle = gradient;
        ctx.fill();
    }
};
function moveSnowFlakes() {
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].x += particleArray[i].speedX;
        particleArray[i].y += particleArray[i].speedY;
        if (particleArray[i].y > h) {
            particleArray[i].x = Math.random() * w * 1.5;
            particleArray[i].y = -50
        }
    }
};

function updateSnowFall() {
    ctx.clearRect(0, 0, w, h);
    drawSnowFlakes();
    moveSnowFlakes()
};
setInterval(updateSnowFall, 40);
createSnowFlakes();