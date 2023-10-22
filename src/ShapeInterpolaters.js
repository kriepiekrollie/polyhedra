
function lerp(A, B, t) {
  return A + t * (B - A);
}

export function Tetrahedron_Triakis(t) {
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

export function Cube_Tetrakis(t) {
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

export function Octahedron_Triakis(t) {
  const l = lerp(1.0 / 3.0, 0.5, t);
  var vertices = [
    { x : l, y : l, z : l },
    { x :-l, y : l, z : l },
    { x : l, y :-l, z : l },
    { x : l, y : l, z :-l },
    { x : l, y :-l, z :-l },
    { x :-l, y : l, z :-l },
    { x :-l, y :-l, z : l },
    { x :-l, y :-l, z :-l },

    { x : 1, y : 0, z : 0 },
    { x :-1, y : 0, z : 0 },
    { x : 0, y : 1, z : 0 },
    { x : 0, y :-1, z : 0 },
    { x : 0, y : 0, z : 1 },
    { x : 0, y : 0, z :-1 },
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

export function Icosahedron_Triakis(t) {
  const l0 = (3 * Math.sqrt(3) + Math.sqrt(15)) / 6;
  const l1 = Math.sqrt(3);
  const l = lerp(l0, l1, t);
  const phi = (1 + Math.sqrt(5)) / 2;
  const p = phi;
  const q = 1 / phi;

  const a = 1 * l / l1;
  const b = p * l / l1;
  const c = q * l / l1;

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

    { x : a, y : a, z : a },
    { x :-a, y : a, z : a },
    { x : a, y :-a, z : a },
    { x : a, y : a, z :-a },
    { x : a, y :-a, z :-a },
    { x :-a, y : a, z :-a },
    { x :-a, y :-a, z : a },
    { x :-a, y :-a, z :-a },

    { x : 0, y : b, z : c },
    { x : 0, y :-b, z : c },
    { x : 0, y : b, z :-c },
    { x : 0, y :-b, z :-c },

    { x : c, y : 0, z : b },
    { x : c, y : 0, z :-b },
    { x :-c, y : 0, z : b },
    { x :-c, y : 0, z :-b },

    { x : b, y : c, z : 0 },
    { x :-b, y : c, z : 0 },
    { x : b, y :-c, z : 0 },
    { x :-b, y :-c, z : 0 },
  ];
  const faces = [
    [0, 13, 9, 20],
    [0, 20, 8, 12],
    [0, 12, 4, 24],
    [0, 26, 6, 13],
    [0, 24, 1, 26],
    [1, 18, 6, 26],
    [1, 21, 11, 18],
    [1, 14, 10, 21],
    [1, 24, 4, 14],
    [6, 29, 9, 13],
    [4, 12, 8, 28],
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
    [7, 17, 9, 29],
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
}

export function Dodecahedron_Pentakis(t) {
  const phi = (1 + Math.sqrt(5)) / 2;
  const l0 = Math.sqrt(10 * Math.sqrt(5) + 25) / 5.0;
  const l1 = Math.sqrt(1 + phi * phi);
  const l = lerp(l0, l1, t);

  const p = phi;
  const q = 1 / phi;

  const u = 1 * l / l1;
  const v = p * l / l1;

  var vertices = [
    { x : 0, y : u, z : v },
    { x : 0, y :-u, z : v },
    { x : 0, y : u, z :-v },
    { x : 0, y :-u, z :-v },

    { x : v, y : 0, z : u },
    { x : v, y : 0, z :-u },
    { x :-v, y : 0, z : u },
    { x :-v, y : 0, z :-u },
    
    { x : u, y : v, z : 0 },
    { x :-u, y : v, z : 0 },
    { x : u, y :-v, z : 0 },
    { x :-u, y :-v, z : 0 },

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
}

export function Cube_Truncate(t) {
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

export function Octahedron_Truncate(t) {
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
    return Cube_Tetrakis(2.0 * t);
  } else {
    return Octahedron_Triakis(2.0 * (1.0 - t));
  }
  /*
  if (t < 0.5) {
    return Cube_Truncate(2.0 * t);
  } else {
    return Octahedron_Truncate(2.0 * (1.0 - t));
  }
  */
}

export function Dodecahedron_Icosahedron_Interp(t) {
  if (t < 0.5) {
    return Dodecahedron_Pentakis(2.0 * t);
  } else {
    return Icosahedron_Triakis(2.0 * (1.0 - t));
  }
}

export default Tetrahedron_Triakis;
