import {
	$root,
	createCanvas,
	drawCanvas,
	renderCloseButton,
	addCloseButtonEventListener,
	removeCloseButtonEventListener,
	COLORS,
} from '../utils/utils.js';

function Circle(x, y, r) {
	this.x = x;
	this.y = y;
	this.r = r;

	this.draw = (context) => {
		context.save();
		context.beginPath();
		context.fillStyle = COLORS.userInitiatedChange.circle;
		context.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
		context.fill();
		context.restore();
	};
}

function UserInitiatedChange({ onClose }) {
	const COLOR = COLORS.userInitiatedChange;
	const circle = new Circle(0, 0, 60);

	/** @type {HTMLCanvasElement} */
	let canvas = null;
	/** @type {CanvasRenderingContext2D} */
	let context = null;
	let $close = null;
	let isDragging = false;
	let doesClickCloseButton = false;

	const isInsideCircle = (mouseX, mouseY) => {
		const { x, y, r } = circle;
		return (mouseX - x) * (mouseX - x) + (mouseY - y) * (mouseY - y) <= r * r;
	};

	const drawLines = () => {
		const { innerHeight, innerWidth } = window;
		const gap = 40;
		const columns = Math.round(innerWidth / gap);
		const rows = Math.round(innerHeight / gap);
		for (let i = 0; i < columns; i++) {
			for (let j = 0; j < rows; j++) {
				const iv = 20 + i * gap;
				const jv = 20 + j * gap;
				const angle = Math.atan2(jv - circle.y, iv - circle.x);
				context.save();
				context.translate(iv, jv);
				context.rotate(angle);
				context.beginPath();
				context.strokeStyle = COLOR.line;
				context.lineWidth = 3;
				context.lineCap = 'round';
				context.moveTo(-12, 0);
				context.lineTo(12, 0);
				context.stroke();
				context.restore();
			}
		}
	};

	const onMouseDownHandler = (event) => {
		const path = event.path ?? event.composedPath();
		if (path.some((p) => p.id && p.id === 'close')) {
			doesClickCloseButton = true;
			return;
		}

		const { offsetX, offsetY } = event;
		isDragging = isInsideCircle(offsetX, offsetY);
	};

	this.resizeCanvas = () => {
		const { innerWidth, innerHeight } = window;
		canvas.width = innerWidth;
		canvas.height = innerHeight;
		if (circle.x + circle.r > innerWidth - 180) {
			circle.x = innerWidth - 180 - circle.r;
		}
		if (innerHeight - (circle.y + circle.r) < 180) {
			circle.y = innerHeight - 180 - circle.r;
		}

		drawCanvas(context, COLOR.background);
		drawLines();
		circle.draw(context);
	};

	const onMouseMoveHandler = (event) => {
		if (doesClickCloseButton) {
			return;
		}

		const { offsetX, offsetY, movementX, movementY } = event;
		
		$root.className = isInsideCircle(offsetX, offsetY) ? 'c-move' : 'c-normal';

		if (!isDragging) {
			return;
		}

		circle.x += movementX;
		circle.y += movementY;
		circle.draw(context);
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
		doesClickCloseButton = false;
	};

	const animation = () => {
		drawCanvas(context, COLOR.background);
		drawLines();
		circle.draw(context);
		window.requestAnimationFrame(animation);
	};

	const init = () => {
		const { innerWidth, innerHeight } = window;
		createCanvas();
		canvas = document.querySelector('canvas');
		canvas.width = innerWidth;
		canvas.height = innerHeight;
		context = canvas.getContext('2d');
		circle.x = innerWidth - 180 - circle.r;
		circle.y = Math.round(innerHeight / 2);
		renderCloseButton(COLOR.cancel);
		$close = document.querySelector('#close');
		addCloseButtonEventListener($close);

		window.requestAnimationFrame(animation);
	};

	init();

	$root.addEventListener('mousedown', onMouseDownHandler);
	$root.addEventListener('mousemove', onMouseMoveHandler);
	$root.addEventListener('mouseup', onMouseUpHandler);
}

export default UserInitiatedChange;
