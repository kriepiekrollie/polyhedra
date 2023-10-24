import React, { useRef, useState, useEffect } from 'react';
import ShapeRenderer from "../shapes/ShapeRenderer.js";
import * as PlatonicSolids from "../shapes/PlatonicSolids.js";
import * as CatalanSolids from "../shapes/CatalanSolids.js";
import * as ArchimedeanSolids from "../shapes/ArchimedeanSolids.js"
import * as KeplerPoinsotSolids from "../shapes/KeplerPoinsotSolids.js"
import "./Playground.css";

// There must be a better way to do this, surely? (this is to match the css).
const getSize = (width, height) => (width > 900 ? Math.min(0.8 * width, height) : Math.min(width, 0.9 * height));

export default function Playground() {
  const [size, setSize] = useState(getSize(window.innerWidth, window.innerHeight));
  const [currentShape, setCurrentShape] = useState(PlatonicSolids.TETRAHEDRON);
  const [wireframe, setWireframe] = useState(false);

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

        <h1> lol fix this </h1>

        <input className="optionMenuButton" id="optionMenuButton" type="checkbox" />

        <label className="optionMenuLabel" htmlFor="optionMenuButton">
          <span className="material-symbols-outlined optionMenuButtonIcon">
            menu
          </span>
        </label>

        <ul className="optionMenu">

          <li onClick={() => {setCurrentShape(PlatonicSolids.TETRAHEDRON);}}> 
            <p>Tetrahedron</p> 
          </li>

          <li onClick={() => {setCurrentShape(PlatonicSolids.CUBE);}}> 
            <p>Hexahedron</p> 
          </li>

          <li onClick={() => {setCurrentShape(PlatonicSolids.OCTAHEDRON);}}> 
            <p>Octahedron</p> 
          </li>

          <li onClick={() => {setCurrentShape(PlatonicSolids.DODECAHEDRON);}}> 
            <p>Dodecahedron</p> 
          </li>

          <li onClick={() => {setCurrentShape(PlatonicSolids.ICOSAHEDRON);}}> 
            <p>Icosahedron</p> 
          </li>

          <li onClick={() => {setCurrentShape(ArchimedeanSolids.TRUNCATED_CUBE);}}> 
            <p>Truncated Cube</p> 
          </li>

          <li onClick={() => {setCurrentShape(ArchimedeanSolids.TRUNCATED_OCTAHEDRON);}}> 
            <p>Truncated Octahedron</p> 
          </li>

          <li onClick={() => {setCurrentShape(ArchimedeanSolids.CUBOCTAHEDRON);}}> 
            <p>Cuboctahedron</p> 
          </li>

          <li onClick={() => {setCurrentShape(CatalanSolids.TRIAKIS_TETRAHEDRON);}}> 
            <p>Triakis Tetrahedron</p> 
          </li>

          <li onClick={() => {setCurrentShape(CatalanSolids.TETRAKIS_HEXAHEDRON);}}> 
            <p>Tetrakis Hexahedron</p> 
          </li>

          <li onClick={() => {setCurrentShape(CatalanSolids.TRIAKIS_OCTAHEDRON);}}> 
            <p>Triakis Octahedron</p> 
          </li>

          <li onClick={() => {setCurrentShape(CatalanSolids.RHOMBIC_DODECAHEDRON);}}> 
            <p>Rhombic Dodecahedron</p> 
          </li>

          <li onClick={() => {setCurrentShape(CatalanSolids.PENTAKIS_DODECAHEDRON);}}> 
            <p>Pentakis Dodecahedron</p> 
          </li>

          <li onClick={() => {setCurrentShape(CatalanSolids.TRIAKIS_ICOSAHEDRON);}}> 
            <p>Triakis Icosahedron</p> 
          </li>

          <li onClick={() => {setCurrentShape(CatalanSolids.RHOMBIC_TRIACONTAHEDRON);}}> 
            <p>Rhombic Triacontahedron</p> 
          </li>

          <li onClick={() => {setCurrentShape(KeplerPoinsotSolids.GREAT_DODECAHEDRON);}}> 
            <p>Great Dodecahedron</p> 
          </li>

          <li onClick={() => {setWireframe(!wireframe);}}> 
            <p>Toggle Wireframe Mode</p> 
          </li>

        </ul>

      </div>

      <div className="article">
        <ShapeRenderer width={size} height={size} shape={currentShape} wireframeMode={wireframe} />
      </div>

    </>
  );
}
