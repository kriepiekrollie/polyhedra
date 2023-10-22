import { Tetrahedron_Triakis, Cube_Tetrakis, Octahedron_Triakis, Dodecahedron_Pentakis, Icosahedron_Triakis } from "./ShapeInterpolaters.js"

export const TRIAKIS_TETRAHEDRON = Tetrahedron_Triakis(2.0 / 5.0);

export const TETRAKIS_HEXAHEDRON = Cube_Tetrakis(0.5);

export const TRIAKIS_OCTAHEDRON = Octahedron_Triakis(6 * Math.sqrt(2) - 8);

export const RHOMBIC_DODECAHEDRON = Cube_Tetrakis(1.0);

export const PENTAKIS_DODECAHEDRON = (() => {
  // these are too complicated to just put in a single expression lol.
  const phi = (1 + Math.sqrt(5)) / 2;
  const l0 = Math.sqrt(10 * Math.sqrt(5) + 25) / 5.0;
  const l1 = Math.sqrt(1 + phi * phi);
  const l = l1 * ((3 * phi + 12) / 19);
  return Dodecahedron_Pentakis((l - l0) / (l1 - l0));
})();

export const TRIAKIS_ICOSAHEDRON = (() => {
  const phi = (1 + Math.sqrt(5)) / 2;
  const l0 = (3 * Math.sqrt(3) + Math.sqrt(15)) / 6;
  const l1 = Math.sqrt(3);
  const l = Math.sqrt((75 + 6 * Math.sqrt(5)) * (phi * phi + 1)) / 11;
  return Icosahedron_Triakis((l - l0) / (l1 - l0));
})();

export const RHOMBIC_TRIACONTAHEDRON = Dodecahedron_Pentakis(1.0);

export default RHOMBIC_TRIACONTAHEDRON;
