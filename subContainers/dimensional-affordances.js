import { createCanvas, drawCanvas, BACKGROUND_COLORS } from '../utils/utils.js';

function DimensionalAffordances() {
	/** @type {HTMLCanvasElement} */
	let canvas = null;
	/** @type {CanvasRenderingContext2D} */
	let context = null;

	const init = () => {
		createCanvas();
		canvas = document.querySelector('canvas');
		context = canvas.getContext('2d');
		drawCanvas(context, BACKGROUND_COLORS.dimensionalAffordances);
	};

	init();
}

export default DimensionalAffordances;
