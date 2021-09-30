import {
	$root,
	createCanvas,
	drawCanvas,
	renderCloseButton,
	addCloseButtonEventListener,
	removeCloseButtonEventListener,
	COLORS,
} from '../utils/utils.js';

function Rectangle(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	this.draw = (context) => {
		context.fillStyle = COLORS.meaningfulMotion.rectangle;
		context.fillRect(this.x, this.y, this.w, this.h);
	};
}

function Light(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	this.draw = (context, rect) => {
		const gradient = context.createLinearGradient(rect.x, 0, this.x + this.w, this.y + this.h);
		gradient.addColorStop(0, 'rgba(229, 88, 95, 1)');
		gradient.addColorStop(1, 'rgba(229, 88, 95, 0)');
		context.fillStyle = gradient;
		context.beginPath();
	
		if (rect.x <= this.x) {
			context.moveTo(rect.x, rect.y + rect.h);
			context.lineTo(this.x, this.y + this.h);
			context.lineTo(this.x + this.w, this.y);
			context.lineTo(rect.x + rect.w, rect.y);
		} else {
			context.moveTo(rect.x, rect.y);
			context.lineTo(this.x, this.y);
			context.lineTo(this.x + this.w, this.y + this.h);
			context.lineTo(rect.x + rect.w, rect.y + rect.h);
		}
		context.fill();
	};
}

function MeaningfulMotion({ onClose }) {
	const COLOR = COLORS.meaningfulMotion;
	const rect = new Rectangle(60, 60, 200, 200);
	const light = new Light(0, 0, 200, 200);

	/** @type {HTMLCanvasElement} */
	let canvas = null;
	/** @type {CanvasRenderingContext2D} */
	let context = null;
	let $close = null;
	let isDragging = false;
	let doesClickCloseButton = false;

	this.resizeCanvas = () => {
		const { innerWidth, innerHeight } = window;
		canvas.width = innerWidth;
		canvas.height = innerHeight;

		light.x = Math.round(Math.abs(innerWidth - light.w) / 2);
		light.y = innerHeight;

		drawCanvas(context, COLOR.background);
		light.draw(context, rect);
		rect.draw(context);
	};

	const isInside = (mouseX, mouseY) => {
		const { x, y, w, h } = rect;
		return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
	};

	const onMouseDownHandler = (event) => {
		const path = event.path ?? event.composedPath();
		if (path.some((p) => p.id && p.id === 'close')) {
			doesClickCloseButton = true;
			return;
		}
	
		const { offsetX, offsetY } = event;
		isDragging = isInside(offsetX, offsetY);
	};

	const onMouseMoveHandler = (event) => {
		if (doesClickCloseButton) {
			return;
		}

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
	
		drawCanvas(context, COLOR.background);
		light.draw(context, rect);
		/**
		 * TODO: 사각형 크기 조절
		 */
		rect.draw(context);
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

	const init = () => {
		createCanvas();
		canvas = document.querySelector('canvas');
		context = canvas.getContext('2d');
		this.resizeCanvas();
		renderCloseButton(COLOR.cancel);
		$close = document.querySelector('#close');
		addCloseButtonEventListener($close);
	};

	init();
	
	$root.addEventListener('mousedown', onMouseDownHandler);
	$root.addEventListener('mousemove', onMouseMoveHandler);
	$root.addEventListener('mouseup', onMouseUpHandler);
}

export default MeaningfulMotion;
