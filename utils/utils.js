export const COLORS = {
	tangibleSurfaces: {
		background: '#00a896',
		circle: '#FCB447',
		rectangle: '#fff',
		cancel: '#ef4d80',
	},
	emphasizeActions: {
		background: '#ea1b75',
		circle: '#fcb447',
		cancel: '#fcb447',
	},
	meaningfulMotion: {
		background: '#904199',
		rectangle: '#fff',
		cancel: '#00a896',
	},
	userInitiatedChange: {
		background: '#204489',
		circle: 'rgba(255, 255, 255, 0.12)',
		line: '#d24b80',
		cancel: '#1f4388',
	},
	dimensionalAffordances: {
		background: '#bacbe9',
		rectangle1: '#fff',
		rectangle2: '#1f4288',
		rectangle3: '#ee4a7f',
		cancel: '#904199',
	},
}

export const $root = document.querySelector('#root');

export function createCanvas() {
	const $subContainer = document.createElement('div');
	$subContainer.className = 'sub-container';
	const $canvas = document.createElement('canvas');
	$canvas.style.width = '100%';
	$canvas.style.height = '100%';

	$subContainer.appendChild($canvas);
	$root.appendChild($subContainer);
}

export function drawCanvas(context, color) {
	context.fillStyle = color;
	context.fillRect(0, 0, window.innerWidth, window.innerHeight);
};

export function renderCloseButton(color) {
	$root.insertAdjacentHTML('beforeend', `
	<div id="close">
		<span style="background-color: ${color}; transform: matrix(1, 0, 0, 1, 0, 0);"></span>
		<i style="transform: matrix(1, 0, 0, 1, 0, 0);"></i>
	</div>
	`);
}
