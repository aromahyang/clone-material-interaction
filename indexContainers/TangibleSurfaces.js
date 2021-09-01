import { COLORS } from '../utils/utils.js';

function TangibleSurfacesCard({ $target }) {
	const COLOR = COLORS.tangibleSurfaces;
	const { round } = Math;

	const $div = document.createElement('div');
	$div.id = 'index-1';
	$div.className = 'index-box';

	$target.appendChild($div);

	const render = ({ innerWidth, innerHeight, length, radius }) => {
		const centerX = innerWidth >= 636 ? round(innerWidth / 4) : round(innerWidth / 2);
		const centerY = innerWidth >= 636 ? round(innerHeight / 2) : round(innerHeight / 4);
		$div.innerHTML = `
		<div class="index-box-con" style="width: 100%; height: 100%; background-color: ${COLOR.background}; transition-duration: 0.3s; opacity: 1; transform: translate(0px, 0px) scale(1, 1);">
			<div class="surface-box" style="width: ${length}px; height: ${length}px; transform: translate(${centerX - round(length / 2)}px, ${centerY - length}px);"></div>
			<div class="surface-circle" style="width: ${radius * 2}px; height: ${radius * 2}px; transform: translate(${centerX - radius}px, ${innerWidth >= 636 ? centerY + round(innerHeight / 5) : round(innerHeight / 2 - innerHeight / 6)}px);"></div>
		</div>
		`;
	};

	this.resize = () => {
		const { innerHeight, innerWidth } = window;
		const length = round(innerWidth / 4);
		let radius = 27;
		if (innerWidth >= 636) {
			$div.style.width = `${round(innerWidth / 2)}px`;
			$div.style.height = `${innerHeight}px`;
			radius = 27 + Math.floor((innerWidth - 636) / 12);
		} else {
			$div.style.width = `${innerWidth}px`;
			$div.style.height = `${round(innerHeight / 2)}px`;
		}
		render({ innerWidth, innerHeight, length, radius });
	};

	this.resize();
}

export default TangibleSurfacesCard;
