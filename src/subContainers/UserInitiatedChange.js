import { $root, createCanvas, drawCanvas, renderCloseButton, COLORS } from '../utils/utils.js';

function UserInitiatedChange({ onClose }) {
	const COLOR = COLORS.userInitiatedChange;
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

	const drawCircle = () => {
		context.save();
		const { x, y, r } = circle;
		context.beginPath();
		context.fillStyle = COLOR.circle;
		context.arc(x, y, r, 0, Math.PI * 2, false);
		context.fill();
		context.restore();
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
		drawCanvas(context, COLOR.background);
		drawLines();
		drawCircle();
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

		window.requestAnimationFrame(animation);
	};

	init();

	$root.addEventListener('mousedown', checkMousePosition);
	$root.addEventListener('mousemove', handleMouseMove);
	$root.addEventListener('mouseup', stopDrag);
}

export default UserInitiatedChange;
