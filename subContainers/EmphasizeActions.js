import { $root, createCanvas, drawCanvas, renderCloseButton, COLORS } from '../utils/utils.js';

function EmphasizeActions({ onClose }) {
	const COLOR = COLORS.emphasizeActions;
	const circles = [{ x: 0, y: 0, r: 0 }];
	/** @type {HTMLCanvasElement} */
	let canvas = null;
	/** @type {CanvasRenderingContext2D} */
	let context = null;

	const drawCircles = () => {
		circles.forEach((c) => {
			context.beginPath();
			context.fillStyle = COLOR.circle;
			context.arc(c.x, c.y, c.r, Math.PI * 2, false);
			context.fill();
		});
	};

	const checkMousePosition = (event) => {
		const path = event.path ?? event.composedPath();
		if (path.some((p) => p.id && p.id === 'close')) {
			onClose();
			$root.removeEventListener('mousedown', checkMousePosition);
			return;
		}
	
		const { offsetX, offsetY } = event;
	};

	this.resizeCanvas = () => {
		const { innerWidth, innerHeight } = window;
		canvas.width = innerWidth;
		canvas.height = innerHeight;
		circles[0].x = Math.round(innerWidth / 2);
		circles[0].y = Math.round(innerHeight / 2);
		circles[0].r = Math.round(1 * Math.min(innerHeight, innerWidth) / 3);

		drawCanvas(context, COLOR.background);
	};

	const animation = () => {
		drawCanvas(context, COLOR.background);
		drawCircles();
		window.requestAnimationFrame(animation);
	};

	const init = () => {
		createCanvas();
		canvas = document.querySelector('canvas');
		context = canvas.getContext('2d');
		this.resizeCanvas();
		renderCloseButton(COLOR.cancel);

		window.requestAnimationFrame(animation);
	};

	init();

	$root.addEventListener('mousedown', checkMousePosition);
}

export default EmphasizeActions;
