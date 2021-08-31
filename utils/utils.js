export const COLORS = {
	dimensionalAffordances: {
		background: '#bacbe9',
		rectangle1: '#fff',
		rectangle2: '#1f4288',
		rectangle3: '#ee4a7f',
	},
	meaningfulMotion: {
		background: '#904199',
		rectangle: '#fff',
	},
	tangibleSurfaces: {
		background: '#00a896',
		circle: '#FCB447',
		rectangle: '#fff',
	},
	userInitiatedChange: {
		background: '#204489',
		circle: 'rgba(255, 255, 255, 0.12)',
		line: '#d24b80',
	},
	emphasizeActions: {
		background: '#ea1b75',
		circle: '#fcb447',
	}
}

export const $root = document.querySelector('#root');

export function createCanvas() {
	const $subContainer = document.createElement('div');
	const $canvas = document.createElement('canvas');

	$subContainer.id = 'sub-container';
	$subContainer.style = '100%';
	$subContainer.style.height = '100%';
	$canvas.style.width = '100%';
	$canvas.style.height = '100%';

	$subContainer.appendChild($canvas);
	$root.appendChild($subContainer);
}

export function drawCanvas(context, color) {
	context.fillStyle = color;
	context.fillRect(0, 0, window.innerWidth, window.innerHeight);
};
