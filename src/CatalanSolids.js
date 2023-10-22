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
  }
})();
// Uhm, yeah this one was by far the most work so far.
// Maybe I should use some other software or download these?
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
    [0, 13, 9, 20],
    [0, 20, 8, 12],
    [0, 12, 4, 24],
    [0, 24, 1, 26],
    [0, 26, 6, 13],
    [1, 18, 6, 26],
    [24, 4, 14, 1],
    [6, 29, 9, 13],
    [4, 12, 8, 28],
    [1, 21, 11, 18],
    [1, 14, 10, 21],
    [6, 18, 11, 31],
    [6, 31, 7, 29],
    [4, 28, 5, 30],
    [4, 30, 10, 14],
    [9, 22, 8, 20],
    [10, 23, 11, 21],
    [5, 16, 10, 30],
    [5, 28, 8, 15],
    [8, 22, 2, 15],
    [9, 17, 2, 22],
    [17, 9, 29, 7],
    [7, 31, 11, 19],
    [2, 17, 7, 27],
    [2, 25, 5, 15],
    [3, 16, 5, 25],
    [3, 25, 2, 27],
    [3, 27, 7, 19],
    [3, 19, 11, 23],
    [3, 23, 10, 16],
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

export const TRIAKIS_OCTAHEDRON = 0;

export default RHOMBIC_TRIACONTAHEDRON;
