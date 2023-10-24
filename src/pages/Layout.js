import { useState, useEffect, Children } from "react";
import { Outlet, Link } from "react-router-dom";
import "./styles.css";

function ExpandButton({ hidden, onClick }) {
  return (
    <span className="material-symbols-outlined expandButton" onClick={onClick}>
      {hidden ? "expand_more" : "expand_less"}
    </span>
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
                <span className="material-symbols-outlined lineSymbol">
                  check_indeterminate_small
                </span>
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
          <NavTree elem={<Link><h2>polyhedra</h2></Link>}>

            <NavTree elem={<Link><h3>platonic solids</h3></Link>}>

              <NavTree elem={<Link to="/shape/tetrahedron"><h4>tetrahedron</h4></Link>} />
              <NavTree elem={<Link to="/shape/hexahedron"><h4>hexahedron</h4></Link>} />
              <NavTree elem={<Link to="/shape/octahedron"><h4>octahedron</h4></Link>} />
              <NavTree elem={<Link to="/shape/dodecahedron"><h4>dodecahedron</h4></Link>} />
              <NavTree elem={<Link to="/shape/icosahedron"><h4>icosahedron</h4></Link>} />

            </NavTree>

            <NavTree elem={<Link><h3>archimedean solids</h3></Link>}>

              <NavTree elem={<Link to="/shape/cuboctahedron"><h4>cuboctahedron</h4></Link>} />
              <NavTree elem={<Link to="/shape/icosidodecahedron"><h4>icosidodecahedron</h4></Link>} />

              <NavTree elem={<Link to="/shape/rhombicuboctahedron"><h4>rhombicuboctahedron</h4></Link>} />
              <NavTree elem={<Link to="/wip"><h4>rhombicosidodecahedron</h4></Link>} />

              <NavTree elem={<Link to="/wip"><h4>snub cube</h4></Link>} />
              <NavTree elem={<Link to="/wip"><h4>snub dodecahedron</h4></Link>} />

              <NavTree elem={<Link to="/wip"><h4>truncated tetrahedron</h4></Link>} />
              <NavTree elem={<Link to="/shape/truncated_hexahedron"><h4>truncated hexahedron</h4></Link>} />
              <NavTree elem={<Link to="/shape/truncated_octahedron"><h4>truncated octahedron</h4></Link>} />
              <NavTree elem={<Link to="/wip"><h4>truncated dodecahedron</h4></Link>} />
              <NavTree elem={<Link to="/wip"><h4>truncated icosahedron</h4></Link>} />

              <NavTree elem={<Link to="/wip"><h4>truncated cuboctahedron</h4></Link>} />
              <NavTree elem={<Link to="/wip"><h4>truncated icosidodecahedron</h4></Link>} />

            </NavTree>

            <NavTree elem={<Link><h3>catalan solids</h3></Link>}>

              <NavTree elem={<Link to="/shape/rhombic_dodecahedron"><h4>rhombic dodecahedron</h4></Link>} />
              <NavTree elem={<Link to="/shape/rhombic_triacontahedron"><h4>rhombic triacontahedron</h4></Link>} />

              <NavTree elem={<Link to="/shape/triakis_tetrahedron"><h4>triakis tetrahedron</h4></Link>} />
              <NavTree elem={<Link to="/shape/tetrakis_hexahedron"><h4>tetrakis hexahedron</h4></Link>} />
              <NavTree elem={<Link to="/shape/triakis_octahedron"><h4>triakis octahedron</h4></Link>} />
              <NavTree elem={<Link to="/shape/pentakis_dodecahedron"><h4>pentakis dodecahedron</h4></Link>} />
              <NavTree elem={<Link to="/shape/triakis_icosahedron"><h4>triakis icosahedron</h4></Link>} />

              <NavTree elem={<Link to="/wip"><h4>disdyakis dodecahedron</h4></Link>} />
              <NavTree elem={<Link to="/shape/disdyakis_triacontahedron"><h4>disdyakis triacontahedron</h4></Link>} />

              <NavTree elem={<Link to="/wip"><h4>deltoidal icositetrahedron</h4></Link>} />
              <NavTree elem={<Link to="/shape/deltoidal_hexecontahedron"><h4>deltoidal hexecontahedron</h4></Link>} />

              <NavTree elem={<Link to="/wip"><h4>pentagonal icositetrahedron</h4></Link>} />
              <NavTree elem={<Link to="/wip"><h4>pentagonal hexecontahedron</h4></Link>} />

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
