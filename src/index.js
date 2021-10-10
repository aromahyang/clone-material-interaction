import {
	TangibleSurfacesCard,
	EmphasizeActionsCard,
	MeaningfulMotionCard,
	UserInitiatedChangeCard,
	DimensionalAffordancesCard,
} from './indexContainers/index.js';
import {
	TangibleSurfaces,
	EmphasizeActions,
	MeaningfulMotion,
	UserInitiatedChange,
	DimensionalAffordances,
} from './subContainers/index.js';
import { $root, COLORS } from './utils/utils.js';

function App() {
	this.index = 0;
	this.indexContainer = {
		tangibleSurfaces: null,
		emphasizeActions: null,
		meaningfulMotion: null,
		userInitiatedChange: null,
		dimensionalAffordances: null,
	};
	this.subContainer = null;

	let $indexContainer = null;
	let $indexCanvas = null;

	const getPosition = () => {
		const { innerWidth, innerHeight } = window;
		const { round } = Math;
		const ratio = innerHeight / innerWidth;
		let x = 0, y = 0;
		if (this.index === 1) {
			x = 40;
			y = 40;
		} else if (this.index === 2) {
			x = ratio <= 1 ? round(innerWidth / 2) + 40 : 40;
			y = ratio <= 1 ? 40 : round(innerHeight / 2) + 40;
		} else if (this.index === 3) {
			x = round(innerWidth / 2) + 40;
			y = round(innerHeight / 2) + 40;
		} else if (this.index === 4) {
			x = ratio <= 1 ? round(innerWidth * 3 / 4) + 40 : round(innerWidth / 2) + 40;
			y = ratio <= 1 ? round(innerHeight / 2) + 40 : round(innerHeight * 3 / 4) + 40;
		} else if (this.index === 5) {
			x = round(innerWidth * 3 / 4) + 40;
			y = round(innerHeight * 3 / 4) + 40;
		}
		return { x, y };
	};

	const renderSubcontainer = () => {
		const close = () => {
			this.subContainer = null;
			this.setIndex(0);
		};
		if (this.index === 1) {
			this.subContainer = new TangibleSurfaces({ onClose: close });
		} else if (this.index === 2) {
			this.subContainer = new EmphasizeActions({ onClose: close });
		} else if (this.index === 3) {
			this.subContainer = new MeaningfulMotion({ onClose: close });
		} else if (this.index === 4) {
			this.subContainer = new UserInitiatedChange({ onClose: close });
		} else if (this.index === 5) {
			this.subContainer = new DimensionalAffordances({ onClose: close });
		}
	};

	const onTransitionEnd = () => {
		$indexContainer.removeEventListener('click', onClickCard);
		$indexCanvas.removeEventListener('transitionend', onTransitionEnd);
		document.querySelector('.index-container').remove();
		renderSubcontainer();
	};

	const renderIndexCanvas = () => {
		const { x, y } = getPosition();
		$indexCanvas = document.createElement('div');
		$indexCanvas.id = 'index-canvas';
		let backgroundColor;
		if (this.index === 1) {
			backgroundColor = COLORS.tangibleSurfaces.background;
		} else if (this.index === 2) {
			backgroundColor = COLORS.emphasizeActions.background;
		} else if (this.index === 3) {
			backgroundColor = COLORS.meaningfulMotion.background;
		} else if (this.index === 4) {
			backgroundColor = COLORS.userInitiatedChange.background;
		} else if (this.index === 5) {
			backgroundColor = COLORS.dimensionalAffordances.background;
		} else {
			backgroundColor = '#fff';
		}
		$indexCanvas.style.backgroundColor = backgroundColor;
		$indexCanvas.style.transform = `translate(${x}px, ${y}px)`;
		$indexCanvas.style.display = 'none';
		$indexContainer.appendChild($indexCanvas);

		$indexCanvas.addEventListener('transitionend', onTransitionEnd);
	};

	this.setIndex = (idx) => {
		this.index = idx;
		this.render();
	};

	const onClickCard = (event) => {
		/**
		 * Chrome, Opera -> event has path property.
		 * Safari, Firefox -> event doesn't have.
		 */
		const path = event.path ?? event.composedPath();
		const id = path[0].id;
		const indexOfDash = id.indexOf('-');
		const index = +id.slice(indexOfDash + 1);
		this.setIndex(index);
		renderIndexCanvas();
	};

	this.render = () => {
		switch (this.index) {
			case 1: {
				this.indexContainer.tangibleSurfaces.disappear();
				break;
			}

			case 2: {
				this.indexContainer.emphasizeActions.disappear();
				break;
			}

			case 3: {
				this.indexContainer.meaningfulMotion.disappear();
				break;
			}

			case 4: {
				this.indexContainer.userInitiatedChange.disappear();
				break;
			}

			case 5: {
				this.indexContainer.dimensionalAffordances.disappear();
				break;
			}

			default: {
				const $subContainer = document.querySelector('.sub-container');
				if ($subContainer) {
					$subContainer.remove();
					document.querySelector('#close').remove();
				}

				// render index containers
				$indexContainer = document.createElement('div');
				$indexContainer.className = 'index-container';
				$indexContainer.style.cursor = 'pointer';
				$root.appendChild($indexContainer);
				$indexContainer.addEventListener('click', onClickCard);
				this.indexContainer = {
					tangibleSurfaces: new TangibleSurfacesCard({ $target: $indexContainer }),
					emphasizeActions: new EmphasizeActionsCard({ $target: $indexContainer }),
					meaningfulMotion: new MeaningfulMotionCard({ $target: $indexContainer }),
					userInitiatedChange: new UserInitiatedChangeCard({ $target: $indexContainer }),
					dimensionalAffordances: new DimensionalAffordancesCard({ $target: $indexContainer }),
				};
			}
		}
	};

	this.render();
	window.addEventListener('resize', () => {
		if (this.index > 0) {
			this.subContainer.resizeCanvas();
			return;
		}
		this.indexContainer.tangibleSurfaces.resize();
		this.indexContainer.emphasizeActions.resize();
		this.indexContainer.meaningfulMotion.resize();
		this.indexContainer.userInitiatedChange.resize();
		this.indexContainer.dimensionalAffordances.resize();
	});
}

new App();
