/*
function distance(A, B) {
  const dx = B.x - A.x;
  const dy = B.y - A.y;
  const dz = B.z - A.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
*/

export const shapeObject = (() => {
  const a = 1 / (1 + 2 * Math.sqrt(2));
  const b = 1 / (2 + 3 * Math.sqrt(2));
  const c = 1 / (3 + 3 * Math.sqrt(2));

  const vertices = [
    { x : c, y : c, z : c },
    { x : c, y : c, z :-c },
    { x : c, y :-c, z : c },
    { x : c, y :-c, z :-c },
    { x :-c, y : c, z : c },
    { x :-c, y : c, z :-c },
    { x :-c, y :-c, z : c },
    { x :-c, y :-c, z :-c },

    { x : a, y : 0, z : 0 },
    { x :-a, y : 0, z : 0 },
    { x : 0, y : a, z : 0 },
    { x : 0, y :-a, z : 0 },
    { x : 0, y : 0, z : a },
    { x : 0, y : 0, z :-a },

    { x : 0, y : b, z : b },
    { x : 0, y : b, z :-b },
    { x : 0, y :-b, z : b },
    { x : 0, y :-b, z :-b },

    { x : b, y : 0, z : b },
    { x :-b, y : 0, z : b },
    { x : b, y : 0, z :-b },
    { x :-b, y : 0, z :-b },

    { x : b, y : b, z : 0 },
    { x : b, y :-b, z : 0 },
    { x :-b, y : b, z : 0 },
    { x :-b, y :-b, z : 0 },
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
  const faces = [
    [14, 0, 12], // 0
    [14, 12, 4], // 1
    [14, 4, 10], // 2
    [14, 10, 0], // 3
    [18, 0, 8], // 4
    [18, 8, 2], // 5
    [18, 2, 12], // 6
    [18, 12, 0], // 7
    [22, 1, 8], // 8
    [22, 8, 0], // 9
    [22, 0, 10], // 10
    [22, 10, 1], // 11
    [15, 1, 10], // 12
    [15, 10, 5], // 13
    [15, 5, 13], // 14
    [15, 13, 1], // 15
    [20, 1, 13], // 16
    [20, 13, 3], // 17
    [20, 3, 8], // 18
    [20, 8, 1], // 19
    [17, 3, 13], // 20
    [17, 13, 7], // 21
    [17, 7, 11], // 22
    [17, 11, 3], // 23
    [23, 3, 11], // 24
    [23, 11, 2], // 25
    [23, 2, 8], // 26
    [23, 8, 3], // 27
    [19, 4, 12], // 28
    [19, 12, 6], // 29
    [19, 6, 9], // 30
    [19, 9, 4], // 31
    [24, 4, 9], // 32
    [24, 9, 5], // 33
    [24, 5, 10], // 34
    [24, 10, 4], // 35
    [16, 2, 11], // 36
    [16, 11, 6], // 37
    [16, 6, 12], // 38
    [16, 12, 2], // 39
    [21, 5, 9], // 40
    [21, 9, 7], // 41
    [21, 7, 13], // 42
    [21, 13, 5], // 43
    [25, 7, 9], // 44
    [25, 9, 6], // 45
    [25, 6, 11], // 46
    [25, 11, 7], // 47
  ];
  /*
  // I should be embarrassed this might be the most cursed thing I've done.
  const rhombicDodecahedronFaces = [
    [0, 12, 4, 10],
    [0, 8, 2, 12],
    [1, 8, 0, 10],
    [1, 10, 5, 13],
    [1, 13, 3, 8],
    [3, 13, 7, 11],
    [3, 11, 2, 8],
    [4, 12, 6, 9],
    [4, 9, 5, 10],
    [2, 11, 6, 12],
    [5, 9, 7, 13],
    [7, 9, 6, 11],
  ];
  for (let face of rhombicDodecahedronFaces) {
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
    for (let k = 0; k < 26; k++) {
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
      for (let k = 0; k < 26; k++) {
        if (distance(vertices[k], midEdge) < distance(vertices[closestEdgeMid], midEdge)) {
          closestEdgeMid = k;
        }
      }

      if (!(closestFaceMid == a || a == closestEdgeMid || closestFaceMid == closestEdgeMid)) {
        faces.push([closestFaceMid, a, closestEdgeMid]);
      }
      if (!(closestFaceMid == b || b == closestEdgeMid || closestFaceMid == closestEdgeMid)) {
        faces.push([closestFaceMid, closestEdgeMid, b]);
      }
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
      <h1> Disdyakis Dodecahedron </h1>
      <h2> <a href="https://en.wikipedia.org/wiki/Disdyakis_dodecahedron"> Wikipedia page </a> </h2>
      <p> Epic example of octahedral symmetry. </p>
      <table>
        <tbody>
          <tr>
            <th> Type </th>
            <td> Catalan Solid </td>
          </tr>
          <tr>
            <th> Faces </th>
            <td> 48 </td>
          </tr>
          <tr>
            <th> Edges </th>
            <td> 72 </td>
          </tr>
          <tr>
            <th> Vertices </th>
            <td> 26 </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default shapeObject;
