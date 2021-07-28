import { $root } from '../utils/constants.js';

function MeaningfulMotion() {
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

	const createCanvas = () => {
		const $subContainer = document.createElement('div');
		const $canvas = document.createElement('canvas');

		$subContainer.id = 'sub-container';
		$subContainer.style = '100%';
		$subContainer.style.height = '100%';
		$canvas.style.width = '100%';
		$canvas.style.height = '100%';

		$subContainer.appendChild($canvas);
		$root.appendChild($subContainer);
	};

	const drawCanvas = () => {
		context.fillStyle = '#904199';
		context.fillRect(0, 0, innerWidth, innerHeight);
	};

	const drawRect = () => {
		const { x, y, width, height } = rect;
		context.fillStyle = '#FFFFFF';
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

		drawCanvas();
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
		// const { x, y, width, height } = rect;
	
		// context.clearRect(x, y, width, height);
		rect.x += movementX;
		rect.y += movementY;
	
		drawCanvas();
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
