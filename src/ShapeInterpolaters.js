
function lerp(A, B, t) {
  return A + t * (B - A);
}

export function Cube_Tetrahedron_Interp(t) {
  const l = lerp(1 / 3, 1, t);
  var vertices = [
    { x : 1, y : 1, z : 1 },
    { x :-l, y : l, z : l },
    { x : l, y :-l, z : l },
    { x : l, y : l, z :-l },
    { x : 1, y :-1, z :-1 },
    { x :-1, y : 1, z :-1 },
    { x :-1, y :-1, z : 1 },
    { x :-l, y :-l, z :-l },
  ];
  const faces = [
    [0, 2, 6, 1],
    [0, 3, 4, 2],
    [0, 1, 5, 3],
    [6, 7, 5, 1],
    [5, 7, 4, 3],
    [4, 7, 6, 2],
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
}

export function Cube_RhombicDodecahedron_Interp(t) {
  const l = lerp(1.0, 2.0, t);
  var vertices = [
    { x : 1, y : 1, z : 1 },
    { x :-1, y : 1, z : 1 },
    { x : 1, y :-1, z : 1 },
    { x : 1, y : 1, z :-1 },
    { x : 1, y :-1, z :-1 },
    { x :-1, y : 1, z :-1 },
    { x :-1, y :-1, z : 1 },
    { x :-1, y :-1, z :-1 },

    { x : l, y : 0, z : 0 },
    { x :-l, y : 0, z : 0 },
    { x : 0, y : l, z : 0 },
    { x : 0, y :-l, z : 0 },
    { x : 0, y : 0, z : l },
    { x : 0, y : 0, z :-l },
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
}

export function Octahedron_RhombicDodecahedron_Interp(t) {
  const l = lerp(2.0 / 3.0, 1.0, t);
  var vertices = [
    { x : l, y : l, z : l },
    { x :-l, y : l, z : l },
    { x : l, y :-l, z : l },
    { x : l, y : l, z :-l },
    { x : l, y :-l, z :-l },
    { x :-l, y : l, z :-l },
    { x :-l, y :-l, z : l },
    { x :-l, y :-l, z :-l },

    { x : 2, y : 0, z : 0 },
    { x :-2, y : 0, z : 0 },
    { x : 0, y : 2, z : 0 },
    { x : 0, y :-2, z : 0 },
    { x : 0, y : 0, z : 2 },
    { x : 0, y : 0, z :-2 },
  ];
  const faces = [
    [12, 1, 10, 0],
    [8, 2, 12, 0],
    [8, 0, 10, 3],
    [10, 5, 13, 3],
    [13, 4, 8, 3],
    [13, 7, 11, 4],
    [11, 2, 8, 4],
    [12, 6, 9, 1],
    [9, 5, 10, 1],
    [11, 6, 12, 2],
    [9, 7, 13, 5],
    [9, 6, 11, 7],
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
}

export function Cube_Cuboctahedron_Interp(t) {
  const l = lerp(1.0, 0.0, t);
  var vertices = [
    { x : l, y : 1, z : 1 },
    { x : 1, y : l, z : 1 },
    { x : 1, y : 1, z : l },

    { x :-l, y : 1, z : 1 },
    { x :-1, y : l, z : 1 },
    { x :-1, y : 1, z : l },

    { x : l, y :-1, z : 1 },
    { x : 1, y :-l, z : 1 },
    { x : 1, y :-1, z : l },

    { x : l, y : 1, z :-1 },
    { x : 1, y : l, z :-1 },
    { x : 1, y : 1, z :-l },

    { x : l, y :-1, z :-1 },
    { x : 1, y :-l, z :-1 },
    { x : 1, y :-1, z :-l },

    { x :-l, y : 1, z :-1 },
    { x :-1, y : l, z :-1 },
    { x :-1, y : 1, z :-l },

    { x :-l, y :-1, z : 1 },
    { x :-1, y :-l, z : 1 },
    { x :-1, y :-1, z : l },

    { x :-l, y :-1, z :-1 },
    { x :-1, y :-l, z :-1 },
    { x :-1, y :-1, z :-l },
  ];
  const faces = [
    [0, 2, 1],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10, 11],
    [12, 14, 13],
    [15, 17, 16],
    [18, 20, 19],
    [21, 22, 23],
    [0, 1, 7, 6, 18, 19, 4, 3],
    [10, 9, 15, 16, 22, 21, 12, 13],
    [2, 0, 3, 5, 17, 15, 9, 11],
    [1, 2, 11, 10, 13, 14, 8, 7],
    [5, 4, 19, 20, 23, 22, 16, 17],
    [6, 8, 14, 12, 21, 23, 20, 18],
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
}

export function Octahedron_Cuboctahedron_Interp(t) {
  const l = lerp(0.0, 1.0, t);
  var vertices = [
    { x :-1, y :-l, z : 0 },
    { x :-1, y : 0, z :-l },
    { x :-1, y : 0, z : l },
    { x :-1, y : l, z : 0 },

    { x : 1, y :-l, z : 0 },
    { x : 1, y : 0, z :-l },
    { x : 1, y : 0, z : l },
    { x : 1, y : l, z : 0 },

    { x : 0, y :-1, z :-l },
    { x :-l, y :-1, z : 0 },
    { x : l, y :-1, z : 0 },
    { x : 0, y :-1, z : l },

    { x : 0, y : 1, z :-l },
    { x :-l, y : 1, z : 0 },
    { x : l, y : 1, z : 0 },
    { x : 0, y : 1, z : l },

    { x :-l, y : 0, z :-1 },
    { x : 0, y :-l, z :-1 },
    { x : 0, y : l, z :-1 },
    { x : l, y : 0, z :-1 },

    { x :-l, y : 0, z : 1 },
    { x : 0, y :-l, z : 1 },
    { x : 0, y : l, z : 1 },
    { x : l, y : 0, z : 1 },
  ];
  const faces = [
    [0, 1, 3, 2],
    [6, 7, 5, 4],
    [8, 9, 11, 10],
    [12, 14, 15, 13],
    [16, 17, 19, 18],
    [20, 22, 23, 21],
    [1, 16, 18, 12, 13, 3],
    [9, 8, 17, 16, 1, 0],
    [4, 5, 19, 17, 8, 10],
    [5, 7, 14, 12, 18, 19],
    [0, 2, 20, 21, 11, 9],
    [2, 3, 13, 15, 22, 20],
    [7, 6, 23, 22, 15, 14],
    [4, 10, 11, 21, 23, 6],
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
}

export function Cube_Octahedron_Interp(t) {
  if (t < 0.5) {
    return Cube_RhombicDodecahedron_Interp(2.0 * t);
  } else {
    return Octahedron_RhombicDodecahedron_Interp(2.0 * (1.0 - t));
  }
  /*
  if (t < 0.5) {
    return Cube_Cuboctahedron_Interp(2.0 * t);
  } else {
    return Octahedron_Cuboctahedron_Interp(2.0 * (1.0 - t));
  }
  */
}

export default Cube_Tetrahedron_Interp;
