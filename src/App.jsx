import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Photo from "./pages/Photo";
import Contact from "./pages/Contact";
import Language from "./pages/Language";
import EditLanguage from "./pages/EditLanguage";




function App() {



	return (
		<BrowserRouter basename="/gallery">
		{/* <Navbar /> */}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="photo/:id" element={<Photo />} />
				<Route path="about" element={<About />} />
				<Route path="contact" element={<Contact />} />
				<Route path="language" element={<Language />} />
				<Route path="language/:id" element={<EditLanguage />} />

			</Routes>
		</BrowserRouter>

	);
}

export default App;

