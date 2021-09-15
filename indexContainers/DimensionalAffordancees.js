import { COLORS, createIndexBox, renderIndexLines } from '../utils/utils.js';

function DimensionalAffordancesCard({ $target }) {
	const COLOR = COLORS.dimensionalAffordances;
	const { round } = Math;

	const $div = createIndexBox({ $target, id: 'index-5', backgroundColor:  COLOR.background });

	const drawDiamond = ({ context, p1, p2, p3, p4, color }) => {
		context.fillStyle = color;
		context.beginPath();
		context.moveTo(p1[0], p1[1]);
		context.lineTo(p2[0], p2[1]);
		context.lineTo(p3[0], p3[1]);
		context.lineTo(p4[0], p4[1]);
		context.fill();
	};

	const render = ({ boxWidth, boxHeight }) => {
		$div.innerHTML = `
		<div class="index-box-con" style="background-color: ${COLOR.background}; opacity: 1; transform: translate(0px, 0px) scale(1, 1);">
			<canvas id="dimensional-affordances-card" class="motion-canvas" width="${boxWidth}" height="${boxHeight}"></canvas>
		</div>
		${renderIndexLines()}
		`;

		const $canvas = document.querySelector('#dimensional-affordances-card');
		const context = $canvas.getContext('2d');

		// render diamonds
		const x = [round(boxWidth / 6), round(boxWidth / 2), round(boxWidth * 5 / 6)];
		const y = [round(boxHeight / 6), round(boxHeight / 3), round(boxHeight / 2), round(boxHeight * 2 / 3), round(boxHeight * 5 / 6)];
		drawDiamond({
			context,
			p1: [x[0], y[3]],
			p2: [x[1], y[4]],
			p3: [x[2], y[3]],
			p4: [x[1], y[2]],
			color: COLOR.rectangle3,
		});
		drawDiamond({
			context,
			p1: [x[0], y[2]],
			p2: [x[1], y[3]],
			p3: [x[2], y[2]],
			p4: [x[1], y[1]],
			color: COLOR.rectangle2,
		});
		drawDiamond({
			context,
			p1: [x[0], y[1]],
			p2: [x[1], y[2]],
			p3: [x[2], y[1]],
			p4: [x[1], y[0]],
			color: COLOR.rectangle1,
		});
	};

	this.resize = () => {
		const { innerHeight, innerWidth } = window;
		const boxWidth = round(innerWidth / 4);
		const boxHeight = round(innerHeight / 4);

		$div.style.width = `${boxWidth}px`;
		$div.style.height = `${boxHeight}px`;
		$div.style.transform = `translate(${round(innerWidth * 3 / 4)}px, ${innerHeight * 3 / 4}px)`;

		render({ boxWidth, boxHeight });
	};

	this.resize();
}

export default DimensionalAffordancesCard;
