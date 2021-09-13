import { COLORS, createIndexBox, renderIndexLines } from '../utils/utils.js';

function TangibleSurfacesCard({ $target }) {
	const COLOR = COLORS.tangibleSurfaces;
	const { round } = Math;

	const $div = createIndexBox({ $target, id: 'index-1' });

	$target.appendChild($div);

	const render = ({ ratio, boxWidth, boxHeight }) => {
		const centerX = round(boxWidth / 2);
		const length = round(ratio <= 1 ? boxWidth / 2 : boxHeight / 2);
		const radius = round(ratio <= 1 ? boxWidth / 12 : boxHeight / 12);
		$div.innerHTML = `
		<div class="index-box-con" style="width: 100%; height: 100%; background-color: ${COLOR.background}; transition-duration: 0.3s; opacity: 1; transform: translate(0px, 0px) scale(1, 1);">
			<div class="surface-box" style="width: ${length}px; height: ${length}px; transform: translate(${centerX - round(length / 2)}px, ${round(ratio <= 1 ? boxHeight / 3 - length / 2 : boxHeight / 10)}px);"></div>
			<div class="surface-circle" style="width: ${radius * 2}px; height: ${radius * 2}px; transform: translate(${centerX - radius}px, ${round(ratio <= 1 ? boxHeight * 2 / 3 : boxHeight * 7 / 10)}px);"></div>
		</div>
		${renderIndexLines()}
		`;
	};

	this.resize = () => {
		const { innerHeight, innerWidth } = window;
		const ratio = innerHeight / innerWidth;
		const boxWidth = ratio <= 1 ? round(innerWidth / 2) : innerWidth;
		const boxHeight = ratio <= 1 ? innerHeight : round(innerHeight / 2);
		$div.style.width = `${boxWidth}px`;
		$div.style.height = `${boxHeight}px`;
		render({ ratio, boxWidth, boxHeight });
	};

	this.resize();
}

export default TangibleSurfacesCard;
