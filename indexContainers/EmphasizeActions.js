import { COLORS, createIndexBox, renderIndexLines } from '../utils/utils.js';

function EmphasizeActionsCard({ $target }) {
	const COLOR = COLORS.emphasizeActions;
	const { round } = Math;

	const $div = createIndexBox({ $target, id: 'index-2', backgroundColor:  COLOR.background });

	const render = ({ innerWidth, innerHeight, radius }) => {
		const centerX = round(innerWidth / 4);
		const centerY = round(innerHeight / 4);
		$div.innerHTML = `
		<div class="index-box-con" style="background-color: ${COLOR.background}; opacity: 1; transform: translate(0px, 0px) scale(1, 1);">
			<div class="action-circle" style="width: ${radius * 2}px; height: ${radius * 2}px; transform: translate(${centerX - radius}px, ${centerY - radius}px);"></div>
			<div class="action-box" style="width: ${round(radius * 2 / 3)}px; height: ${round(radius / 10)}px; transform: translate(${centerX - round(radius / 3)}px, ${centerY - round(radius / 20)}px);"></div>
			<div class="action-box" style="width: ${round(radius / 10)}px; height: ${round(radius * 2 / 3)}px; transform: translate(${centerX - round(radius / 20)}px, ${centerY - round(radius / 3)}px);"></div>
		</div>
		${renderIndexLines()}
		`;
	};

	this.resize = () => {
		const { innerHeight, innerWidth } = window;
		const ratio = innerHeight / innerWidth;
		const radius = round(ratio < 1 ? innerHeight / 6 : innerWidth / 6);

		$div.style.width = `${round(innerWidth / 2)}px`;
		$div.style.height = `${round(innerHeight / 2)}px`;
		$div.style.transform = ratio <= 1 ? `translate(${round(innerWidth / 2)}px, 0)` : `translate(0, ${round(innerHeight / 2)}px)`;

		render({ ratio, innerWidth, innerHeight, radius });
	};

	this.resize();
}

export default EmphasizeActionsCard;
