import { $root, createCanvas, drawCanvas, COLORS } from '../utils/utils.js';

function EmphasizeActions() {
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

	const animation = () => {
		drawCanvas(context, COLOR.background.emphasizeActions);
		drawCircles();
		window.requestAnimationFrame(animation);
	};

	const init = () => {
		const { innerWidth, innerHeight } = window;

		createCanvas();
		canvas = document.querySelector('canvas');
		canvas.width = innerWidth;
		canvas.height = innerHeight;
		context = canvas.getContext('2d');

		circles[0].x = Math.round(innerWidth / 2);
		circles[0].y = Math.round(innerHeight / 2);
		circles[0].r = Math.round(1 * Math.min(innerHeight, innerWidth) / 3);

		window.requestAnimationFrame(animation);
	};

	init();
}

export default EmphasizeActions;
