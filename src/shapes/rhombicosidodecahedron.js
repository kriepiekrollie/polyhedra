import { Truncate } from "./ShapeInterpolaters.js";

/*
function dot(A, B) {
  return A.x * B.x + A.y * B.y + A.z * B.z;
}

function cross(p, q) {
  // Returns the cross product of the vectors p and q.
  return { 
    x : p.y * q.z - p.z * q.y,
    y : p.z * q.x - p.x * q.z,
    z : p.x * q.y - p.y * q.x,
  };
}

function abs(A) {
  return Math.sqrt(dot(A, A));
}

function dir(A, B) {
  return {
    x: A.x - B.x,
    y: A.y - B.y,
    z: A.z - B.z,
  };
}

function dist(A, B) {
  return abs(dir(A, B));
}

function angle(A, B, C) {
  return Math.acos(dot({
    x: A.x - B.x,
    y: A.y - B.y,
    z: A.z - B.z,
  }, {
    x: C.x - B.x,
    y: C.y - B.y,
    z: C.z - B.z,
  }) / (dist(A, B) * dist(B, C)));
}
*/

export const shapeObject = (() => {
  const a = (1 + Math.sqrt(5)) / 2;
  const b = a * a;
  const c = a * a * a;
  const d = 2 * a;
  const e = 2 + a;

  const vertices = [
    { x : c, y : 1, z : 1 },
    { x : c, y : 1, z :-1 },
    { x : c, y :-1, z : 1 },
    { x : c, y :-1, z :-1 },
    { x :-c, y : 1, z : 1 },
    { x :-c, y : 1, z :-1 },
    { x :-c, y :-1, z : 1 },
    { x :-c, y :-1, z :-1 },

    { x : 1, y : c, z : 1 },
    { x : 1, y : c, z :-1 },
    { x : 1, y :-c, z : 1 },
    { x : 1, y :-c, z :-1 },
    { x :-1, y : c, z : 1 },
    { x :-1, y : c, z :-1 },
    { x :-1, y :-c, z : 1 },
    { x :-1, y :-c, z :-1 },

    { x : 1, y : 1, z : c },
    { x : 1, y : 1, z :-c },
    { x : 1, y :-1, z : c },
    { x : 1, y :-1, z :-c },
    { x :-1, y : 1, z : c },
    { x :-1, y : 1, z :-c },
    { x :-1, y :-1, z : c },
    { x :-1, y :-1, z :-c },


    { x : a, y : d, z : b },
    { x : a, y : d, z :-b },
    { x : a, y :-d, z : b },
    { x : a, y :-d, z :-b },
    { x :-a, y : d, z : b },
    { x :-a, y : d, z :-b },
    { x :-a, y :-d, z : b },
    { x :-a, y :-d, z :-b },

    { x : b, y : a, z : d },
    { x : b, y : a, z :-d },
    { x : b, y :-a, z : d },
    { x : b, y :-a, z :-d },
    { x :-b, y : a, z : d },
    { x :-b, y : a, z :-d },
    { x :-b, y :-a, z : d },
    { x :-b, y :-a, z :-d },

    { x : d, y : b, z : a },
    { x : d, y : b, z :-a },
    { x : d, y :-b, z : a },
    { x : d, y :-b, z :-a },
    { x :-d, y : b, z : a },
    { x :-d, y : b, z :-a },
    { x :-d, y :-b, z : a },
    { x :-d, y :-b, z :-a },

    { x : 0, y : b, z : e },
    { x : 0, y : b, z :-e },
    { x : 0, y :-b, z : e },
    { x : 0, y :-b, z :-e },

    { x : e, y : 0, z : b },
    { x :-e, y : 0, z : b },
    { x : e, y : 0, z :-b },
    { x :-e, y : 0, z :-b },

    { x : b, y : e, z : 0 },
    { x : b, y :-e, z : 0 },
    { x :-b, y : e, z : 0 },
    { x :-b, y :-e, z : 0 },
  ];
  const faces = [
    // Triangular faces
    [0, 2, 52],
    [1, 54, 3],
    [4, 53, 6],
    [5, 7, 55],
    [8, 9, 56],
    [10, 57, 11],
    [12, 58, 13],
    [14, 15, 59],
    [16, 20, 48],
    [17, 49, 21],
    [18, 50, 22],
    [19, 23, 51],
    [24, 40, 32],
    [25, 33, 41],
    [26, 34, 42],
    [27, 43, 35],
    [28, 36, 44],
    [29, 45, 37],
    [30, 46, 38],
    [31, 39, 47],

    // Square faces
    [0, 1, 3, 2],
    [52, 32, 40, 0],
    [1, 41, 33, 54],
    [2, 42, 34, 52],
    [54, 35, 43, 3],
    [6, 7, 5, 4],
    [4, 44, 36, 53],
    [55, 37, 45, 5],
    [53, 38, 46, 6],
    [7, 47, 39, 55],
    [12, 13, 9, 8],
    [56, 40, 24, 8],
    [9, 25, 41, 56],
    [10, 11, 15, 14],
    [10, 26, 42, 57],
    [57, 43, 27, 11],
    [12, 28, 44, 58],
    [58, 45, 29, 13],
    [59, 46, 30, 14],
    [15, 31, 47, 59],
    [16, 18, 22, 20],
    [48, 24, 32, 16],
    [21, 23, 19, 17],
    [17, 33, 25, 49],
    [18, 34, 26, 50],
    [51, 27, 35, 19],
    [20, 36, 28, 48],
    [49, 29, 37, 21],
    [50, 30, 38, 22],
    [23, 39, 31, 51],

    // Pentagonal faces
    [0, 40, 56, 41, 1],
    [3, 43, 57, 42, 2],
    [5, 45, 58, 44, 4],
    [6, 46, 59, 47, 7],
    [8, 24, 48, 28, 12],
    [13, 29, 49, 25, 9],
    [14, 30, 50, 26, 10],
    [11, 27, 51, 31, 15],
    [16, 32, 52, 34, 18],
    [19, 35, 54, 33, 17],
    [22, 38, 53, 36, 20],
    [21, 37, 55, 39, 23],
  ];

  /*
  for (let i = 0; i < 60; i++) {
    for (let j = i + 1; j < 60; j++) {
      if (Math.abs(dist(vertices[i], vertices[j])) - 2 > 0.1) {
        continue;
      }
      for (let k = j + 1; k < 60; k++) {
        if (Math.abs(dist(vertices[i], vertices[k])) - 2 > 0.1) {
          continue;
        }
        if (Math.abs(dist(vertices[j], vertices[k])) - 2 > 0.1) {
          continue;
        }
        if (Math.abs(angle(vertices[i], vertices[j], vertices[k]) - Math.PI / 3) > 0.1) {
          continue;
        }
        if (Math.abs(angle(vertices[j], vertices[k], vertices[i]) - Math.PI / 3) > 0.1) {
          continue;
        }
        if (Math.abs(angle(vertices[k], vertices[i], vertices[j]) - Math.PI / 3) > 0.1) {
          continue;
        }
        const mid = {
          x: (vertices[i].x + vertices[j].x + vertices[k].x) / 3,
          y: (vertices[i].y + vertices[j].y + vertices[k].y) / 3,
          z: (vertices[i].z + vertices[j].z + vertices[k].z) / 3,
        }
        const norm = cross(dir(vertices[i], vertices[j]), dir(vertices[i], vertices[k]));
        if (abs(cross(mid, norm)) > 0.1) {
          continue;
        }
        if (dot(mid, norm) < 0) {
          faces.push([i, j, k]);
        } else {
          faces.push([i, k, j]);
        }
      }
    }
  }
  const s = new Set();
  for (let i = 0; i < 60; i++) {
    for (let j = i + 1; j < 60; j++) {
      if (Math.abs(dist(vertices[i], vertices[j])) - 2 > 0.1) {
        continue;
      }
      for (let k = i + 1; k < 60; k++) {
        if (Math.abs(dist(vertices[i], vertices[k])) - 2 * Math.sqrt(2) > 0.1) {
          continue;
        }
        if (Math.abs(dist(vertices[j], vertices[k])) - 2 > 0.1) {
          continue;
        }
        if (Math.abs(angle(vertices[i], vertices[j], vertices[k]) - Math.PI / 2) > 0.1) {
          continue;
        }
        if (Math.abs(angle(vertices[j], vertices[k], vertices[i]) - Math.PI / 4) > 0.1) {
          continue;
        }
        if (Math.abs(angle(vertices[k], vertices[i], vertices[j]) - Math.PI / 4) > 0.1) {
          continue;
        }
        for (let l = i + 1; l < 60; l++) {
          if (Math.abs(dist(vertices[i], vertices[l])) - 2 > 0.1) {
            continue;
          }
          if (Math.abs(dist(vertices[j], vertices[l])) - 2 * Math.sqrt(2) > 0.1) {
            continue;
          }
          if (Math.abs(dist(vertices[k], vertices[l])) - 2 > 0.1) {
            continue;
          }

          if (Math.abs(angle(vertices[i], vertices[l], vertices[k]) - Math.PI / 2) > 0.1) {
            continue;
          }
          if (Math.abs(angle(vertices[k], vertices[i], vertices[l]) - Math.PI / 4) > 0.1) {
            continue;
          }
          if (Math.abs(angle(vertices[i], vertices[k], vertices[l]) - Math.PI / 4) > 0.1) {
            continue;
          }

          if (Math.abs(angle(vertices[j], vertices[l], vertices[k]) - Math.PI / 4) > 0.1) {
            continue;
          }
          if (Math.abs(angle(vertices[j], vertices[k], vertices[l]) - Math.PI / 2) > 0.1) {
            continue;
          }
          if (Math.abs(angle(vertices[k], vertices[j], vertices[l]) - Math.PI / 4) > 0.1) {
            continue;
          }

          if (Math.abs(angle(vertices[i], vertices[l], vertices[j]) - Math.PI / 4) > 0.1) {
            continue;
          }
          if (Math.abs(angle(vertices[i], vertices[j], vertices[l]) - Math.PI / 4) > 0.1) {
            continue;
          }
          if (Math.abs(angle(vertices[j], vertices[i], vertices[l]) - Math.PI / 2) > 0.1) {
            continue;
          }

          console.log(l);
          const mid = {
            x: (vertices[i].x + vertices[j].x + vertices[k].x + vertices[l].x) / 4,
            y: (vertices[i].y + vertices[j].y + vertices[k].y + vertices[l].y) / 4,
            z: (vertices[i].z + vertices[j].z + vertices[k].z + vertices[l].z) / 4,
          }
          const norm1 = cross(dir(vertices[i], vertices[j]), dir(vertices[i], vertices[l]));
          if (abs(cross(mid, norm1)) > 0.1) {
            continue;
          }
          const norm2 = cross(dir(vertices[j], vertices[k]), dir(vertices[j], vertices[i]));
          if (abs(cross(mid, norm2)) > 0.1) {
            continue;
          }
          const norm3 = cross(dir(vertices[k], vertices[l]), dir(vertices[k], vertices[j]));
          if (abs(cross(mid, norm3)) > 0.1) {
            continue;
          }
          const norm4 = cross(dir(vertices[l], vertices[i]), dir(vertices[l], vertices[k]));
          if (abs(cross(mid, norm4)) > 0.1) {
            continue;
          }
          if (dot(norm1, norm2) < 0) {
            continue;
          }
          if (dot(norm1, norm3) < 0) {
            continue;
          }
          if (dot(norm1, norm4) < 0) {
            continue;
          }
          if (dot(norm2, norm3) < 0) {
            continue;
          }
          if (dot(norm2, norm4) < 0) {
            continue;
          }
          if (dot(norm3, norm4) < 0) {
            continue;
          }
          const norm = norm1;
          const temp = [i, j, k, l];
          temp.sort();
          if (s.has(JSON.stringify(temp))) {
            continue;
          }
          s.add(JSON.stringify(temp));
          if (dot(mid, norm) < 0) {
            faces.push([i, j, k, l]);
          } else {
            faces.push([l, k, j, i]);
          }
        }
      }
    }
  }
  console.log(JSON.stringify(faces));
  */

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
    Vertices: vertices,
    Faces: faces,
  };
})();

export function Info() {
  return (
    <>
      <h1> Rhombicosidodecahedron </h1>
      <h2> <a href="https://en.wikipedia.org/wiki/Rhombicosidodecahedron"> Wikipedia page </a> </h2>
      <p> It's just epic that you can fit so many triangles, squares and pentagons into this one. </p>
      <table>
        <tbody>
          <tr>
            <th> Type </th>
            <td> Archimedean Solid </td>
          </tr>
          <tr>
            <th> Faces </th>
            <td> 62 </td>
          </tr>
          <tr>
            <th> Edges </th>
            <td> 120 </td>
          </tr>
          <tr>
            <th> Vertices </th>
            <td> 60 </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default shapeObject;
