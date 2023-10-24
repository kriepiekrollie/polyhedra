import { useState, useEffect, Children } from "react";
import { Outlet, Link } from "react-router-dom";
import "./styles.css";

function ExpandButton({ hidden, onClick }) {
  return (
    <div className="expandButton" onClick={onClick}>
      <span className="material-symbols-outlined">
        {hidden ? "expand_more" : "expand_less"}
      </span>
    </div>
  );
}

function NavTree({ elem, children }) {
  const [hidden, setHidden] = useState(elem ? true : false);
  return (
    <ul>
      {
        elem ? (
          <li> 
            {
              children ? (
                <ExpandButton onClick={() => setHidden(!hidden)} hidden={hidden} />
              ) : (
                <div className="lineSymbol">
                  <span className="material-symbols-outlined">
                    check_indeterminate_small
                  </span>
                </div>
              )
            }
            {elem} 
          </li>
        ) : (
          <> </>
        )
      }
      {
        Children.map(children, child =>
          <li className={hidden ? "hidden" : ""}> {child} </li>
        )
      }
    </ul>
  );
}

function Navbar({ hidden }) {
  return (
    <nav className={hidden ? "hidden" : ""}>
      <div className="navTreeContainer">
        <NavTree>
          <NavTree elem={<Link><h2>homepage</h2></Link>} />

          <NavTree elem={<Link><h2>polyhedra</h2></Link>}>

            <NavTree elem={<Link><h2>platonic solids</h2></Link>}>

              <NavTree elem={<Link><h3>tetrahedron</h3></Link>} />
              <NavTree elem={<Link><h3>hexahedron</h3></Link>} />
              <NavTree elem={<Link><h3>octahedron</h3></Link>} />
              <NavTree elem={<Link><h3>dodecahedron</h3></Link>} />
              <NavTree elem={<Link><h3>icosahedron</h3></Link>} />

            </NavTree>

            <NavTree elem={<Link><h2>archimedean solids</h2></Link>}>

              <NavTree elem={<Link><h2>cuboctahedron</h2></Link>} />
              <NavTree elem={<Link><h2>icosidodecahedron</h2></Link>} />

              <NavTree elem={<Link><h2>rhombicuboctahedron</h2></Link>} />
              <NavTree elem={<Link><h2>rhombicosidodecahedron</h2></Link>} />

              <NavTree elem={<Link><h2>snub cube</h2></Link>} />
              <NavTree elem={<Link><h2>snub dodecahedron</h2></Link>} />

              <NavTree elem={<Link><h2>truncated tetrahedron</h2></Link>} />
              <NavTree elem={<Link><h2>truncated hexahedron</h2></Link>} />
              <NavTree elem={<Link><h2>truncated octahedron</h2></Link>} />
              <NavTree elem={<Link><h2>truncated dodecahedron</h2></Link>} />
              <NavTree elem={<Link><h2>truncated icosahedron</h2></Link>} />

              <NavTree elem={<Link><h2>truncated cuboctahedron</h2></Link>} />
              <NavTree elem={<Link><h2>truncated icosidodecahedron</h2></Link>} />

            </NavTree>

            <NavTree elem={<Link><h2>catalan solids</h2></Link>}>

              <NavTree elem={<Link><h2>rhombic dodecahedron</h2></Link>} />
              <NavTree elem={<Link><h2>rhombic triacontahedron</h2></Link>} />

              <NavTree elem={<Link><h2>triakis tetrahedron</h2></Link>} />
              <NavTree elem={<Link><h2>tetrakis hexahedron</h2></Link>} />
              <NavTree elem={<Link><h2>triakis octahedron</h2></Link>} />
              <NavTree elem={<Link><h2>pentakis dodecahedron</h2></Link>} />
              <NavTree elem={<Link><h2>triakis icosahedron</h2></Link>} />

              <NavTree elem={<Link><h2>disdyakis dodecahedron</h2></Link>} />
              <NavTree elem={<Link><h2>disdyakis triacontahedron</h2></Link>} />

              <NavTree elem={<Link><h2>deltoidal icositetrahedron</h2></Link>} />
              <NavTree elem={<Link><h2>deltoidal hexecontahedron</h2></Link>} />

              <NavTree elem={<Link><h2>pentagonal icositetrahedron</h2></Link>} />
              <NavTree elem={<Link><h2>pentagonal hexecontahedron</h2></Link>} />


            </NavTree>

          </NavTree>

        </NavTree>
      </div>
    </nav>
  )
}

export default function Layout() {
  const [hideSidebar, setHideSidebar] = useState(true);
  return (
    <>
      <header>
        <div className="navButton" onClick={() => setHideSidebar(!hideSidebar)}>
          <span className="material-symbols-outlined"> menu </span>
        </div>
        <Link to="/"><h2> polyhedral playground </h2></Link>
      </header>

      <Navbar hidden={hideSidebar} />

      <Outlet />

      <footer>
        <p> This site was made with lots of 💖by benjamin. </p>
        <p> <a href="https://github.com/kriepiekrollie/polyhedra"> view the source code for this project </a> </p>
      </footer>
    </>
  );
}
