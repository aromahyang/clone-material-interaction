import {
	TangibleSurfacesCard,
	EmphasizeActionsCard,
	MeaningfulMotionCard,
	UserInitiatedChangeCard,
	DimensionalAffordancesCard,
} from './indexContainers/index.js';
import {
	TangibleSurfaces,
	MeaningfulMotion,
	UserInitiatedChange,
	DimensionalAffordances,
} from './subContainers/index.js';
import { $root, COLORS } from './utils/utils.js';

function App() {
	this.index = 0;
	this.tangibleSurfacesCard = null;
	this.emphasizeActionsCard = null;
	this.meaningfulMotionCard = null;
	this.userInitiatedChangeCard = null;
	this.dimensionalAffordancesCard = null;

	let $indexContainer = null;
	let $indexCanvas = null;

	const getPosition = () => {
		const { innerWidth, innerHeight } = window;
		const ratio = innerHeight / innerWidth;
		let x = 0, y = 0;
		if (this.index === 1) {
			x = 40;
			y = 40;
		} else if (this.index === 2) {
			x = ratio >= 1 ? Math.round(innerWidth / 2) + 40 : 40;
			y = ratio >= 1 ? 40 : Math.round(innerHeight / 2) + 40;
		} else if (this.index === 3) {
			x = Math.round(innerWidth / 2) + 40;
			y = Math.round(innerHeight / 2) + 40;
		} else if (this.index === 4) {
			//
		} else if (this.index === 5) {
			//
		}
		return { x, y };
	};

	const renderSubcontainer = () => {
		if (this.index === 1) {
			new TangibleSurfaces({ onClose: () => this.setIndex(0) });
		} else if (this.index === 2) {
			// TODO
		} else if (this.index === 3) {
			new MeaningfulMotion({ onClose: () => this.setIndex(0) });
		} else if (this.index === 4) {
			new UserInitiatedChange({ onClose: () => this.setIndex(0) });
		} else if (this.index === 5) {
			new DimensionalAffordances({ onClose: () => this.setIndex(0) });
		}
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

		$indexCanvas.addEventListener('transitionend', (e) => {
			document.querySelector('.index-container').remove();
			renderSubcontainer();
		});
	};

	this.setIndex = (idx) => {
		this.index = idx;
		this.render();
	};

	this.render = () => {
		switch (this.index) {
			case 1: {
				this.tangibleSurfacesCard.disappear();
				break;
			}

			case 2: {
				alert('서비스 준비 중입니다.');
				this.setIndex(0);
				break;
			}

			case 3: {
				this.meaningfulMotionCard.disappear();
				break;
			}

			case 4: {
				document.querySelector('.index-container').remove();
				new UserInitiatedChange({ onClose: () => this.setIndex(0) });
				break;
			}

			case 5: {
				document.querySelector('.index-container').remove();
				new DimensionalAffordances({ onClose: () => this.setIndex(0) });
				break;
			}

			default: {
				const $subContainer = document.querySelector('.sub-container');
				if ($subContainer) {
					$subContainer.remove();
					document.querySelector('#close').remove();
				}

				if (document.querySelector('.index-container')) {
					// emphasize-actions 완성하면 삭제하기
					return;
				}
				// render index containers
				$indexContainer = document.createElement('div');
				$indexContainer.className = 'index-container';
				$indexContainer.style.cursor = 'pointer';
				$root.appendChild($indexContainer);
				$indexContainer.addEventListener('click', (e) => {
					/**
					 * Chrome, Opera -> event has path property.
					 * Safari, Firefox -> event doesn't have.
					 */
					const path = e.path ?? e.composedPath();
					const id = path[0].id;
					const indexOfDash = id.indexOf('-');
					const index = +id.slice(indexOfDash + 1);
					this.setIndex(index);
					renderIndexCanvas();
				});
				this.tangibleSurfacesCard = new TangibleSurfacesCard({ $target: $indexContainer });
				this.emphasizeActionsCard = new EmphasizeActionsCard({ $target: $indexContainer });
				this.meaningfulMotionCard = new MeaningfulMotionCard({ $target: $indexContainer });
				this.userInitiatedChangeCard = new UserInitiatedChangeCard({ $target: $indexContainer });
				this.dimensionalAffordancesCard = new DimensionalAffordancesCard({ $target: $indexContainer });
			}
		}
	};

	this.render();
	window.addEventListener('resize', () => {
		if (this.index > 0) {
			return;
		}
		this.tangibleSurfacesCard.resize();
		this.emphasizeActionsCard.resize();
		this.meaningfulMotionCard.resize();
		this.userInitiatedChangeCard.resize();
		this.dimensionalAffordancesCard.resize();
	});
}

new App();
