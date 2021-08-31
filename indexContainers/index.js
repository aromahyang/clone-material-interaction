import TangibleSurfaces from './TangibleSurfaces.js';
import { $root } from '../utils/utils.js';

function App() {
	const $indexContainer = document.createElement('div');
	$indexContainer.style.cursor = 'pointer';
	$root.appendChild($indexContainer);
	const tangibleSurfaces = new TangibleSurfaces({ $target: $indexContainer });
}

export default App;
