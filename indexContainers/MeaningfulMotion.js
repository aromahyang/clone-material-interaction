import { COLORS, createIndexBox, renderIndexLines } from '../utils/utils.js';

function MeaningfulMotionCard({ $target }) {
	const COLOR = COLORS.meaningfulMotion;
	const { round } = Math;

	const $div = createIndexBox({ $target, id: 'index-3' });

	$target.appendChild($div);

	const render = ({ ratio, boxWidth, boxHeight }) => {
		const length = round(ratio <= 1 ? boxWidth / 3 : boxHeight / 3);
		const margin = round(ratio <= 1 ? boxWidth / 10 : boxHeight / 10);
		$div.innerHTML = `
		<div class="index-box-con" style="background-color: ${COLOR.background}; transition-duration: 0.3s; opacity: 1; transform: translate(0px, 0px) scale(1, 1);">
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

	this.resize();
}

export default MeaningfulMotionCard;
