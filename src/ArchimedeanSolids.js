import { Cube_Cuboctahedron_Interp, Octahedron_Cuboctahedron_Interp } from "./ShapeInterpolaters.js";

export const TRUNCATED_CUBE = Cube_Cuboctahedron_Interp(2.0 - Math.sqrt(2.0));

export const TRUNCATED_OCTAHEDRON = Octahedron_Cuboctahedron_Interp(0.5);

export default TRUNCATED_CUBE;
