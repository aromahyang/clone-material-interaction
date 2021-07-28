import { createCanvas, drawCanvas, BACKGROUND_COLORS } from '../utils/utils.js';

function DimensionalAffordances() {
	const MAX_RECT_WIDTH = 240;
	const rectangles = {
		x1: 0,
		y1: 0,
		x2: 0,
		y2: 0,
		width: MAX_RECT_WIDTH,
		height: MAX_RECT_WIDTH / 2,
		dx: 20,
		dy: 40,
	}; // rectangles for middle diamond

	/** @type {HTMLCanvasElement} */
	let canvas = null;
	/** @type {CanvasRenderingContext2D} */
	let context = null;

	const drawDiamond = ({ p1, p2, p3, p4, color }) => {
		context.fillStyle = color;
		context.beginPath();
		context.moveTo(p1[0], p1[1]);
		context.lineTo(p2[0], p2[1]);
		context.lineTo(p3[0], p3[1]);
		context.lineTo(p4[0], p4[1]);
		context.fill();
	};

	const resizeCanvas = () => {
		const { innerWidth, innerHeight } = window;
		canvas.width = innerWidth;
		canvas.height = innerHeight;

		if (innerWidth <= MAX_RECT_WIDTH * 2 + rectangles.dx) {
			rectangles.width = (innerWidth - rectangles.dx) / 2;
			rectangles.height = Math.round(rectangles.width / 2);
		} else {
			rectangles.width = MAX_RECT_WIDTH;
			rectangles.height = MAX_RECT_WIDTH / 2;
		}

		const centerX = Math.round(innerWidth / 2);
		const centerY = Math.round(innerHeight / 2);
		rectangles.x1 = centerX - rectangles.dx / 2 - rectangles.width;
		rectangles.y1 = centerY - rectangles.dy / 2 - rectangles.height;
		rectangles.x2 = centerX + rectangles.dx / 2;
		rectangles.y2 = centerY + rectangles.dy / 2;

		const { x1, y1, x2, y2, width, height } = rectangles;
		drawCanvas(context, BACKGROUND_COLORS.dimensionalAffordances);
		drawDiamond({
			p1: [x1, y1 + 2 * height],
			p2: [x1 + width, y1 + height],
			p3: [x2 + width, y2 + height],
			p4: [x2, y2 + 2 * height],
			color: '#ee4a7f',
		});
		drawDiamond({
			p1: [x1, y1 + height],
			p2: [x1 + width, y1],
			p3: [x2 + width, y2],
			p4: [x2, y2 + height],
			color: '#1f4288',
		});
		drawDiamond({
			p1: [x1, y1],
			p2: [x1 + width, y1 - height],
			p3: [x2 + width, y2 - height],
			p4: [x2, y2],
			color: '#fff',
		});
	};

	const handleMouseMove = (event) => {
		const { offsetX, offsetY } = event;
	};

	const init = () => {
		createCanvas();
		canvas = document.querySelector('canvas');
		context = canvas.getContext('2d');
		resizeCanvas();
	};

	init();

	window.addEventListener('resize', resizeCanvas);
	window.addEventListener('mousedown', () => {});
	window.addEventListener('mousemove', handleMouseMove);
	window.addEventListener('mouseup', () => {});
}

export default DimensionalAffordances;
