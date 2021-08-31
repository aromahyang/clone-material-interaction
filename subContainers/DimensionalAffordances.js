import { $root, createCanvas, drawCanvas, COLORS } from '../utils/utils.js';

function DimensionalAffordances() {
	const MAX_RECT_WIDTH = 240;
	const COLOR = COLORS.dimensionalAffordances;
	const rectColors = [COLOR.rectangle1, COLOR.rectangle2, COLOR.rectangle3];
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
	const direction = { up: false, down: false };

	/** @type {HTMLCanvasElement} */
	let canvas = null;
	/** @type {CanvasRenderingContext2D} */
	let context = null;
	let movingRect = {};
	let isDragging = false;

	const drawDiamond = ({ p1, p2, p3, p4, color, moving }) => {
		context.fillStyle = color;
		context.beginPath();
		if (!moving) {
			context.moveTo(p1[0], p1[1]);
			context.lineTo(p2[0], p2[1]);
			context.lineTo(p3[0], p3[1]);
			context.lineTo(p4[0], p4[1]);
		} else {}
		context.fill();
	};

	const isInsideDiamond = (mouseX, mouseY) => {
		const { x1, y1, x2, y2, width, height } = rectangles;
		return mouseX >= x1 && mouseX <= x2 + width && mouseY >= y1 - height && mouseY <= y2 + 2 * height;
	};

	const copyMiddleRect = () => {
		movingRect = (({ dx, dy, ...others }) => others)(rectangles);
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

		copyMiddleRect();
		
		const { x1, y1, x2, y2, width, height } = rectangles;
		drawCanvas(context, COLOR.background);
		drawDiamond({
			p1: [x1, y1 + 2 * height],
			p2: [x1 + width, y1 + height],
			p3: [x2 + width, y2 + height],
			p4: [x2, y2 + 2 * height],
			color: rectColors[2],
		});
		drawDiamond({
			p1: [x1, y1 + height],
			p2: [x1 + width, y1],
			p3: [x2 + width, y2],
			p4: [x2, y2 + height],
			color: rectColors[1],
		});
		drawDiamond({
			p1: [x1, y1],
			p2: [x1 + width, y1 - height],
			p3: [x2 + width, y2 - height],
			p4: [x2, y2],
			color: rectColors[0],
		});
	};

	const checkInsideDiamond = (event) => {
		const { offsetX, offsetY } = event;
		isDragging = isInsideDiamond(offsetX, offsetY);
	};

	const handleMouseMove = (event) => {
		const { offsetX, offsetY, movementY } = event;

		$root.className = isInsideDiamond(offsetX, offsetY) ? 'c-slide' : 'c-normal';

		if (!isDragging) {
			return;
		}

		const { y1, y2, height } = rectangles;
		const nextY1 = movingRect.y1 + movementY;
		const nextY2 = movingRect.y2 + movementY;
		if (nextY1 < y1 - height || nextY2 > y2 + height) {
			return;
		}

		movingRect.y1 += movementY;
		movingRect.y2 += movementY;
		direction.up = movingRect.y2 + movingRect.height <= y2 + height / 2;
		direction.down = movingRect.y2 + movingRect.height >= y2 + 2 * height - height / 2;
	};

	const changeColorOrder = () => {
		const temp = rectColors[1];
		rectColors[1] = rectColors[2];
		rectColors[2] = temp;
	};

	const stopDrag = () => {
		isDragging = false;
		copyMiddleRect();

		if (direction.up || direction.down) {
			changeColorOrder();
		}
	};

	const animation = () => {
		const { x1, y1, x2, y2, width, height } = rectangles;
		drawCanvas(context, COLOR.background);
		drawDiamond({
			p1: [x1, y1 + 2 * height],
			p2: [x1 + width, y1 + height],
			p3: [x2 + width, y2 + height],
			p4: [x2, y2 + 2 * height],
			color: rectColors[2],
		});
		if (!isDragging) {
			drawDiamond({
				p1: [x1, y1 + height],
				p2: [x1 + width, y1],
				p3: [x2 + width, y2],
				p4: [x2, y2 + height],
				color: rectColors[1],
			});
		} else {
			drawDiamond({
				p1: [movingRect.x1, movingRect.y1 + movingRect.height],
				p2: [movingRect.x1 + movingRect.width, movingRect.y1],
				p3: [movingRect.x2 + movingRect.width, movingRect.y2],
				p4: [movingRect.x2, movingRect.y2 + movingRect.height],
				color: rectColors[1],
			});
		}
		drawDiamond({
			p1: [x1, y1],
			p2: [x1 + width, y1 - height],
			p3: [x2 + width, y2 - height],
			p4: [x2, y2],
			color: colors[0],
		});
		window.requestAnimationFrame(animation);
	};

	const init = () => {
		createCanvas();
		canvas = document.querySelector('canvas');
		context = canvas.getContext('2d');
		resizeCanvas();

		window.requestAnimationFrame(animation);
	};

	init();

	window.addEventListener('resize', resizeCanvas);
	window.addEventListener('mousedown', checkInsideDiamond);
	window.addEventListener('mousemove', handleMouseMove);
	window.addEventListener('mouseup', stopDrag);
}

export default DimensionalAffordances;
