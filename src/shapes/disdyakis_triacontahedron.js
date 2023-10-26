import { Truncate } from "./ShapeInterpolaters.js";

/*
function distance(A, B) {
  const dx = B.x - A.x;
  const dy = B.y - A.y;
  const dz = B.z - A.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
*/

export const shapeObject = (() => {
  const phi = (1 + Math.sqrt(5)) / 2;

  const r = 5 / (3 * phi * Math.sqrt(phi + 2));
  const p = r * phi;
  const q = r / phi;

  const u = 1 / Math.sqrt(phi + 2);
  const v = phi / Math.sqrt(phi + 2);

  const s = (7 * phi - 6) * Math.sqrt(phi + 2) / 11;

  const a = s * phi / 2;
  const b = s / 2;
  const c = s / (2 * phi);

  const vertices = [
    // Dodecahedron vertices [0, 20)
    { x : r, y : r, z : r },
    { x :-r, y : r, z : r },
    { x : r, y :-r, z : r },
    { x : r, y : r, z :-r },
    { x : r, y :-r, z :-r },
    { x :-r, y : r, z :-r },
    { x :-r, y :-r, z : r },
    { x :-r, y :-r, z :-r },

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

    // Icosahedron vertices [20, 32)
    { x : 0, y : u, z : v },
    { x : 0, y : u, z :-v },
    { x : 0, y :-u, z : v },
    { x : 0, y :-u, z :-v },

    { x : v, y : 0, z : u },
    { x :-v, y : 0, z : u },
    { x : v, y : 0, z :-u },
    { x :-v, y : 0, z :-u },
    
    { x : u, y : v, z : 0 },
    { x : u, y :-v, z : 0 },
    { x :-u, y : v, z : 0 },
    { x :-u, y :-v, z : 0 },
    
    // Icosidodecahedron vertices [32, 62)
    { x : s, y : 0, z : 0 },
    { x :-s, y : 0, z : 0 },
    { x : 0, y : s, z : 0 },
    { x : 0, y :-s, z : 0 },
    { x : 0, y : 0, z : s },
    { x : 0, y : 0, z :-s },

    { x : a, y : b, z : c },
    { x : a, y : b, z :-c },
    { x : a, y :-b, z : c },
    { x : a, y :-b, z :-c },
    { x :-a, y : b, z : c },
    { x :-a, y : b, z :-c },
    { x :-a, y :-b, z : c },
    { x :-a, y :-b, z :-c },

    { x : b, y : c, z : a },
    { x : b, y : c, z :-a },
    { x : b, y :-c, z : a },
    { x : b, y :-c, z :-a },
    { x :-b, y : c, z : a },
    { x :-b, y : c, z :-a },
    { x :-b, y :-c, z : a },
    { x :-b, y :-c, z :-a },

    { x : c, y : a, z : b },
    { x : c, y : a, z :-b },
    { x : c, y :-a, z : b },
    { x : c, y :-a, z :-b },
    { x :-c, y : a, z : b },
    { x :-c, y : a, z :-b },
    { x :-c, y :-a, z : b },
    { x :-c, y :-a, z :-b },
  ];
  const faces = [
    [24, 0, 38], 
    [24, 38, 16],
    [24, 16, 32],
    [24, 32, 18],
    [24, 18, 40],
    [24, 40, 2], 
    [24, 2, 48], 
    [24, 48, 12],
    [24, 12, 46],
    [24, 46, 0], 
    [29, 2, 40], 
    [29, 40, 18],
    [29, 18, 41],
    [29, 41, 4], 
    [29, 4, 57], 
    [29, 57, 11],
    [29, 11, 35],
    [29, 35, 9], 
    [29, 9, 56], 
    [29, 56, 2], 
    [22, 2, 56], 
    [22, 56, 9], 
    [22, 9, 60], 
    [22, 60, 6], 
    [22, 6, 52], 
    [22, 52, 14],
    [22, 14, 36],
    [22, 36, 12],
    [22, 12, 48],
    [22, 48, 2], 
    [31, 6, 60], 
    [31, 60, 9], 
    [31, 9, 35], 
    [31, 35, 11],
    [31, 11, 61],
    [31, 61, 7], 
    [31, 7, 45], 
    [31, 45, 19],
    [31, 19, 44],
    [31, 44, 6], 
    [23, 7, 61], 
    [23, 61, 11],
    [23, 11, 57],
    [23, 57, 4], 
    [23, 4, 49], 
    [23, 49, 13],
    [23, 13, 37],
    [23, 37, 15],
    [23, 15, 53],
    [23, 53, 7], 
    [26, 3, 47], 
    [26, 47, 13],
    [26, 13, 49],
    [26, 49, 4], 
    [26, 4, 41], 
    [26, 41, 18],
    [26, 18, 32],
    [26, 32, 16],
    [26, 16, 39],
    [26, 39, 3], 
    [21, 3, 55], 
    [21, 55, 10],
    [21, 10, 59],
    [21, 59, 5], 
    [21, 5, 51], 
    [21, 51, 15],
    [21, 15, 37],
    [21, 37, 13],
    [21, 13, 47],
    [21, 47, 3], 
    [30, 1, 42], 
    [30, 42, 17],
    [30, 17, 43],
    [30, 43, 5], 
    [30, 5, 59], 
    [30, 59, 10],
    [30, 10, 34],
    [30, 34, 8], 
    [30, 8, 58], 
    [30, 58, 1], 
    [27, 5, 43], 
    [27, 43, 17],
    [27, 17, 33],
    [27, 33, 19],
    [27, 19, 45],
    [27, 45, 7], 
    [27, 7, 53], 
    [27, 53, 15],
    [27, 15, 51],
    [27, 51, 5], 
    [20, 1, 58], 
    [20, 58, 8], 
    [20, 8, 54], 
    [20, 54, 0], 
    [20, 0, 46], 
    [20, 46, 12],
    [20, 12, 36],
    [20, 36, 14],
    [20, 14, 50],
    [20, 50, 1], 
    [25, 1, 50], 
    [25, 50, 14], 
    [25, 14, 52], 
    [25, 52, 6], 
    [25, 6, 44], 
    [25, 44, 19], 
    [25, 19, 33], 
    [25, 33, 17], 
    [25, 17, 42], 
    [25, 42, 1], 
    [28, 0, 54], 
    [28, 54, 8], 
    [28, 8, 34], 
    [28, 34, 10], 
    [28, 10, 55], 
    [28, 55, 3], 
    [28, 3, 39], 
    [28, 39, 16], 
    [28, 16, 38], 
    [28, 38, 0], 
  ];
  /*
  // I should be embarrassed this might be the most cursed thing I've done.
  const dodecahedronFaces = [
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
  for (let face of dodecahedronFaces) {
    var mid = { x: 0, y: 0, z: 0 };
    for (let k of face) {
      mid.x += vertices[k].x;
      mid.y += vertices[k].y;
      mid.z += vertices[k].z;
    }
    mid.x /= face.length;
    mid.y /= face.length;
    mid.z /= face.length;
    // Find the closest point the midpoint of this face.
    var closestFaceMid = 0;
    for (let k = 0; k < 62; k++) {
      if (distance(vertices[k], mid) < distance(vertices[closestFaceMid], mid)) {
        closestFaceMid = k;
      }
    }
    for (let i = 0; i < face.length; i++) {
      const [a, b] = [face[i], face[(i+1)%face.length]];
      const midEdge = { 
        x: (vertices[a].x + vertices[b].x) / 2, 
        y: (vertices[a].y + vertices[b].y) / 2, 
        z: (vertices[a].z + vertices[b].z) / 2,
      };
      var closestEdgeMid = 0;
      for (let k = 0; k < 62; k++) {
        if (distance(vertices[k], midEdge) < distance(vertices[closestEdgeMid], midEdge)) {
          closestEdgeMid = k;
        }
      }

      faces.push([closestFaceMid, a, closestEdgeMid]);
      faces.push([closestFaceMid, closestEdgeMid, b]);
    }
  }
  console.log("Faces:");
  for (let idx in faces) {
    console.log("[" + faces[idx][0] + ", " + faces[idx][1] + ", " + faces[idx][2] + "], // " + idx);
  }
  */
  return {
    Vertices: vertices,
    Faces: faces,
  };
})();

export function Info() {
  return (
    <>
      <h1> Disdyakis Triacontahedron </h1>
      <h2> <a href="https://en.wikipedia.org/wiki/Disdyakis_triacontahedron"> Wikipedia page </a> </h2>
      <p> This thing is HUGE. Don't ask how long it took me to code this by hand. </p>
      <table>
        <tbody>
          <tr>
            <th> Type </th>
            <td> Catalan Solid </td>
          </tr>
          <tr>
            <th> Faces </th>
            <td> 120 </td>
          </tr>
          <tr>
            <th> Edges </th>
            <td> 180 </td>
          </tr>
          <tr>
            <th> Vertices </th>
            <td> 62 </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default shapeObject;
