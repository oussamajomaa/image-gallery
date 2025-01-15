import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Photo from "./pages/Photo";




function App() {



	return (
		<BrowserRouter>
		{/* <Navbar /> */}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="photo/:id" element={<Photo />} />
				<Route path="about" element={<About />} />

			</Routes>
		</BrowserRouter>

	);
}

export default App;

