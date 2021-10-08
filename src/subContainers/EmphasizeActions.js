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
	let balls = [
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
		balls = [
			[new Ball(0, 0, 0, 0, 0, currentColor.circle)],
			[],
			[],
			[],
			[]
		];
		const { innerWidth, innerHeight } = window;
		balls[0][0].x = Math.round(innerWidth / 2);
		balls[0][0].y = Math.round(innerHeight / 2);
		balls[0][0].r = Math.round(1 * Math.min(innerHeight, innerWidth) / 3);
	};

	const divideCircle = (target, mousePosition, index1) => {
		const halfRadius = Math.round(target.r / 2);
		const newCircle1 = new Ball(
			mousePosition.x - halfRadius - 1,
			mousePosition.y,
			halfRadius,
			6,
			3,
			currentColor.circle
		);
		const newCircle2 = new Ball(
			mousePosition.x + halfRadius,
			mousePosition.y,
			halfRadius,
			3,
			6,
			currentColor.circle
		);

		target.visible = false;
		balls[index1 + 1].push(newCircle1);
		balls[index1 + 1].push(newCircle2);
	};

	const checkWallBounce = (ball) => {
		const { innerWidth, innerHeight } = window;

		if (ball.x - ball.r <= 0 || ball.x + ball.r >= innerWidth) {
			ball.vx *= -1;
		}

		if (ball.y - ball.r <= 0 || ball.y + ball.r >= innerHeight) {
			ball.vy *= -1;
		}
		
		return ball;
	};

	const checkCollision = (ball1, ball2) => {};

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
		for (let i = 0; i < balls.length; i++) {
			for (let j = 0; j < balls[i].length; j++) {
				const c = balls[i][j];
				if (!c.visible) {
					continue;
				}

				const isInsideCircle = (offsetX - c.x) ** 2 + (offsetY - c.y) ** 2 <= c.r ** 2;
				if (isInsideCircle) {
					breakFlag = true;
					if (i === 4) {
						reset();
					} else {
						divideCircle(balls[i][j], { x: offsetX, y: offsetY }, i);
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
		balls[0][0].x = Math.round(innerWidth / 2);
		balls[0][0].y = Math.round(innerHeight / 2);
		balls[0][0].r = Math.round(1 * Math.min(innerHeight, innerWidth) / 3);

		drawCanvas(context, currentColor.background);
	};

	const animation = () => {
		drawCanvas(context, currentColor.background);
		// move
		balls.forEach((list) => {
			list.forEach((ball) => {
				if (ball.visible) {
					ball.x += ball.vx;
					ball.y += ball.vy;
					checkWallBounce(ball);
				}
			});
		});
		// check collision
		// balls.forEach((list, i) => {
		// 	list.forEach((ball1, j) => {
		// 		if (!ball1.visible) {
		// 			return;
		// 		}

		// 		for (let k = 0, l = 0; k < balls.length && l < list.length; k++, l++) {
		// 			if (k === i && j === l) {
		// 				continue;
		// 			}
		// 			const ball2 = balls[k][l];
		// 			if (ball2 && ball2.visible) {
		// 				checkCollision(ball1, ball2);
		// 			}
		// 		}
		// 	});
		// });
		// draw
		balls.forEach((list) => {
			list.forEach((ball) => {
				if (ball.visible) {
					ball.draw(context);
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
