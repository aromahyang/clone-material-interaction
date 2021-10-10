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
		cancel: '#1f4388',
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

/* related to SubContainers */

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
		<span style="background-color: ${color};"></span>
		<i></i>
	</div>
	`);
}

function handleMouseOverButton(event) {
	const path = event.path ?? event.composedPath();
	const $close = path[1];
	$close.classList.toggle('rotate');
	$close.style.transform = 'scale(1.3, 1.3) rotate(360deg)';
}

function handleMouseOutButton(event) {
	const path = event.path ?? event.composedPath();
	const $close = path[1];
	$close.classList.toggle('rotate');
	$close.style.transform = 'scale(1, 1) rotate(0deg)';
}

function handleTransitionEnd(event) {
	const $close = event.target;
	$close.classList.toggle('rotate');
}

export function addCloseButtonEventListener($element) {
	$element.addEventListener('mouseover', handleMouseOverButton);
	$element.addEventListener('mouseout', handleMouseOutButton);
	$element.addEventListener('transitionend', handleTransitionEnd);
}

export function removeCloseButtonEventListener($element) {
	$element.removeEventListener('mouseover', handleMouseOverButton);
	$element.removeEventListener('mouseout', handleMouseOutButton);
	$element.removeEventListener('transitionend', handleTransitionEnd);
}

/* related to IndexContainer */

export function createIndexBox({ $target, id, backgroundColor }) {
	const $div = document.createElement('div');
	$div.id = id;
	$div.className = 'index-box';
	$div.style.backgroundColor = backgroundColor;

	$target.appendChild($div);
	return $div;
}

export function renderIndexLines() {
	return `
	<div id="index-line-0" class="index-line"></div>
	<div id="index-line-1" class="index-line"></div>
	<div id="index-line-2" class="index-line"></div>
	<div id="index-line-3" class="index-line"></div>
	`;
}

export function removeIndexContainer() {
	document.querySelector('.index-container').remove();
}

export function transformIndexLines($div) {
	const lines = $div.querySelectorAll('.index-line');
	lines.forEach((line) => {
		line.style.transform = 'translate(0, 0)';
	});
};
