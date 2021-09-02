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
		cancel: '#fcb447',
	},
	dimensionalAffordances: {
		background: '#bacbe9',
		rectangle1: '#fff',
		rectangle2: '#ee4a7f',
		rectangle3: '#1f4288',
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

export function createIndexBox({ $target, id }) {
	const $div = document.createElement('div');
	$div.id = id;
	$div.className = 'index-box';

	$target.appendChild($div);
	return $div;
}
