import {
	$root,
	createCanvas,
	drawCanvas,
	renderCloseButton,
	addCloseButtonEventListener,
	removeCloseButtonEventListener,
	COLORS,
} from '../utils/utils.js';

function Ball(x, y, r, vx, vy) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.vx = vx;
	this.vy = vy;

	this.draw = (context) => {
		context.beginPath();
		context.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
		context.fillStyle = COLORS.tangibleSurfaces.circle;
		context.fill();
	};
}

function Rectangle(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	this.draw = (context) => {
		context.fillStyle = COLORS.tangibleSurfaces.rectangle;
		context.fillRect(this.x, this.y, this.w, this.h);
		context.font = 'bold 18px serif';
		context.fillStyle = COLORS.tangibleSurfaces.background;
		context.fillText('\u2921', this.x + this.w - 24, this.y + this.h - 12);
	};
}

function TangibleSurfaces({ onClose }) {
	const COLOR = COLORS.tangibleSurfaces;
	const rect = new Rectangle(0, 0, 1, 1);
	const ball = new Ball(0, 0, 1, 16, 8);

	/** @type {HTMLCanvasElement} */
	let canvas = null;
	/** @type {CanvasRenderingContext2D} */
	let context = null;
	let $close = null;
	let isDragging = false;
	let isResizing = false;
	let doesClickCloseButton = false;

	const setCirclePosition = () => {
		const { innerHeight, innerWidth } = window;

		const doesTouchVerticalWindow = ball.x - ball.r <= 0 || ball.x + ball.r >= innerWidth;
		const doesTouchHorizontalWindow = ball.y - ball.r <= 0 || ball.y + ball.r >= innerHeight;

		if (doesTouchVerticalWindow) {
			ball.vx *= -1;
		}

		if (doesTouchHorizontalWindow) {
			ball.vy *= -1;
		}

		const doesTouchRect = ball.x + ball.r >= rect.x &&
			ball.x - ball.r <= rect.x + rect.w &&
			ball.y + ball.r >= rect.y &&
			ball.y - ball.r <= rect.y + rect.h;
		const doesOverlapRect = ball.x + ball.r > rect.x &&
			ball.x - ball.r < rect.x + rect.w &&
			ball.y + ball.r > rect.y &&
			ball.y - ball.r < rect.y + rect.h;

		if (doesTouchRect) {
			const x1 = Math.abs(rect.x - (ball.x + ball.r));
			const x2 = Math.abs(rect.x + rect.w - (ball.x - ball.r));
			const y1 = Math.abs(rect.y - (ball.y + ball.r));
			const y2 = Math.abs(rect.y + rect.h - (ball.y - ball.r));
			const min1 = Math.min(x1, x2);
			const min2 = Math.min(y1, y2);
			const min = Math.min(min1, min2);

			if (min === min1) {
				ball.vx *= -1;
			} else if (min === min2) {
				ball.vy *= -1;
			}
		}

		ball.x += ball.vx;
		ball.y += ball.vy;
	};

	const isInsideResizeZone = (mouseX, mouseY) => {
		const { x, y, w, h } = rect;

		const bottomRightX = x + w;
		const bottomRightY = y + h;
		const range = 40;

		return mouseX >= bottomRightX - range && mouseX <= bottomRightX && mouseY >= bottomRightY - range && mouseY <= bottomRightY;
	};

	const isInsideRect = (mouseX, mouseY) => {
		const { x, y, w, h } = rect;
		return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
	};

	const onMouseDownHandler = (event) => {
		const path = event.path ?? event.composedPath();
		if (path.some((p) => p.id && p.id === 'close')) {
			doesClickCloseButton = true;
			return;
		}

		const { offsetX, offsetY } = event;
		if (isInsideResizeZone(offsetX, offsetY)) {
			isResizing = true;
			return;
		}

		isDragging = isInsideRect(offsetX, offsetY);
	};

	const resizeRect = (movementX, movementY) => {
		const MIN_WIDTH = 80;
		const { w, h } = rect;

		if (w + movementX < MIN_WIDTH || h + movementY < MIN_WIDTH) {
			return;
		}

		rect.w = w + movementX;
		rect.h = h + movementY;

		rect.draw(context);
	};

	const moveRect = (movementX, movementY) => {
		rect.x += movementX;
		rect.y += movementY;
		rect.draw(context);
	};

	const onMouseMoveHandler = (event) => {
		if (doesClickCloseButton) {
			return;
		}

		const { offsetX, offsetY, movementX, movementY } = event;

		$root.className = isInsideResizeZone(offsetX, offsetY) ? 'c-resize' : isInsideRect(offsetX, offsetY) ? 'c-move' : 'c-normal';

		if (isResizing) {
			resizeRect(movementX, movementY);
		}

		if (isDragging) {
			moveRect(movementX, movementY);
		}
	};

	const onMouseUpHandler = (event) => {
		const path = event.path ?? event.composedPath();
		if (path.some((p) => p.id && p.id === 'close') && doesClickCloseButton) {
			onClose();
			$root.removeEventListener('mousedown', onMouseDownHandler);
			$root.removeEventListener('mousemove', onMouseMoveHandler);
			$root.removeEventListener('mouseup', onMouseUpHandler);
			removeCloseButtonEventListener($close);
			return;
		}

		isDragging = false;
		isResizing = false;
		doesClickCloseButton = false;
	};

	this.resizeCanvas = () => {
		const { innerWidth, innerHeight } = window;
		canvas.width = innerWidth;
		canvas.height = innerHeight;
		rect.x = Math.floor(innerWidth / 2 - rect.w / 2);
		rect.y = Math.floor(innerHeight / 2 - rect.h / 2);

		drawCanvas(context, COLOR.background);
		rect.draw(context);
		ball.draw(context);
	};

	const animation = () => {
		setCirclePosition();

		context.clearRect(0, 0, window.innerWidth, window.innerHeight);
		drawCanvas(context, COLOR.background);
		rect.draw(context);
		ball.draw(context);

		window.requestAnimationFrame(animation);
	};
	
	const init = () => {
		createCanvas();
		canvas = document.querySelector('canvas');
		context = canvas.getContext('2d');

		const length = Math.round(Math.min(window.innerWidth, window.innerHeight) / 3);
		rect.w = length;
		rect.h = length;

		if (Math.round(length / 4) < 20) {
			ball.r = 20;
		} else if (Math.round(length / 4) > 48) {
			ball.r = 48;
		} else {
			ball.r = Math.round(length / 4);
		}
		const centerX = Math.round(innerWidth / 2);
		const centerY = Math.round(innerHeight / 2);
		const circlePositions = [
			[centerX, ball.r * 2],
			[centerX, innerHeight - ball.r * 2],
			[ball.r * 2, centerY],
			[innerWidth - ball.r * 2, centerY]
		];
		const index = Math.floor(Math.random() * 4);
		ball.x = circlePositions[index][0];
		ball.y = circlePositions[index][1];
		if (index === 1) {
			ball.vy *= -1;
		} else if (index === 3) {
			ball.vx *= -1;
		}

		this.resizeCanvas();
		renderCloseButton(COLOR.cancel);
		$close = document.querySelector('#close');
		addCloseButtonEventListener($close);

		animation();
	};

	init();

	$root.addEventListener('mousedown', onMouseDownHandler);
	$root.addEventListener('mousemove', onMouseMoveHandler);
	$root.addEventListener('mouseup', onMouseUpHandler);
}

export default TangibleSurfaces;
