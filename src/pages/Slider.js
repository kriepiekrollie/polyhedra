import React, { useRef, useState, useEffect } from 'react';
import ShapeRenderer from "../shapes/ShapeRenderer.js";
import * as PlatonicSolids from "../shapes/PlatonicSolids.js";
import * as CatalanSolids from "../shapes/CatalanSolids.js";
import * as ArchimedeanSolids from "../shapes/ArchimedeanSolids.js"
import * as KeplerPoinsotSolids from "../shapes/KeplerPoinsotSolids.js"
import * as Interp from "../shapes/ShapeInterpolaters.js"
import "./Playground.css";

const getSize = (width, height) => (width > 900 ? Math.min(0.8 * width, height) : Math.min(width, 0.9 * height));

export default function Slider() {
  const [shape, setShape] = useState(PlatonicSolids.DODECAHEDRON);
  const slider = useRef(null);
  const [size, setSize] = useState(getSize(window.innerWidth, window.innerHeight));

  const handleResize = () => {
    setSize(getSize(window.innerWidth, window.innerHeight));
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    console.log(PlatonicSolids.ICOSAHEDRON);
    return (() => {
      window.removeEventListener('resize', handleResize);
    });
  });

  useEffect(() => {
    slider.current.value = 0;
  }, []);

  const handleSliderChange = (event) => {
    setShape(Interp.Dodecahedron_Icosahedron(slider.current.value / 100));
  };

  return (
    <>
      <input ref={slider} className="slider" type="range" min="0" max="100" onChange={handleSliderChange} />
      <div className="slider-article">
        <ShapeRenderer width={size} height={size} shape={shape} wireframe={false} />
        <p>Yeah, I'm just putting the slider on top of the thing</p>
      </div>
    </>
  );
}
