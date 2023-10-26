import React, { useRef, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import ShapeRenderer from "../shapes/ShapeRenderer.js";
import { Truncate, Kleetopify, Dodecahedron_Icosahedron } from "../shapes/ShapeInterpolaters.js"
import "./styles.css";

/* Platonic Solids */
import Hexahedron from "../shapes/hexahedron.js";
import Octahedron from "../shapes/octahedron.js";
import Dodecahedron from "../shapes/dodecahedron.js";
import Icosahedron from "../shapes/icosahedron.js";
import Tetrahedron from "../shapes/tetrahedron.js";

function getInterpolater(slider) {
  switch (slider) {
    case "truncate_tetrahedron":
      return (t) => Truncate(Tetrahedron, t)
    case "truncate_hexahedron_octahedron":
      return (t) => (t < 0.5 ? Truncate(Hexahedron, 2 * t) : Truncate(Octahedron, 2 * (1 - t)));
    case "truncate_dodecahedron_icosahedron":
      return (t) => (t < 0.5 ? Truncate(Dodecahedron, 2 * t) : Truncate(Icosahedron, 2 * (1 - t)));
    case "kleetopify_tetrahedron":
      return (t) => Kleetopify(Tetrahedron, 1 + 2 * t)
    case "kleetopify_hexahedron_octahedron":
      return (t) => (t < 0.5 ? Kleetopify(Hexahedron, 1 + 2 * t) : Kleetopify(Octahedron, 1 + (1 - t)));
      // return (t) => (t < 0.5 ? Kleetopify(Hexahedron, 1 + 2 * t) : Kleetopify(Octahedron, 1 + 2 * (1 - t)));
    case "kleetopify_dodecahedron_icosahedron":
      return Dodecahedron_Icosahedron;
    default:
      return (t) => Truncate(Tetrahedron, t)
  }
}

export default function Slider() {
  const routeParams = useParams();

  const Interpolater = getInterpolater(routeParams.slider);
  const [shapeObject, setShape] = useState(Interpolater(0));
  const [wireframe, setWireframe] = useState(false);

  const slider = useRef(null);
  useEffect(() => {
    slider.current.value = 0;
    setShape(Interpolater(0));
  }, [routeParams.slider]);

  const handleSliderChange = (event) => {
    setShape(Interpolater(slider.current.value / 100));
  };

  return (
    <section>
      <div className="sectionContent">
        <ShapeRenderer shape={shapeObject} wireframeMode={wireframe} />
        <div className="sectionText">
          <input ref={slider} className="slider" type="range" min="0" max="100" onChange={handleSliderChange} />
          <div className="WireframeToggle" onClick={() => setWireframe(!wireframe)}> 
            {
              wireframe ? (
              <span className="material-symbols-outlined">
                check_box
              </span> ) : (
              <span className="material-symbols-outlined">
                check_box_outline_blank
              </span>
              )
            } 
            <div>wireframe mode</div>
          </div>
        </div>
      </div>
    </section>
  );
}
