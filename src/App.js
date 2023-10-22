import React, { useRef, useState, useEffect } from 'react';
import ShapeRenderer from "./ShapeRenderer.js";
import { CUBE, TETRAHEDRON, OCTAHEDRON, DODECAHEDRON, ICOSAHEDRON } from "./PlatonicSolids.js";
import { RHOMBIC_DODECAHEDRON, RHOMBIC_TRIACONTAHEDRON } from "./CatalanSolids.js";
import { TRUNCATED_CUBE, TRUNCATED_OCTAHEDRON } from "./ArchimedeanSolids.js"
import { Cube_Tetrahedron_Interp, Cube_Octahedron_Interp, Cube_Cuboctahedron_Interp, Octahedron_Cuboctahedron_Interp } from "./ShapeInterpolaters.js";
import "./App.css";

// There must be a better way to do this, surely? (this is to match the css).
const getSize = (width, height) => (width > 900 ? Math.min(0.8 * width, height) : Math.min(width, 0.9 * height));

function App() {
  const [size, setSize] = useState(getSize(window.innerWidth, window.innerHeight));
  const [currentShape, setCurrentShape] = useState(TRUNCATED_OCTAHEDRON);

  const handleResize = () => {
    setSize(getSize(window.innerWidth, window.innerHeight));
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return (() => {
      window.removeEventListener('resize', handleResize);
    });
  });

  return (
    <>
      <div className="optionMenuContainer">

        <h1> polyhedra </h1>

        <input className="optionMenuButton" id="optionMenuButton" type="checkbox" />

        <label className="optionMenuLabel" htmlFor="optionMenuButton">
          <span className="material-symbols-outlined optionMenuButtonIcon">
            menu
          </span>
        </label>

        <ul className="optionMenu">

          <li onClick={() => {setCurrentShape(CUBE);}}> 
            <p>Cube</p> 
          </li>

          <li onClick={() => {setCurrentShape(TETRAHEDRON);}}> 
            <p>Tetrahedron</p> 
          </li>

          <li onClick={() => {setCurrentShape(OCTAHEDRON);}}> 
            <p>Octahedron</p> 
          </li>

          <li onClick={() => {setCurrentShape(DODECAHEDRON);}}> 
            <p>Dodecahedron</p> 
          </li>

          <li onClick={() => {setCurrentShape(ICOSAHEDRON);}}> 
            <p>Icosahedron</p> 
          </li>

          <li onClick={() => {setCurrentShape(TRUNCATED_CUBE);}}> 
            <p>Truncated Cube</p> 
          </li>

          <li onClick={() => {setCurrentShape(TRUNCATED_OCTAHEDRON);}}> 
            <p>Truncated Octahedron</p> 
          </li>

          <li onClick={() => {setCurrentShape(RHOMBIC_DODECAHEDRON);}}> 
            <p>Rhombic Dodecahedron</p> 
          </li>

          <li onClick={() => {setCurrentShape(RHOMBIC_TRIACONTAHEDRON);}}> 
            <p>Rhombic Triacontahedron</p> 
          </li>

        </ul>

      </div>

      <div className="article">
        <ShapeRenderer width={size} height={size} Vertices={currentShape.Vertices} Faces={currentShape.Faces} />
      </div>

    </>
  );
}

/*
function App() {
  const [shape, setShape] = useState(OCTAHEDRON);
  const handleSliderChange = (event) => {
    setShape(Cube_Octahedron_Interp(event.target.value / 100));
  };
  return (
    <>
      <input type="range" min="0" max="100" onChange={handleSliderChange} />
      <div className="article">
        <ShapeRenderer width={900} height={900} Vertices={shape.Vertices} Faces={shape.Faces} />
      </div>
    </>
  );
}
*/

export default App;
