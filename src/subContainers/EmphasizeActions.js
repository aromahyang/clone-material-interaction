import {
	$root,
	createCanvas,
	drawCanvas,
	renderCloseButton,
	addCloseButtonEventListener,
	removeCloseButtonEventListener,
	COLORS,
} from '../utils/utils.js';

function Ball(x, y, r, vx, vy, color) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.vx = vx;
	this.vy = vy;
	this.color = color;
	this.visible = true;

	this.draw = (context) => {
		context.save();
		context.fillStyle = this.color;
		context.beginPath();
		context.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
		context.fill();
		context.restore();

		const length = Math.round(2 * this.r / 3);
		const halfLength = Math.round(this.r / 3)
		const thickness = Math.round(this.r / 10) < 2 ? 2 : Math.round(this.r / 10);
		const halfThickness = Math.round(thickness / 2);
		context.save();
		context.fillStyle = '#fff';
		context.fillRect(this.x - halfLength, this.y - halfThickness, length, thickness);
		context.fillRect(this.x - halfThickness, this.y - halfLength, thickness, length);
		context.restore();
	};
}

const initialColor = {
	background: COLORS.emphasizeActions.background,
	circle: COLORS.emphasizeActions.circle,
};

function EmphasizeActions({ onClose }) {
	const COLOR = COLORS.emphasizeActions;
	let currentColor = { ...initialColor };
	let circles = [
		[new Ball(0, 0, 0, 0, 0, currentColor.circle)],
		[],
		[],
		[],
		[]
	];
	/** @type {HTMLCanvasElement} */
	let canvas = null;
	/** @type {CanvasRenderingContext2D} */
	let context = null;
	let $close = null;

	const reset = () => {
		if (currentColor.background === COLOR.background) {
			currentColor = { background: COLOR.circle, circle: COLOR.background };
		} else {
			currentColor = { ...initialColor };
		}
		circles = [
			[new Ball(0, 0, 0, 0, 0, currentColor.circle)],
			[],
			[],
			[],
			[]
		];
		const { innerWidth, innerHeight } = window;
		circles[0][0].x = Math.round(innerWidth / 2);
		circles[0][0].y = Math.round(innerHeight / 2);
		circles[0][0].r = Math.round(1 * Math.min(innerHeight, innerWidth) / 3);
	};

	const divideCircle = (index1, index2) => {
		const target = circles[index1][index2];
		const { x, y, r } = target;
		const halfRadius = Math.round(r / 2);
		const newCircle1 = new Ball(x, y, halfRadius, 3, 6, currentColor.circle);
		const newCircle2 = new Ball(x, y, halfRadius, 6, 3, currentColor.circle);

		target.visible = false;
		circles[index1 + 1].push(newCircle1);
		circles[index1 + 1].push(newCircle2);
	};

	const checkBounceOff = (circle) => {
		const { innerWidth, innerHeight } = window;

		if (circle.x - circle.r <= 0 || circle.x + circle.r >= innerWidth) {
			circle.vx *= -1;
		}

		if (circle.y - circle.r <= 0 || circle.y + circle.r >= innerHeight) {
			circle.vy *= -1;
		}
		
		return circle;
	};

	const rotate = (x, y, sin, cos, reverse) => {
		return {
			x: reverse ? (x * cos + y * sin) : (x * cost - y * sin),
			y: reverse ? (y * cos - x * sin) : (y * cos + x * sin),
		};
	};

	const checkCollision = (circle1, circle2) => {
		const dx = circle1.x - circle2.x;
		const dy = circle1.y - circle2.y;
		const dist = Math.sqrt(dx ** 2 + dy ** 2);

		if (dist > circle1.r + circle2.r) {
			return;
		}

		const angle = Math.atan2(dy, dx);
		const sin = Math.sin(angle);
		const cos = Math.cos(angle);
		const pos1 = { x: 0, y: 0}; // rotate circle1's position
		const pos2 = rotate(dx, dy, sin, cos, true);
		const vel1 = rotate(circle1.vx, circle1.vy, sin, cos, true);
		const vel2 = rotate(circle2.vx, circle2.vy, sin, cos, true);
	};

	const onClickHandler = (event) => {
		const path = event.path ?? event.composedPath();
		if (path.some((p) => p.id && p.id === 'close')) {
			onClose();
			$root.removeEventListener('click', onClickHandler);
			removeCloseButtonEventListener($close);
			return;
		}
	
		const { offsetX, offsetY } = event;
		let breakFlag = false;
		for (let i = 0; i < circles.length; i++) {
			for (let j = 0; j < circles[i].length; j++) {
				const c = circles[i][j];
				if (!c.visible) {
					continue;
				}

				const isInsideCircle = (offsetX - c.x) ** 2 + (offsetY - c.y) ** 2 <= c.r ** 2;
				if (isInsideCircle) {
					breakFlag = true;
					if (i === 4) {
						reset();
					} else {
						divideCircle(i, j);
					}
					break;
				}
			}

			if (breakFlag) {
				break;
			}
		}
	};

	const onMouseoverHandler = () => {
		//
	};

	const onMouseoutHandler = () => {
		//
	};

	this.resizeCanvas = () => {
		const { innerWidth, innerHeight } = window;
		canvas.width = innerWidth;
		canvas.height = innerHeight;
		// TODO: resize할 때 원들의 크기 조절
		circles[0][0].x = Math.round(innerWidth / 2);
		circles[0][0].y = Math.round(innerHeight / 2);
		circles[0][0].r = Math.round(1 * Math.min(innerHeight, innerWidth) / 3);

		drawCanvas(context, currentColor.background);
	};

	const animation = () => {
		drawCanvas(context, currentColor.background);
		circles.forEach((list) => {
			list.forEach((circle) => {
				if (circle.visible) {
					circle.draw(context);
					checkBounceOff(circle);
					circle.x += circle.vx;
					circle.y += circle.vy;
				}
			});
		});
		window.requestAnimationFrame(animation);
	};

	const init = () => {
		createCanvas();
		canvas = document.querySelector('canvas');
		context = canvas.getContext('2d');
		this.resizeCanvas();
		renderCloseButton(COLOR.cancel);
		$close = document.querySelector('#close');
		addCloseButtonEventListener($close);

		window.requestAnimationFrame(animation);
	};

	init();

	$root.addEventListener('click', onClickHandler);
}

export default EmphasizeActions;
