import { React, useState, useRef, useEffect } from "react";
import ShapeRenderer from "../shapes/ShapeRenderer.js";

import * as Tetrahedron from "../shapes/tetrahedron";
import * as Hexahedron from "../shapes/hexahedron";
import * as Octahedron from "../shapes/octahedron";
import * as Dodecahedron from "../shapes/dodecahedron";
import * as Icosahedron from "../shapes/icosahedron";

import "./styles.css";

function DisplaySection({ shape }) {
  return (
    <section>
      <div className="sectionContent">
        <ShapeRenderer shape={shape.shapeObject} wireframeMode={false} />
        <div className="sectionText">
          <shape.Info />
        </div>
      </div>
    </section>
  );
}

export default function Homepage() {
  return (
    <>
      <DisplaySection shape={Tetrahedron} />
      <DisplaySection shape={Hexahedron} />
      <DisplaySection shape={Octahedron} />
      <DisplaySection shape={Dodecahedron} />
      <DisplaySection shape={Icosahedron} />
    </>
  );
}
