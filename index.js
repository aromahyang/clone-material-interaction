import { TangibleSurfacesCard, EmphasizeActionsCard } from './indexContainers/index.js';
import { TangibleSurfaces } from './subContainers/index.js';
import { $root } from './utils/utils.js';

function App() {
	this.index = 0;
	this.tangibleSurfacesCard = null;
	this.emphasizeActionsCard = null;

	this.setIndex = (idx) => {
		this.index = idx;
		this.render();
	};

	this.render = () => {
		switch (this.index) {
			case 1: {
				document.querySelector('.index-container').remove();
				new TangibleSurfaces({ onClose: () => this.setIndex(0) });
				break;
			}

			case 2: {
				// document.querySelector('.index-container').remove();
				alert('아직 준비 중입니다.');
				this.setIndex(0);
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
				const $indexContainer = document.createElement('div');
				$indexContainer.className = 'index-container';
				$indexContainer.style.cursor = 'pointer';
				$root.appendChild($indexContainer);
				$indexContainer.addEventListener('click', ({ path }) => {
					const id = path[0].id;
					const indexOfDash = id.indexOf('-');
					const index = +id.slice(indexOfDash + 1);
					this.setIndex(index);
				});
				this.tangibleSurfacesCard = new TangibleSurfacesCard({ $target: $indexContainer });
				this.emphasizeActionsCard = new EmphasizeActionsCard({ $target: $indexContainer });
			}
		}
	};

	this.render();
	window.addEventListener('resize', () => {
		this.tangibleSurfacesCard.resize();
		this.emphasizeActionsCard.resize();
	});
}

new App();
