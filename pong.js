const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

// Create the paddle
const paddleWidth = 10, paddleHeight = 100;
const player = { x: 0, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, color: "white", dy: 0 };
const computer = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, color: "white", dy: 5 };

// Create the ball
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 5,
    velocityX: 5,
    velocityY: 5,
    color: "white"
};

function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}

function drawNet() {
    for (let i = 0; i <= canvas.height; i += 15) {
    drawRect(canvas.width / 2 - 1, i, 2, 10, "gray");
    }
}

function drawText(text, x, y) {
    ctx.fillStyle = "white";
    ctx.font = "32px Arial";
    ctx.fillText(text, x, y);
}

function render() {
    drawRect(0, 0, canvas.width, canvas.height, "#000");
    drawNet();
    drawText(player.score || 0, canvas.width / 4, 50);
    drawText(computer.score || 0, 3 * canvas.width / 4, 50);
    drawRect(player.x, player.y, player.width, player.height, player.color);
    drawRect(computer.x, computer.y, computer.width, computer.height, computer.color);
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 5;
}

function collision(b, p) {
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - ball.radius;
    b.bottom = b.y + ball.radius;
    b.left = b.x - ball.radius;
    b.right = b.x + ball.radius;

    return (
    b.right > p.left && b.top < p.bottom && b.left < p.right && b.bottom > p.top
    );
}

function update() {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    player.y += player.dy

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.velocityY = -ball.velocityY;
    }

    let playerOrComputer = ball.x < canvas.width / 2 ? player : computer;

    if (collision(ball, playerOrComputer)) {
    let collidePoint = ball.y - (playerOrComputer.y + playerOrComputer.height / 2);
    collidePoint = collidePoint / (playerOrComputer.height / 2);

    let angleRad = collidePoint * (Math.PI / 4);
    let direction = ball.x < canvas.width / 2 ? 1 : -1;

    ball.velocityX = direction * ball.speed * Math.cos(angleRad);
    ball.velocityY = ball.speed * Math.sin(angleRad);

    ball.speed += 0.5;
    }

    // Score update
    if (ball.x - ball.radius < 0) {
    computer.score = (computer.score || 0) + 1;
    resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
    player.score = (player.score || 0) + 1;
    resetBall();
    }

    // Simple AI
    computer.y += ((ball.y - (computer.y + computer.height / 2)))*0.1;
}

// Player controls
document.addEventListener("keydown", event => {
    if (event.key === "w")player.dy=-5;
    if (event.key === "s")player.dy=5;
});
document.addEventListener("keyup", event => {
    if (event.key === "w") player.dy=0;
    if (event.key === "s")player.dy=0;
});

canvas.addEventListener("touchstart", function(e) {
    e.preventDefault();
    const touch = e.touches[0];
    player.y = touch.clientY - player.height;
})
canvas.addEventListener("touchmove", function(e) {
    e.preventDefault();
    const touch = e.touches[0];
    player.y = touch.clientY - player.height;
})

function game() {
    update();
    render();
}
function start_game(){
    setInterval(game, 1000 / 60);
}
render()