import { lazy } from "react";
import { useParams } from "react-router-dom";
import ShapeRenderer from "../shapes/ShapeRenderer.js";

/* Platonic Solids */
import * as Hexahedron from "../shapes/hexahedron.js";
import * as Octahedron from "../shapes/octahedron.js";
import * as Dodecahedron from "../shapes/dodecahedron.js";
import * as Icosahedron from "../shapes/icosahedron.js";
import * as Tetrahedron from "../shapes/tetrahedron.js";

/* Archimedean Solids */
import * as Cuboctahedron from "../shapes/cuboctahedron.js";
import * as Icosidodecahedron from "../shapes/icosidodecahedron.js";

import * as Rhombicuboctahedron from "../shapes/rhombicuboctahedron.js";
// import * as Rhombicosidodecahedron from "../shapes/rhombicosidodecahedron.js";

// import * as SnubCube from "../shapes/snub_cube.js";
// import * as SnubDodecahedron from "../shapes/snub_dodecahedron.js";

// import * as TruncatedTetrahedron from "../shapes/truncated_tetrahedron.js";
import * as TruncatedHexahedron from "../shapes/truncated_hexahedron.js";
import * as TruncatedOctahedron from "../shapes/truncated_octahedron.js";
// import * as TruncatedDodecahedron from "../shapes/truncated_dodecahedron.js";
// import * as TruncatedIcosahedron from "../shapes/truncated_icosahedron.js";

// import * as TruncatedCuboctahedron from "../shapes/truncated_cuboctahedron.js";
// import * as TruncatedIcosidodecahedron from "../shapes/truncated_icosidodecahedron.js";

/* Catalan Solids */
import * as RhombicDodecahedron from "../shapes/rhombic_dodecahedron.js";
import * as RhombicTriacontahedron from "../shapes/rhombic_triacontahedron.js";

import * as TriakisTetrahedron from "../shapes/triakis_tetrahedron.js";
import * as TetrakisHexahedron from "../shapes/tetrakis_hexahedron.js";
import * as TriakisOctahedron from "../shapes/triakis_octahedron.js";
import * as PentakisDodecahedron from "../shapes/pentakis_dodecahedron.js";
import * as TriakisIcosahedron from "../shapes/triakis_icosahedron.js";

// import * as DisdyakisDodecahedron from "../shapes/disdyakis_dodecahedron.js";
import * as DisdyakisTriacontahedron from "../shapes/disdyakis_triacontahedron.js";

// import * as DeltoidalIcositetrahedron from "../shapes/deltoidal_icositetrahedron.js";
import * as DeltoidalHexecontahedron from "../shapes/deltoidal_hexecontahedron.js";

// import * as PentagonalIcositetrahedron from "../shapes/pentagonal_icositetrahedron.js";
// import * as PentagonalHexecontahedron from "../shapes/pentagonal_hexecontahedron.js";

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
    case "cuboctahedron":
      return {
        Info: Cuboctahedron.Info,
        shapeObject: Cuboctahedron.shapeObject,
      };
    case "icosidodecahedron":
      return {
        Info: Icosidodecahedron.Info,
        shapeObject: Icosidodecahedron.shapeObject,
      };
    case "rhombicuboctahedron":
      return {
        Info: Rhombicuboctahedron.Info,
        shapeObject: Rhombicuboctahedron.shapeObject,
      };
    // case "rhombicosidodecahedron":
    //   return {
    //     Info: Rhombicosidodecahedron.Info,
    //     shapeObject: Rhombicosidodecahedron.shapeObject,
    //   };
    // case "snub_cube":
    //   return {
    //     Info: SnubCube.Info,
    //     shapeObject: SnubCube.shapeObject,
    //   };
    // case "snub_dodecahedron":
    //   return {
    //     Info: SnubDodecahedron.Info,
    //     shapeObject: SnubDodecahedron.shapeObject,
    //   };
    // case "truncated_tetrahedron":
    //   return {
    //     Info: TruncatedTetrahedron.Info,
    //     shapeObject: TruncatedTetrahedron.shapeObject,
    //   };
    case "truncated_hexahedron":
      return {
        Info: TruncatedHexahedron.Info,
        shapeObject: TruncatedHexahedron.shapeObject,
      };
    case "truncated_octahedron":
      return {
        Info: TruncatedOctahedron.Info,
        shapeObject: TruncatedOctahedron.shapeObject,
      };
    // case "truncated_dodecahedron":
    //   return {
    //     Info: TruncatedDodecahedron.Info,
    //     shapeObject: TruncatedDodecahedron.shapeObject,
    //   };
    // case "truncated_icosahedron":
    //   return {
    //     Info: TruncatedIcosahedron.Info,
    //     shapeObject: TruncatedIcosahedron.shapeObject,
    //   };
    // case "truncated_cuboctahedron":
    //   return {
    //     Info: TruncatedCuboctahedron.Info,
    //     shapeObject: TruncatedCuboctahedron.shapeObject,
    //   };
    // case "truncated_icosidodecahedron":
    //   return {
    //     Info: TruncatedIcosidodecahedron.Info,
    //     shapeObject: TruncatedIcosidodecahedron.shapeObject,
    //   };
    case "rhombic_dodecahedron":
      return {
        Info: RhombicDodecahedron.Info,
        shapeObject: RhombicDodecahedron.shapeObject,
      };
    case "rhombic_triacontahedron":
      return {
        Info: RhombicTriacontahedron.Info,
        shapeObject: RhombicTriacontahedron.shapeObject,
      };
    case "triakis_tetrahedron":
      return {
        Info: TriakisTetrahedron.Info,
        shapeObject: TriakisTetrahedron.shapeObject,
      };
    case "tetrakis_hexahedron":
      return {
        Info: TetrakisHexahedron.Info,
        shapeObject: TetrakisHexahedron.shapeObject,
      };
    case "triakis_octahedron":
      return {
        Info: TriakisOctahedron.Info,
        shapeObject: TriakisOctahedron.shapeObject,
      };
    case "pentakis_dodecahedron":
      return {
        Info: PentakisDodecahedron.Info,
        shapeObject: PentakisDodecahedron.shapeObject,
      };
    case "triakis_icosahedron":
      return {
        Info: TriakisIcosahedron.Info,
        shapeObject: TriakisIcosahedron.shapeObject,
      };
    // case "disdyakis_dodecahedron":
    //   return {
    //     Info: DisdyakisDodecahedron.Info,
    //     shapeObject: DisdyakisDodecahedron.shapeObject,
    //   };
    case "disdyakis_triacontahedron":
      return {
        Info: DisdyakisTriacontahedron.Info,
        shapeObject: DisdyakisTriacontahedron.shapeObject,
      };
    // case "deltoidal_icositetrahedron":
    //   return {
    //     Info: DeltoidalIcositetrahedron.Info,
    //     shapeObject: DeltoidalIcositetrahedron.shapeObject,
    //   };
    case "deltoidal_hexecontahedron":
      return {
        Info: DeltoidalHexecontahedron.Info,
        shapeObject: DeltoidalHexecontahedron.shapeObject,
      };
    // case "pentagonal_icositetrahedron":
    //   return {
    //     Info: PentagonalIcositetrahedron.Info,
    //     shapeObject: PentagonalIcositetrahedron.shapeObject,
    //   };
    // case "pentagonal_hexecontahedron":
    //   return {
    //     Info: PentagonalHexecontahedron.Info,
    //     shapeObject: PentagonalHexecontahedron.shapeObject,
    //   };
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
