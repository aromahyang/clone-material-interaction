import { COLORS, createIndexBox, renderIndexLines, transformIndexLines } from '../utils/utils.js';

function EmphasizeActionsCard({ $target }) {
	const COLOR = COLORS.emphasizeActions;
	const { round } = Math;

	const $div = createIndexBox({ $target, id: 'index-2', backgroundColor:  COLOR.background });
	let $indexBoxCon = null;

	const render = ({ innerWidth, innerHeight, radius }) => {
		const centerX = round(innerWidth / 4);
		const centerY = round(innerHeight / 4);
		$div.innerHTML = `
		<div id="index-box-con-2" class="index-box-con" style="background-color: ${COLOR.background}; opacity: 1; transform: translate(0px, 0px) scale(1, 1);">
			<div class="action-circle" style="width: ${radius * 2}px; height: ${radius * 2}px; transform: translate(${centerX - radius}px, ${centerY - radius}px);"></div>
			<div class="action-box" style="width: ${round(radius * 2 / 3)}px; height: ${round(radius / 10)}px; transform: translate(${centerX - round(radius / 3)}px, ${centerY - round(radius / 20)}px);"></div>
			<div class="action-box" style="width: ${round(radius / 10)}px; height: ${round(radius * 2 / 3)}px; transform: translate(${centerX - round(radius / 20)}px, ${centerY - round(radius / 3)}px);"></div>
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
		const radius = round(ratio < 1 ? innerHeight / 6 : innerWidth / 6);

		$div.style.width = `${round(innerWidth / 2)}px`;
		$div.style.height = `${round(innerHeight / 2)}px`;
		$div.style.transform = ratio <= 1 ? `translate(${round(innerWidth / 2)}px, 0)` : `translate(0, ${round(innerHeight / 2)}px)`;

		render({ ratio, innerWidth, innerHeight, radius });
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
		$indexBoxCon.removeEventListener('transitionend', onTransitionEnd)
	};

	const init = () => {
		this.resize();
		$indexBoxCon = document.querySelector('#index-box-con-2');
		$indexBoxCon.addEventListener('transitionend', onTransitionEnd);
	};

	init();
}

export default EmphasizeActionsCard;
