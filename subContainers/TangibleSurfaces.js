import { $root, createCanvas, drawCanvas, renderCloseButton, COLORS } from '../utils/utils.js';

function TangibleSurfaces({ onClose }) {
	const COLOR = COLORS.tangibleSurfaces;

	const rect = {
		x: 0,
		y: 0,
		width: Math.round(Math.min(window.innerWidth, window.innerHeight) / 2),
		height: Math.round(Math.min(window.innerWidth, window.innerHeight) / 2),
	};
	const circle = { x: 0, y: 0, vx: 16, vy: 8 };
	const RADIUS = Math.round(rect.width / 4) < 20
		? 20
		: Math.round(rect.width / 4) > 48
			? 48
			: Math.round(rect.width / 4);

	/** @type {HTMLCanvasElement} */
	let canvas = null;
	/** @type {CanvasRenderingContext2D} */
	let context = null;
	let isDragging = false;
	let isResizing = false;

	const drawRect = () => {
		const { x, y, width, height } = rect;
		context.fillStyle = COLOR.rectangle;
		context.fillRect(x, y, width, height);
		context.font = 'bold 18px serif';
		context.fillStyle = COLOR.background;
		context.fillText('\u2921', x + width - 24, y + height - 12);
	}

	const setCirclePosition = (isInitial) => {
		const { innerHeight, innerWidth } = window;

		if (isInitial) {
			const centerX = Math.round(innerWidth / 2);
			const centerY = Math.round(innerHeight / 2);
			const circlePositions = [
				[centerX, RADIUS],
				[centerX, innerHeight - RADIUS],
				[RADIUS, centerY],
				[innerWidth - RADIUS, centerY]
			];
			const index = Math.floor(Math.random() * 4);

			circle.x = circlePositions[index][0];
			circle.y = circlePositions[index][1];

			if (circle.x > innerWidth / 2) {
				circle.vx *= -1;
			}

			if (circle.y > innerHeight / 2) {
				circle.vy *= -1;
			}

			return;
		}

		const nextX = circle.x + circle.vx;
		const nextY = circle.y + circle.vy;

		const doesTouchVerticalWindow = nextX - RADIUS <= 0 || nextX + RADIUS >= innerWidth;
		const doesTouchHorizontalWindow = nextY - RADIUS <= 0 || nextY + RADIUS >= innerHeight;

		if (doesTouchVerticalWindow) {
			circle.vx *= -1;
		}

		if (doesTouchHorizontalWindow) {
			circle.vy *= -1;
		}

		const doesTouchRect = nextX + RADIUS >= rect.x &&
			nextX - RADIUS <= rect.x + rect.width &&
			nextY + RADIUS >= rect.y &&
			nextY - RADIUS <= rect.y + rect.height;

		if (doesTouchRect) {
			const x1 = Math.abs(rect.x - (circle.x + RADIUS));
			const x2 = Math.abs(rect.x + rect.width - (circle.x - RADIUS));
			const y1 = Math.abs(rect.y - (nextY + RADIUS));
			const y2 = Math.abs(rect.y + rect.height - (nextY - RADIUS));
			const min1 = Math.min(x1, x2);
			const min2 = Math.min(y1, y2);
			const min = Math.min(min1, min2);

			if (min === min1) {
				circle.vx *= -1;
			} else if (min === min2) {
				circle.vy *= -1;
			}
		}

		circle.x += circle.vx;
		circle.y += circle.vy;
	};

	const drawCircle = () => {
		context.beginPath();
		context.arc(circle.x, circle.y, RADIUS, 0, Math.PI * 2, false);
		context.fillStyle = COLOR.circle;
		context.fill();
	};

	const isInsideResizeZone = (mouseX, mouseY) => {
		const { x, y, width, height } = rect;

		const bottomRightX = x + width;
		const bottomRightY = y + height;
		const range = 40;

		return mouseX >= bottomRightX - range && mouseX <= bottomRightX && mouseY >= bottomRightY - range && mouseY <= bottomRightY;
	};

	const isInsideRect = (mouseX, mouseY) => {
		const { x, y, width, height } = rect;
		return mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height;
	};

	const checkMousePosition = (event) => {
		const path = event.path ?? event.composedPath();
		if (path.some((p) => p.id && p.id === 'close')) {
			onClose();
			$root.removeEventListener('mousedown', checkMousePosition);
			$root.removeEventListener('mousemove', handleMouseMove);
			$root.removeEventListener('mouseup', stopDrag);
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
		const { width, height } = rect;

		if (width + movementX < MIN_WIDTH || height + movementY < MIN_WIDTH) {
			return;
		}

		rect.width = width + movementX;
		rect.height = height + movementY;

		drawRect();
	};

	const moveRect = (movementX, movementY) => {
		rect.x += movementX;
		rect.y += movementY;
		drawRect();
	};

	const handleMouseMove = (event) => {
		const { offsetX, offsetY, movementX, movementY } = event;

		$root.className = isInsideResizeZone(offsetX, offsetY) ? 'c-resize' : isInsideRect(offsetX, offsetY) ? 'c-move' : 'c-normal';

		if (isResizing) {
			resizeRect(movementX, movementY);
		}

		if (isDragging) {
			moveRect(movementX, movementY);
		}
	};

	const stopDrag = () => {
		isDragging = false;
		isResizing = false;
	};

	const resizeCanvas = () => {
		const { innerWidth, innerHeight } = window;
		canvas.width = innerWidth;
		canvas.height = innerHeight;
		rect.x = Math.floor(innerWidth / 2 - rect.width / 2);
		rect.y = Math.floor(innerHeight / 2 - rect.height / 2);

		drawCanvas(context, COLOR.background);
		drawRect();
		drawCircle();
	};

	const animation = () => {
		setCirclePosition();

		context.clearRect(0, 0, window.innerWidth, window.innerHeight);
		drawCanvas(context, COLOR.background);
		drawRect();
		drawCircle();

		window.requestAnimationFrame(animation);
	};
	
	const init = () => {
		createCanvas();
		canvas = document.querySelector('canvas');
		context = canvas.getContext('2d');
		setCirclePosition(true);
		resizeCanvas();
		renderCloseButton(COLOR.cancel);

		window.requestAnimationFrame(animation);
	};

	init();

	$root.addEventListener('mousedown', checkMousePosition);
	$root.addEventListener('mousemove', handleMouseMove);
	$root.addEventListener('mouseup', stopDrag);
}

export default TangibleSurfaces;
