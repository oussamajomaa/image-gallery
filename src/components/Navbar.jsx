import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="  ">
      <ul className="flex justify-center items-center gap-6 h-16 bg-slate-500 text-white text-xl">
        <li>
            <Link to="/">Accueil</Link>
        </li>
        <li>
            <Link to="/about">A Propos</Link>
        </li>
      </ul>
    </nav>
  )
}
