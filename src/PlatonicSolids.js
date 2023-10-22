// I'm defining these constants in this weird way with functions because
// sometimes you want to do some calculations to determine the contants?

// I might want to add a list of edges as well one day...

export const CUBE = (() => {
  const r = 1 / Math.sqrt(3);
  const vertices = [
    { x : r, y : r, z : r },
    { x :-r, y : r, z : r },
    { x : r, y :-r, z : r },
    { x : r, y : r, z :-r },
    { x : r, y :-r, z :-r },
    { x :-r, y : r, z :-r },
    { x :-r, y :-r, z : r },
    { x :-r, y :-r, z :-r },
  ];
  const faces = [
    [0, 2, 6, 1],
    [3, 5, 7, 4],
    [0, 3, 4, 2],
    [1, 6, 7, 5],
    [0, 1, 5, 3],
    [2, 4, 7, 6],
  ];
  return {
    Vertices:vertices,
    Faces:faces,
  };
})();

export const TETRAHEDRON = (() => {
  const r = 1 / Math.sqrt(3);
  const vertices = [
    { x : r, y : r, z : r },
    { x : r, y :-r, z :-r },
    { x :-r, y : r, z :-r },
    { x :-r, y :-r, z : r },
  ];
  const faces = [
    [0, 2, 1],
    [0, 1, 3],
    [0, 3, 2],
    [1, 2, 3],
  ];
  return {
    Vertices:vertices,
    Faces:faces,
  };
})();

export const OCTAHEDRON = (() => {
  const vertices = [
    { x : 1, y : 0, z : 0 },
    { x :-1, y : 0, z : 0 },
    { x : 0, y : 1, z : 0 },
    { x : 0, y :-1, z : 0 },
    { x : 0, y : 0, z : 1 },
    { x : 0, y : 0, z :-1 },
  ]; 
  const faces = [
    [0, 5, 3],
    [0, 3, 4],
    [0, 4, 2],
    [0, 2, 5],
    [1, 3, 5],
    [1, 4, 3],
    [1, 2, 4],
    [1, 5, 2],
  ];
  return {
    Vertices:vertices,
    Faces:faces,
  };
})();

export const DODECAHEDRON = (() => {
  const phi = (1 + Math.sqrt(5)) / 2;
  const p = phi * 1
  const q = 1 / phi;
  const vertices = [
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
    [0, 16, 18, 2, 12],
    [2, 18, 4, 11, 9],
    [2, 9, 6, 14, 12],
    [6, 9, 11, 7, 19],
    [7, 11, 4, 13, 15],
    [3, 13, 4, 18, 16],
    [3, 10, 5, 15, 13],
    [1, 17, 5, 10, 8],
    [5, 17, 19, 7, 15],
    [1, 8, 0, 12, 14],
    [1, 14, 6, 19, 17],
    [0, 8, 10, 3, 16],
  ];
  var r = 0;
  for (let vertex of vertices) {
    r = Math.max(r, Math.sqrt(vertex.x * vertex.x + vertex.y * vertex.y + vertex.z * vertex.z));
  }
  console.log(r);
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

export const ICOSAHEDRON = (() => {
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
  const faces = [
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
  for (let face of faces) {
    var x = 0;
    var y = 0;
    var z = 0;
    for (let i of face) {
      const vertex = vertices[i];
      x += vertex.x;
      y += vertex.y;
      z += vertex.z;
    }
    x /= face.length;
    y /= face.length;
    z /= face.length;
    console.log(Math.sqrt(x * x + y * y + z * z));
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
});


export default CUBE;
