export const BACKGROUND_COLORS = {
	dimensionalAffordances: '#bacbe9',
	meaningfulMotion: '#904199',
	tangibleSurfaces: '#00a896',
	userInitiatedChange: '#204489',
};

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
