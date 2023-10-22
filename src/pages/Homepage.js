import { React, useState, useRef, useEffect } from "react";
import ShapeRenderer from "../shapes/ShapeRenderer.js";
import * as PlatonicSolids from "../shapes/PlatonicSolids.js";
import * as CatalanSolids from "../shapes/CatalanSolids.js";
import * as ArchimedeanSolids from "../shapes/ArchimedeanSolids.js"
import * as KeplerPoinsotSolids from "../shapes/KeplerPoinsotSolids.js"
import "./Homepage.css";

const getSize = (width, height) => (width > 900 ? Math.min(0.8 * width, height) : Math.min(width, 0.9 * height));

export default function Homepage() {

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

  return (
    <>
      <section>
        <ShapeRenderer width={size} height={size} shape={PlatonicSolids.TETRAHEDRON} wireframeMode={false} />
      </section>

      <section>
        <ShapeRenderer width={size} height={size} shape={PlatonicSolids.CUBE} wireframeMode={false} />
      </section>

      <section>
        <ShapeRenderer width={size} height={size} shape={PlatonicSolids.OCTAHEDRON} wireframeMode={false} />
      </section>

      <section>
        <ShapeRenderer width={size} height={size} shape={PlatonicSolids.DODECAHEDRON} wireframeMode={false} />
      </section>

      <section>
        <ShapeRenderer width={size} height={size} shape={PlatonicSolids.ICOSAHEDRON} wireframeMode={false} />
      </section>
    </>
  );
}
