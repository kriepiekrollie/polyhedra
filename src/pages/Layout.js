import { Outlet, Link } from "react-router-dom";
import "./Layout.css";

export default function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/"> Homepage </Link>
          </li>
          <li>
            <Link to="/playground"> Playground </Link>
          </li>
          <li>
            <Link to="/slider"> Slider </Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}
