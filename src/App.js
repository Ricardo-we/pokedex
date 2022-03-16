import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootswatch/dist/united/bootstrap.min.css';
import Home from './views/Home';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='' element={<Home/>}/>
			</Routes>
		</BrowserRouter>
	);
}
export default App;

export const BASE_URL = 'https://pokeapi.co/api/v2';
