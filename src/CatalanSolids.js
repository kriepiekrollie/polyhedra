import { Tetrahedron_Triakis, Cube_Tetrakis, Octahedron_Triakis, Dodecahedron_Pentakis, Icosahedron_Triakis } from "./ShapeInterpolaters.js"

export const TRIAKIS_TETRAHEDRON = Tetrahedron_Triakis(2.0 / 5.0);

export const TETRAKIS_HEXAHEDRON = Cube_Tetrakis(0.5);

export const TRIAKIS_OCTAHEDRON = Octahedron_Triakis(6 * Math.sqrt(2) - 8);

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

export const RHOMBIC_DODECAHEDRON = (() => {
  var vertices = [
    { x : 1, y : 1, z : 1 },
    { x :-1, y : 1, z : 1 },
    { x : 1, y :-1, z : 1 },
    { x : 1, y : 1, z :-1 },
    { x : 1, y :-1, z :-1 },
    { x :-1, y : 1, z :-1 },
    { x :-1, y :-1, z : 1 },
    { x :-1, y :-1, z :-1 },

    { x : 2, y : 0, z : 0 },
    { x :-2, y : 0, z : 0 },
    { x : 0, y : 2, z : 0 },
    { x : 0, y :-2, z : 0 },
    { x : 0, y : 0, z : 2 },
    { x : 0, y : 0, z :-2 },
  ];
  const faces = [
    [0, 12, 1, 10],
    [0, 8, 2, 12],
    [3, 8, 0, 10],
    [3, 10, 5, 13],
    [3, 13, 4, 8],
    [4, 13, 7, 11],
    [4, 11, 2, 8],
    [1, 12, 6, 9],
    [1, 9, 5, 10],
    [2, 11, 6, 12],
    [5, 9, 7, 13],
    [7, 9, 6, 11],
  ];
  var r = 0;
  for (let vertex of vertices) {
    r = Math.max(r, Math.sqrt(vertex.x * vertex.x + vertex.y * vertex.y + vertex.z * vertex.z));
  }
  for (let i = 0; i < vertices.length; i++) {
    vertices[i].x /= r;
    vertices[i].y /= r;
    vertices[i].z /= r;
  }
  return {
    Vertices:vertices,
    Faces:faces,
  };
})();

export const RHOMBIC_TRIACONTAHEDRON = (() => {
  const phi = (1 + Math.sqrt(5)) / 2;
  const p = phi;
  const q = 1 / phi;

  var vertices = [
    { x : 0, y : 1, z : p },
    { x : 0, y :-1, z : p },
    { x : 0, y : 1, z :-p },
    { x : 0, y :-1, z :-p },

    { x : p, y : 0, z : 1 },
    { x : p, y : 0, z :-1 },
    { x :-p, y : 0, z : 1 },
    { x :-p, y : 0, z :-1 },
    
    { x : 1, y : p, z : 0 },
    { x :-1, y : p, z : 0 },
    { x : 1, y :-p, z : 0 },
    { x :-1, y :-p, z : 0 },

    { x : 1, y : 1, z : 1 },
    { x :-1, y : 1, z : 1 },
    { x : 1, y :-1, z : 1 },
    { x : 1, y : 1, z :-1 },
    { x : 1, y :-1, z :-1 },
    { x :-1, y : 1, z :-1 },
    { x :-1, y :-1, z : 1 },
    { x :-1, y :-1, z :-1 },

    { x : 0, y : p, z : q },
    { x : 0, y :-p, z : q },
    { x : 0, y : p, z :-q },
    { x : 0, y :-p, z :-q },

    { x : q, y : 0, z : p },
    { x : q, y : 0, z :-p },
    { x :-q, y : 0, z : p },
    { x :-q, y : 0, z :-p },

    { x : p, y : q, z : 0 },
    { x :-p, y : q, z : 0 },
    { x : p, y :-q, z : 0 },
    { x :-p, y :-q, z : 0 },
  ];
  const faces = [
    [13, 9, 20, 0],
    [20, 8, 12, 0],
    [12, 4, 24, 0],
    [26, 6, 13, 0],
    [24, 1, 26, 0],
    [18, 6, 26, 1],
    [21, 11, 18, 1],
    [14, 10, 21, 1],
    [24, 4, 14, 1],
    [29, 9, 13, 6],
    [12, 8, 28, 4],
    [18, 11, 31, 6],
    [31, 7, 29, 6],
    [28, 5, 30, 4],
    [30, 10, 14, 4],
    [22, 8, 20, 9],
    [23, 11, 21, 10],
    [16, 10, 30, 5],
    [28, 8, 15, 5],
    [22, 2, 15, 8],
    [17, 2, 22, 9],
    [17, 9, 29, 7],
    [31, 11, 19, 7],
    [17, 7, 27, 2],
    [25, 5, 15, 2],
    [16, 5, 25, 3],
    [25, 2, 27, 3],
    [27, 7, 19, 3],
    [19, 11, 23, 3],
    [23, 10, 16, 3],
  ];
  var r = 0;
  for (let vertex of vertices) {
    r = Math.max(r, Math.sqrt(vertex.x * vertex.x + vertex.y * vertex.y + vertex.z * vertex.z));
  }
  for (let i = 0; i < vertices.length; i++) {
    vertices[i].x /= r;
    vertices[i].y /= r;
    vertices[i].z /= r;
  }

  return {
    Vertices:vertices,
    Faces:faces,
  };
})();

export default RHOMBIC_TRIACONTAHEDRON;
