import { createIndexBox, renderIndexLines, transformIndexLines } from '../utils/utils.js';
import { COLORS } from '../utils/themes.js';

function MeaningfulMotionCard({ $target }) {
	const COLOR = COLORS.meaningfulMotion;
	const { round } = Math;

	const $div = createIndexBox({ $target, id: 'index-3', backgroundColor:  COLOR.background });
	let $indexBoxCon = null;

	this.disappear = () => {
		transformIndexLines($div);
		$indexBoxCon.style.opacity = 0;
		$indexBoxCon.style.transform = `translate(0px, 0px) scale(0.9, 0.9)`;
	};

	const render = ({ ratio, boxWidth, boxHeight }) => {
		const length = round(ratio <= 1 ? boxWidth / 3 : boxHeight / 3);
		const margin = round(ratio <= 1 ? boxWidth / 10 : boxHeight / 10);
		$div.innerHTML = `
		<div id="index-box-con-3" class="index-box-con" style="background-color: ${COLOR.background}; opacity: 1; transform: translate(0px, 0px) scale(1, 1);">
			<div class="motion-box" style="width: ${length}px; height: ${length}px; transform: translate(${margin}px, ${margin}px);"></div>
			<canvas id="meaningful-motion-card" class="motion-canvas" width="${boxWidth}" height="${boxHeight}"></canvas>
		</div>
		${renderIndexLines()}
		`;

		const $canvas = document.querySelector('#meaningful-motion-card');
		const context = $canvas.getContext('2d');

		// render light
		const gradient = context.createLinearGradient(margin, margin, boxWidth, boxHeight);
		gradient.addColorStop(0, 'rgba(229, 88, 95, 1)');
		gradient.addColorStop(1, 'rgba(229, 88, 95, 0)');
		context.fillStyle = gradient;
		context.beginPath();
		context.moveTo(margin, margin + length);
		context.lineTo(boxWidth, boxHeight + length);
		context.lineTo(boxWidth + length, boxHeight);
		context.lineTo(margin + length, margin);
		context.fill();
	};

	this.resize = () => {
		const { innerHeight, innerWidth } = window;
		const ratio = innerHeight / innerWidth;
		const boxWidth = round(ratio <= 1 ? innerWidth / 4 : innerWidth / 2);
		const boxHeight = round(ratio <= 1 ? innerHeight / 2 : innerHeight / 4);

		$div.style.width = `${round(boxWidth)}px`;
		$div.style.height = `${round(boxHeight)}px`;
		$div.style.transform = `translate(${round(innerWidth / 2)}px, ${round(innerHeight / 2)}px)`;

		render({ ratio, boxWidth, boxHeight });
	};

	const onTransitionEnd = (event) => {
		if (event.propertyName !== 'transform') {
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
		$indexBoxCon.removeEventListener('transitionend', onTransitionEnd);
	};

	const init = () => {
		this.resize();
		$indexBoxCon = document.querySelector('#index-box-con-3');
		$indexBoxCon.addEventListener('transitionend', onTransitionEnd);
	};

	init();
}

export default MeaningfulMotionCard;
