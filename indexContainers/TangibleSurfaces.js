import { COLORS, createIndexBox, renderIndexLines, transformIndexLines } from '../utils/utils.js';

function TangibleSurfacesCard({ $target }) {
	const COLOR = COLORS.tangibleSurfaces;
	const { round } = Math;

	const $div = createIndexBox({ $target, id: 'index-1', backgroundColor:  COLOR.background });
	let $indexBoxCon = null;

	const render = ({ ratio, boxWidth, boxHeight }) => {
		const centerX = round(boxWidth / 2);
		const length = round(ratio <= 1 ? boxWidth / 2 : boxHeight / 2);
		const radius = round(ratio <= 1 ? boxWidth / 12 : boxHeight / 12);
		$div.innerHTML = `
		<div id="index-box-con-1" class="index-box-con" style="background-color: ${COLOR.background}; opacity: 1; transform: translate(0px, 0px) scale(1, 1);">
			<div class="surface-box" style="width: ${length}px; height: ${length}px; transform: translate(${centerX - round(length / 2)}px, ${round(ratio <= 1 ? boxHeight / 3 - length / 2 : boxHeight / 10)}px);"></div>
			<div class="surface-circle" style="width: ${radius * 2}px; height: ${radius * 2}px; transform: translate(${centerX - radius}px, ${round(ratio <= 1 ? boxHeight * 2 / 3 : boxHeight * 7 / 10)}px);"></div>
		</div>
		${renderIndexLines()}
		`;
	};

	this.disappear = () => {
		transformIndexLines($div);
		$indexBoxCon.style.opacity = 0;
		$indexBoxCon.style.transform = `translate(0px, 0px) scale(0.9, 0.9)`;
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

	const init = () => {
		this.resize();
		$indexBoxCon = document.querySelector('#index-box-con-1');
		$indexBoxCon.addEventListener('transitionend', (e) => {
			if (e.propertyName !== 'transform') {
				return;
			}

			const canvasWidth = $div.clientWidth - 80;
			const canvasHeight = $div.clientHeight - 80;
			const widthRatio = Math.ceil(window.innerWidth / canvasWidth);
			const heightRatio = Math.ceil(window.innerHeight / canvasHeight);
			const $indexCanvas = document.querySelector('#index-canvas');
			$indexCanvas.style.display = 'block';
			$indexCanvas.style.width = `${$div.clientWidth - 80}px`; // I don't know why `${canvasWidth}px` doesn't evoke transition..
			$indexCanvas.style.height = `${$div.clientHeight - 80}px`;
			$indexCanvas.style.transform = `${$indexCanvas.style.transform} scale(${widthRatio * 2}, ${heightRatio * 2})`;
		});
	};

	init();
}

export default TangibleSurfacesCard;
