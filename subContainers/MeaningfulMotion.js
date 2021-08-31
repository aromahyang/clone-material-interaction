import { $root, createCanvas, drawCanvas, COLORS } from '../utils/utils.js';

function MeaningfulMotion() {
	const COLOR = COLORS.meaningfulMotion;
	const rect = {
		x: 60,
		y: 60,
		width: 200,
		height: 200,
	};
	const light = {
		x: 0,
		y: 0,
		width: 200,
		height: 200,
	};

	/** @type {HTMLCanvasElement} */
	let canvas = null;
	/** @type {CanvasRenderingContext2D} */
	let context = null;
	let isDragging = false;

	const drawRect = () => {
		const { x, y, width, height } = rect;
		context.fillStyle = COLOR.rectangle;
		context.fillRect(x, y, width, height);
	};

	const drawLight = () => {
		const gradient = context.createLinearGradient(rect.x, 0, light.x + light.width, light.y + light.height);
		gradient.addColorStop(0, 'rgba(229, 88, 95, 1)');
		gradient.addColorStop(1, 'rgba(229, 88, 95, 0)');
		context.fillStyle = gradient;
		context.beginPath();
	
		if (rect.x <= light.x) {
			context.moveTo(rect.x, rect.y + rect.height);
			context.lineTo(light.x, light.y + light.height);
			context.lineTo(light.x + light.width, light.y);
			context.lineTo(rect.x + rect.width, rect.y);
		} else {
			context.moveTo(rect.x, rect.y);
			context.lineTo(light.x, light.y);
			context.lineTo(light.x + light.width, light.y + light.height);
			context.lineTo(rect.x + rect.width, rect.y + rect.height);
		}
		context.fill();
	};

	const resizeCanvas = () => {
		const { innerWidth, innerHeight } = window;
		canvas.width = innerWidth;
		canvas.height = innerHeight;

		light.x = Math.round(Math.abs(innerWidth - light.width) / 2);
		light.y = innerHeight;

		drawCanvas(context, COLOR.background.meaningfulMotion);
		drawLight();
		drawRect();
	};

	const isInside = (mouseX, mouseY) => {
		const { x, y, width, height } = rect;
		return mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height;
	};

	const checkInsideRect = (event) => {
		const { offsetX, offsetY } = event;
	
		isDragging = isInside(offsetX, offsetY);
	};

	const moveRectAndLight = (event) => {
		const { movementX, movementY, offsetX, offsetY } = event;

		if (isInside(offsetX, offsetY)) {
			$root.className = 'c-move';
		} else {
			$root.className = 'c-normal';
		}

		if (!isDragging) {
			return;
		}

		rect.x += movementX;
		rect.y += movementY;
	
		drawCanvas(context, COLOR.background.meaningfulMotion);
		drawLight();
		/**
		 * TODO: 사각형 크기 조절
		 */
		drawRect();
	};

	const stopDrag = () => {
		isDragging = false;
	};

	const init = () => {
		createCanvas();
		canvas = document.querySelector('canvas');
		context = canvas.getContext('2d');
		resizeCanvas();
	};

	init();
	
	window.addEventListener('resize', resizeCanvas);
	window.addEventListener('mousedown', checkInsideRect);
	window.addEventListener('mousemove', moveRectAndLight);
	window.addEventListener('mouseup', stopDrag);
}

export default MeaningfulMotion;
