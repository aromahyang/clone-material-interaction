import { COLORS, createIndexBox, renderIndexLines } from '../utils/utils.js';

function UserInitiatedChangeCard({ $target }) {
	const COLOR = COLORS.userInitiatedChange;
	const { round } = Math;

	const $div = createIndexBox({ $target, id: 'index-4', backgroundColor:  COLOR.background });

	const render = ({ ratio, boxWidth, boxHeight }) => {
		$div.innerHTML = `
		<div class="index-box-con" style="background-color: ${COLOR.background}; opacity: 1; transform: translate(0px, 0px) scale(1, 1);">
			<canvas id="user-initiated-change-card" class="motion-canvas" width="${boxWidth}" height="${boxHeight}"></canvas>
		</div>
		${renderIndexLines()}
		`;

		const $canvas = document.querySelector('#user-initiated-change-card');
		const context = $canvas.getContext('2d');

		const radius = round(ratio <= 1 ? boxHeight / 4 : boxWidth / 4);
		const margin = round(ratio <= 1 ? boxWidth / 10 : boxHeight / 10);
		const circle = {
			x: ratio <= 1 ? boxWidth - margin - radius : round(boxWidth / 2),
			y: ratio <= 1 ? round(boxHeight / 2) : boxHeight - margin - radius,
		};

		// render lines
		const gap = 24;
		const columns = round(boxWidth / gap);
		const rows = round(boxHeight / gap);
		for (let i = 0; i < columns; i++) {
			for (let j = 0; j < rows; j++) {
				const iv = gap / 2 + i * gap;
				const jv = gap / 2 + j * gap;
				const angle = Math.atan2(jv - circle.y, iv - circle.x);
				context.save();
				context.translate(iv, jv);
				context.rotate(angle);
				context.beginPath();
				context.strokeStyle = COLOR.line;
				context.lineWidth = 3;
				context.lineCap = 'round';
				context.moveTo(-6, 0);
				context.lineTo(6, 0);
				context.stroke();
				context.restore();
			}
		}

		// render circle
		context.beginPath();
		context.fillStyle = COLOR.circle;
		context.arc(circle.x, circle.y, radius, Math.PI * 2, false);
		context.fill();
	};

	this.resize = () => {
		const { innerHeight, innerWidth } = window;
		const ratio = innerHeight / innerWidth;
		const boxWidth = round(innerWidth / 4);
		const boxHeight = round(innerHeight / 4);

		$div.style.width = `${boxWidth}px`;
		$div.style.height = `${boxHeight}px`;
		$div.style.transform = ratio <= 1 ? `translate(${round(innerWidth * 3 / 4)}px, ${innerHeight / 2}px)` : `translate(${round(innerWidth / 2)}px, ${round(innerHeight * 3 / 4)}px)`;

		render({ ratio, boxWidth, boxHeight });
	};

	this.resize();
}

export default UserInitiatedChangeCard;
