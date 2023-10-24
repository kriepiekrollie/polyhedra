import { lazy } from "react";
import { useParams } from "react-router-dom";
import ShapeRenderer from "../shapes/ShapeRenderer.js";

import * as Hexahedron from "../shapes/hexahedron.js";
import * as Octahedron from "../shapes/octahedron.js";
import * as Dodecahedron from "../shapes/dodecahedron.js";
import * as Icosahedron from "../shapes/icosahedron.js";
import * as Tetrahedron from "../shapes/tetrahedron.js";

function getShapeData(shape)
{
  switch (shape) {
    case "tetrahedron":
      return { 
        Info: Tetrahedron.Info,
        shapeObject: Tetrahedron.shapeObject,
      }
    case "hexahedron":
      return {
        Info: Hexahedron.Info,
        shapeObject: Hexahedron.shapeObject,
      };
    case "octahedron":
      return {
        Info: Octahedron.Info,
        shapeObject: Octahedron.shapeObject,
      };
    case "dodecahedron":
      return {
        Info: Dodecahedron.Info,
        shapeObject: Dodecahedron.shapeObject,
      };
    case "icosahedron":
      return {
        Info: Icosahedron.Info,
        shapeObject: Icosahedron.shapeObject,
      };
    default:
      return {
        Info: Tetrahedron.Info,
        shapeObject: Tetrahedron.shapeObject,
      };
  }
  // Why am I doing this?
  return {
    Info: Tetrahedron.Info,
    shapeObject: Tetrahedron.shapeObject,
  };
}

export default function ShapeArticle() {
  const routeParams = useParams();

  const { Info, shapeObject } = getShapeData(routeParams.shape);

  return (
    <section>
      <div className="sectionContent">
        <ShapeRenderer shape={shapeObject} wireframeMode={false} />
        <div className="sectionText">
          <Info />
        </div>
      </div>
    </section>
  )
}
