import { COLORS } from '../utils/utils.js';

function EmphasizeActionsCard({ $target }) {
	const COLOR = COLORS.emphasizeActions;
	const { round } = Math;

	const $div = document.createElement('div');
	$div.id = 'index-2';
	$div.className = 'index-box';

	$target.appendChild($div);

	const render = ({ innerWidth, innerHeight, radius }) => {
		const centerX = round(innerWidth / 4);
		const centerY = round(innerHeight / 4);
		$div.innerHTML = `
		<div class="index-box-con" style="background-color: ${COLOR.background}; transition-duration: 0.3s; opacity: 1; transform: translate(0px, 0px) scale(1, 1);">
			<div class="action-circle" style="width: ${radius * 2}px; height: ${radius * 2}px; transform: translate(${centerX - radius}px, ${centerY - radius}px);"></div>
			<div class="action-box" style="width: ${radius}px; height: 8px; transform: translate(${centerX - round(radius / 2)}px, ${centerY - 4}px);"></div>
			<div class="action-box" style="width: 8px; height: ${radius}px; transform: translate(${centerX - 4}px, ${centerY - round(radius / 2)}px);"></div>
		</div>
		`;
	};

	this.resize = () => {
		const { innerHeight, innerWidth } = window;
		let radius = round(innerWidth / 8);

		$div.style.width = `${round(innerWidth / 2)}px`;
		$div.style.height = `${round(innerHeight / 2)}px`;
		if (innerWidth >= 636) {
			$div.style.transform = `translate(${round(innerWidth / 2)}px, 0)`;
		} else {
			radius = radius < 70 ? 70 : radius;
			$div.style.transform = `translate(0, ${round(innerHeight / 2)}px)`;
		}
		render({ innerWidth, innerHeight, radius });
	};

	this.resize();
}

export default EmphasizeActionsCard;
