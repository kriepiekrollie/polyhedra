import { Cube_Truncate, Octahedron_Truncate } from "./ShapeInterpolaters.js";

export const TRUNCATED_CUBE = Cube_Truncate(2.0 - Math.sqrt(2.0));

export const TRUNCATED_OCTAHEDRON = Octahedron_Truncate(0.5);

export const CUBOCTAHEDRON = Cube_Truncate(1.0);

export default TRUNCATED_CUBE;
