const canvas = document.getElementById("viewport");
const context = canvas.getContext("2d");

const timeText = document.getElementById("time");
const scoreText = document.getElementById("score");

const backgroundImage = new Image();
backgroundImage.src = "img/background_600.jpg";

const alien = {
	image: new Image(),
	position: { x: 300, y: 300 }
};
alien.image.src = "img/alien.png";

const star = {
	image: new Image(),
	position: { x: 0, y: 0 }
};
star.image.src = "img/star_35.png";
moveStar();

const movementSpeed = 5;
const keyPressed = {};

var score = 0;
var time = 20;

var lastTimestamp = Date.now();

document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);

(function onFrame() {
	context.clearRect(0, 0, canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height);
	gameLoop();

	if (time > 0) {
		timeText.textContent = "Time: " + time;
	} else {
		timeText.textContent = "GAME OVER!";
		timeText.style.color = "#a50303";
	}

	scoreText.textContent = "Score: " + score;

	if (time > 0) {
		window.requestAnimationFrame(onFrame);
	}
})();

function gameLoop() {
	if ((Date.now() - lastTimestamp) > 1000) {
		lastTimestamp = Date.now();
		Math.max(time--, 0);
	}

	moveAlien();
	catchStar();
	draw();
}

function draw() {
	context.drawImage(backgroundImage, 0, 0);
	context.drawImage(star.image, star.position.x, star.position.y);
	context.drawImage(alien.image, alien.position.x, alien.position.y);
}

function moveStar() {
	star.position.x = Math.random() * 560;
	star.position.y = Math.random() * 560;
}

function catchStar() {
	if (intersect(star, alien)) {
		score++;
		moveStar();
	}
}

function moveAlien() {
	var originalPosition = {
		x: alien.position.x,
		y: alien.position.y
	};

	if (keyPressed[40] /* down */) {
		alien.position.y += movementSpeed;
	} 
	if (keyPressed[39] /* right */) {
		alien.position.x += movementSpeed;
	} 
	if (keyPressed[37] /* left  */) {
		alien.position.x -= movementSpeed;
	} 
	if (keyPressed[38] /* up */) {
		alien.position.y -= movementSpeed;
	}

	if (isOutOfViewPort()) {
		alien.position = originalPosition;
	}
}

function onKeyDown(e) {
	if (e.keyCode === 40 /* down */) {
		keyPressed[40] = true;
	} else if (e.keyCode === 39 /* right */) {
		keyPressed[39] = true;
	} else if (e.keyCode === 37 /* left  */) {
		keyPressed[37] = true;
	} else if (e.keyCode === 38 /* up */) {
		keyPressed[38] = true;
	}
}

function onKeyUp(e) {
	if (e.keyCode === 40 /* down */) {
		keyPressed[40] = false;
	} else if (e.keyCode === 39 /* right */) {
		keyPressed[39] = false;
	} else if (e.keyCode === 37 /* left  */) {
		keyPressed[37] = false;
	} else if (e.keyCode === 38 /* up */) {
		keyPressed[38] = false;
	}
}

function isOutOfViewPort() {
	var topLeft = { x: 0, y: 0 };
	var bottomRight = { x: backgroundImage.width, y: backgroundImage.height };

	function isPointInRectangle(point) {
		return point.x > topLeft.x && point.x < bottomRight.x
				&& point.y > topLeft.y && point.y < bottomRight.y;
	}

	return !isPointInRectangle(alien.position)
			|| !isPointInRectangle({
					x: alien.position.x + alien.image.width,
					y: alien.position.y + alien.image.height
				})
			|| !isPointInRectangle({
					x: alien.position.x + alien.image.width,
					y: alien.position.y
				})
			|| !isPointInRectangle({
					x: alien.position.x,
					y: alien.position.y + alien.image.height
				});
}

function intersect(star, alien) {
	var topLeft = alien.position;
	var bottomRight = {
		x: alien.position.x + alien.image.width,
		y: alien.position.y + alien.image.height
	};

	function isPointInRectangle(point) {
		return point.x > topLeft.x && point.x < bottomRight.x
				&& point.y > topLeft.y && point.y < bottomRight.y;
	}

	return isPointInRectangle(star.position)
			|| isPointInRectangle({
					x: star.position.x + star.image.width,
					y: star.position.y + star.image.height
				})
			|| isPointInRectangle({
					x: star.position.x + star.image.width,
					y: star.position.y
				})
			|| isPointInRectangle({
					x: star.position.x,
					y: star.position.y + star.image.height
				});
}
