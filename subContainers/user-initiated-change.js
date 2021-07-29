import { $root, createCanvas, drawCanvas, BACKGROUND_COLORS } from '../utils/utils.js';

function UserInitiatedChange() {
	const circle = { x: 0, y: 0, r: 60 };

	/** @type {HTMLCanvasElement} */
	let canvas = null;
	/** @type {CanvasRenderingContext2D} */
	let context = null;
	let isDragging = false;

	const isInsideCircle = (mouseX, mouseY) => {
		const { x, y, r } = circle;
		return (mouseX - x) * (mouseX - x) + (mouseY - y) * (mouseY - y) <= r * r;
	};

	const drawCircle = () => {
		const { x, y, r } = circle;
		context.beginPath();
		context.fillStyle = 'rgba(255, 255, 255, 0.12)';
		context.arc(x, y, r, 0, Math.PI * 2, false);
		context.fill();
	};

	const checkInsideCircle = (event) => {
		const { offsetX, offsetY } = event;
		isDragging = isInsideCircle(offsetX, offsetY);
	};

	const resizeCanvas = () => {
		const { innerWidth, innerHeight } = window;
		canvas.width = innerWidth;
		canvas.height = innerHeight;
		if (circle.x + circle.r > innerWidth - 180) {
			circle.x = innerWidth - 180 - circle.r;
		}
		if (innerHeight - (circle.y + circle.r) < 180) {
			circle.y = innerHeight - 180 - circle.r;
		}

		drawCanvas(context, BACKGROUND_COLORS.userInitiatedChange);
		drawCircle();
	};

	const handleMouseMove = (event) => {
		const { offsetX, offsetY, movementX, movementY } = event;
		
		$root.className = isInsideCircle(offsetX, offsetY) ? 'c-move' : 'c-normal';

		if (!isDragging) {
			return;
		}

		circle.x += movementX;
		circle.y += movementY;
		drawCircle();
	};

	const stopDrag = () => {
		isDragging = false;
	};

	const animation = () => {
		drawCanvas(context, BACKGROUND_COLORS.userInitiatedChange);
		drawCircle();
		window.requestAnimationFrame(animation);
	};

	const init = () => {
		createCanvas();
		canvas = document.querySelector('canvas');
		context = canvas.getContext('2d');
		circle.x = window.innerWidth - 180 - circle.r;
		circle.y = Math.round(window.innerHeight / 2);
		resizeCanvas();

		window.requestAnimationFrame(animation);
	};

	init();

	window.addEventListener('resize', resizeCanvas);
	window.addEventListener('mousedown', checkInsideCircle);
	window.addEventListener('mousemove', handleMouseMove);
	window.addEventListener('mouseup', stopDrag);
}

export default UserInitiatedChange;
