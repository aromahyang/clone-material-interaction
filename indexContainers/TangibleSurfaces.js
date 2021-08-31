import { COLORS } from '../utils/utils.js';

function TangibleSurfaces({ $target }) {
	const COLOR = COLORS.tangibleSurfaces;
	const round = (exp) => {
		return Math.round(exp);
	};

	const { innerHeight, innerWidth } = window;
	const length = round(innerWidth / 4);
	const radius = 40;

	const $div = document.createElement('div');
	$div.id = 'index-0';
	$div.className = 'index-box';
	$div.style.width = `${round(innerWidth / 2)}px`;
	$div.style.height = `${innerHeight}px`;

	$div.innerHTML = `
	<div class="index-box-con" style="width: 100%; height: 100%; background-color: ${COLOR.background}; transition-duration: 0.3s; opacity: 1; transform: translate(0px, 0px) scale(1, 1);">
		<div class="surface-box" style="width: ${length}px; height: ${length}px; transform: translate(${round(length / 2)}px, ${round(length / 2)}px); background: ${COLOR.rectangle};"></div>
		<div class="surface-circle" style="width: ${radius * 2}px; height: ${radius * 2}px; transform: translate(${length - radius}px, ${round(innerHeight / 4)}px); border-radius: ${radius}px; background: ${COLOR.circle}"></div>
	</div>
	`;

	$target.appendChild($div);
}

export default TangibleSurfaces;
