import { ICOSAHEDRON } from "./PlatonicSolids.js";

export const GREAT_DODECAHEDRON = (() => {
  const phi = (1 + Math.sqrt(5)) / 2;
  const p = phi;
  const q = 1;
  const vertices = [
    { x : p, y : 0, z : 1 },
    { x :-p, y : 0, z : 1 },
    { x : p, y : 0, z :-1 },
    { x :-p, y : 0, z :-1 },

    { x : 0, y : 1, z : p },
    { x : 0, y : 1, z :-p },
    { x : 0, y :-1, z : p },
    { x : 0, y :-1, z :-p },
    
    { x : 1, y : p, z : 0 },
    { x : 1, y :-p, z : 0 },
    { x :-1, y : p, z : 0 },
    { x :-1, y :-p, z : 0 },
  ];
  const icofaces = [
    [0, 8, 2],
    [0, 4, 8],
    [0, 6, 4],
    [0, 9, 6],
    [0, 2, 9],

    [2, 8, 5],
    [10, 5, 8],
    [8, 4, 10],
    [10, 4, 1],
    [4, 6, 1],
    [1, 6, 11],
    [6, 9, 11],
    [11, 9, 7],
    [9, 2, 7],
    [2, 5, 7],

    [3, 10, 1],
    [3, 5, 10],
    [3, 7, 5],
    [3, 11, 7],
    [3, 1, 11],
  ];
  var faces = [];
  for (let i = 0; i < 12; i++) {
    var x = 0;
    var mp = new Map();
    for (let face of icofaces) {
      for (let j = 0; j < 3; j++) {
        if (face[j] === i) {
          const [a, b] = [face[(j+1)%3], face[(j+2)%3]];
          mp.set(a, b);
          x = face[(j+1)%3];
        }
      }
    }
    var face = [x];
    var y = mp.get(x);
    for (let y = mp.get(x); y != x && mp.has(y); y = mp.get(y)) {
      face.push(y);
    }
    faces.push(face);
  }
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

export default GREAT_DODECAHEDRON;
